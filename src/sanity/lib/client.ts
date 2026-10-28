import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

// Guard against invalid Vercel env values like empty strings or "latest".
const safeApiVersion =
  apiVersion === "1" || /^\d{4}-\d{2}-\d{2}$/.test(apiVersion)
    ? apiVersion
    : "2025-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: safeApiVersion,
  useCdn,
  stega: {
    studioUrl: "/studio",
  },
});
