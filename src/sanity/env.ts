export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

export const useCdn = process.env.NODE_ENV === "production";

/** When true or when projectId is placeholder, public pages use local seed data. */
export function useSeedFallback() {
  return (
    process.env.USE_SEED_FALLBACK === "true" ||
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "placeholder"
  );
}
