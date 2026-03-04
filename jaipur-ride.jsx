import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const STATIONS = [
  { id:"JM01", name:"Mansarovar",           nameHi:"मानसरोवर",         zone:1, timeToNext:120, distToNext:1.20, isTerminus:true  },
  { id:"JM02", name:"New Aatish Market",    nameHi:"न्यू आतिश मार्केट", zone:1, timeToNext:110, distToNext:1.05 },
  { id:"JM03", name:"Vivek Vihar",          nameHi:"विवेक विहार",        zone:1, timeToNext:105, distToNext:1.00 },
  { id:"JM04", name:"Shyam Nagar",          nameHi:"श्याम नगर",          zone:1, timeToNext:115, distToNext:1.10 },
  { id:"JM05", name:"Ram Nagar Ghat Gate",  nameHi:"राम नगर घाट गेट",   zone:2, timeToNext:120, distToNext:1.15 },
  { id:"JM06", name:"Civil Lines",          nameHi:"सिविल लाइंस",        zone:2, timeToNext:130, distToNext:1.25, isTourist:true },
  { id:"JM07", name:"Railway Station",      nameHi:"रेलवे स्टेशन",       zone:2, timeToNext:140, distToNext:1.35, isInterchange:true, isTourist:true },
  { id:"JM08", name:"Sindhi Camp",          nameHi:"सिंधी कैंप",          zone:2, timeToNext:125, distToNext:1.20 },
  { id:"JM09", name:"Chandpole",            nameHi:"चांदपोल",             zone:3, timeToNext:115, distToNext:1.10, isTourist:true },
  { id:"JM10", name:"Chhoti Chaupar",       nameHi:"छोटी चौपड़",          zone:3, timeToNext:100, distToNext:0.95, isTourist:true },
  { id:"JM11", name:"Badi Chaupar",         nameHi:"बड़ी चौपड़",           zone:3, timeToNext:0,   distToNext:0,    isTerminus:true, isTourist:true },
];

const FARE = { "1-1":10,"1-2":15,"1-3":20,"2-1":15,"2-2":10,"2-3":15,"3-1":20,"3-2":15,"3-3":10 };

const ATTRACTIONS = {
  JM06:[
    { name:"Birla Mandir",    nameHi:"बिड़ला मंदिर",  exit:"Exit 2", walk:"15 min", fee:"Free",  tip:"Visit after sunset — white marble glows against the dark sky.", category:"Temple"  },
    { name:"Albert Hall",     nameHi:"अल्बर्ट हॉल",   exit:"Exit 1", walk:"18 min", fee:"₹40",  tip:"Egyptian mummy in basement — most visitors miss it entirely.",  category:"Museum"  },
  ],
  JM07:[
    { name:"Railway Station", nameHi:"रेलवे स्टेशन",  exit:"Exit 1", walk:"2 min",  fee:"Free",  tip:"Heritage architecture — photograph the facade from main road.",  category:"Heritage"},
  ],
  JM09:[
    { name:"Chandpole Bazaar",nameHi:"चांदपोल बाज़ार", exit:"Exit 1", walk:"1 min",  fee:"Free",  tip:"Best for blue pottery. Bargain to 60% of asking price.",         category:"Shopping"},
    { name:"Old City Walk",   nameHi:"पुराना शहर",     exit:"Exit 2", walk:"0 min",  fee:"Free",  tip:"7 AM walk — chai wallahs, temple bells, pink walls at dawn.",    category:"Walk"    },
  ],
  JM10:[
    { name:"Tripolia Bazaar", nameHi:"त्रिपोलिया बाज़ार",exit:"Exit 1",walk:"3 min", fee:"Free",  tip:"Lac bangles ₹20 a set. Traditional Rajasthani jewellery hub.",    category:"Shopping"},
  ],
  JM11:[
    { name:"Hawa Mahal",      nameHi:"हवा महल",        exit:"Exit 2", walk:"4 min",  fee:"₹50",   tip:"Go inside — most tourists only photograph the facade.",           category:"Heritage"},
    { name:"City Palace",     nameHi:"सिटी पैलेस",     exit:"Exit 1", walk:"8 min",  fee:"₹200",  tip:"Mubarak Mahal has Maharaja's weapons — most tourists rush past.", category:"Heritage"},
    { name:"Jantar Mantar",   nameHi:"जंतर मंतर",      exit:"Exit 1", walk:"10 min", fee:"₹50",   tip:"Samrat Yantra tells time to 2 seconds — stand in its shadow.",   category:"UNESCO"  },
    { name:"Johari Bazaar",   nameHi:"जौहरी बाज़ार",   exit:"Exit 2", walk:"2 min",  fee:"Free",  tip:"Bargain to 50% of asking price — it is expected here.",           category:"Shopping"},
  ],
};

const EXITS = {
  JM06:["Exit 1 → Civil Lines, High Court","Exit 2 → Statue Circle, Birla Mandir"],
  JM07:["Exit 1 → Railway Station Main","Exit 2 → Bus Stand, Prepaid Auto","Exit 3 → Sindhi Camp, Hotels"],
  JM09:["Exit 1 → Chandpole Bazaar","Exit 2 → Old City Heritage Walk"],
  JM10:["Exit 1 → Tripolia Bazaar, Chhoti Chaupar","Exit 2 → Old City Lanes"],
  JM11:["Exit 1 → City Palace, Jantar Mantar","Exit 2 → Hawa Mahal, Johari Bazaar"],
};

// ─── HELPERS ───────────────────────────────────────────────────────────────
function calcRoute(fromId, toId) {
  const a = STATIONS.findIndex(s => s.id === fromId);
  const b = STATIONS.findIndex(s => s.id === toId);
  if (a === -1 || b === -1 || a === b) return null;
  const [s, e] = a < b ? [a, b] : [b, a];
  const stops = STATIONS.slice(s, e + 1);
  const secs  = stops.slice(0, -1).reduce((t, s) => t + s.timeToNext, 0);
  const fare  = FARE[`${STATIONS[s].zone}-${STATIONS[e].zone}`] || 10;
  return {
    stops, stopCount: stops.length - 1,
    minutes: Math.round(secs / 60),
    fare, smartFare: Math.round(fare * 0.9),
    forward: a < b,
    direction: a < b ? "Towards Badi Chaupar" : "Towards Mansarovar",
  };
}

