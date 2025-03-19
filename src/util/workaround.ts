import { VerifiableClaim } from "../api/types.ts";

export const workaroundUniqueClaims = (comments: VerifiableClaim[]) => {
  // see https://www.notion.so/165bfe3b5023808e93a7c25c13f879de?pvs=4#166bfe3b502380c18b12f4ea12c8cb38
  const seen = new Set<string>();
  return comments.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
};
