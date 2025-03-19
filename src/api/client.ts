import {
  AuthState,
  PostError,
  Result,
  UrlContent,
  UrlMetadata,
  UrlSortKey,
  VerifiableClaim,
  VerifiableClaimer,
} from "./types.ts";
import { getBackendUrl } from "../config.ts";
import { isUrlEqual } from "../util/url.ts";

import {
  processAuthReq,
  processAuthState,
  processRelayResponseCodeData,
  processNewClaim,
  processSingleUrlContent,
  processSingleVerifiableClaim,
  processUrlContent,
  processUrlMetadataContent,
  processVerifiableClaimer,
  processVerifiableClaims,
} from "./responseValidator.ts";

const fetchData = async <T>(
  path: string,
  dataProcessor: (data: unknown) => T,
  credentials: "omit" | "include" | "same-origin" = "omit"
): Promise<Result<T, string>> => {
  try {
    const response = await fetch(getBackendUrl(path, "get"), {
      method: "GET",
      credentials: credentials,
    });
    if (!response.ok) {
      return {
        isSuccess: false,
        error: `unexpected response: code=${response.status}`,
      };
    }
    if (response.status === 204) {
      return {
        isSuccess: true,
        value: dataProcessor({}),
      };
    }
    const data = await response.json();
    return {
      isSuccess: true,
      value: dataProcessor(data),
    };
  } catch (error) {
    console.log(`unexpected error "${error}" occurred while accessing ${path}`);
    return {
      isSuccess: false,
      error: `unexpected error occurred: ${error}`,
    };
  }
};

const postData = async <T>(
  path: string,
  data: object,
  dataProcessor: (data: unknown) => T,
  credentials: "omit" | "include" | "same-origin" = "omit"
): Promise<Result<T, PostError>> => {
  try {
    const response = await fetch(getBackendUrl(path, "post"), {
      method: "POST",
      credentials: credentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 409) {
        const body = await response.json();
        return {
          isSuccess: false,
          error: { message: "Conflict", detail: { instance: body.instance } },
        };
      }
      return {
        isSuccess: false,
        error: { message: `unexpected response: code=${response.status}` },
      };
    }

    if (response.status === 204) {
      return {
        isSuccess: true,
        value: dataProcessor({}),
      };
    }

    const responseData = await response.json();

    return {
      isSuccess: true,
      value: dataProcessor(responseData),
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: { message: `unexpected error occurred: ${error}` },
    };
  }
};

export const fetchAuthReqUriForCommentDeletion = async (claimId: string) => {
  const data = {
    type: "delete_comment",
    id: claimId,
  };
  return await postData(
    "/oid4vp/auth-request",
    data,
    processAuthReq,
    "include"
  );
};

export const fetchAuthReqUriForCommentSubmission = async (
  url: string,
  comment: string,
  boolValue: number
) => {
  const data = {
    type: "post_comment",
    url: url,
    comment: comment,
    bool_value: boolValue,
    boolValue: boolValue, // workaround
  };
  return await postData(
    "/oid4vp/auth-request",
    data,
    processAuthReq,
    "include"
  );
};

export const registerUrl = async (url: string) => {
  const data = {
    url: url,
  };
  return await postData("/database/urls", data, processSingleUrlContent);
};

export const fetchAuthState = (): Promise<Result<AuthState, string>> => {
  return fetchData("/oid4vp/comment/states", processAuthState, "include");
};

export const cancelClaim = () => {
  return postData(
    "/oid4vp/comment/cancel",
    {},
    (_x: unknown) => {
      return null;
    },
    "include"
  );
};

export const confirmClaim = () => {
  return postData("/oid4vp/comment/confirm", {}, processNewClaim, "include");
};

export const relayResponseCode = (type: string, responseCode: string) => {
  const params: Record<string, string> = {};
  params.type = encodeURIComponent(type);
  params.response_code = encodeURIComponent(responseCode);
  const queryString = new URLSearchParams(params).toString();

  return postData(
    `/oid4vp/response-code/exchange?${queryString}`,
    {},
    processRelayResponseCodeData,
    "include"
  );
};

export const fetchUrls = (
  filter?: string,
  startDate?: string,
  sort?: UrlSortKey
): Promise<Result<UrlContent[], string>> => {
  const params: Record<string, string> = {};
  if (filter !== undefined) params.filter = filter;
  if (startDate !== undefined) params.start_date = startDate;
  if (sort !== undefined) params.sort = sort;
  const queryString = new URLSearchParams(params).toString();
  const path = `/database/urls${queryString ? `?${queryString}` : ""}`;
  return fetchData(path, processUrlContent);
};

export const fetchUrlMetadata = async (
  id: string
): Promise<Result<UrlMetadata, string>> => {
  const path = `/database/urls/${id}/metadata`;
  const result = await fetchData(path, processUrlMetadataContent);
  if (!result.isSuccess) {
    return result;
  }
  return {
    isSuccess: true,
    value: result.value,
  };
};

export const fetchUrlByUrl = async (
  url: string
): Promise<Result<UrlContent, string>> => {
  // This function is intended to be used from an browser extension feature.
  const result = await fetchUrls(url);
  if (!result.isSuccess) {
    return result;
  }
  for (const urlObject of result.value) {
    const reportedUrl = urlObject.url;
    if (isUrlEqual(reportedUrl, url)) {
      return {
        isSuccess: true,
        value: urlObject,
      };
    }
  }
  return {
    isSuccess: false,
    error: `No matching URLs were found. number of reports : ${result.value.length}`,
  };
};

export const fetchUrlById = (
  urlUuid: string
): Promise<Result<UrlContent, string>> => {
  return fetchData(`/database/urls/${urlUuid}`, processSingleUrlContent);
};

export const fetchClaimsByUrlId = (
  urlUuid: string
): Promise<Result<VerifiableClaim[], string>> => {
  return fetchData(`/database/urls/${urlUuid}/claims`, processVerifiableClaims);
};

export const fetchClaimById = (
  claimUuid: string
): Promise<Result<VerifiableClaim, string>> => {
  return fetchData(
    `/database/claims/${claimUuid}`,
    processSingleVerifiableClaim
  );
};

export const fetchClaimerInfo = (
  id: string
): Promise<Result<VerifiableClaimer, string>> => {
  return fetchData(`/database/claimers/${id}`, processVerifiableClaimer);
};

export const fetchClaimsByClaimerId = (
  id: string
): Promise<Result<VerifiableClaim[], string>> => {
  return fetchData(`/database/claimers/${id}/claims`, processVerifiableClaims);
};
