import { createClient } from "next-sanity";

export const apiVersion = "2025-03-02";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET" 
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "34k7ur8u",
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const serverToken = process.env.SANITY_SERVER_TOKEN;
export const browserToken = process.env.NEXT_PUBLIC_SANITY_BROWSER_TOKEN;

export const serverClient = serverToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: serverToken,
    })
  : null;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: browserToken,
});

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (!v) {
    throw new Error(errorMessage);
  }
  return v;
}
