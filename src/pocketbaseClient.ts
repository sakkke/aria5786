import PocketBase from "pocketbase";

export const pocketbaseRedirectUrl = import.meta.env.PUBLIC_POCKETBASE_REDIRECT_URL;
export const pocketbaseUrl = import.meta.env.PUBLIC_POCKETBASE_URL;

export const client = new PocketBase(pocketbaseUrl);
