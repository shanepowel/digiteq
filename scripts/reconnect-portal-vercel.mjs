#!/usr/bin/env node
/**
 * Reconnect digiteqapp Vercel project to shanepowel/digiteq (apps/portal)
 * and trigger a production deployment from main.
 *
 * Usage:
 *   VERCEL_TOKEN=... node scripts/reconnect-portal-vercel.mjs
 *
 * Optional:
 *   VERCEL_TEAM_ID=team_IHWxUj2cbcDUdNNfcXE8BroH
 *   VERCEL_PROJECT_ID=prj_WaVDsv1bh3ZjUXbdaBRyhEwV5Hdi
 *   GITHUB_REPO=shanepowel/digiteq
 *   ROOT_DIRECTORY=apps/portal
 *   GIT_REF=main
 */

const TEAM_ID = process.env.VERCEL_TEAM_ID ?? "team_IHWxUj2cbcDUdNNfcXE8BroH";
const PROJECT_ID =
  process.env.VERCEL_PROJECT_ID ?? "prj_WaVDsv1bh3ZjUXbdaBRyhEwV5Hdi";
const PROJECT_NAME = process.env.VERCEL_PROJECT_NAME ?? "digiteqapp";
const GITHUB_REPO = process.env.GITHUB_REPO ?? "shanepowel/digiteq";
const ROOT_DIRECTORY = process.env.ROOT_DIRECTORY ?? "apps/portal";
const GIT_REF = process.env.GIT_REF ?? "main";
const TOKEN = process.env.VERCEL_TOKEN;

if (!TOKEN) {
  console.error("Missing VERCEL_TOKEN. Create one at https://vercel.com/account/tokens");
  process.exit(1);
}

const [gitOrg, gitRepo] = GITHUB_REPO.split("/");
if (!gitOrg || !gitRepo) {
  console.error(`Invalid GITHUB_REPO: ${GITHUB_REPO}`);
  process.exit(1);
}

const baseUrl = `https://api.vercel.com`;
const teamQuery = `teamId=${TEAM_ID}`;

async function vercel(path, { method = "GET", body } = {}) {
  const url = `${baseUrl}${path}${path.includes("?") ? "&" : "?"}${teamQuery}`;
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data && "error" in data
        ? data.error?.message ?? JSON.stringify(data)
        : String(data);
    throw new Error(`${method} ${path} failed (${response.status}): ${message}`);
  }

  return data;
}

async function main() {
  console.log(`Updating project ${PROJECT_NAME} (${PROJECT_ID})...`);

  await vercel(`/v9/projects/${PROJECT_ID}`, {
    method: "PATCH",
    body: {
      framework: "nextjs",
      rootDirectory: ROOT_DIRECTORY,
      installCommand: "npm install --legacy-peer-deps",
      buildCommand: "npm run build",
      nodeVersion: "24.x",
      sourceFilesOutsideRootDirectory: true,
    },
  });
  console.log("Project settings updated (rootDirectory, build/install commands).");

  try {
    await vercel(`/v9/projects/${PROJECT_ID}/link`, { method: "DELETE" });
    console.log("Disconnected stale Git repository.");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("404")) {
      console.log("No existing Git link to disconnect.");
    } else {
      throw error;
    }
  }

  await vercel(`/v9/projects/${PROJECT_ID}/link`, {
    method: "POST",
    body: {
      type: "github",
      repo: GITHUB_REPO,
    },
  });
  console.log(`Connected GitHub repository ${GITHUB_REPO}.`);

  const deployment = await vercel(`/v13/deployments`, {
    method: "POST",
    body: {
      name: PROJECT_NAME,
      project: PROJECT_ID,
      target: "production",
      gitSource: {
        type: "github",
        org: gitOrg,
        repo: gitRepo,
        ref: GIT_REF,
      },
      projectSettings: {
        framework: "nextjs",
        rootDirectory: ROOT_DIRECTORY,
        installCommand: "npm install --legacy-peer-deps",
        buildCommand: "npm run build",
        nodeVersion: "24.x",
        sourceFilesOutsideRootDirectory: true,
      },
    },
  });

  console.log("Production deployment triggered.");
  console.log(`  id:  ${deployment.id}`);
  console.log(`  url: https://${deployment.url ?? deployment.alias?.[0] ?? "vercel.com"}`);
  console.log(`  app: https://app.digiteq.io`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
