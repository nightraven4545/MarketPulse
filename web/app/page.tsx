"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Calculator,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KPIS, HEADLINE_RECOMMENDATIONS } from "@/lib/data/roadmap";

const SECTIONS = [
  {
    href: "/dashboard",
    icon: BarChart3,
    title: "Solution Dashboard",
    body: "Market sequencing, competitive positioning, localization split, pricing & GTM, the 3-wave roadmap.",
  },
  {
    href: "/arr-model",
    icon: Calculator,
    title: "ARR Model",
    body: "Live, bottoms-up ARR build — drag the sliders and watch Year 1–5 revenue, mix, and sensitivity recompute.",
  },
  {
    href: "/decision-science",
    icon: Brain,
    title: "Decision Science",
    body: "A Markov Decision Process for market-entry sequencing, plus a SHAP-style explainer for the scoring rubric.",
  },
  {
    href: "/strategy",
    icon: BookOpen,
    title: "Strategy",
    body: "The full written case: context, assumptions, localization, tiering, pricing, GTM, and methodology.",
  },
  {
    href: "/deliverables",
    icon: FileText,
    title: "Deliverables",
    body: "The graded outputs — executive deck, commercial architecture workbook, strategy memo, cheat sheet.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_-10%,#2e5496_0%,transparent_55%),radial-gradient(circle_at_90%_0%,#2f9e8f_0%,transparent_45%),linear-gradient(135deg,#162a4d,#1f3864)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="border-white/20 bg-white/10 text-[#9ec7e8]">MarketPulse · Solution Visualization</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Ai Palette — Multi-Market Expansion &amp; Monetization Strategy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 max-w-2xl text-balance text-base text-[#cdd9e8] sm:text-lg"
          >
            Moving a monolithic AI-insights platform to a tiered, localizable, repeatably-priced
            product — built to scale across global markets without exploding operational
            complexity. Backed by a Markov Decision Process for sequencing, a SHAP-style
            explainability layer, and a bottoms-up ARR model.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#1f3864] transition-transform hover:-translate-y-0.5"
            >
              Explore the dashboard <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/arr-model"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-white/10"
            >
              Try the ARR model
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-2xl rounded-md border-l-2 border-[#2f9e8f] bg-white/10 px-3 py-2 text-xs text-[#bcd0e6]"
          >
            ⚠ Ai Palette is a private company — there are no public financials. All figures are
            illustrative, benchmark-anchored estimates built for decision logic.
          </motion.div>
        </div>
      </section>

      {/* KPI strip */}
      <section className="mx-auto -mt-8 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KPIS.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm"
            >
              <div className="text-2xl font-bold tracking-tight text-primary">{k.value}</div>
              <div className="mt-1 text-xs leading-snug text-muted-foreground">{k.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Headline recommendations */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <motion.div {...fadeUp}>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">TL;DR</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Headline recommendations
          </h2>
        </motion.div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HEADLINE_RECOMMENDATIONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex size-7 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                {i + 1}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-primary">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section nav cards */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <motion.div {...fadeUp}>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Explore</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything in one interactive site
          </h2>
        </motion.div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Open <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
