// Direct port of arr-model/app.py's bottoms-up ARR model.
// Method: new logos = addressable accounts x capture rate (entry year x ramp, else full rate).
// End ARR = prior-year ARR x NRR + new ARR. Blended ACV = price index x sum(tier mix x tier ACV).

export type MarketKey = "SEA" | "India" | "US" | "W. Europe" | "Japan/Korea";

export type MarketParams = {
  accts: number;
  idx: number;
  entry: number;
  wave: string;
  mix: [number, number, number]; // [Essentials, Growth, Enterprise]
};

export const ARR_MARKETS: Record<MarketKey, MarketParams> = {
  SEA: { accts: 400, idx: 0.55, entry: 1, wave: "Wave 1", mix: [0.4, 0.45, 0.15] },
  India: { accts: 500, idx: 0.45, entry: 1, wave: "Wave 1", mix: [0.55, 0.35, 0.1] },
  US: { accts: 1200, idx: 1.0, entry: 2, wave: "Wave 2", mix: [0.1, 0.35, 0.55] },
  "W. Europe": { accts: 900, idx: 0.9, entry: 3, wave: "Wave 3", mix: [0.15, 0.4, 0.45] },
  "Japan/Korea": { accts: 500, idx: 0.82, entry: 3, wave: "Wave 3", mix: [0.15, 0.4, 0.45] },
};

export const ARR_MARKET_KEYS = Object.keys(ARR_MARKETS) as MarketKey[];
export const ARR_YEARS = 5;

export type Acv = { E: number; G: number; En: number };

export const DEFAULT_ACV: Acv = { E: 8000, G: 35000, En: 120000 };
export const DEFAULT_CAPTURE = 0.04;
export const DEFAULT_RAMP = 0.5;
export const DEFAULT_NRR = 1.12;
export const DEFAULT_ACCTS: Record<MarketKey, number> = Object.fromEntries(
  ARR_MARKET_KEYS.map((k) => [k, ARR_MARKETS[k].accts])
) as Record<MarketKey, number>;

export type ArrAssumptions = {
  acv: Acv;
  capture: number;
  ramp: number;
  nrr: number;
  accts: Record<MarketKey, number>;
};

export const DEFAULT_ASSUMPTIONS: ArrAssumptions = {
  acv: DEFAULT_ACV,
  capture: DEFAULT_CAPTURE,
  ramp: DEFAULT_RAMP,
  nrr: DEFAULT_NRR,
  accts: DEFAULT_ACCTS,
};

export type ArrRow = {
  market: MarketKey;
  wave: string;
  year: number;
  newLogos: number;
  newArr: number;
  expansionArr: number;
  endArr: number;
  blendedAcv: number;
};

export function blendedAcv(m: MarketParams, acv: Acv): number {
  const [e, g, en] = m.mix;
  return m.idx * (e * acv.E + g * acv.G + en * acv.En);
}

export function computeArr(a: ArrAssumptions): ArrRow[] {
  const rows: ArrRow[] = [];
  for (const key of ARR_MARKET_KEYS) {
    const m = ARR_MARKETS[key];
    const bacv = blendedAcv(m, a.acv);
    let prev = 0;
    for (let y = 1; y <= ARR_YEARS; y++) {
      let newLogos: number;
      if (y < m.entry) newLogos = 0;
      else if (y === m.entry) newLogos = a.accts[key] * a.capture * a.ramp;
      else newLogos = a.accts[key] * a.capture;

      const newArr = newLogos * bacv;
      const endArr = prev * a.nrr + newArr;
      const expansionArr = prev > 0 ? prev * a.nrr - prev : 0;

      rows.push({ market: key, wave: m.wave, year: y, newLogos, newArr, expansionArr, endArr, blendedAcv: bacv });
      prev = endArr;
    }
  }
  return rows;
}

export function totalAtYear(rows: ArrRow[], year: number): number {
  return rows.filter((r) => r.year === year).reduce((s, r) => s + r.endArr, 0);
}

export type TornadoDriver = { name: string; lo: number; hi: number };

export function computeTornado(base: ArrAssumptions, swing = 0.25): TornadoDriver[] {
  const y5 = (a: ArrAssumptions) => totalAtYear(computeArr(a), ARR_YEARS) / 1e6;
  const drivers: { name: string; fn: (f: number) => number }[] = [
    { name: "Capture rate", fn: (f) => y5({ ...base, capture: base.capture * f }) },
    { name: "NRR", fn: (f) => y5({ ...base, nrr: 1 + (base.nrr - 1) * f }) },
    { name: "Enterprise ACV", fn: (f) => y5({ ...base, acv: { ...base.acv, En: base.acv.En * f } }) },
    { name: "Growth ACV", fn: (f) => y5({ ...base, acv: { ...base.acv, G: base.acv.G * f } }) },
    { name: "US addressable", fn: (f) => y5({ ...base, accts: { ...base.accts, US: base.accts.US * f } }) },
    { name: "Entry ramp", fn: (f) => y5({ ...base, ramp: base.ramp * f }) },
  ];
  return drivers
    .map((d) => ({ name: d.name, lo: d.fn(1 - swing), hi: d.fn(1 + swing) }))
    .sort((a, b) => Math.abs(a.hi - a.lo) - Math.abs(b.hi - b.lo));
}
