import {
  CredentialVerifier,
  IdTokenVerifier,
  IssuerInfo,
  VerifyResult,
} from "../vc/verify.ts";
import { IdentityAttribute } from "../components/IdentityAtrributes/IdentityAttributes.tsx";

export type PostStateValue =
  | "started"
  | "consumed"
  | "committed"
  | "expired"
  | "canceled"
  | "invalid_submission";

export interface Success<T> {
  isSuccess: true;
  value: T;
}

export interface Failure<E> {
  isSuccess: false;
  error: E;
}

export type Result<T, E> = Success<T> | Failure<E>;
export type UrlSortKey =
  | "created_at"
  | "-created_at"
  | "-true_count"
  | "-false_count";

export interface PostError {
  message: string;
  detail?: { instance: string };
}

export type Authenticity = -1 | 0 | 1;

export interface AuthState {
  value: PostStateValue;
}

export interface UrlContent {
  id: string;
  url: string;
  domain: string;
  title: string;
  description?: string;
  contentType: string;
  createdAt: string;
  trueCount: number;
  falseCount: number;
  elseCount: number;
  verifiedTrueCount: number;
  verifiedFalseCount: number;
  verifiedElseCount: number;
}

export type UrlMetadata = Pick<
  UrlContent,
  | "id"
  | "url"
  | "domain"
  | "contentType"
  | "title"
  | "createdAt"
  | "description"
>;

export const filledWithZeroCount = (urlMetadata: UrlMetadata): UrlContent => {
  return {
    ...urlMetadata,
    trueCount: 0,
    falseCount: 0,
    elseCount: 0,
    verifiedTrueCount: 0,
    verifiedFalseCount: 0,
    verifiedElseCount: 0,
  } as UrlContent;
};

export interface CountInfo {
  verifiedTrueCount: number;
  verifiedFalseCount: number;
  verifiedElseCount: number;
  anonymousTrueCount: number;
  anonymousFalseCount: number;
  anonymousElseCount: number;
}

export interface Claimer {
  id: string;
  idToken: string;
  icon: string | null;
  organization: string | null;
}

export interface Claim {
  id: string;
  url: UrlContent;
  claimer: Claimer;
  comment: string;
}

export type ClaimerBeforeCommit = Omit<Claimer, "id">;
/*
export interface ClaimBeforeCommit {
  url: UrlContent;
  claimer: ClaimerBeforeCommit;
  comment: string;
}
 */

export type ClaimBeforeCommit = {
  type: "post_comment";
  value: {
    url: UrlContent;
    claimer: ClaimerBeforeCommit;
    comment: string;
  };
};

export type CommentDeletion = {
  type: "delete_comment";
  value: { [key: string]: never };
};

export type OperationTypeForAuth = "post_comment" | "delete_comment";

export interface NewClaim {
  id: string;
}

export class VerifiableClaimer implements Claimer {
  credentialVerifier: CredentialVerifier;
  idTokenVerifier: IdTokenVerifier;
  status: VerifyResult;
  allowUnverified: boolean;
  constructor(
    public id: string,
    public idToken: string,
    public icon: string | null,
    public organization: string | null
  ) {
    this.credentialVerifier = new CredentialVerifier("vc+sd-jwt", organization);
    this.idTokenVerifier = new IdTokenVerifier(idToken);
    this.status = this.credentialVerifier.verify();
    this.allowUnverified = false;
  }

  setAllowUnverified(): void {
    this.allowUnverified = true;
  }

  private async getVerifiedClaim(
    claimName: string
  ): Promise<string | undefined> {
    if (!this.allowUnverified && this.status !== "valid") {
      return undefined;
    }
    try {
      const decoded = await this.credentialVerifier.getApplicationClaims();
      return decoded?.[claimName];
    } catch (e) {
      return undefined;
    }
  }

  get affiliationVcStatus(): VerifyResult {
    return this.status;
  }

  get sub(): string {
    return this.idTokenVerifier.getSub();
  }

  async getVerifiedAllClaims(): Promise<IdentityAttribute[] | undefined> {
    const claims = await this.credentialVerifier.getApplicationClaims();
    if (claims === undefined) {
      return claims;
    }
    return Object.keys(claims).map((key) => {
      const value = claims[key];
      return { title: key, value: value };
    });
  }

