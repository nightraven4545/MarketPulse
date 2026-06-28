// Direct port of decision-science/explain_scores.py's closed-form Shapley decomposition.
// The market score is an additive weighted model: score(m) = sum_i w_i * x_i(m). For additive
// models the Shapley value of feature i is exact and closed-form:
//   phi_i(m) = w_i * (x_i(m) - mean_i),   score(m) = base + sum_i phi_i(m),  base = sum_i w_i * mean_i

import { MARKET_SCORES, SCORE_FEATURE_KEYS, SCORE_WEIGHTS } from "../data/markets";

export type ShapResult = {
  market: string;
  base: number;
  phi: number[]; // aligned with SCORE_FEATURE_KEYS / SCORE_FEATURES
  score: number;
};

export function computeShap(weights: number[] = SCORE_WEIGHTS): ShapResult[] {
  const X = MARKET_SCORES.map((m) => SCORE_FEATURE_KEYS.map((k) => m[k] as number));
  const n = X.length;
  const nFeat = SCORE_FEATURE_KEYS.length;
  const mean = Array.from({ length: nFeat }, (_, j) => X.reduce((s, row) => s + row[j], 0) / n);
  const base = mean.reduce((s, mu, j) => s + weights[j] * mu, 0);

  return MARKET_SCORES.map((m, i) => {
    const phi = X[i].map((x, j) => (x - mean[j]) * weights[j]);
    const score = base + phi.reduce((s, v) => s + v, 0);
    return { market: m.market, base, phi, score };
  });
}
