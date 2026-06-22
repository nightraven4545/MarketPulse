"""
MarketPulse — Bottoms-up ARR Model for Ai Palette (aipalette.com)
Interactive Streamlit app. Run: streamlit run app.py

DISCLAIMER: Ai Palette is private — no public financials exist. Every number here is an
illustrative, benchmark-anchored ASSUMPTION you can change with the sliders. The point is the
decision logic, not a claim about actual revenue.
"""
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import itertools
from functools import lru_cache

st.set_page_config(page_title="MarketPulse ARR Model — Ai Palette", layout="wide")

NAVY="#1F3864"; BLUE="#2E5496"; ACC="#2F9E8F"; GREEN="#385723"; AMBER="#C8860D"; GREY="#8a93a3"
WAVE_COLORS={"Wave 1":GREEN,"Wave 2":BLUE,"Wave 3":AMBER}

# ---------- default assumptions (illustrative, benchmark-anchored) ----------
MARKETS = {
    # name: addressable accounts, price index, entry year, wave, tier mix (E,G,Ent)
    "SEA":        dict(accts=400, idx=0.55, entry=1, wave="Wave 1", mix=(0.40,0.45,0.15)),
    "India":      dict(accts=500, idx=0.45, entry=1, wave="Wave 1", mix=(0.55,0.35,0.10)),
    "US":         dict(accts=1200,idx=1.00, entry=2, wave="Wave 2", mix=(0.10,0.35,0.55)),
    "W. Europe":  dict(accts=900, idx=0.90, entry=3, wave="Wave 3", mix=(0.15,0.40,0.45)),
    "Japan/Korea":dict(accts=500, idx=0.82, entry=3, wave="Wave 3", mix=(0.15,0.40,0.45)),
}
YEARS = 5

st.title("MarketPulse — Bottoms-up ARR Model")
st.caption("Ai Palette (aipalette.com) multi-market expansion · illustrative, benchmark-anchored — change any assumption in the sidebar.")

# ---------- sidebar: global assumptions ----------
with st.sidebar:
    st.header("Global assumptions")
    acv_e = st.number_input("Essentials ACV — US benchmark ($)", 2000, 30000, 8000, 500)
    acv_g = st.number_input("Growth ACV — US benchmark ($)", 10000, 100000, 35000, 1000)
    acv_en= st.number_input("Enterprise ACV — US benchmark ($)", 40000, 300000, 120000, 5000)
    st.divider()
    capture = st.slider("Annual capture rate (new logos as % of a market's addressable accounts)", 1.0, 12.0, 4.0, 0.5)/100
    ramp = st.slider("Entry-year ramp (fraction of capture in a market's first year)", 0.1, 1.0, 0.5, 0.1)
    nrr = st.slider("Net revenue retention (annual, on prior-year ARR)", 90, 130, 112, 1)/100
    st.divider()
    st.caption("Tip: push capture rate + NRR up to see how Ai Palette reaches the upper SOM band (~$30–60M).")
    st.markdown("**Per-market addressable accounts**")
    accts = {m: st.slider(f"{m}", 50, 2000, MARKETS[m]['accts'], 50) for m in MARKETS}

acv = {"E":acv_e,"G":acv_g,"En":acv_en}

# ---------- model ----------
def blended_acv(m):
    e,g,en = MARKETS[m]['mix']
    return MARKETS[m]['idx'] * (e*acv["E"] + g*acv["G"] + en*acv["En"])

rows=[]            # per market-year detail
arr_by_my={}       # (market,year)->ARR
for m in MARKETS:
    prev=0.0
    bacv=blended_acv(m)
    for y in range(1,YEARS+1):
        if y < MARKETS[m]['entry']:
            new_logos=0.0
        elif y == MARKETS[m]['entry']:
            new_logos = accts[m]*capture*ramp
        else:
            new_logos = accts[m]*capture
        new_arr = new_logos*bacv
        arr = prev*nrr + new_arr
        expansion = prev*nrr - prev if prev>0 else 0.0
        rows.append(dict(Market=m, Wave=MARKETS[m]['wave'], Year=f"Y{y}",
                         **{"New logos":new_logos, "New ARR":new_arr,
                            "Expansion ARR":expansion, "End ARR":arr,
                            "Blended ACV":bacv}))
        arr_by_my[(m,y)]=arr
        prev=arr

df=pd.DataFrame(rows)
tot_by_year=df.groupby("Year",sort=False)["End ARR"].sum()
y5=tot_by_year.iloc[-1]
y3=tot_by_year.iloc[2]
new3=df[df["Year"].isin(["Y1","Y2","Y3"])]["New ARR"].sum()
logos5=df["New logos"].sum()