  async getCredentialIssuerInfo(): Promise<IssuerInfo | undefined> {
    return this.credentialVerifier.getIssuerInfo();
  }

  async getVerifiedFamilyName(): Promise<string | undefined> {
    return this.getVerifiedClaim("family_name");
  }

  async getVerifiedGivenName(): Promise<string | undefined> {
    return this.getVerifiedClaim("given_name");
  }

  async getVerifiedOrganizationName(): Promise<string | undefined> {
    return this.getVerifiedClaim("organization_name");
  }

  async getVerifiedAvatar(): Promise<string | undefined> {
    return this.getVerifiedClaim("portrait");
  }

  async getVerifiedName(reverse: boolean = false): Promise<string | undefined> {
    const given = await this.getVerifiedGivenName();
    const family = await this.getVerifiedFamilyName();
    if (given === undefined && family === undefined) {
      return undefined;
    }
    if (given == undefined) {
      return family;
    }
    if (family == undefined) {
      return given;
    }
    if (reverse) {
      return `${given} ${family}`;
    }
    return `${family} ${given}`;
  }
}

export class VerifiableClaim implements Claim {
  verifier: CredentialVerifier;
  result: VerifyResult;
  allowUnverified: boolean;
  constructor(
    public id: string,
    public url: UrlContent,
    public claimer: VerifiableClaimer,
    public comment: string
  ) {
    this.verifier = new CredentialVerifier("jwt_vc_json", comment);
    this.result = this.verifier.verify();
    this.allowUnverified = false;
  }

  private async getVerifiedClaim(
    claimName: string
  ): Promise<string | undefined> {
    if (!this.allowUnverified && this.result !== "valid") {
      return undefined;
    }
    try {
      const decoded = await this.verifier.getApplicationClaims();
      return decoded?.[claimName];
    } catch (e) {
      return undefined;
    }
  }

  setAllowUnverified(): void {
    this.allowUnverified = true;
  }

  getTimestamp(): number | undefined {
    const value = this.verifier.getRegisteredClaim("nbf"); // todo: iat などより適当なクレームを追加して使うべき
    if (typeof value === "number") {
      return value as number;
    } else {
      return undefined;
    }
  }

  async getVerifiedClaimText(): Promise<string | undefined> {
    return this.getVerifiedClaim("comment");
  }

  async getVerifiedClaimValue(): Promise<Authenticity | undefined> {
    const value = await this.getVerifiedClaim("bool_value");
    if (value === undefined) {
      return undefined;
    }
    switch (value) {
      case "1":
        return 1;
      case "0":
        return -1;
      case "2":
        return 0;
      default:
        return undefined;
    }
  }
}

export const calculateCount = (urlContent: UrlContent): CountInfo => {
  // todo: Once we start validating responses from the server side, the code below will no longer be necessary.
  const checkTarget = [
    urlContent.verifiedTrueCount,
    urlContent.verifiedFalseCount,
    urlContent.verifiedElseCount,
    urlContent.trueCount,
    urlContent.falseCount,
    urlContent.elseCount,
  ];

  // @ts-expect-error Until the server-side fixes are complete, the properties you expect may not exist.
  if (checkTarget.includes(undefined)) {
    console.log(
      "An expected property does not exist, please check the server side response."
    );
    return {
      verifiedTrueCount: 0,
      verifiedFalseCount: 0,
      verifiedElseCount: 0,
      anonymousTrueCount: 0,
      anonymousFalseCount: 0,
      anonymousElseCount: 0,
    };
  }

  return {
    verifiedTrueCount: urlContent.verifiedTrueCount,
    verifiedFalseCount: urlContent.verifiedFalseCount,
    verifiedElseCount: urlContent.verifiedElseCount,
    anonymousTrueCount: urlContent.trueCount - urlContent.verifiedTrueCount,
    anonymousFalseCount: urlContent.falseCount - urlContent.verifiedFalseCount,
    anonymousElseCount: urlContent.elseCount - urlContent.verifiedElseCount,
  };
};
