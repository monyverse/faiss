# FAISS deployment runbook

AWS EKS, GitOps with Argo CD. Terraform owns AWS resources and the cluster platform; Argo CD owns everything inside the application namespaces.

```
deploy/terraform/modules/   network, eks, database, storage, ecr, secrets, workload-identity, platform
deploy/terraform/envs/dev   non-production stack: one cluster hosting namespaces faiss-dev + faiss-staging
deploy/terraform/envs/prod  production stack: one cluster hosting faiss-prod
deploy/helm/faiss/          the application chart (values.yaml + values-<env>.yaml)
deploy/argocd/bootstrap/    chart installed by Terraform: ClusterSecretStore, repo credentials, root Application
deploy/argocd/clusters/     per cluster: AppProject "faiss" + one Application per environment
.github/workflows/          ci.yml (tests, lint, validate), release.yml (build, push, values-bump PRs)
```

Nothing here has been applied to an AWS account. It passes `terraform validate`, `helm lint` and `kubeconform`; runtime behaviour is unverified.

## Prerequisites

- Terraform >= 1.9 (validated with 1.15.2), AWS CLI v2, `kubectl`; Helm 4 and the `argocd` CLI are optional.
- Per AWS account: a versioned, KMS-encrypted state bucket; the GitHub Actions IAM OIDC provider; an ACM certificate for the FAISS hostname.
- Terraform must run from a network that reaches the VPC: the Kubernetes API endpoint is private, and the `helm` provider talks to it.
- Network routes (peering / transit gateway / PrivateLink) from the stack VPC to the existing OpenSearch RAG engine, the LiteLLM gateway and, if used, Temporal. Not created here.
- Outbound internet through the NAT gateways for Entra ID, the git host, and the public registries the platform charts pull from (quay.io, ghcr.io, public.ecr.aws). Mirror those images if egress is restricted.

## Bootstrap (non-production first, then repeat in `envs/prod`)

1. Replace the placeholders listed below.
2. Create the infrastructure:
   ```sh
   cd deploy/terraform/envs/dev
   cp backend.hcl.example backend.hcl && cp terraform.tfvars.example terraform.tfvars   # edit both
   terraform init -backend-config=backend.hcl
   terraform apply -target=module.network -target=module.eks   # the cluster must exist before the helm provider can connect
   terraform apply
   ```
3. Set secret values out of band (Terraform only creates empty containers; `terraform output secret_names` lists them):
   ```sh
   aws secretsmanager put-secret-value --secret-id faiss/dev/litellm      --secret-string '{"api_key":"<gateway key>"}'
   aws secretsmanager put-secret-value --secret-id faiss/dev/database     --secret-string '{"username":"faiss_app","password":"<generated>"}'
   aws secretsmanager put-secret-value --secret-id faiss/nonprod/argocd-repo --secret-string '{"username":"<user>","password":"<token>"}'
   ```
   The application database role must exist. Connect from inside the VPC as the master user (credentials are in the RDS-managed secret, `helm_values` output) and run:
   ```sql
   CREATE ROLE faiss_app LOGIN PASSWORD '<generated>';
   GRANT CONNECT ON DATABASE faiss TO faiss_app;
   GRANT USAGE ON SCHEMA public TO faiss_app;
   ALTER DEFAULT PRIVILEGES FOR ROLE faiss_admin IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO faiss_app;
   ALTER DEFAULT PRIVILEGES FOR ROLE faiss_admin IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO faiss_app;
   ```
   Shortcut for a first dev bring-up: point `externalSecrets.database.remoteKey` at the master secret ARN instead.
4. Copy `terraform output helm_values` into `deploy/helm/faiss/values-<env>.yaml`. Set the GitHub repository variables `AWS_REGION`, `ECR_REGISTRY`, `AWS_ECR_PUSH_ROLE_ARN` (outputs `ecr_registry`, `ci_ecr_push_role_arn`). Enable "Allow GitHub Actions to create and approve pull requests".
5. Give the OpenSearch owners `terraform output workload_role_arns` so they can admit the roles (domain access policy / fine-grained role mapping, or the Serverless data access policy), and the LiteLLM owners `nat_public_ips` or the VPC CIDR.
6. Merge to `main`. `release.yml` builds both images and opens a PR bumping `image.tag` in `values-dev.yaml`; merge it.
7. Argo CD syncs: root Application -> AppProject + Applications -> `faiss-dev`. Within a sync: PreSync `faiss-migrate` -> config -> workloads -> ingress/HPA/PDB -> PostSync `faiss-ingest`.
8. Create the DNS record for the hostname pointing at the ALB (`kubectl -n faiss-dev get ingress faiss`). There is no external-dns.

## Promote dev -> staging -> prod

Images are built once and promoted by tag; nothing is rebuilt.

1. GitHub -> Actions -> `release` -> Run workflow: choose `staging` and the tag running in dev (`sha-<12 hex>`). The workflow checks both images exist and opens a PR on `values-staging.yaml`.
2. Merge it. `faiss-staging` syncs automatically.
3. Repeat with `prod`. After the merge `faiss-prod` shows OutOfSync and waits: an operator runs `argocd app sync faiss-prod` (or uses the UI).

Other configuration changes follow the same path: edit the values file, PR, merge, sync.

## Roll back