// ─── STYLES ────────────────────────────────────────────────────────────────
const C = {
  bg:      "#0D0D0D",
  surface: "#161616",
  card:    "#1C1C1C",
  border:  "#2A2A2A",
  accent:  "#D4691E",
  accentD: "#A84F16",
  green:   "#2A9D5C",
  gold:    "#C9A84C",
  text:    "#F0EDE8",
  muted:   "#6B6560",
  sub:     "#9A9390",
};

const css = {
  app: {
    background: C.bg,
    minHeight: "100dvh",
    maxWidth: 430,
    margin: "0 auto",
    fontFamily: "'DM Sans', sans-serif",
    color: C.text,
    position: "relative",
    overflow: "hidden",
  },
  header: {
    background: C.surface,
    borderBottom: `1px solid ${C.border}`,
    padding: "14px 20px",
    position: "sticky", top: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  logo: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 22, fontWeight: 600,
    color: C.text, letterSpacing: 1,
  },
  logoAccent: { color: C.accent },
  pill: (active) => ({
    padding: "5px 12px", borderRadius: 20,
    fontSize: 12, fontWeight: 500, cursor: "pointer",
    border: `1px solid ${active ? C.accent : C.border}`,
    background: active ? `${C.accent}20` : "transparent",
    color: active ? C.accent : C.muted,
    transition: "all 200ms",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  }),
  card: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 14, padding: 20, marginBottom: 12,
  },
  input: {
    width: "100%", background: C.surface,
    border: `1px solid ${C.border}`, borderRadius: 10,
    padding: "14px 16px 14px 44px",
    color: C.text, fontSize: 15,
    outline: "none", boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "border-color 200ms",
  },
  btn: (variant = "primary") => ({
    width: "100%", height: 52, borderRadius: 10,
    border: "none", cursor: "pointer",
    fontSize: 14, fontWeight: 600, letterSpacing: 0.3,
    fontFamily: "'DM Sans', sans-serif",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    transition: "opacity 150ms",
    background: variant === "primary"
      ? `linear-gradient(135deg, ${C.accent}, ${C.accentD})`
      : variant === "ghost"
      ? "transparent"
      : C.surface,
    color: variant === "primary" ? "#fff"
      : variant === "ghost" ? C.muted : C.text,
    border: variant === "ghost" ? `1px solid ${C.border}` : "none",
  }),
  navBar: {
    position: "fixed", bottom: 0, left: "50%",
    transform: "translateX(-50%)",
    width: "100%", maxWidth: 430,
    background: C.surface,
    borderTop: `1px solid ${C.border}`,
    display: "flex", height: 60,
    paddingBottom: "env(safe-area-inset-bottom)",
    zIndex: 100,
  },
  navTab: (active) => ({
    flex: 1, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    gap: 3, cursor: "pointer", border: "none",
    background: "transparent", color: active ? C.accent : C.muted,
    fontSize: 10, fontFamily: "'DM Sans', sans-serif",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    transition: "color 150ms",
  }),
  scrollArea: {
    padding: "20px 16px 88px",
    overflowY: "auto", WebkitOverflowScrolling: "touch",
  },
  sectionLabel: {
    fontSize: 10, fontWeight: 600, letterSpacing: 2,
    textTransform: "uppercase", color: C.muted, marginBottom: 10,
  },
  stationRow: (active) => ({
    display: "flex", alignItems: "center", gap: 12,
    padding: "13px 16px",
    background: active ? `${C.accent}12` : "transparent",
    borderBottom: `1px solid ${C.border}`,
    cursor: "pointer", touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    transition: "background 150ms",
  }),
};

// ─── SVG ICONS ─────────────────────────────────────────────────────────────
const Icon = {
  Route: ({c="#F0EDE8",s=22}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/>
      <path d="M6,8 C6,14 18,10 18,16"/>
    </svg>
  ),
  Explore: ({c="#F0EDE8",s=22}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <polygon points="16,8 10,10 8,16 14,14" fill={c} opacity="0.3" stroke={c}/>
      <circle cx="12" cy="12" r="1.5" fill={c}/>
    </svg>
  ),
  Stations: ({c="#F0EDE8",s=22}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21"/>
      <circle cx="12" cy="5" r="2.5"/><circle cx="12" cy="12" r="2.5" fill={c} opacity="0.3"/>
      <circle cx="12" cy="19" r="2.5"/>
    </svg>
  ),
  Safety: ({c="#F0EDE8",s=22}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12,3 L20,7 L20,13 C20,17 16,21 12,22 C8,21 4,17 4,13 L4,7 Z"/>
      <polyline points="9,12 11,15 15,9"/>
    </svg>
  ),
  Back: ({c="#F0EDE8",s=20}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  ),
  Swap: ({c="#F0EDE8",s=18}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7,16 7,8 15,8"/><polyline points="17,8 17,16 9,16"/>
      <polyline points="5,12 7,8 9,12"/><polyline points="15,12 17,16 19,12"/>
    </svg>
  ),
  Pin: ({c="#F0EDE8",s=16}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12,2 C8.7,2 6,4.7 6,8 C6,13 12,22 12,22 C12,22 18,13 18,8 C18,4.7 15.3,2 12,2 Z"/>
      <circle cx="12" cy="8" r="2.5"/>
    </svg>
  ),
  Train: ({c="#F0EDE8",s=16}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="4"/>
      <line x1="3" y1="13" x2="21" y2="13"/>
      <line x1="8" y1="18" x2="6" y2="22"/><line x1="16" y1="18" x2="18" y2="22"/>
      <circle cx="7.5" cy="16.5" r="1" fill={c}/><circle cx="16.5" cy="16.5" r="1" fill={c}/>
    </svg>
  ),
  Clock: ({c="#F0EDE8",s=14}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12,7 12,12 15,14"/>
    </svg>
  ),
  Walk: ({c="#F0EDE8",s=14}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="2"/>
      <path d="M13,6 L12,13 M9,11 L12,9 L15,11 M12,13 L10,18 M12,13 L14,18"/>
    </svg>
  ),
  Exit: ({c="#F0EDE8",s=14}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4,3 L4,21 L15,21 L15,3 Z"/>
      <polyline points="11,12 20,12 17,9"/><polyline points="17,15 20,12"/>
    </svg>
  ),
  Info: ({c="#F0EDE8",s=14}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="11" x2="12" y2="16"/>
      <circle cx="12" cy="8" r="0.8" fill={c}/>
    </svg>
  ),
  Chevron: ({c="#F0EDE8",s=16}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,6 15,12 9,18"/>
    </svg>
  ),
  Phone: ({c="#F0EDE8",s=16}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6,3 C4,3 3,5 3,6 C3,11 8,17 13,19 C15,20 17,20 18,18 L20,16 C20,15 19,14 19,14 L16,12 C15,12 15,13 14,13 C12,13 11,11 11,10 C11,9 12,9 12,8 L10,5 C10,4 8,3 6,3 Z"/>
    </svg>
  ),
};