# ---------- KPI row ----------
c1,c2,c3,c4=st.columns(4)
c1.metric("Year-5 total ARR", f"${y5/1e6:,.1f}M")
c2.metric("Year-3 total ARR", f"${y3/1e6:,.1f}M")
c3.metric("3-yr cumulative new ARR", f"${new3/1e6:,.1f}M")
c4.metric("Cumulative new logos (5y)", f"{logos5:,.0f}")

st.divider()
left,right=st.columns([3,2])

with left:
    st.subheader("ARR build by market")
    piv=df.pivot_table(index="Year",columns="Market",values="End ARR",sort=False)
    fig=go.Figure()
    for m in MARKETS:
        fig.add_bar(name=m, x=piv.index, y=piv[m]/1e6)
    fig.update_layout(barmode="stack", yaxis_title="ARR ($M)", legend_title="Market",
                      height=380, margin=dict(t=10,b=10,l=10,r=10))
    st.plotly_chart(fig, use_container_width=True)

with right:
    st.subheader("New vs. expansion ARR")
    ne=df.groupby("Year",sort=False)[["New ARR","Expansion ARR"]].sum()/1e6
    fig2=go.Figure()
    fig2.add_bar(name="New ARR", x=ne.index, y=ne["New ARR"], marker_color=BLUE)
    fig2.add_bar(name="Expansion ARR", x=ne.index, y=ne["Expansion ARR"], marker_color=ACC)
    fig2.update_layout(barmode="stack", yaxis_title="$M", height=380, margin=dict(t=10,b=10,l=10,r=10))
    st.plotly_chart(fig2, use_container_width=True)

c5,c6=st.columns(2)
with c5:
    st.subheader("Year-5 ARR mix by market")
    y5mix=df[df["Year"]=="Y5"].groupby("Market",sort=False)["End ARR"].sum()/1e6
    figp=px.pie(values=y5mix.values, names=y5mix.index, hole=.45)
    figp.update_layout(height=330, margin=dict(t=10,b=10,l=10,r=10))
    st.plotly_chart(figp, use_container_width=True)
with c6:
    st.subheader("Blended ACV by market")
    bacv=pd.Series({m:blended_acv(m) for m in MARKETS})
    figb=px.bar(x=bacv.index, y=bacv.values)
    figb.update_traces(marker_color=BLUE)
    figb.update_layout(yaxis_title="Blended ACV ($)", height=330, margin=dict(t=10,b=10,l=10,r=10), xaxis_title="")
    st.plotly_chart(figb, use_container_width=True)

st.subheader("Detail table")
show=df.copy()
for col in ["New logos"]: show[col]=show[col].round(0)
for col in ["New ARR","Expansion ARR","End ARR","Blended ACV"]: show[col]=show[col].round(0)
st.dataframe(show, use_container_width=True, hide_index=True)
st.download_button("Download model output (CSV)", df.to_csv(index=False).encode(),
                   "marketpulse_arr_output.csv","text/csv")

st.caption("Method: new logos = addressable × capture rate (entry year × ramp). "
           "End ARR = prior-year ARR × NRR + new ARR. Blended ACV = price index × Σ(tier mix × tier ACV). "
           "Tie-out: this realistic ramp sits below the 3-yr SOM outer bound (~$30–60M); raise capture/NRR to approach it. "
           "All figures illustrative — Ai Palette is private.")

# =====================================================================================
# TORNADO — sensitivity of Year-5 ARR to each driver (±25%)
# =====================================================================================
st.divider()
st.header("Sensitivity — what moves Year-5 ARR most (tornado)")

def y5_total(cap, nr, ramp_, accts_, acvd):
    tot=0.0
    for m in MARKETS:
        e,g,en=MARKETS[m]['mix']; b=MARKETS[m]['idx']*(e*acvd["E"]+g*acvd["G"]+en*acvd["En"])
        prev=0.0
        for y in range(1,YEARS+1):
            if y<MARKETS[m]['entry']: nl=0.0
            elif y==MARKETS[m]['entry']: nl=accts_[m]*cap*ramp_
            else: nl=accts_[m]*cap
            prev=prev*nr+nl*b
        tot+=prev
    return tot

base_y5=y5_total(capture,nrr,ramp,accts,acv)
swing=0.25
drivers={
 "Capture rate":   lambda f: y5_total(capture*f,nrr,ramp,accts,acv),
 "NRR":            lambda f: y5_total(capture,1+(nrr-1)*f,ramp,accts,acv),
 "Enterprise ACV": lambda f: y5_total(capture,nrr,ramp,accts,{**acv,"En":acv["En"]*f}),
 "Growth ACV":     lambda f: y5_total(capture,nrr,ramp,accts,{**acv,"G":acv["G"]*f}),
 "US addressable": lambda f: y5_total(capture,nrr,ramp,{**accts,"US":accts["US"]*f},acv),
 "Entry ramp":     lambda f: y5_total(capture,nrr,ramp*f,accts,acv),
}
rows=[]
for name,fn in drivers.items():
    lo=fn(1-swing)/1e6; hi=fn(1+swing)/1e6
    rows.append((name,lo,hi,abs(hi-lo)))
