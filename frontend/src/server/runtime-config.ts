/**
 * Configuration the browser needs, read from the environment on every request so one image
 * serves every environment. Nothing here is a secret: it is sent to the browser.
 */
export interface RuntimeConfig {
  authMode: "dev" | "oidc";
  oidc: { authority: string; clientId: string; scope: string };
}

export function readRuntimeConfig(): RuntimeConfig {
  const env = process.env;
  return {
    authMode: env.FAISS_AUTH_MODE === "oidc" ? "oidc" : "dev",
    oidc: {
      authority: env.FAISS_OIDC_AUTHORITY ?? "",
      clientId: env.FAISS_OIDC_CLIENT_ID ?? "",
      scope: env.FAISS_OIDC_SCOPE || "openid profile email",
    },
  };
}