// ─── STATION PICKER SHEET ──────────────────────────────────────────────────
function StationSheet({ open, onClose, onSelect, exclude, lang }) {
  const [q, setQ] = useState("");
  const filtered = STATIONS.filter(s =>
    s.id !== exclude &&
    (s.name.toLowerCase().includes(q.toLowerCase()) ||
     s.nameHi.includes(q))
  );

  if (!open) return null;
  return (
    <div style={{ position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
      <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.7)" }} onClick={onClose}/>
      <div style={{ position:"relative",background:C.surface,borderRadius:"20px 20px 0 0",maxHeight:"80dvh",display:"flex",flexDirection:"column",maxWidth:430,width:"100%",margin:"0 auto" }}>
        <div style={{ padding:"16px 20px 12px",borderBottom:`1px solid ${C.border}` }}>
          <div style={{ width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px" }}/>
          <input
            autoFocus value={q} onChange={e=>setQ(e.target.value)}
            placeholder={lang==="HI"?"स्टेशन खोजें...":"Search station..."}
            style={{ ...css.input, padding:"12px 16px", fontSize:14 }}
          />
        </div>
        <div style={{ overflowY:"auto",WebkitOverflowScrolling:"touch" }}>
          {filtered.map(s => (
            <div key={s.id} style={css.stationRow(false)} onClick={()=>{ onSelect(s); onClose(); setQ(""); }}>
              <div style={{ width:8,height:8,borderRadius:"50%",background:C.accent,flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14,fontWeight:500,color:C.text }}>{lang==="HI"?s.nameHi:s.name}</div>
                <div style={{ fontSize:11,color:C.muted }}>Zone {s.zone}{s.isTourist?" · Tourist Station":""}{s.isInterchange?" · Interchange":""}</div>
              </div>
              {s.isTourist && <div style={{ fontSize:10,color:C.accent,border:`1px solid ${C.accent}40`,borderRadius:4,padding:"2px 6px" }}>TOURIST</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROUTE RESULT ─────────────────────────────────────────────────────────
function RouteResult({ route, lang, onStationTap, onStartJourney }) {
  if (!route) return null;
  return (
    <div style={{ marginTop:16, animation:"fadeUp 300ms ease" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* summary */}
      <div style={{ ...css.card, background:`linear-gradient(135deg,${C.card},${C.surface})`, borderColor:`${C.accent}30` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
          <div>
            <div style={{ fontSize:12,color:C.muted,marginBottom:4 }}>
              {lang==="HI"?route.forward?"बड़ी चौपड़ की ओर":"मानसरोवर की ओर":route.direction}
            </div>
            <div style={{ fontSize:16,fontWeight:600,color:C.text }}>
              {lang==="HI"?route.stops[0].nameHi:route.stops[0].name} → {lang==="HI"?route.stops.at(-1).nameHi:route.stops.at(-1).name}
            </div>
          </div>
        </div>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          {[
            { val:`${route.stopCount} stops`, label:lang==="HI"?"स्टेशन":"stops" },
            { val:`~${route.minutes} min`, label:lang==="HI"?"मिनट (अनुमानित)":"est." },
            { val:`₹${route.fare}`, label:lang==="HI"?"टोकन":"token" },
            { val:`₹${route.smartFare}`, label:lang==="HI"?"स्मार्ट कार्ड":"smart card" },
          ].map(i=>(
            <div key={i.val} style={{ background:C.surface,borderRadius:8,padding:"8px 12px",border:`1px solid ${C.border}`,textAlign:"center",flex:"1 0 auto" }}>
              <div style={{ fontSize:16,fontWeight:700,color:C.accent,fontFamily:"'Cormorant Garamond',Georgia,serif" }}>{i.val}</div>
              <div style={{ fontSize:10,color:C.muted,marginTop:1 }}>{i.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* stops */}
      <div style={css.card}>
        <div style={css.sectionLabel}>{lang==="HI"?"स्टॉप":"STOPS"}</div>
        {route.stops.map((s,i)=>{
          const isFirst = i===0, isLast = i===route.stops.length-1;
          return (
            <div key={s.id} style={{ display:"flex",gap:12,cursor:"pointer" }} onClick={()=>onStationTap(s)}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",width:16,flexShrink:0 }}>
                <div style={{ width:2,height:i===0?0:12,background:`${C.accent}40` }}/>
                <div style={{ width:isFirst||isLast?12:8,height:isFirst||isLast?12:8,borderRadius:"50%",background:isFirst?C.green:isLast?C.accent:C.border,border:`2px solid ${isFirst?C.green:isLast?C.accent:C.muted}`,flexShrink:0 }}/>
                <div style={{ width:2,flex:1,background:`${C.accent}40`,minHeight:8 }}/>
              </div>
              <div style={{ paddingBottom:12,flex:1 }}>
                <div style={{ fontSize:14,fontWeight:isFirst||isLast?600:400,color:isFirst||isLast?C.text:C.sub }}>
                  {lang==="HI"?s.nameHi:s.name}
                  {isFirst&&<span style={{ fontSize:10,color:C.green,marginLeft:6,background:`${C.green}20`,padding:"1px 6px",borderRadius:4 }}>BOARD</span>}
                  {isLast&&<span style={{ fontSize:10,color:C.accent,marginLeft:6,background:`${C.accent}20`,padding:"1px 6px",borderRadius:4 }}>EXIT</span>}
                </div>
                {(isFirst||isLast)&&<div style={{ fontSize:11,color:C.muted }}>Zone {s.zone}</div>}
              </div>
            </div>
          );
        })}
      </div>

      <button style={css.btn("primary")} onClick={onStartJourney}>
        {lang==="HI"?"यात्रा शुरू करें":"Start Live Journey"}
      </button>
      <div style={{ textAlign:"center",fontSize:11,color:C.muted,marginTop:8 }}>
        {lang==="HI"?"अनुमानित समय · JMRC की आधिकारिक ऐप नहीं":"Estimated times · Not an official JMRC app"}
      </div>
    </div>
  );
}

// ─── LIVE JOURNEY ─────────────────────────────────────────────────────────
function LiveJourney({ route, lang, onEnd }) {
  const [cur, setCur] = useState(0);
  const [secs, setSecs] = useState(route.stops[0].timeToNext);
  const done = cur >= route.stops.length - 1;

  useEffect(()=>{
    if (done) return;
    const t = setInterval(()=>{
      setSecs(s=>{
        if (s <= 1) {
          setCur(c=>{ const next=c+1; setSecs(route.stops[next]?.timeToNext||0); return next; });
          return 0;
        }
        return s-1;
      });
    },1000);
    return ()=>clearInterval(t);
  },[cur,done]);

  const curStation = route.stops[cur];
  const nextStation = route.stops[cur+1];
  const progress = (cur / (route.stops.length-1)) * 100;

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100dvh",background:C.bg }}>
      {/* header */}
      <div style={{ ...css.header, background:C.surface }}>
        <button onClick={onEnd} style={{ background:"none",border:"none",cursor:"pointer",padding:8,marginLeft:-8,display:"flex",alignItems:"center",gap:6,color:C.muted,fontFamily:"'DM Sans',sans-serif",fontSize:13 }}>
          <Icon.Back c={C.muted}/>
          {lang==="HI"?"यात्रा समाप्त करें":"End Journey"}
        </button>
        <div style={{ fontSize:11,color:C.muted,fontStyle:"italic" }}>
          {lang==="HI"?"अनुमानित • लाइव नहीं":"Simulated • Not live"}
        </div>
      </div>

      <div style={{ flex:1,padding:"20px 16px",overflowY:"auto" }}>
        {/* progress bar */}
        <div style={{ height:3,background:C.border,borderRadius:2,marginBottom:20,overflow:"hidden" }}>
          <div style={{ height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.green},${C.accent})`,borderRadius:2,transition:"width 600ms ease" }}/>
        </div>

        {done ? (
          <div style={{ textAlign:"center",padding:"40px 0" }}>
            <div style={{ width:64,height:64,borderRadius:"50%",background:`${C.green}20`,border:`2px solid ${C.green}`,margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round"><polyline points="5,12 9,17 19,7"/></svg>
            </div>
            <div style={{ fontSize:20,fontFamily:"'Cormorant Garamond',Georgia,serif",marginBottom:6 }}>
              {lang==="HI"?"आप पहुँच गए!":"You have arrived!"}
            </div>
            <div style={{ fontSize:14,color:C.muted,marginBottom:20 }}>
              {lang==="HI"?curStation.nameHi:curStation.name}
            </div>
            {EXITS[curStation.id]&&(
              <div style={{ ...css.card,textAlign:"left" }}>
                <div style={css.sectionLabel}>{lang==="HI"?"निकास मार्गदर्शन":"EXIT GUIDANCE"}</div>
                {EXITS[curStation.id].map(e=>(
                  <div key={e} style={{ fontSize:13,color:C.sub,padding:"6px 0",borderBottom:`1px solid ${C.border}` }}>
                    <span style={{ color:C.accent,fontWeight:600 }}>{e.split("→")[0]}</span>→{e.split("→")[1]}
                  </div>
                ))}
              </div>
            )}
            <button style={{ ...css.btn("primary"),marginTop:16 }} onClick={onEnd}>
              {lang==="HI"?"नई यात्रा प्लान करें":"Plan New Route"}
            </button>
          </div>
        ) : (
          <>
            {/* current station */}
            <div style={{ ...css.card,borderColor:`${C.accent}40`,marginBottom:16 }}>
              <div style={{ fontSize:11,color:C.muted,marginBottom:4 }}>{lang==="HI"?"अभी":"CURRENT STATION"}</div>
              <div style={{ fontSize:24,fontFamily:"'Cormorant Garamond',Georgia,serif",marginBottom:4 }}>
                {lang==="HI"?curStation.nameHi:curStation.name}
              </div>
              <div style={{ fontSize:12,color:C.muted }}>Zone {curStation.zone}</div>
            </div>

            {/* timer */}
            {nextStation&&(
              <div style={{ ...css.card,background:`${C.accent}10`,borderColor:`${C.accent}30`,textAlign:"center",marginBottom:16 }}>
                <div style={{ fontSize:11,color:C.muted,marginBottom:6 }}>{lang==="HI"?"अगला स्टेशन (अनुमानित)":"NEXT STATION (est.)"}</div>
                <div style={{ fontSize:18,fontWeight:600,marginBottom:4 }}>{lang==="HI"?nextStation.nameHi:nextStation.name}</div>
                <div style={{ fontSize:32,fontFamily:"'Cormorant Garamond',Georgia,serif",color:C.accent }}>
                  {Math.floor(secs/60)}:{String(secs%60).padStart(2,"0")}
                </div>
                <div style={{ fontSize:11,color:C.muted,marginTop:4 }}>{lang==="HI"?"मिनट में पहुँचेंगे":"minutes remaining"}</div>
              </div>
            )}

            {/* stops list */}
            <div style={css.card}>
              <div style={css.sectionLabel}>{lang==="HI"?"सभी स्टॉप":"ALL STOPS"}</div>
              {route.stops.map((s,i)=>(
                <div key={s.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`,opacity:i<cur?0.35:1 }}>
                  <div style={{ width:8,height:8,borderRadius:"50%",background:i===cur?C.accent:i<cur?C.muted:C.border,flexShrink:0 }}/>
                  <div style={{ flex:1,fontSize:13,color:i===cur?C.text:i<cur?C.muted:C.sub,fontWeight:i===cur?600:400 }}>
                    {lang==="HI"?s.nameHi:s.name}
                  </div>
                  {i<cur&&<svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2"><polyline points="5,12 9,17 19,7"/></svg>}
                  {i===cur&&<div style={{ fontSize:10,color:C.accent }}>●</div>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── STATION DETAIL ────────────────────────────────────────────────────────
function StationDetail({ station, lang, onBack, onRouteFrom, onRouteTo }) {
  const attractions = ATTRACTIONS[station.id] || [];
  const exits = EXITS[station.id] || [];
  return (
    <div style={{ background:C.bg,minHeight:"100dvh" }}>
      <div style={{ ...css.header }}>
        <button onClick={onBack} style={{ background:"none",border:"none",cursor:"pointer",padding:"8px 0",display:"flex",alignItems:"center",gap:8,color:C.text,fontFamily:"'DM Sans',sans-serif",fontSize:14 }}>
          <Icon.Back/> {lang==="HI"?"वापस":"Back"}
        </button>
        {station.isTourist&&<div style={{ fontSize:10,color:C.accent,border:`1px solid ${C.accent}40`,borderRadius:4,padding:"3px 8px",letterSpacing:1 }}>TOURIST STATION</div>}
      </div>

      <div style={css.scrollArea}>
        {/* name */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:28,fontFamily:"'Cormorant Garamond',Georgia,serif",lineHeight:1.2,marginBottom:4 }}>
            {lang==="HI"?station.nameHi:station.name}
          </div>
          <div style={{ fontSize:13,color:C.muted,display:"flex",gap:8,flexWrap:"wrap" }}>
            <span>Zone {station.zone}</span>
            {station.isTerminus&&<span style={{ color:C.gold }}>· Terminus</span>}
            {station.isInterchange&&<span style={{ color:C.accent }}>· Interchange</span>}
          </div>
        </div>

        {/* metro info */}
        <div style={css.card}>
          <div style={css.sectionLabel}>{lang==="HI"?"मेट्रो जानकारी":"METRO INFO"}</div>
          <div style={{ display:"flex",gap:0 }}>
            {[
              {icon:<Icon.Clock c={C.accent} s={14}/>, label:lang==="HI"?"पहली":"First",  val:"5:50 AM"},
              {icon:<Icon.Clock c={C.muted}  s={14}/>, label:lang==="HI"?"आखिरी":"Last",   val:"11:00 PM"},
              {icon:<Icon.Train c={C.gold}   s={14}/>, label:lang==="HI"?"फ्रीक्वेंसी":"Freq", val:"7–10 min"},
            ].map((i,idx)=>(
              <div key={idx} style={{ flex:1,padding:"10px 8px",borderRight:idx<2?`1px solid ${C.border}`:"none",textAlign:"center" }}>
                <div style={{ display:"flex",justifyContent:"center",marginBottom:4 }}>{i.icon}</div>
                <div style={{ fontSize:10,color:C.muted,marginBottom:2 }}>{i.label}</div>
                <div style={{ fontSize:13,fontWeight:600,color:C.text }}>{i.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* exits */}
        {exits.length>0&&(
          <div style={css.card}>
            <div style={css.sectionLabel}>{lang==="HI"?"निकास मार्गदर्शन":"EXIT GUIDE"}</div>
            {exits.map(e=>(
              <div key={e} style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 0",borderBottom:`1px solid ${C.border}` }}>
                <Icon.Exit c={C.accent} s={14}/>
                <div style={{ fontSize:13,color:C.sub }}>
                  <span style={{ color:C.accent,fontWeight:600 }}>{e.split("→")[0].trim()}</span>
                  <span style={{ color:C.muted }}> → </span>
                  <span>{e.split("→")[1]?.trim()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* attractions */}
        {attractions.length>0&&(
          <>
            <div style={{ ...css.sectionLabel,marginTop:4 }}>{lang==="HI"?"पास के आकर्षण":"NEARBY ATTRACTIONS"}</div>
            {attractions.map(a=>(
              <div key={a.name} style={{ ...css.card,borderLeft:`3px solid ${C.accent}`,marginBottom:10 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                  <div>
                    <div style={{ fontSize:15,fontWeight:600,marginBottom:2 }}>{lang==="HI"?a.nameHi:a.name}</div>
                    <div style={{ fontSize:11,color:C.muted }}>{a.category}</div>
                  </div>
                  <div style={{ fontSize:11,color:C.accent,border:`1px solid ${C.accent}40`,borderRadius:4,padding:"2px 8px",fontWeight:600,fontFamily:"monospace" }}>
                    {a.exit}
                  </div>
                </div>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:10 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:4,fontSize:12,color:C.sub }}>
                    <Icon.Walk c={C.sub} s={13}/>{a.walk} walk
                  </div>
                  <div style={{ fontSize:12,color:C.sub }}>· {a.fee}</div>
                </div>
                <div style={{ borderLeft:`2px solid ${C.gold}`,paddingLeft:10,fontSize:12,color:C.muted,fontStyle:"italic",lineHeight:1.5 }}>
                  "{a.tip}"
                </div>
              </div>
            ))}
          </>
        )}

        {/* actions */}
        <div style={{ display:"flex",gap:8,marginTop:8 }}>
          <button style={{ ...css.btn("ghost"),flex:1,height:44,fontSize:13 }} onClick={()=>onRouteFrom(station)}>
            {lang==="HI"?"यहाँ से":"From Here"}
          </button>
          <button style={{ ...css.btn("primary"),flex:1,height:44,fontSize:13 }} onClick={()=>onRouteTo(station)}>
            {lang==="HI"?"यहाँ तक":"To Here"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── EXPLORE TAB ──────────────────────────────────────────────────────────
function ExploreTab({ lang, onStationTap }) {
  const touristStations = STATIONS.filter(s=>s.isTourist);
  return (
    <div style={css.scrollArea}>
      <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,marginBottom:4 }}>
        {lang==="HI"?"जयपुर खोजें":"Explore Jaipur"}
      </div>
      <div style={{ fontSize:13,color:C.muted,marginBottom:20 }}>
        {lang==="HI"?"मेट्रो से पर्यटन स्थल":"Tourist spots reachable by metro"}
      </div>

      <div style={css.sectionLabel}>{lang==="HI"?"पर्यटन स्टेशन":"TOURIST STATIONS"}</div>
      {touristStations.map(s=>{
        const atts = ATTRACTIONS[s.id]||[];
        return (
          <div key={s.id} style={{ ...css.card,cursor:"pointer",borderLeft:`3px solid ${C.accent}` }} onClick={()=>onStationTap(s)}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
              <div>
                <div style={{ fontSize:16,fontWeight:600,marginBottom:2 }}>{lang==="HI"?s.nameHi:s.name}</div>
                <div style={{ fontSize:12,color:C.muted,marginBottom:8 }}>Zone {s.zone}{s.isInterchange?" · Interchange":""}</div>
                <div style={{ fontSize:12,color:C.sub }}>
                  {atts.map(a=>lang==="HI"?a.nameHi:a.name).join(" · ")||"Station info available"}
                </div>
              </div>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6 }}>
                <div style={{ fontSize:10,color:C.accent,border:`1px solid ${C.accent}40`,borderRadius:4,padding:"2px 8px" }}>{atts.length} spots</div>
                <Icon.Chevron c={C.muted}/>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SAFETY TAB ───────────────────────────────────────────────────────────
function SafetyTab({ lang }) {
  const [open, setOpen] = useState(null);
  const contacts = [
    { name:"Metro Helpline",   nameHi:"मेट्रो हेल्पलाइन",   num:"18001806236", available:"24/7" },
    { name:"Tourist Helpline", nameHi:"टूरिस्ट हेल्पलाइन",  num:"1364",        available:"24/7" },
    { name:"Police",           nameHi:"पुलिस",               num:"100",         available:"24/7" },
    { name:"Ambulance",        nameHi:"एम्बुलेंस",            num:"108",         available:"24/7" },
    { name:"Women Helpline",   nameHi:"महिला हेल्पलाइन",    num:"1091",        available:"24/7" },
  ];
  const tips = [
    { title:"Auto Rickshaw Fares", titleHi:"ऑटो किराया", body:"Inside old city ₹30–80. Prepaid autos at Railway Station. Always agree on fare before boarding. ₹100 max within Pink City." },
    { title:"At Metro Stations",   titleHi:"मेट्रो स्टेशन पर", body:"Keep token ready at exit gates. Women's coach is the first coach from Mansarovar end. No photography inside trains." },
    { title:"Bazaar Shopping",     titleHi:"बाज़ार में खरीदारी", body:"Bargain to 60% of asking price — it is expected. Avoid touts near Hawa Mahal offering free tours." },
    { title:"Weather & Health",    titleHi:"मौसम और स्वास्थ्य", body:"Carry water May–September. Best months: October–March. Chemists open until 10 PM near Sindhi Camp." },
  ];

  return (
    <div style={css.scrollArea}>
      <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,marginBottom:4 }}>
        {lang==="HI"?"सुरक्षा और सहायता":"Safety & Help"}
      </div>
      <div style={{ fontSize:13,color:C.muted,marginBottom:20 }}>
        {lang==="HI"?"आपातकालीन नंबर और सुझाव":"Emergency contacts and travel tips"}
      </div>

      <div style={css.sectionLabel}>{lang==="HI"?"आपातकालीन नंबर":"EMERGENCY CONTACTS"}</div>
      {contacts.map(c=>(
        <a key={c.num} href={`tel:${c.num}`} style={{ textDecoration:"none" }}>
          <div style={{ ...css.card,display:"flex",alignItems:"center",gap:12,marginBottom:8,cursor:"pointer" }}>
            <div style={{ width:40,height:40,borderRadius:"50%",background:`${C.accent}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <Icon.Phone c={C.accent} s={16}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14,fontWeight:500,color:C.text }}>{lang==="HI"?c.nameHi:c.name}</div>
              <div style={{ fontSize:13,color:C.accent,fontFamily:"monospace",fontWeight:600 }}>{c.num}</div>
            </div>
            <div style={{ fontSize:10,color:C.green,border:`1px solid ${C.green}40`,borderRadius:4,padding:"2px 6px" }}>{c.available}</div>
          </div>
        </a>
      ))}

      <div style={{ ...css.sectionLabel,marginTop:16 }}>{lang==="HI"?"सुरक्षा सुझाव":"TRAVEL TIPS"}</div>
      {tips.map((t,i)=>(
        <div key={t.title} style={{ ...css.card,marginBottom:8,cursor:"pointer" }} onClick={()=>setOpen(open===i?null:i)}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div style={{ fontSize:14,fontWeight:500 }}>{lang==="HI"?t.titleHi:t.title}</div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" style={{ transform:open===i?"rotate(90deg)":"none",transition:"transform 200ms" }}>
              <polyline points="9,6 15,12 9,18"/>
            </svg>
          </div>
          {open===i&&<div style={{ fontSize:13,color:C.muted,marginTop:10,lineHeight:1.6,borderTop:`1px solid ${C.border}`,paddingTop:10 }}>{t.body}</div>}
        </div>
      ))}

      <div style={{ marginTop:24,padding:"14px 0",borderTop:`1px solid ${C.border}`,fontSize:11,color:C.muted,textAlign:"center",lineHeight:1.8 }}>
        {lang==="HI"
          ? "यह JMRC की आधिकारिक ऐप नहीं है\nसभी समय और किराए अनुमानित हैं"
          : "Unofficial app · Not affiliated with JMRC\nAll timings & fares are estimates · Verify at station"}
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function JaipurRide() {
  const [lang, setLang]           = useState("EN");
  const [mode, setMode]           = useState("COM");
  const [tab, setTab]             = useState("route");
  const [from, setFrom]           = useState(null);
  const [to, setTo]               = useState(null);
  const [sheet, setSheet]         = useState(null); // "from"|"to"
  const [route, setRoute]         = useState(null);
  const [journeyRoute, setJourneyRoute] = useState(null);
  const [detailStation, setDetailStation] = useState(null);

  const cycleMode = () => setMode(m => m==="COM"?"TOUR":"COM");
  const cycleLang = () => setLang(l => l==="EN"?"HI":"EN");

  useEffect(()=>{
    if (from&&to) setRoute(calcRoute(from.id,to.id));
  },[from,to]);

  const handleSwap = () => { setFrom(to); setTo(from); };
  const handleStationTap = (s) => setDetailStation(s);
  const handleRouteFrom = (s) => { setFrom(s); setTab("route"); setDetailStation(null); };
  const handleRouteTo   = (s) => { setTo(s);   setTab("route"); setDetailStation(null); };

  // ── Live Journey ────────────────────────────────────────────────────────
  if (journeyRoute) {
    return (
      <div style={css.app}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
        <LiveJourney route={journeyRoute} lang={lang} onEnd={()=>setJourneyRoute(null)}/>
      </div>
    );
  }

  // ── Station Detail ───────────────────────────────────────────────────────
  if (detailStation) {
    return (
      <div style={css.app}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
        <StationDetail station={detailStation} lang={lang} onBack={()=>setDetailStation(null)} onRouteFrom={handleRouteFrom} onRouteTo={handleRouteTo}/>
      </div>
    );
  }

  const TABS = mode==="TOUR"
    ? [["route","Route",Icon.Route],["explore","Explore",Icon.Explore],["stations","Stations",Icon.Stations],["safety","Safety",Icon.Safety]]
    : [["route","Route",Icon.Route],["stations","Stations",Icon.Stations],["safety","Safety",Icon.Safety]];

  return (
    <div style={css.app}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        body{margin:0;background:#0D0D0D}
        input::placeholder{color:#6B6560}
        input{-webkit-appearance:none}
        ::-webkit-scrollbar{display:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── HEADER ── */}
      <div style={css.header}>
        <div style={css.logo}>
          Jaipur<span style={css.logoAccent}>Ride</span>
        </div>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          {/* mode toggle */}
          <div style={{ display:"flex",background:C.card,borderRadius:20,border:`1px solid ${C.border}`,overflow:"hidden" }}>
            {["COM","TOUR"].map(m=>(
              <button key={m} onClick={cycleMode} style={{ padding:"5px 12px",border:"none",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"'DM Sans',sans-serif",background:mode===m?`${C.accent}25`:"transparent",color:mode===m?C.accent:C.muted,transition:"all 200ms",letterSpacing:0.5 }}>
                {m}
              </button>
            ))}
          </div>
          {/* language */}
          <button onClick={cycleLang} style={css.pill(false)}>
            {lang==="EN"?"EN":"हि"}
          </button>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ height:`calc(100dvh - 57px - 60px)`,overflowY:"auto",WebkitOverflowScrolling:"touch" }}>

        {/* ROUTE TAB */}
        {tab==="route"&&(
          <div style={{ padding:"24px 16px 88px" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:28,marginBottom:4,animation:"fadeUp 400ms ease" }}>
              {lang==="HI"?"अपनी यात्रा प्लान करें":"Plan Your Journey"}
            </div>
            <div style={{ fontSize:12,color:C.muted,marginBottom:24,animation:"fadeUp 400ms ease 60ms both" }}>
              {lang==="HI"?"पिंक लाइन · 11 स्टेशन":"Pink Line · 11 Stations · Mansarovar ↔ Badi Chaupar"}
            </div>

            {/* inputs */}
            <div style={{ position:"relative",animation:"fadeUp 400ms ease 120ms both" }}>
              {/* from */}
              <div style={{ position:"relative",marginBottom:4 }}>
                <div style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}>
                  <div style={{ width:8,height:8,borderRadius:"50%",background:C.green }}/>
                </div>
                <div style={{ ...css.input,display:"flex",alignItems:"center",userSelect:"none" }} onClick={()=>setSheet("from")}>
                  {from
                    ? <span style={{ color:C.text,fontSize:15 }}>{lang==="HI"?from.nameHi:from.name}</span>
                    : <span style={{ color:C.muted,fontSize:15 }}>{lang==="HI"?"यहाँ से — कहाँ से?":"From — Starting Station"}</span>
                  }
                </div>
              </div>

              {/* swap */}
              <div style={{ display:"flex",alignItems:"center",gap:10,padding:"4px 14px",marginBottom:4 }}>
                <div style={{ flex:1,height:1,background:C.border }}/>
                <button onClick={handleSwap} style={{ width:32,height:32,borderRadius:"50%",background:C.card,border:`1px solid ${C.border}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <Icon.Swap c={C.muted}/>
                </button>
                <div style={{ flex:1,height:1,background:C.border }}/>
              </div>

              {/* to */}
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}>
                  <div style={{ width:8,height:8,borderRadius:"50%",background:C.accent }}/>
                </div>
                <div style={{ ...css.input,display:"flex",alignItems:"center",userSelect:"none" }} onClick={()=>setSheet("to")}>
                  {to
                    ? <span style={{ color:C.text,fontSize:15 }}>{lang==="HI"?to.nameHi:to.name}</span>
                    : <span style={{ color:C.muted,fontSize:15 }}>{lang==="HI"?"यहाँ तक — कहाँ जाना है?":"To — Destination Station"}</span>
                  }
                </div>
              </div>
            </div>

            {/* quick explore chips — tourist mode only */}
            {mode==="TOUR"&&(
              <div style={{ marginTop:20,animation:"fadeUp 400ms ease 180ms both" }}>
                <div style={css.sectionLabel}>{lang==="HI"?"पर्यटन स्थल":"POPULAR WITH TOURISTS"}</div>
                <div style={{ display:"flex",gap:8,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none" }}>
                  {STATIONS.filter(s=>s.isTourist).map(s=>(
                    <button key={s.id} onClick={()=>handleStationTap(s)} style={{ flexShrink:0,padding:"8px 14px",borderRadius:20,border:`1px solid ${C.border}`,background:C.card,color:C.sub,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap" }}>
                      {lang==="HI"?s.nameHi:s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* route result */}
            <RouteResult route={route} lang={lang} onStationTap={handleStationTap} onStartJourney={()=>route&&setJourneyRoute(route)}/>

            {!route&&(
              <div style={{ marginTop:20,padding:20,borderRadius:14,border:`1px dashed ${C.border}`,textAlign:"center",color:C.muted,fontSize:13,animation:"fadeUp 400ms ease 200ms both" }}>
                {lang==="HI"?"स्टेशन चुनें और सबसे तेज़ रूट देखें":"Select stations to see the fastest route"}
              </div>
            )}
          </div>
        )}

        {/* EXPLORE TAB */}
        {tab==="explore"&&<ExploreTab lang={lang} onStationTap={handleStationTap}/>}

        {/* STATIONS TAB */}
        {tab==="stations"&&(
          <div style={css.scrollArea}>
            <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,marginBottom:4 }}>
              {lang==="HI"?"सभी स्टेशन":"All Stations"}
            </div>
            <div style={{ fontSize:13,color:C.muted,marginBottom:20 }}>
              {lang==="HI"?"पिंक लाइन · मानसरोवर ↔ बड़ी चौपड़":"Pink Line · Mansarovar ↔ Badi Chaupar"}
            </div>
            {STATIONS.map((s,i)=>{
              const prevZone = i>0?STATIONS[i-1].zone:null;
              return (
                <div key={s.id}>
                  {s.zone!==prevZone&&(
                    <div style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 0",marginBottom:4 }}>
                      <div style={{ flex:1,height:1,background:C.border }}/>
                      <span style={{ fontSize:10,color:C.muted,letterSpacing:2,textTransform:"uppercase" }}>Zone {s.zone}</span>
                      <div style={{ flex:1,height:1,background:C.border }}/>
                    </div>
                  )}
                  <div style={css.stationRow(false)} onClick={()=>handleStationTap(s)}>
                    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",width:20,flexShrink:0 }}>
                      {i>0&&<div style={{ width:2,height:8,background:`${C.accent}40` }}/>}
                      <div style={{ width:s.isInterchange?14:10,height:s.isInterchange?14:10,borderRadius:"50%",background:s.isTerminus?C.accent:s.isInterchange?C.gold:C.border,border:`2px solid ${s.isTerminus?C.accent:s.isInterchange?C.gold:C.muted}`,flexShrink:0 }}/>
                      {i<STATIONS.length-1&&<div style={{ width:2,height:8,background:`${C.accent}40` }}/>}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14,fontWeight:500,color:C.text }}>
                        {lang==="HI"?s.nameHi:s.name}
                      </div>
                      <div style={{ fontSize:11,color:C.muted,marginTop:1 }}>
                        {s.isInterchange&&<span style={{ color:C.gold }}>Interchange · </span>}
                        {s.isTourist&&<span style={{ color:C.accent }}>Tourist Station · </span>}
                        {s.isTerminus&&<span>Terminus</span>}
                      </div>
                    </div>
                    <Icon.Chevron c={C.muted} s={14}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SAFETY TAB */}
        {tab==="safety"&&<SafetyTab lang={lang}/>}
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={css.navBar}>
        {TABS.map(([id,label,Ic])=>(
          <button key={id} style={css.navTab(tab===id)} onClick={()=>setTab(id)}>
            <Ic c={tab===id?C.accent:C.muted} s={20}/>
            <span>{lang==="HI"?{route:"रूट",explore:"एक्सप्लोर",stations:"स्टेशन",safety:"सुरक्षा"}[id]:label}</span>
          </button>
        ))}
      </div>

      {/* ── STATION PICKER SHEETS ── */}
      <StationSheet open={sheet==="from"} onClose={()=>setSheet(null)} onSelect={s=>{ setFrom(s); setSheet(null); }} exclude={to?.id} lang={lang}/>
      <StationSheet open={sheet==="to"}   onClose={()=>setSheet(null)} onSelect={s=>{ setTo(s);   setSheet(null); }} exclude={from?.id} lang={lang}/>
    </div>
  );
}
