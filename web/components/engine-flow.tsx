import { Fragment } from "react";
import { ENGINE_STEPS } from "@/lib/data/roadmap";
import { cn } from "@/lib/utils";

export function EngineFlow() {
  return (
    <div className="flex flex-wrap items-center gap-0">
      {ENGINE_STEPS.map((s, i) => (
        <Fragment key={s.n}>
          <div
            className={cn(
              "min-w-[130px] flex-1 rounded-lg border-2 p-3 text-center text-xs",
              s.n === 3 ? "border-accent" : s.n === 5 ? "border-[#385723]" : "border-primary"
            )}
          >
            <b className="block text-[13px] text-primary">
              {s.n} · {s.label}
            </b>
            {s.detail}
          </div>
          {i < ENGINE_STEPS.length - 1 && (
            <div className="px-1.5 text-lg font-bold text-muted-foreground">›</div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
