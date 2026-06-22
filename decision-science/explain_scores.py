"""
SHAP-style explainability for the MarketPulse market-attractiveness score.

The score is an ADDITIVE weighted model: score(m) = sum_i w_i * x_i(m).
For additive models the Shapley value of feature i is exact and closed-form:
        phi_i(m) = w_i * ( x_i(m) - mean_i )
and    score(m) = base_value + sum_i phi_i(m),  base_value = sum_i w_i * mean_i.
So we get a real SHAP decomposition without needing the shap library.

Outputs (in ./outputs):
  - shap_contributions.csv         per-market, per-feature Shapley contributions
  - decision_plot.png              SHAP-style decision plot (all markets)
  - waterfall_<market>.png         per-market waterfalls for the top markets
"""
import numpy as np, csv, os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUT=os.path.join(os.path.dirname(__file__),"outputs"); os.makedirs(OUT,exist_ok=True)
NAVY="#1F3864"; BLUE="#2E5496"; ACC="#2F9E8F"; GREEN="#385723"; AMBER="#C8860D"; RED="#C0392B"; GREY="#8a93a3"

features=["Revenue","Data-ready","Home adv","Comp (inv)","Reg (inv)","Cost (inv)"]
weights =np.array([0.30,0.20,0.15,0.15,0.10,0.10])
markets={
 "SEA":        [3,5,5,4,4,4],
 "India":      [3,5,5,4,3,4],
 "US":         [5,4,2,2,4,3],
 "W. Europe":  [4,4,2,3,2,3],
 "Japan/Korea":[4,3,3,3,3,2],
 "Middle East":[3,2,3,4,3,3],
 "LATAM":      [2,2,2,4,3,3],
}
names=list(markets); X=np.array([markets[m] for m in names],dtype=float)
mean=X.mean(axis=0)
base=float((weights*mean).sum())
phi=(X-mean)*weights                       # exact Shapley contributions
score=base+phi.sum(axis=1)
order=np.argsort(-score)                    # best first

# save CSV
with open(os.path.join(OUT,"shap_contributions.csv"),"w",newline="") as f:
    w=csv.writer(f); w.writerow(["Market","BaseValue"]+features+["Score"])
    for i in order:
        w.writerow([names[i],round(base,3)]+[round(v,3) for v in phi[i]]+[round(score[i],3)])
print("base value (avg score):",round(base,3))
for i in order: print(f"{names[i]:12s} score {score[i]:.2f}")

# ---------- SHAP-style DECISION PLOT ----------
# y-axis: features bottom->top; x-axis: model output; each market a cumulative line
fig,ax=plt.subplots(figsize=(9,5.6))
ylabels=["base value"]+features
ypos=np.arange(len(ylabels))
palette=[GREEN,GREEN,BLUE,AMBER,AMBER,GREY,GREY]
cmap={n:palette[i] for i,n in enumerate(names)}
for i in order:
    xs=[base]; run=base
    for k in range(len(features)):
        run+=phi[i][k]; xs.append(run)
    ax.plot(xs,ypos,marker="o",ms=4,lw=2,color=cmap[names[i]],alpha=.9,label=f"{names[i]} ({score[i]:.2f})")
ax.axvline(base,color="#999",ls="--",lw=1)
ax.text(base,len(ylabels)-0.6,f" base {base:.2f}",color="#777",fontsize=8)
ax.set_yticks(ypos); ax.set_yticklabels(ylabels)
ax.set_xlabel("Market-attractiveness score  →"); ax.set_title("SHAP-style decision plot — what drives each market's score",fontsize=12,color=NAVY,weight="bold")
ax.legend(fontsize=8,loc="lower right",frameon=False)
ax.grid(axis="x",ls=":",alpha=.4); [s.set_visible(False) for s in (ax.spines["top"],ax.spines["right"])]
plt.tight_layout(); plt.savefig(os.path.join(OUT,"decision_plot.png"),dpi=130); plt.close()

# ---------- per-market WATERFALLS (top 3) ----------
def waterfall(mi):
    name=names[mi]; vals=phi[mi]
    fig,ax=plt.subplots(figsize=(7,3.6))
    run=base; xs=[];
    ax.barh(-1,base,color=GREY,alpha=.5); ax.text(base,-1,f" base {base:.2f}",va="center",fontsize=8)
    for k,(fn,v) in enumerate(zip(features,vals)):
        col=ACC if v>=0 else RED
        ax.barh(k,v,left=run,color=col)
        ax.text(run+v,(k),f" {v:+.2f}",va="center",fontsize=8,color="#333")
        run+=v
    ax.axvline(score[mi],color=NAVY,lw=1.5); ax.text(score[mi],len(features)-0.3,f" score {score[mi]:.2f}",color=NAVY,fontsize=9,weight="bold")
    ax.set_yticks(range(len(features))); ax.set_yticklabels(features)
    ax.set_title(f"Why {name} scores {score[mi]:.2f}  (green = pushes up, red = pulls down)",fontsize=11,color=NAVY)
    [s.set_visible(False) for s in (ax.spines["top"],ax.spines["right"])]
    plt.tight_layout(); plt.savefig(os.path.join(OUT,f"waterfall_{name.replace(' ','_').replace('/','-')}.png"),dpi=130); plt.close()
for mi in order[:3]: waterfall(mi)
print("plots written to outputs/")
