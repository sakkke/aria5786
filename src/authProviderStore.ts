import { persistentAtom } from "@nanostores/persistent";

export const authProvider = persistentAtom<any | null>('provider', null, {
  encode: JSON.stringify,
  decode: JSON.parse
});
