// MarketPulse graded deliverables — files live in web/public/deliverables/.
// ValueForge deck/PRD are intentionally excluded (see project scope).

export type Deliverable = {
  badge: string;
  title: string;
  description: string;
  file: string; // path under /deliverables
  kind: "pdf" | "office";
  meta: string;
};

export const DELIVERABLES: Deliverable[] = [
  {
    badge: "Deliverable A",
    title: "Executive Presentation",
    description:
      "Market-entry sequencing, pricing & packaging, and the standardization↔localization trade-off — with embedded data-viz, quantification, and decision science.",
    file: "/deliverables/DeliverableA_Executive_Presentation.pptx",
    kind: "office",
    meta: "PowerPoint · 17 slides · rich data-viz",
  },
  {
    badge: "Deliverable A",
    title: "Executive Presentation (PDF)",
    description: "The flattened, read-anywhere version of the executive deck.",
    file: "/deliverables/DeliverableA_Executive_Presentation.pdf",
    kind: "pdf",
    meta: "PDF · 14 slides",
  },
  {
    badge: "Deliverable B",
    title: "Commercial Architecture",
    description:
      "8-tab workbook with live formulas mapping product tiers × localized features × monetization across prioritized markets — plus the decision engine.",
    file: "/deliverables/DeliverableB_Commercial_Architecture.xlsx",
    kind: "office",
    meta: "Excel · 8 tabs · live formulas",
  },
  {
    badge: "Deliverable C",
    title: "ARR Model",
    description:
      "The bottoms-up ARR model as a spreadsheet with live formulas. Base case ≈ $9.2M Y3 / $28M Y5. (The interactive version lives on the ARR Model page.)",
    file: "/deliverables/DeliverableC_ARR_Model.xlsx",
    kind: "office",
    meta: "Excel · live formulas",
  },
  {
    badge: "Supporting",
    title: "Consulting Strategy Memo",
    description:
      "McKinsey/BCG-style narrative — SCQA, Pyramid Principle, 3C, Porter, Ansoff, value chain, GE-McKinsey, risk register, 90-day plan.",
    file: "/deliverables/MarketPulse_Strategy_Memo.docx",
    kind: "office",
    meta: "Word document",
  },
  {
    badge: "One-pager",
    title: "Judge's Cheat Sheet",
    description: "The entire story on a single page — the fast path to the recommendation.",
    file: "/deliverables/MarketPulse_Judges_CheatSheet.pdf",
    kind: "pdf",
    meta: "PDF · 1 page",
  },
];
