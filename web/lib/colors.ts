// Brand palette — carried over from the original MarketPulse dashboard (docs + dashboard/index.html).
export const NAVY = "#1F3864";
export const BLUE = "#2E5496";
export const TEAL = "#2F9E8F";
export const GREEN = "#385723";
export const AMBER = "#C8860D";
export const GREY = "#8A93A3";
export const RED = "#C0392B";

export const WAVE_COLOR: Record<string, string> = {
  "Wave 1": GREEN,
  "Wave 2": BLUE,
  "Wave 3": AMBER,
  Later: GREY,
};

export const CHART_PALETTE = [NAVY, BLUE, TEAL, GREEN, AMBER, GREY];

export const TOOLTIP_STYLE = {
  borderRadius: 8,
  border: "1px solid #e1e6ee",
  fontSize: 12,
  boxShadow: "0 4px 16px rgba(20,40,80,.08)",
} as const;
