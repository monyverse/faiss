{{- define "faiss.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "faiss.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 50 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 50 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 50 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/* Common labels. Call with the root context. */}}
{{- define "faiss.labels" -}}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
app.kubernetes.io/name: {{ include "faiss.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/part-of: faiss
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/* Selector labels. Call with (dict "root" . "component" "api"). */}}
{{- define "faiss.selectorLabels" -}}
app.kubernetes.io/name: {{ include "faiss.name" .root }}
app.kubernetes.io/instance: {{ .root.Release.Name }}
app.kubernetes.io/component: {{ .component }}
{{- end }}

{{/* All labels for one component. Call with (dict "root" . "component" "api"). */}}
{{- define "faiss.componentLabels" -}}
{{ include "faiss.labels" .root }}
app.kubernetes.io/component: {{ .component }}
{{- end }}

{{/* Image reference. Call with (dict "root" . "repository" <repo>). */}}
{{- define "faiss.image" -}}
{{- $registry := required "image.registry is required (ECR registry host)" .root.Values.image.registry -}}
{{- $tag := required "image.tag is required (written by the release workflow)" .root.Values.image.tag | toString -}}
{{- if eq $tag "latest" -}}
{{- fail "image.tag must be an immutable tag, not \"latest\"" -}}
{{- end -}}
{{- printf "%s/%s:%s" $registry .repository $tag -}}
{{- end }}

{{- define "faiss.publicUrl" -}}
{{- if .Values.config.publicUrl -}}
{{- .Values.config.publicUrl -}}
{{- else -}}
{{- printf "https://%s" (required "publicHost is required" .Values.publicHost) -}}
{{- end -}}
{{- end }}

{{/*
Non-secret backend environment, as a YAML map. Rendered into the ConfigMap and,
for the migrate hook (which runs before the ConfigMap exists), inlined as env.
*/}}
{{- define "faiss.config" -}}
{{- $c := .Values.config -}}
{{- $publicUrl := include "faiss.publicUrl" . -}}
FAISS_ENV: {{ .Values.env | quote }}
FAISS_EMBEDDED_WORKER: "false"
AWS_REGION: {{ .Values.aws.region | quote }}
AWS_DEFAULT_REGION: {{ .Values.aws.region | quote }}
FAISS_PUBLIC_URL: {{ $publicUrl | quote }}
FAISS_CORS_ORIGINS: {{ default $publicUrl $c.corsOrigins | quote }}
FAISS_LITELLM_BASE_URL: {{ $c.litellm.baseUrl | quote }}
FAISS_MODEL_REASONING: {{ $c.models.reasoning | quote }}
FAISS_MODEL_FAST: {{ $c.models.fast | quote }}
FAISS_MODEL_EMBEDDING: {{ $c.models.embedding | quote }}
FAISS_RETRIEVER: {{ $c.retriever | quote }}
FAISS_OPENSEARCH_URL: {{ $c.opensearch.url | quote }}
FAISS_OPENSEARCH_INDEX: {{ $c.opensearch.index | quote }}
FAISS_OPENSEARCH_AUTH: {{ $c.opensearch.auth | quote }}
FAISS_OPENSEARCH_SERVICE: {{ $c.opensearch.service | quote }}
FAISS_AUTH_MODE: {{ $c.authMode | quote }}
FAISS_OIDC_ISSUER: {{ required "config.oidc.issuer is required" $c.oidc.issuer | quote }}
FAISS_OIDC_AUDIENCE: {{ required "config.oidc.audience is required" $c.oidc.audience | quote }}
FAISS_OIDC_JWKS_URL: {{ required "config.oidc.jwksUrl is required" $c.oidc.jwksUrl | quote }}
{{- with $c.oidc.rolesClaim }}
FAISS_OIDC_ROLES_CLAIM: {{ . | quote }}
{{- end }}
{{- with $c.oidc.countriesClaim }}
FAISS_OIDC_COUNTRIES_CLAIM: {{ . | quote }}
{{- end }}
FAISS_DOCUMENTS_BUCKET: {{ $c.documentsBucket | quote }}
{{- if $c.temporal.address }}
FAISS_TEMPORAL_ADDRESS: {{ $c.temporal.address | quote }}
FAISS_TEMPORAL_NAMESPACE: {{ $c.temporal.namespace | quote }}
FAISS_TEMPORAL_TASK_QUEUE: {{ $c.temporal.taskQueue | quote }}
{{- end }}
{{- with $c.otlpEndpoint }}
OTEL_EXPORTER_OTLP_ENDPOINT: {{ . | quote }}
{{- end }}
{{- range $name, $value := $c.extra }}
{{ $name }}: {{ $value | quote }}
{{- end }}
{{- end }}

