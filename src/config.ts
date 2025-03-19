export const mediaQuery = "(min-width:700px)";

// todo: 環境変数から取得する
export const bunsinWalletUrl =
  "https://apps.apple.com/jp/app/bunsin-wallet/id6739558008";

export const boolcheckPrivacyPolicy =
  import.meta.env.VITE_BOOLCHECK_PRIVACY_POLICY ||
  "https://boolcheck.com/privacy/index.html";
export const boolcheckTermsOfService =
  import.meta.env.VITE_BOOLCHECK_TOS || "https://boolcheck.com/tos/index.html";
export const boolcheckCertificateIssuancePolicy =
  import.meta.env.VITE_BOOLCHECK_CREDENTIAL_ISSUANCE_PRIVACY_POLICY ||
  "https://boolcheck.com/privacy/credential-issuance.html";

export const backendUrls = {
  app: import.meta.env.VITE_APP_URL || "https://app.develop.boolcheck.com",
  verifier:
    import.meta.env.VITE_BACKEND_VERIFIER_URL ||
    "https://verifier.develop.boolcheck.com",
  node:
    import.meta.env.VITE_BACKEND_NODE_URL ||
    "https://node.develop.boolcheck.com",
  api:
    import.meta.env.VITE_BACKEND_API_URL || "https://api.develop.boolcheck.com",
};

export type BackendAvailableMethod = "get" | "post" | "delete";

const urlMapping = {
  get: {
    // api
    "/database/urls": backendUrls.api,
    "/database/claimers": backendUrls.api,
    "/database/claims": backendUrls.api,
    // verifier
    "/oid4vp/comment/states": backendUrls.verifier,
  },
  post: {
    // node
    "/database/urls": backendUrls.node,
    "/database/claims": backendUrls.node, // 未使用
    // verifier
    "/oid4vp/auth-request": backendUrls.verifier,
    "/oid4vp/response-code/exchange": backendUrls.verifier, // 未使用
    "/oid4vp/comment/confirm": backendUrls.verifier,
    "/oid4vp/comment/cancel": backendUrls.verifier,
  },
  delete: {
    // node
    "/database/claims": backendUrls.node, // 未使用
  },
};

const removeTrailingSlash = (url: string): string => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const getBackendUrl = (path: string, method: BackendAvailableMethod) => {
  const pathMapping = urlMapping[method];
  for (const [prefix, url] of Object.entries(pathMapping)) {
    if (path.startsWith(prefix)) {
      return `${removeTrailingSlash(url)}${path}`;
    }
  }

  return `${removeTrailingSlash(backendUrls.api)}${path}`;
};
