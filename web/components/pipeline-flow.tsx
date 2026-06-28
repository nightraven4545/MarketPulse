import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { PIPELINE_STAGES } from "@/lib/data/localization";
import { BLUE, TEAL } from "@/lib/colors";

export function PipelineFlow() {
  return (
    <div>
      <div className="flex flex-wrap items-stretch gap-2">
        {PIPELINE_STAGES.map((s, i) => (
          <Fragment key={s.label}>
            <div
              className="min-w-[150px] flex-1 rounded-lg p-3 text-center text-xs text-white"
              style={{ background: s.kind === "global" ? BLUE : TEAL }}
            >
              <b className="block text-[13.5px]">{s.label}</b>
              {s.detail}
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <div className="flex items-center px-1 text-muted-foreground">
                <ChevronRight className="size-5" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm" style={{ background: BLUE }} />
          Global — build once (~80% of code)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm" style={{ background: TEAL }} />
          Localized edge — Market Pack (~20%)
        </span>
      </div>
    </div>
  );
}