{{/* Name of the Secret holding the secret backend environment. */}}
{{- define "faiss.envSecretName" -}}
{{- if .Values.externalSecrets.enabled -}}
{{- printf "%s-env" (include "faiss.fullname" .) -}}
{{- else -}}
{{- required "externalSecrets.existingSecret is required when externalSecrets.enabled is false" .Values.externalSecrets.existingSecret -}}
{{- end -}}
{{- end }}

{{- define "faiss.migrateSecretName" -}}
{{- if .Values.externalSecrets.enabled -}}
{{- printf "%s-migrate-env" (include "faiss.fullname" .) -}}
{{- else -}}
{{- required "externalSecrets.migrateExistingSecret is required when externalSecrets.enabled is false" .Values.externalSecrets.migrateExistingSecret -}}
{{- end -}}
{{- end }}

{{/*
FAISS_DATABASE_URL as an External Secrets template. The quoted dbUsername and
dbPassword expressions are emitted literally and resolved by External Secrets,
not by Helm; credentials are URL-escaped there.
*/}}
{{- define "faiss.databaseUrlTemplate" -}}
{{- $db := .Values.database -}}
{{ $db.scheme }}://{{ "{{ .dbUsername | urlquery }}" }}:{{ "{{ .dbPassword | urlquery }}" }}@{{ required "database.host is required (Aurora writer endpoint)" $db.host }}:{{ $db.port }}/{{ $db.name }}{{ with $db.urlParams }}?{{ . }}{{ end }}
{{- end }}

{{/* Variables every container gets: a writable HOME on the /tmp emptyDir. */}}
{{- define "faiss.commonEnv" -}}
- name: HOME
  value: /tmp
{{- end }}

{{- define "faiss.tmpVolume" -}}
- name: tmp
  emptyDir:
    sizeLimit: {{ .Values.tmpVolume.sizeLimit }}
{{- end }}

{{/* Pod-level scheduling fields. Call with (dict "root" . "component" "api"). */}}
{{- define "faiss.scheduling" -}}
{{- with .root.Values.imagePullSecrets }}
imagePullSecrets:
  {{- toYaml . | nindent 2 }}
{{- end }}
{{- with .root.Values.nodeSelector }}
nodeSelector:
  {{- toYaml . | nindent 2 }}
{{- end }}
{{- with .root.Values.tolerations }}
tolerations:
  {{- toYaml . | nindent 2 }}
{{- end }}
{{- if and .root.Values.topologySpread.enabled .spread }}
topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: {{ .root.Values.topologySpread.zoneWhenUnsatisfiable }}
    labelSelector:
      matchLabels:
        {{- include "faiss.selectorLabels" . | nindent 8 }}
  - maxSkew: 1
    topologyKey: kubernetes.io/hostname
    whenUnsatisfiable: ScheduleAnyway
    labelSelector:
      matchLabels:
        {{- include "faiss.selectorLabels" . | nindent 8 }}
{{- end }}
{{- end }}

{{/*
Egress rules for a NetworkPolicy. Call with
(dict "root" . "targets" (list "database" ...) "podIdentity" true "extra" true).
*/}}
{{- define "faiss.egressRules" -}}
{{- $np := .root.Values.networkPolicy -}}
{{- range $name := .targets }}
{{- $target := index $np.egress $name }}
{{- if $target.cidrs }}
# {{ $name }}
- to:
    {{- range $target.cidrs }}
    - ipBlock:
        cidr: {{ . }}
        {{- with $target.except }}
        except:
          {{- toYaml . | nindent 10 }}
        {{- end }}
    {{- end }}
  ports:
    {{- range $target.ports }}
    - protocol: TCP
      port: {{ . }}
    {{- end }}
{{- end }}
{{- end }}
{{- if and .podIdentity $np.podIdentityAgent }}
# EKS Pod Identity agent (node-local credential endpoint)
- to:
    - ipBlock:
        cidr: 169.254.170.23/32
  ports:
    - protocol: TCP
      port: 80
{{- end }}
{{- if and .extra $np.extraBackendEgress }}
{{ toYaml $np.extraBackendEgress }}
{{- end }}
{{- end }}

{{/* The egress field of a NetworkPolicy: the rules above, or an explicit deny-all. */}}
{{- define "faiss.egress" -}}
{{- $rules := include "faiss.egressRules" . | trim -}}
{{- if $rules -}}
egress:
  {{- $rules | nindent 2 }}
{{- else -}}
egress: []
{{- end }}
{{- end }}