- Revert the bump PR (`git revert`), merge. dev and staging sync on their own; prod needs the manual sync.
- Emergency in prod only (auto-sync is off there): `argocd app rollback faiss-prod <history-id>`, then bring git back in line.
- Migrations only move forward. Rolling back the image does not roll back the schema, so each release's migrations must stay compatible with the previous image.
- Knowledge corpus: each corpus version has its own OpenSearch index, so an older image reads its older index.
- Infrastructure: `git revert` + `terraform apply`. Deletion protection and Object Lock intentionally block destructive rollbacks.

## Placeholders to replace

Search for `REPLACE_ME` and `000000000000`; every occurrence is a placeholder.

| Where | What |
|---|---|
| `deploy/argocd/clusters/*/*.yaml`, `deploy/argocd/bootstrap/values.yaml` | `https://github.com/REPLACE_ME/faiss.git` (both AppProjects, all three Applications, the bootstrap default) |
| `envs/*/backend.hcl.example` | state bucket, KMS key ARN, optional lock table |
| `envs/*/terraform.tfvars.example` | account IDs, `opensearch_endpoint`, `opensearch_arn`, `github_repository`, `github_oidc_provider_arn`, `gitops_repo_url`, `argocd_hostname`, private-API CIDRs; prod also `audit_retention_days` and `audit_object_lock_mode` |
| `values-<env>.yaml` | `image.registry`, `publicHost`, `config.litellm.baseUrl`, `config.opensearch.url`, `config.oidc.*` (tenant ID, API audience), `web.oidc.clientId` / `scope`, `config.documentsBucket`, `database.host`, `externalSecrets.migrateDatabase.remoteKey`, `ingress.certificateArn`, `ingress.inboundCidrs`, `networkPolicy.egress.{opensearch,litellm}.cidrs` |
| `values-<env>.yaml` `image.tag` | `"0.0.0"` until the first release PR; do not edit by hand |
| GitHub repository variables | `AWS_REGION`, `ECR_REGISTRY`, `AWS_ECR_PUSH_ROLE_ARN` |

## Assumptions and decisions to review

- **Region** `af-south-1` for data residency; it is a variable, and changing it moves every data store.
- **Staging shares the non-production cluster** with dev (separate namespace, database, buckets, secrets, roles). There is no `envs/staging`; add `staging` to another stack's `app_environments` to move it.
- **ECR lives in the non-production account**; prod pulls cross-account (`ecr_pull_account_ids`). The CI push role trusts only `refs/heads/main` of `github_repository`.
- **EKS Pod Identity**, not IRSA. The backend needs an AWS SDK that supports it (boto3 >= 1.34.41; the image pins >= 1.35).
- **OpenSearch is not created.** Workload roles get `es:ESHttp*` on the domain ARN (search for api/worker, read-write for ingest) or `aoss:APIAccessAll` on the collection. Access is not narrowed to an index: the backend uses root paths such as `/_bulk`.
- **No Bedrock permissions anywhere**; all model traffic is addressed to the LiteLLM gateway.
- **Database credentials**: the migrate Job uses the RDS-managed master secret (rotated by RDS); the application uses its own role from `faiss/<env>/database`. IAM database authentication is enabled on the cluster but unused, because the backend takes a password URL. `?ssl=require` is appended to the URL and the cluster rejects non-TLS connections.
- **Secret rotation**: External Secrets refreshes hourly, but pods read secrets as environment variables and need a restart to pick up a new value.
- **Encryption**: one customer-managed KMS key per concern (logs, EKS secrets, node volumes, each database, each environment's buckets, ECR, Secrets Manager). The bucket policy rejects uploads that send `aws:kms` without naming that key.
- **Audit archive**: created with Object Lock, the worker role may only `PutObject` to it, but no backend setting points at it yet. Retention and mode have no production default on purpose.
- **Documents bucket**: Object Lock enabled in prod (legal holds possible), off in dev; no delete permission for the workloads; no key prefix restriction (`documents_key_prefix`).
- **TLS** terminates at the internal ALB (ACM). ALB -> pod and web -> api are plain HTTP inside the VPC / cluster. End-to-end TLS would need application or mesh support.
- **NetworkPolicy** is CIDR-based. OIDC egress is "any public address on 443" because Entra ID has no stable ranges; narrow it if there is an egress proxy. In-VPC rules use each stack's default CIDR (`10.40.0.0/16`, `10.50.0.0/16`).
- **Worker**: one replica, `Recreate` strategy, no probes. Raise `worker.replicaCount` only if the scheduler is safe to run concurrently.
- **Pods** run as UID 10001 with a read-only root filesystem and an `emptyDir` at `/tmp`; `HOME=/tmp`. The web image must work under that UID.
- **Argo CD**: Dex and notifications disabled, no ingress, local admin account still enabled. Wire SSO through `argocd_extra_values` and disable the admin account. Repository credentials come from `faiss/<stack>/argocd-repo`.
- **Not included**: node autoscaling (Karpenter / cluster-autoscaler), external-dns, WAF, Prometheus/Grafana, backup of cluster state, Temporal. PRs opened by `release.yml` use `GITHUB_TOKEN`, which does not trigger `ci.yml` on them; use a GitHub App token if branch protection requires checks.
- **Versions pinned** (checked against the registries on 2026-11-23): AWS provider 6.73.0, Helm provider 3.3.0, modules vpc 6.8.0 / eks 21.30.2 / eks-pod-identity 2.11.0, charts argo-cd 10.18.2 / aws-load-balancer-controller 3.6.3 / external-secrets 2.15.0, EKS 1.36, Aurora PostgreSQL 17.4 (confirm it is still offered in the region), Helm 4.3.2 (the version Argo CD 3.6.2 bundles).
