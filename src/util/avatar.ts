import Identicon from "identicon.js";
import { KJUR } from "jsrsasign";

export const generateIdenticon = (str: string, size: number): string => {
  const md = new KJUR.crypto.MessageDigest({ alg: "sha256", prov: "cryptojs" });
  md.updateString(str);
  const hashHex = md.digest();

  const identiconData = new Identicon(hashHex, size).toString();
  return `data:image/png;base64,${identiconData}`;
};
