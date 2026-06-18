import type { DealStage } from "@prisma/client";

export const dealStageLabels: Record<DealStage, string> = {
  NEW: "new",
  REVIEWING: "reviewing",
  DILIGENCE: "diligence",
  PASSED: "passed",
  ACQUIRED: "acquired",
};

export const dealStages: DealStage[] = [
  "NEW",
  "REVIEWING",
  "DILIGENCE",
  "PASSED",
  "ACQUIRED",
];
