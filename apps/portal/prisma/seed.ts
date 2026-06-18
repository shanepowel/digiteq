import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const deals = [
    {
      name: "Acquisition pipeline",
      industry: "Various",
      stage: "REVIEWING" as const,
      source: "seed",
      summary: "Placeholder deal for pipeline UI testing.",
    },
    {
      name: "Niche media newsletter",
      industry: "Newsletter/audience",
      revenueRange: "15,000 to 50,000/month",
      stage: "NEW" as const,
      source: "seed",
      summary: "Inbound from investment form — awaiting first call.",
    },
  ];

  for (const deal of deals) {
    const existing = await prisma.pipelineDeal.findFirst({ where: { name: deal.name } });
    if (!existing) {
      await prisma.pipelineDeal.create({ data: deal });
    }
  }

  const ventures = [
    {
      name: "Digiteq Ventures fund I",
      stage: "Pre-seed to seed",
      status: "Active",
      thesis: "Operator-led checks into digital-first companies with organic demand.",
    },
    {
      name: "Stealth marketplace",
      stage: "Build",
      status: "Stealth",
      thesis: "Two-sided marketplace with documented supply-side moat.",
    },
  ];

  for (const venture of ventures) {
    const existing = await prisma.internalVenture.findFirst({ where: { name: venture.name } });
    if (!existing) {
      await prisma.internalVenture.create({ data: venture });
    }
  }

  const docs = [
    {
      title: "Q1 2026 portfolio update",
      description: "High-level performance summary for LPs. Metrics to be added when available.",
      quarter: "Q1 2026",
    },
    {
      title: "Holdings overview",
      description: "Structure of the Digiteq operating group and portfolio companies.",
      quarter: "Q1 2026",
    },
  ];

  for (const doc of docs) {
    const existing = await prisma.investorDocument.findFirst({ where: { title: doc.title } });
    if (!existing) {
      await prisma.investorDocument.create({ data: doc });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
