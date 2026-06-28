// Direct port of decision-science/mdp_sequencing.py — market-entry sequencing as a finite-horizon
// MDP, solved by backward-induction value iteration. STATE = (period, markets already entered).
// ACTION = attempt one not-yet-entered market (or wait). An attempt succeeds with probability p;
// on success the market pays recurring discounted value for the rest of the horizon. Entry cost is
// discounted when a prerequisite market is already established (reuse synergy).

export type MdpMarketKey = "SEA" | "India" | "US" | "W. Europe" | "Japan/Korea" | "Middle East";

export type MdpParams = {
  value: number; // $M, recurring
  cost: number; // $M, entry cost
  p: number; // success probability
  prereq: MdpMarketKey | null;
  disc: number; // cost discount if prereq already entered
};

export const MDP_MARKETS: Record<MdpMarketKey, MdpParams> = {
  SEA: { value: 0.33, cost: 0.2, p: 0.9, prereq: null, disc: 0 },
  India: { value: 0.26, cost: 0.2, p: 0.9, prereq: null, disc: 0 },
  US: { value: 3.8, cost: 1.6, p: 0.6, prereq: null, disc: 0 },
  "W. Europe": { value: 2.24, cost: 1.1, p: 0.65, prereq: "US", disc: 0.4 },
  "Japan/Korea": { value: 1.13, cost: 0.95, p: 0.55, prereq: null, disc: 0 },
  "Middle East": { value: 0.45, cost: 0.55, p: 0.6, prereq: "Japan/Korea", disc: 0.35 },
};

const MDP_KEYS = Object.keys(MDP_MARKETS) as MdpMarketKey[];
const T = 6;
const GAMMA = 0.85;
const HARD = new Set<MdpMarketKey>(["US", "W. Europe", "Japan/Korea", "Middle East"]);

function succP(m: MdpMarketKey, entered: ReadonlySet<MdpMarketKey>, coldPenalty: number) {
  let p = MDP_MARKETS[m].p;
  if (coldPenalty < 1 && HARD.has(m) && entered.size === 0) p *= coldPenalty;
  return p;
}

function entryCost(m: MdpMarketKey, entered: ReadonlySet<MdpMarketKey>) {
  const pr = MDP_MARKETS[m].prereq;
  const d = pr && entered.has(pr) ? MDP_MARKETS[m].disc : 0;
  return MDP_MARKETS[m].cost * (1 - d);
}

function recurringValue(m: MdpMarketKey, t: number) {
  let sum = 0;
  for (let k = t; k < T; k++) sum += MDP_MARKETS[m].value * GAMMA ** (k - t);
  return sum;
}

function keyOf(t: number, entered: ReadonlySet<MdpMarketKey>) {
  return `${t}|${[...entered].sort().join(",")}`;
}

export type MdpAction = MdpMarketKey | "wait";

export type MdpStep = {
  period: number;
  market: MdpMarketKey;
  p: number;
  cost: number;
  recurringValue: number;
};

export type MdpResult = {
  value: number;
  sequence: MdpStep[];
};

export function solveMdp(coldPenalty: number): MdpResult {
  const memo = new Map<string, [number, MdpAction | null]>();

  function V(t: number, entered: ReadonlySet<MdpMarketKey>): [number, MdpAction | null] {
    if (t >= T) return [0, null];
    const key = keyOf(t, entered);
    const cached = memo.get(key);
    if (cached) return cached;

    let best: [number, MdpAction | null] = [GAMMA * V(t + 1, entered)[0], "wait"];
    for (const m of MDP_KEYS) {
      if (entered.has(m)) continue;
      const p = succP(m, entered, coldPenalty);
      const c = entryCost(m, entered);
      const nextEntered = new Set(entered);
      nextEntered.add(m);
      const q =
        -c +
        p * (recurringValue(m, t) + GAMMA * V(t + 1, nextEntered)[0]) +
        (1 - p) * (GAMMA * V(t + 1, entered)[0]);
      if (q > best[0]) best = [q, m];
    }
    memo.set(key, best);
    return best;
  }

  const value = V(0, new Set())[0];
  let entered = new Set<MdpMarketKey>();
  let t = 0;
  const sequence: MdpStep[] = [];
  while (t < T) {
    const [, action] = V(t, entered);
    if (action === null || action === "wait") {
      t += 1;
      continue;
    }
    sequence.push({
      period: t,
      market: action,
      p: succP(action, entered, coldPenalty),
      cost: entryCost(action, entered),
      recurringValue: recurringValue(action, t),
    });
    entered = new Set(entered);
    entered.add(action);
    t += 1;
  }
  return { value, sequence };
}
