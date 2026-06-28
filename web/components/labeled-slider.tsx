"use client";

import { Slider } from "@/components/ui/slider";

export function LabeledSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground/80">{label}</span>
        <span className="font-semibold text-primary">{format(value)}</span>
      </div>
      <Slider
        className="mt-2.5"
        value={[value]}
        onValueChange={(v) => onChange((v as number[])[0])}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
