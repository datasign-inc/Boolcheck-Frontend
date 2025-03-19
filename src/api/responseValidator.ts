import {
  AuthState,
  Claim,
  ClaimBeforeCommit,
  Claimer,
  ClaimerBeforeCommit,
  CommentDeletion,
  NewClaim,
  UrlContent,
  UrlMetadata,
  VerifiableClaim,
  VerifiableClaimer,
} from "./types.ts";
import { objectToCamel } from "ts-case-convert";

export const processUrlContent = (data: unknown): UrlContent[] => {
  // todo: improve validation process
  const tmp = data as unknown[];
  const result: UrlContent[] = [];
  for (const elm of tmp) {
    result.push(processSingleUrlContent(elm));
  }
  return result;
};
export const processUrlMetadataContent = (data: unknown): UrlMetadata => {
  return objectToCamel(data as object) as UrlMetadata;
};
export const processSingleUrlContent = (data: unknown): UrlContent => {
  // todo: improve validation process
  return objectToCamel(data as object) as UrlContent;
};
export const processVerifiableClaims = (data: unknown): VerifiableClaim[] => {
  // todo: improve validation process
  return (data as object[]).map((tmp) => {
    return processSingleVerifiableClaim(tmp);
  });
};
export const processSingleVerifiableClaim = (
  data: unknown
): VerifiableClaim => {
  // todo: improve validation process
  const tmp = objectToCamel(data as object) as Claim;
  const claimer = tmp.claimer as Claimer;
  return new VerifiableClaim(
    (data as Claim).id,
    (data as Claim).url,
    new VerifiableClaimer(
      claimer.id,
      claimer.idToken,
      claimer.icon,
      claimer.organization
    ),
    (data as Claim).comment
  );
};
export const processRelayResponseCodeData = (
  data: unknown
): ClaimBeforeCommit | CommentDeletion => {
  const tmp = objectToCamel(data as object);
  if (
    typeof data === "object" &&
    data !== null &&
    Object.keys(data).length === 0
  ) {
    return { type: "delete_comment", value: {} };
  } else {
    return {
      type: "post_comment",
      value: tmp as {
        url: UrlContent;
        claimer: ClaimerBeforeCommit;
        comment: string;
      },
    };
  }
};

export const processVerifiableClaimer = (data: unknown): VerifiableClaimer => {
  // todo: improve validation process
  const tmp = objectToCamel(data as object) as Claimer;
  return new VerifiableClaimer(tmp.id, tmp.idToken, tmp.icon, tmp.organization);
};
export const processAuthReq = (data: unknown): string => {
  // todo: improve validation process
  return (data as { value: string }).value;
};
export const processAuthState = (data: unknown): AuthState => {
  return data as AuthState;
};

export const processNewClaim = (data: unknown): NewClaim => {
  // todo: improve validation process
  const tmp = data as { id?: string; claim_id?: string };
  return {
    id: (tmp.claim_id || tmp.id) as string,
  };
};