rows.sort(key=lambda r:r[3])
figt=go.Figure()
for name,lo,hi,_ in rows:
    figt.add_trace(go.Bar(y=[name],x=[hi-lo],base=lo,orientation='h',
        marker_color=BLUE,showlegend=False,
        hovertemplate=f"{name}: ${lo:.1f}M – ${hi:.1f}M<extra></extra>"))
figt.add_vline(x=base_y5/1e6,line_dash="dash",line_color=NAVY,
    annotation_text=f"base ${base_y5/1e6:.1f}M")
figt.update_layout(title=f"Year-5 ARR sensitivity to ±{int(swing*100)}% in each driver",
    xaxis_title="Year-5 ARR ($M)",height=360,margin=dict(t=40,b=10,l=10,r=10))
st.plotly_chart(figt,use_container_width=True)
st.caption("Longest bar = biggest lever. Capture rate (GTM efficiency) and NRR (retention) typically dominate — "
           "which is why the strategy front-loads cheap references and four NRR upsell levers.")

# =====================================================================================
# MDP — market-entry sequencing under uncertainty (cold-start slider)
# =====================================================================================
st.divider()
st.header("Decision science — MDP optimal entry sequence")
st.caption("Market entry as a Markov Decision Process. Slide the cold-start penalty and watch the "
           "optimal policy flip between US-first (value-greedy) and home-first (risk-adjusted).")

cold = st.slider("Cold-start penalty — how much riskier entering a 'hard' market with NO references yet",
                 0.2, 1.0, 0.40, 0.05,
                 help="1.0 = no penalty (naïve). Lower = entering US/EU/Japan cold is much less likely to succeed.")

MD={ "SEA":dict(value=0.33,cost=0.20,p=0.90,prereq=None,disc=0.0),
 "India":dict(value=0.26,cost=0.20,p=0.90,prereq=None,disc=0.0),
 "US":dict(value=3.80,cost=1.60,p=0.60,prereq=None,disc=0.0),
 "W. Europe":dict(value=2.24,cost=1.10,p=0.65,prereq="US",disc=0.40),
 "Japan/Korea":dict(value=1.13,cost=0.95,p=0.55,prereq=None,disc=0.0),
 "Middle East":dict(value=0.45,cost=0.55,p=0.60,prereq="Japan/Korea",disc=0.35)}
MK=list(MD); T=6; G=0.85; HARD={"US","W. Europe","Japan/Korea","Middle East"}
def sp(m,ent):
    p=MD[m]["p"];
    return p*cold if (m in HARD and len(ent)==0) else p
def ec(m,ent):
    pr=MD[m]["prereq"]; d=MD[m]["disc"] if pr in ent else 0.0; return MD[m]["cost"]*(1-d)
def rv(m,t): return sum(MD[m]["value"]*(G**(k-t)) for k in range(t,T))
@lru_cache(maxsize=None)
def V(t,ent):
    if t>=T: return 0.0,None
    best=(G*V(t+1,ent)[0],"wait")
    for m in MK:
        if m in ent: continue
        p=sp(m,ent); c=ec(m,ent); ss=frozenset(ent|{m})
        q=-c+p*(rv(m,t)+G*V(t+1,ss)[0])+(1-p)*(G*V(t+1,ent)[0])
        if q>best[0]: best=(q,m)
    return best
V.cache_clear()
ent=frozenset(); t=0; seq=[]
v0=V(0,frozenset())[0]
while t<T:
    q,a=V(t,ent)
    if a in (None,"wait"): t+=1; continue
    seq.append((t,a,sp(a,ent),ec(a,ent),rv(a,t))); ent=frozenset(ent|{a}); t+=1
cA,cB=st.columns([2,3])
with cA:
    st.metric("Optimal-policy expected value", f"${v0:,.1f}M")
    st.markdown("**Optimal entry order**")
    st.markdown(" → ".join(f"**{a}**" for _,a,_,_,_ in seq))
with cB:
    labels=[f"P{t}·{a}" for t,a,_,_,_ in seq]
    vals=[(-c+p*r) for _,a,p,c,r in seq]
    cols=[GREEN if a in("SEA","India") else BLUE if a=="US" else AMBER for _,a,_,_,_ in seq]
    figm=go.Figure(go.Bar(x=labels,y=vals,marker_color=cols))
    figm.update_layout(yaxis_title="Expected net value ($M)",height=320,margin=dict(t=10,b=10,l=10,r=10))
    st.plotly_chart(figm,use_container_width=True)
st.caption("At penalty 1.0 the policy is US-first (value-greedy); lower it and the optimum flips to a cheap "
           "home win first, then the US — exactly the Wave-1→US logic. See docs/11-decision-science.md.")
