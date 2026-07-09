/**
 * Removes legacy portfolio company documents from Sanity after the copy update.
 * Run via scripts/import-seeds.sh or: node scripts/cleanup-legacy-companies.js [dataset]
 */
const { createClient } = require("@sanity/client");

const LEGACY_COMPANY_IDS = [];

async function main() {
  if (LEGACY_COMPANY_IDS.length === 0) {
    console.log("No legacy company documents configured for cleanup.");
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.argv[2] || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN;

  if (!projectId) {
    console.log("Skipping legacy company cleanup: NEXT_PUBLIC_SANITY_PROJECT_ID is not set.");
    return;
  }

  if (!token) {
    console.log(
      "Skipping legacy company cleanup: set SANITY_AUTH_TOKEN (or SANITY_API_TOKEN) with write access.",
    );
    return;
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-06-15",
    token,
    useCdn: false,
  });

  for (const id of LEGACY_COMPANY_IDS) {
    try {
      await client.delete(id);
      console.log(`Deleted ${id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("not found") || message.includes("404")) {
        console.log(`Already absent: ${id}`);
      } else {
        console.warn(`Could not delete ${id}: ${message}`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
