import { decodeSdJwt, getClaims } from "@sd-jwt/decode";
import { decodeJwt } from "jose";
import * as jsrsasign from "jsrsasign";

const isBrowser = () => {
  return (
    typeof window !== "undefined" && typeof window.document !== "undefined"
  );
};

const importDigestDependOnEnv = async () => {
  if (isBrowser()) {
    const { digest } = await import("@sd-jwt/crypto-browser");
    return digest;
  } else {
    const { digest } = await import("@sd-jwt/crypto-nodejs");
    return digest;
  }
};

type CredentialType = "jwt_vc_json" | "vc+sd-jwt";

const isExpectedCredentialStructure = (
  value: unknown
): value is { [key: string]: string } => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return Object.keys(value).every(
    (key) =>
      typeof key === "string" &&
      typeof (value as { [key: string]: unknown })[key] === "string"
  );
};

const isStringArray = (value: unknown): value is string[] => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
};

export type VerifyResult =
  | "valid"
  | "expired"
  | "violateNbf"
  | "unsupportedCredential"
  | "invalidSignature"
  | "broken";

export interface IssuerInfo {
  issuerName: string; // subject O
  issuerLocality: string; // subject L
  issuerState: string; // subject ST
  issuerNationality: string; // subject C
  issuerAuthenticator: string; // issuer commonName
  issuerUrl: string; // jwt iss
}

const parseIssuerInfoFromX509Certificate = (
  certificate: string
): Omit<IssuerInfo, "issuerUrl"> | undefined => {
  try {
    const parser = new jsrsasign.X509();
    parser.readCertPEM(certificate);
    const issuerInfo = parser.getSubject();
    const issuerAuthenticator = parser.getIssuer();
    const result = {
      issuerName: "Unknown",
      issuerAddress: "Unknown",
      issuerNationality: "Unknown",
      issuerLocality: "Unknown",
      issuerState: "Unknown",
      issuerAuthenticator: "Unknown",
    };

    for (const distinguishNames of issuerAuthenticator.array) {
      for (const dn of distinguishNames) {
        const type = dn.type;
        const value = dn.value;
        switch (type) {
          case "CN": {
            result.issuerAuthenticator = value;
            console.log(`issuerAuthenticator ${value}`);
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    for (const distinguishNames of issuerInfo.array) {
      for (const dn of distinguishNames) {
        const type = dn.type;
        const value = dn.value;
        switch (type) {
          case "O": {
            result.issuerName = value;
            break;
          }
          case "C": {
            result.issuerNationality = value;
            break;
          }
          case "L": {
            result.issuerLocality = value;
            break;
          }
          case "ST": {
            result.issuerState = value;
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    return result;
  } catch {
    return undefined;
  }
};

interface Verifier {
  verify(): VerifyResult;
}

export class IdTokenVerifier implements Verifier {
  constructor(public idToken: string) {}

  verify(): VerifyResult {
    //todo: implement validation process
    return "valid";
  }

  getSub(): string {
    try {
      const decoded = decodeJwt(this.idToken);
      return decoded.sub!;
    } catch (error) {
      console.log(
        `unable to get sub value from id_token : ${JSON.stringify(
          this.idToken
        )}`
      );
      throw error;
    }
  }
}

export class CredentialVerifier implements Verifier {
  cache: { [key: string]: string } | undefined;

  constructor(
    public credentialType: CredentialType,
    public credential: string | null
  ) {
    this.cache = undefined;
  }

  verify(): VerifyResult {
    if (!this.credential) {
      return "broken";
    }
    switch (this.credentialType) {
      case "jwt_vc_json": {
        // todo: implement!
        return "valid";
      }
      case "vc+sd-jwt": {
        // todo: implement!
        return "valid";
      }
      default: {
        return "unsupportedCredential";
      }
    }
  }

  async getIssuerInfo(): Promise<IssuerInfo | undefined> {
    // 別途 `verify` を実行することによって `credential` が検証済みであるべきです。
    if (!this.credential) {
      return undefined;
    }
    switch (this.credentialType) {
      case "jwt_vc_json": {
        // todo: implement!
        return undefined;
      }
      case "vc+sd-jwt": {
        const digest = await importDigestDependOnEnv();
        const decodedSdJwt = await decodeSdJwt(this.credential, digest);
        const header = decodedSdJwt.jwt.header;
        const x5c = header?.x5c;

        const issuerUrl = decodedSdJwt.jwt.payload.iss as string;

        if (x5c === undefined || !isStringArray(x5c)) {
          return undefined;
        }
        if ((x5c as string[]).length < 1) {
          return undefined;
        }

        const preAmble = "-----BEGIN CERTIFICATE-----";
        const postAmble = "-----END CERTIFICATE-----";
        const signerCertificate = preAmble + "\n" + x5c[0] + "\n" + postAmble;
        const temp = parseIssuerInfoFromX509Certificate(signerCertificate);
        if (temp === undefined) {
          return undefined;
        }
        return { ...temp, issuerUrl: issuerUrl };
      }
      default: {
        return undefined;
      }
    }
  }

  getRegisteredClaim(claimName: string): unknown | undefined {
    if (!this.credential) {
      return undefined;
    }
    switch (this.credentialType) {
      case "jwt_vc_json": {
        const decoded = decodeJwt(this.credential);
        const value = decoded[claimName];
        return value;
      }
      default:
        return undefined;
    }
  }

  async getApplicationClaims(): Promise<{ [key: string]: string } | undefined> {
    // 別途 `verify` を実行することによって `credential` が検証済みであるべきです。
    if (!this.credential) {
      return undefined;
    }
    if (this.cache !== undefined) {
      return this.cache;
    }
    try {
      switch (this.credentialType) {
        case "jwt_vc_json": {
          const decoded = decodeJwt(this.credential);
          const credentialSubject = (
            decoded?.vc as {
              credentialSubject: {
                [key: string]: unknown;
              };
            }
          )?.credentialSubject;
          // todo: 想定するcredentialSubject に対する適切なvalidationを行う
          const returnValue: { [key: string]: string } = {
            bool_value: `${credentialSubject?.bool_value}`,
            comment: (credentialSubject?.comment ?? "") as string,
            url: (credentialSubject?.url ?? "") as string,
          };
          this.cache = returnValue;
          return returnValue;
        }
        case "vc+sd-jwt": {
          const digest = await importDigestDependOnEnv();
          const decodedSdJwt = await decodeSdJwt(this.credential, digest);
          const claims = (await getClaims(
            decodedSdJwt.jwt.payload,
            decodedSdJwt.disclosures,
            digest
          )) as { [key: string]: unknown };
          const { cnf, iss, iat, exp, vct, ...rest } = claims;
          if (isExpectedCredentialStructure(rest)) {
            const result = rest as { [key: string]: string };
            this.cache = result;
            return result;
          } else {
            console.log(`unexpected credential structure`);
          }
          return undefined;
        }
        default:
          return undefined;
      }
    } catch (error) {
      console.log(`error occurred while decoding credential: ${error}`);
      return undefined;
    }
  }
}
