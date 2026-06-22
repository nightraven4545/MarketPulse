"""
Market-entry sequencing as a Markov Decision Process (MDP), solved by finite-horizon
value iteration (backward induction).

STATE   : (period t, frozenset of markets already established)
ACTION  : attempt to enter ONE not-yet-entered market (or 'wait')
DYNAMICS: an attempt SUCCEEDS with probability p_m (uncertainty). On success the market is
          added and pays recurring annual value for every remaining period (discounted). On
          failure the state's market set is unchanged. Entry cost is paid on attempt; it is
          DISCOUNTED when a prerequisite market is already established (reuse synergy:
          US compliance -> W. Europe; Japan partner model -> Middle East).
REWARD  : expected discounted (recurring value) - entry cost.
OUTPUT  : the optimal policy's expected entry SEQUENCE + value, and a chart.

This formalizes the engine in docs/workflow as a real MDP and tests whether the hand-derived
SEA/India -> US -> EU/Japan sequence is also the risk-adjusted optimum.
All inputs are illustrative, benchmark-anchored assumptions (Ai Palette is private).
"""
import itertools, os
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUT=os.path.join(os.path.dirname(__file__),"outputs"); os.makedirs(OUT,exist_ok=True)
NAVY="#1F3864"; BLUE="#2E5496"; ACC="#2F9E8F"; GREEN="#385723"; AMBER="#C8860D"

# annual_value ($M, recurring), entry_cost ($M), success prob, prerequisite -> cost discount
M = {
 "SEA":         dict(value=0.33, cost=0.20, p=0.90, prereq=None,  disc=0.0),
 "India":       dict(value=0.26, cost=0.20, p=0.90, prereq=None,  disc=0.0),
 "US":          dict(value=3.80, cost=1.60, p=0.60, prereq=None,  disc=0.0),
 "W. Europe":   dict(value=2.24, cost=1.10, p=0.65, prereq="US",  disc=0.40),  # reuse US compliance
 "Japan/Korea": dict(value=1.13, cost=0.95, p=0.55, prereq=None,  disc=0.0),
 "Middle East": dict(value=0.45, cost=0.55, p=0.60, prereq="Japan/Korea", disc=0.35), # reuse partner model
}
MKTS=list(M); T=6; GAMMA=0.85
# "Hard" markets entered COLD (before any reference logo / proven local motion exists) are far
# riskier. COLD_PENALTY scales their success prob while the entered set is empty. Home markets
# (SEA/India) are exempt — that is the home-region advantage. Set COLD_PENALTY=1.0 to disable.
HARD={"US","W. Europe","Japan/Korea","Middle East"}
COLD_PENALTY=0.40

def succ_p(m,entered):
    p=M[m]["p"]
    if COLD_PENALTY<1.0 and m in HARD and len(entered)==0:
        p*=COLD_PENALTY
    return p

def entry_cost(m,entered):
    pr=M[m]["prereq"]
    d=M[m]["disc"] if (pr in entered) else 0.0
    return M[m]["cost"]*(1-d)

def recurring_value(m,t):
    # value paid each remaining period from t..T-1, discounted to t
    return sum(M[m]["value"]*(GAMMA**(k-t)) for k in range(t,T))

from functools import lru_cache
@lru_cache(maxsize=None)
def V(t, entered):
    if t>=T: return 0.0, None
    entered=frozenset(entered)
    best=( -1e9, "wait")
    # action: wait
    best=max(best,(GAMMA*V(t+1,entered)[0], "wait"))
    for m in MKTS:
        if m in entered: continue
        p=succ_p(m,entered); c=entry_cost(m,entered)
        succ_state=frozenset(entered|{m})
        q = -c + p*(recurring_value(m,t)+GAMMA*V(t+1,succ_state)[0]) \
               + (1-p)*(GAMMA*V(t+1,entered)[0])
        best=max(best,(q,m))
    return best

def solve(cold_penalty):
    global COLD_PENALTY
    COLD_PENALTY=cold_penalty; V.cache_clear()
    seq=[]; entered=frozenset(); t=0
    val0=V(0,frozenset())[0]
    while t<T:
        q,a=V(t,entered)
        if a=="wait" or a is None: t+=1; continue
        c=entry_cost(a,entered); rv=recurring_value(a,t); p=succ_p(a,entered)
        seq.append((t,a,p,c,rv)); entered=frozenset(entered|{a}); t+=1
    return val0,seq

print("="*70)
print("SCENARIO A — naive (risk-neutral, no cold-start penalty)")
vA,seqA=solve(1.0)
print(f"  V0 = ${vA:,.2f}M  |  order: "+" -> ".join(a for _,a,_,_,_ in seqA))
print("="*70)
print("SCENARIO B — capability-aware (cold-start penalty on hard markets) [RECOMMENDED]")
val0,seq=solve(0.40)
print(f"  V0 = ${val0:,.2f}M  |  order: "+" -> ".join(a for _,a,_,_,_ in seq))
for t,a,p,c,rv in seq:
    print(f"    period {t}: enter {a:12s} p={p:.0%} cost=${c:.2f}M recurring=${rv:.2f}M")

# ---------- chart ----------
fig,ax=plt.subplots(figsize=(9,4.8))
labels=[f"P{t}\n{a}" for t,a,_,_,_ in seq]
vals=[(-c + p*rv) for _,a,p,c,rv in seq]
colors=[GREEN if a in ("SEA","India") else (BLUE if a=="US" else AMBER) for _,a,_,_,_ in seq]
ax.bar(range(len(seq)),vals,color=colors)
ax.set_xticks(range(len(seq)))
ax.set_xticklabels(labels,fontsize=9)
ax.set_ylabel("Expected net value added ($M)")
ax.set_title("MDP optimal entry sequence — capability-aware policy",color=NAVY,weight="bold",fontsize=12)
for i,v in enumerate(vals):
    ax.text(i,v,f"${v:.1f}M",ha="center",va="bottom",fontsize=8)
ax.axhline(0,color="#999",lw=.8)
for sp in ("top","right"):
    ax.spines[sp].set_visible(False)
ax.text(0.99,0.02,f"Policy expected value  ${val0:,.1f}M   (naive policy = US-first, ${vA:,.1f}M)",
        transform=ax.transAxes,ha="right",fontsize=8.5,color="#555")
plt.tight_layout()
plt.savefig(os.path.join(OUT,"mdp_sequence.png"),dpi=130)
plt.close()
print("chart -> outputs/mdp_sequence.png")
