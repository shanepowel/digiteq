"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DealStage } from "@prisma/client";
import { dealStageLabels } from "@/lib/constants";

export function DealStageForm({
  dealId,
  currentStage,
  stages,
}: {
  dealId: string;
  currentStage: DealStage;
  stages: DealStage[];
}) {
  const router = useRouter();
  const [stage, setStage] = useState(currentStage);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/pipeline/${dealId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <select
        value={stage}
        onChange={(e) => setStage(e.target.value as DealStage)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-white"
      >
        {stages.map((item) => (
          <option key={item} value={item}>
            {dealStageLabels[item]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-cyan/10 px-3 py-2 text-sm font-medium text-cyan hover:bg-cyan/20 disabled:opacity-50"
      >
        {saving ? "saving…" : "update stage"}
      </button>
    </form>
  );
}
