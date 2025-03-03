import { defineLive } from "next-sanity";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: "2024-03-01", // Use a valid API version
  }),
  serverToken: process.env.SANITY_SERVER_TOKEN, // Enables live drafts (optional)
  browserToken: process.env.NEXT_PUBLIC_SANITY_BROWSER_TOKEN, // Enables client-side draft previews (optional)
});
