// Orange Foods LLC — v3.1 (pre-launch brand site, all business segments)
import { useState, useEffect } from "react";

// ── Change this to the inbox you actually check ─────────────────────────────
const CONTACT_EMAIL = "founders@orangefoodsllc.com";

// ── Pricing model ───────────────────────────────────────────────────────────
// Suggested retail (SRP) is set against current market prices (Oct 2026).
// Retailer wholesale = SRP less a 30% retailer margin (typical grocery band is 25–30%).
const RETAIL_MARGIN = 0.30;
const money = (n) => `$${n.toFixed(2)}`;
const wholesale = (srp) => Math.round(srp * (1 - RETAIL_MARGIN) * 100) / 100;

const T = {
  cream:"#FAF7F2", parchment:"#F2EDE3", orange:"#E07B28", orangeD:"#C4651A",
  orangeL:"#F9A05C", green:"#2A5C45", greenL:"#3D7A5E", greenXL:"#EAF2EC",
  lake:"#1E4E6E", lakeD:"#12324A", bark:"#5C3D1E", stone:"#6E6052", charcoal:"#1E1E1E",
  white:"#FFFFFF", gold:"#C9A84C", tallow:"#B8862F",
};

const fontLink = `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600;700&display=swap`;

const G = `
  @import url('${fontLink}');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { background:${T.cream}; color:${T.charcoal}; font-family:'Jost',sans-serif; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
  a { color:inherit; }
  @keyframes marquee { from{transform:translateX(0);}to{transform:translateX(-50%);} }
  @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:.45;} }
  .serif { font-family:'Cormorant Garamond',serif; }
  .wrap { max-width:1160px; margin:0 auto; }
  .sec { padding:88px 28px; }
  .label { font-size:11px; font-weight:600; letter-spacing:.22em; text-transform:uppercase; color:${T.orange}; display:flex; align-items:center; gap:10px; margin-bottom:14px; }
  .label::before { content:''; width:32px; height:2px; background:currentColor; }
  .h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(42px,7vw,84px); line-height:1; font-weight:600; }
  .h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(32px,4.6vw,52px); line-height:1.06; font-weight:600; }
  .lead { font-size:16px; line-height:1.8; color:${T.stone}; max-width:640px; }
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; border-radius:40px; padding:14px 28px; font-family:'Jost',sans-serif; font-size:13px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; transition:all .25s ease; text-decoration:none; border:2px solid transparent; text-align:center; }
  .btn-o { background:${T.orange}; color:${T.white}; box-shadow:0 6px 24px ${T.orange}44; }
  .btn-o:hover { background:${T.orangeD}; transform:translateY(-2px); }
  .btn-l { background:transparent; color:${T.white}; border-color:rgba(255,255,255,.55); }
  .btn-l:hover { background:rgba(255,255,255,.12); transform:translateY(-2px); }
  .btn-g { background:transparent; color:${T.green}; border-color:${T.green}; }
  .btn-g:hover { background:${T.green}; color:${T.white}; }
  .card { background:${T.white}; border-radius:20px; padding:28px 24px; box-shadow:0 2px 18px rgba(0,0,0,.05); border:1px solid rgba(0,0,0,.04); }
  .pill { display:inline-flex; align-items:center; gap:6px; border-radius:20px; padding:5px 12px; font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
  .navlink { font-size:13px; font-weight:600; letter-spacing:.03em; text-decoration:none; transition:color .2s; white-space:nowrap; }
  .navlink:hover { color:${T.orange} !important; }
  .g2 { display:grid; grid-template-columns:1fr 1fr; gap:52px; align-items:center; }
  .g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .g4 { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
  .ptable { width:100%; border-collapse:collapse; font-size:14px; background:${T.white}; }
  .ptable th { text-align:left; font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:${T.stone}; font-weight:700; padding:12px 14px; border-bottom:2px solid ${T.parchment}; background:${T.cream}; }
  .ptable td { padding:14px; border-bottom:1px solid ${T.parchment}; vertical-align:top; }
  .ptable td.num, .ptable th.num { text-align:right; white-space:nowrap; font-variant-numeric:tabular-nums; }
  .tscroll { overflow-x:auto; border-radius:16px; border:1px solid rgba(0,0,0,.06); }
  .desk { display:flex; }
  .mob { display:none; }
  .founder { display:grid; grid-template-columns:auto 1fr; gap:44px; align-items:center; }
  @media (max-width:760px) { .founder { grid-template-columns:1fr; gap:26px; } }
  .tmob { display:none; }
  .prow { background:${T.white}; border:1px solid rgba(0,0,0,.06); border-radius:14px; padding:16px; margin-bottom:10px; }
  .pgrid { display:grid; grid-template-columns:1fr 1fr; gap:10px 14px; margin-top:12px; padding-top:12px; border-top:1px solid ${T.parchment}; }
  .pgrid div span { display:block; font-size:9px; letter-spacing:.12em; text-transform:uppercase; color:${T.stone}; font-weight:700; margin-bottom:2px; }
  @media (max-width:760px) { .tdesk { display:none; } .tmob { display:block; } }
  @media (max-width:1000px) { .desk { display:none !important; } .mob { display:flex; } }
  @media (max-width:860px) {
    .sec { padding:68px 20px; }
    .g2 { grid-template-columns:1fr; gap:30px; }
    .g3 { grid-template-columns:1fr; }
    .g4 { grid-template-columns:1fr 1fr; gap:12px; }
    .btns { flex-direction:column; align-items:stretch !important; }
  }
  @media (max-width:480px) { .g4 { grid-template-columns:1fr; } }
`;

// ── Routing (hash-based, so every link works on static hosting) ─────────────
const PAGES = [
  ["home","Home"], ["fish","Frozen Fish"], ["retail","Retail & Wholesale"], ["produce","Clean Produce"],
  ["caviar","Caviar"], ["verde","Verde Energy"], ["ohiofields","Ohio Fields"], ["company","About"], ["contact","Contact"],
];
const NAV = PAGES.filter(([k]) => !["home","contact"].includes(k));
const href = (key) => `#/${key}`;
const mail = (subject, body = "") => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

function useRoute() {
  const read = () => {
    const k = window.location.hash.replace(/^#\/?/, "");
    return PAGES.some(([p]) => p === k) ? k : "home";
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const h = () => { setRoute(read()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return route;
}

// ── Data ────────────────────────────────────────────────────────────────────
const RAW = [
  { sku:"OF-WF-16", name:"Walleye Fillets", spec:"Skinless, boneless, IQF, vacuum-sealed", size:"1 lb bag", srp:17.99, pack:10 },
  { sku:"OF-PF-16", name:"Yellow Perch Fillets", spec:"Skin-on, boneless, IQF, vacuum-sealed", size:"1 lb bag", srp:18.99, pack:10 },
];
const BREADED = [
  { sku:"OF-CW-12", name:"Crispy Walleye Fillets", spec:"Par-fried in 100% beef tallow · 4 fillets", size:"12 oz box", srp:12.99, pack:12 },
  { sku:"OF-CP-12", name:"Crispy Perch Fillets", spec:"Par-fried in 100% beef tallow · 6–8 fillets", size:"12 oz box", srp:11.99, pack:12 },
  { sku:"OF-FF-24", name:"Perch Fish Fry Pack", spec:"Par-fried in 100% beef tallow · family size", size:"1.5 lb bag", srp:21.99, pack:6 },
  { sku:"OF-SK-02", name:"Walleye Sandwich Kit", spec:"2 tallow-fried fillets, 2 brioche buns, 2 herb tartar cups", size:"2 sandwiches", srp:12.99, pack:8 },
];
const SAUCE = [
  { sku:"OF-HT-08", name:"Herb Tartar Sauce", spec:"Avocado-oil base, farm-grown dill, parsley & basil", size:"8 oz jar", srp:5.99, pack:12, note:"Refrigerated" },
];
const FOODSERVICE = [
  { sku:"FS-WF-10", name:"Walleye Fillets", spec:"Skinless, IQF, 4–6 oz portions", perLb:12.25, lbs:10 },
  { sku:"FS-PF-10", name:"Yellow Perch Fillets", spec:"Skin-on, IQF, fish-fry cut", perLb:12.75, lbs:10 },
  { sku:"FS-CW-10", name:"Breaded Walleye Portions", spec:"Par-fried in beef tallow, ~4 oz portions", perLb:10.95, lbs:10 },
];
const PRODUCE = [
  { sku:"OP-BL-01", name:"Living Butter Lettuce", spec:"Roots attached, clamshell", size:"1 head", srp:3.29, pack:12 },
  { sku:"OP-CU-01", name:"Cucumbers", spec:"Full-size slicing, indoor-grown", size:"each", srp:1.29, pack:24 },
  { sku:"OP-CT-10", name:"Cherry Tomatoes", spec:"Vine-ripened, indoor-grown", size:"10 oz pint", srp:3.99, pack:12 },
  { sku:"OP-BA-075", name:"Basil", spec:"Fresh-cut, clamshell", size:"0.75 oz", srp:2.99, pack:12 },
  { sku:"OP-DI-075", name:"Dill", spec:"Fresh-cut, clamshell", size:"0.75 oz", srp:2.99, pack:12 },
  { sku:"OP-PA-075", name:"Parsley", spec:"Fresh-cut, clamshell", size:"0.75 oz", srp:2.49, pack:12 },
];

// ── Shared UI ───────────────────────────────────────────────────────────────
function Logo({ ink }) {
  return (
    <a href={href("home")} style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
      <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${T.orange},${T.orangeD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>🍊</div>
      <div>
        <div className="serif" style={{ fontSize:19, fontWeight:700, color:ink, lineHeight:1 }}>Orange Foods</div>
        <div style={{ fontSize:8, letterSpacing:".2em", color:ink, opacity:.65, textTransform:"uppercase", marginTop:2 }}>Raised in Ohio</div>
      </div>
    </a>
  );
}

function Nav({ route, darkHero }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h(); window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => setOpen(false), [route]);
  const solid = scrolled || open || !darkHero;
  const ink = solid ? T.charcoal : T.white;
  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:68, padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", background:solid?"rgba(250,247,242,.97)":"transparent", backdropFilter:solid?"blur(14px)":"none", borderBottom:solid?"1px solid rgba(0,0,0,.07)":"none", transition:"all .3s ease" }}>
        <Logo ink={ink} />
        <div className="desk" style={{ gap:22, alignItems:"center" }}>
          {NAV.map(([k,l]) => <a key={k} href={href(k)} className="navlink" style={{ color:route===k?T.orange:ink }}>{l}</a>)}
          <a href={href("contact")} className="btn btn-o" style={{ padding:"10px 18px", fontSize:12 }}>Contact</a>
        </div>
        <button className="mob" onClick={() => setOpen(o=>!o)} aria-label="Open menu" style={{ flexDirection:"column", gap:5, background:"none", border:"none", cursor:"pointer", padding:6 }}>
          {[0,1,2].map(i => <span key={i} style={{ display:"block", width:22, height:2, background:ink, borderRadius:2 }} />)}
        </button>
      </nav>
      {open && (
        <div style={{ position:"fixed", top:68, left:0, right:0, zIndex:99, background:"rgba(250,247,242,.99)", padding:"6px 24px 24px", borderBottom:"1px solid rgba(0,0,0,.07)", maxHeight:"calc(100vh - 68px)", overflowY:"auto" }}>
          {PAGES.map(([k,l]) => <a key={k} href={href(k)} style={{ display:"block", fontSize:17, fontWeight:500, padding:"13px 0", borderBottom:"1px solid rgba(0,0,0,.06)", textDecoration:"none", color:route===k?T.orange:T.charcoal }}>{l}</a>)}
        </div>
      )}
    </>
  );
}

function PageHero({ label, title, accent, sub, bg, children }) {
  return (
    <section style={{ background:bg, color:T.white, padding:"150px 28px 84px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 88% 15%,${T.orange}30 0%,transparent 45%)` }} />
      <div className="wrap" style={{ position:"relative" }}>
        <div className="label" style={{ color:T.orangeL }}>{label}</div>
        <h1 className="h1" style={{ marginBottom:20, maxWidth:900 }}>{title} {accent && <em style={{ color:T.orangeL }}>{accent}</em>}</h1>
        {sub && <p style={{ fontSize:"clamp(16px,2vw,18px)", lineHeight:1.75, color:"rgba(255,255,255,.82)", maxWidth:640, fontWeight:300 }}>{sub}</p>}
        {children}
      </div>
    </section>
  );
}

function Check({ children, color = T.orange, light }) {
  return <div style={{ display:"flex", gap:10, fontSize:14, lineHeight:1.55, marginBottom:11, color:light?"rgba(255,255,255,.85)":T.stone }}><span style={{ color, fontWeight:700, flexShrink:0 }}>✓</span><span>{children}</span></div>;
}

function Status({ children = "In development" }) {
  return <span className="pill" style={{ background:`${T.orange}22`, color:T.orangeD }}><span style={{ width:6, height:6, borderRadius:"50%", background:T.orange }} />{children}</span>;
}

function CTA({ title, body, primary, secondary }) {
  return (
    <section className="sec" style={{ background:T.orange, color:T.white, textAlign:"center" }}>
      <div className="wrap" style={{ maxWidth:720 }}>
        <h2 className="h2" style={{ marginBottom:14 }}>{title}</h2>
        <p style={{ fontSize:16, lineHeight:1.7, color:"rgba(255,255,255,.9)", marginBottom:28 }}>{body}</p>
        <div className="btns" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          {primary && <a href={primary[1]} className="btn" style={{ background:T.white, color:T.orangeD }}>{primary[0]}</a>}
          {secondary && <a href={secondary[1]} className="btn btn-l">{secondary[0]}</a>}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["No Seed Oils","Fried in Beef Tallow","Raised in Ohio","Zero Antibiotics","Closed-Loop Water","Traceable to the Tank","Herbs Grown On-Site","Fish Fry Ready"];
  const d = [...items, ...items];
  return (
    <div style={{ background:T.orange, padding:"13px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-flex", animation:"marquee 32s linear infinite" }}>
        {d.map((t,i) => <span key={i} style={{ fontSize:11, fontWeight:600, letterSpacing:".18em", textTransform:"uppercase", color:T.white, marginRight:44 }}>{t} <span style={{ opacity:.45, marginLeft:14 }}>◆</span></span>)}
      </div>
    </div>
  );
}

// ── HOME ────────────────────────────────────────────────────────────────────
function Home() {
  const segments = [
    { k:"fish", e:"🐟", t:"Frozen Fish", b:"Raw walleye and perch fillets, plus breaded fillets par-fried in beef tallow.", c:T.lake },
    { k:"retail", e:"🛒", t:"Retail & Wholesale", b:"Case packs, suggested retail and wholesale pricing for grocers and restaurants.", c:T.orangeD },
    { k:"produce", e:"🥬", t:"Clean Produce", b:"Indoor-grown cucumbers, butter lettuce, cherry tomatoes and fresh herbs.", c:T.green },
    { k:"caviar", e:"✨", t:"Sturgeon Caviar", b:"Sterlet and Siberian sturgeon, stocked on day one for future caviar.", c:T.bark },
    { k:"verde", e:"♻️", t:"Verde Energy", b:"Turning farm waste into biogas, fertilizer and power for the campus.", c:T.greenL },
    { k:"ohiofields", e:"🌾", t:"Ohio Fields", b:"Traditional farmland that uses our fertilizer and grows soy-free feed.", c:T.tallow },
  ];
  return (
    <>
      <section style={{ minHeight:"100vh", background:`linear-gradient(160deg,${T.lakeD} 0%,${T.lake} 45%,${T.green} 100%)`, display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 85% 20%,${T.orange}33 0%,transparent 45%)` }} />
        <div className="wrap" style={{ padding:"120px 28px 80px", position:"relative", width:"100%" }}>
          <div className="pill" style={{ background:"rgba(255,255,255,.12)", color:"rgba(255,255,255,.9)", marginBottom:26 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:T.orangeL, animation:"pulse 1.6s ease infinite" }} /> In development · Rural Ohio
          </div>
          <h1 className="serif" style={{ fontSize:"clamp(46px,8.5vw,104px)", color:T.white, lineHeight:.98, fontWeight:600, maxWidth:900, marginBottom:22 }}>
            Ohio-raised fish.<br /><em style={{ color:T.orangeL }}>Nothing to hide.</em>
          </h1>
          <p style={{ fontSize:"clamp(16px,2vw,19px)", color:"rgba(255,255,255,.84)", lineHeight:1.7, maxWidth:620, marginBottom:38, fontWeight:300 }}>
            Frozen walleye and yellow perch, and breaded fillets fried in beef tallow instead of seed oils. All from an indoor farm we're building in rural Ohio, every package traceable to the tank.
          </p>
          <div className="btns" style={{ display:"flex", gap:14, flexWrap:"wrap", alignItems:"center" }}>
            <a href={href("retail")} className="btn btn-o">For Retailers</a>
            <a href={href("fish")} className="btn btn-l">See the Products</a>
          </div>
        </div>
      </section>
      <Marquee />

      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap g2">
          <div>
            <div className="label">The Idea</div>
            <h2 className="h2" style={{ marginBottom:20 }}>The frozen fish fillet,<br /><em style={{ color:T.orange }}>done honestly.</em></h2>
            <p className="lead" style={{ marginBottom:16 }}>Breaded frozen fish is a Friday-night staple, but the big brands fry it in soybean or canola oil and fill the box with ingredients nobody can pronounce.</p>
            <p className="lead">We're raising the fish ourselves, frying it in beef tallow, growing the herbs that season it, and keeping the ingredient list short enough to read in the aisle.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div className="card" style={{ background:T.parchment, boxShadow:"none" }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:T.stone, marginBottom:18 }}>Typical frozen fish</div>
              {["Imported or ocean-caught pollock","Fried in soybean or canola oil","Long additive list","Little traceability"].map((t,i) => <div key={i} style={{ display:"flex", gap:10, fontSize:14, color:T.stone, lineHeight:1.5, marginBottom:14 }}><span style={{ color:"#B5523B", fontWeight:700 }}>✕</span>{t}</div>)}
            </div>
            <div className="card" style={{ background:T.green, color:T.white, border:"none" }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:T.orangeL, marginBottom:18 }}>Orange Foods</div>
              {["Ohio-raised walleye & perch","Fried in 100% beef tallow","Short, readable ingredient list","Lot code traces to the tank"].map((t,i) => <div key={i} style={{ display:"flex", gap:10, fontSize:14, lineHeight:1.5, marginBottom:14 }}><span style={{ color:T.orangeL, fontWeight:700 }}>✓</span>{t}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background:T.parchment }}>
        <div className="wrap">
          <div className="label">The Business</div>
          <h2 className="h2" style={{ marginBottom:14 }}>Six parts. <em style={{ color:T.orange }}>One farm.</em></h2>
          <p className="lead" style={{ marginBottom:40 }}>Every part of Orange Foods feeds another. Here's how the pieces fit, and where to go for each one.</p>
          <div className="g3">
            {segments.map(s => (
              <a key={s.k} href={href(s.k)} className="card" style={{ textDecoration:"none", color:T.charcoal, borderTop:`4px solid ${s.c}`, display:"block", transition:"transform .25s" }}
                onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform="none"}>
                <div style={{ fontSize:34, marginBottom:12 }}>{s.e}</div>
                <h3 className="serif" style={{ fontSize:26, fontWeight:600, marginBottom:8 }}>{s.t}</h3>
                <p style={{ fontSize:14, color:T.stone, lineHeight:1.65, marginBottom:14 }}>{s.b}</p>
                <span style={{ fontSize:12, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:s.c }}>Learn more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background:T.green, color:T.white }}>
        <div className="wrap">
          <div className="label" style={{ color:T.orangeL }}>The Loop</div>
          <h2 className="h2" style={{ marginBottom:40 }}>Everything feeds <em style={{ color:T.orangeL }}>something.</em></h2>
          <div className="g4">
            {[["🐟","Fish","Walleye, perch and sturgeon in recirculating tanks."],["💧","Water","Filtered and reused, with a small daily top-up."],["🌿","Plants","Nutrient-rich water feeds our produce and herbs."],["♻️","Energy","Solids become biogas and fertilizer through Verde Energy."]].map(([e,t,b],i) => (
              <div key={i} style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding:"24px 20px" }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", color:T.orangeL, marginBottom:12 }}>0{i+1}</div>
                <div style={{ fontSize:32, marginBottom:10 }}>{e}</div>
                <h3 className="serif" style={{ fontSize:24, fontWeight:600, marginBottom:6 }}>{t}</h3>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.72)", lineHeight:1.65 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Founder compact />

      <CTA title="Stock Ohio-raised fish." body="We're lining up our first grocery and restaurant partners now. See the catalog, case packs and pricing." primary={["View Retail Catalog", href("retail")]} secondary={["Contact Us", href("contact")]} />
    </>
  );
}

// ── FROZEN FISH ─────────────────────────────────────────────────────────────
function ProductCard({ p, tone, extra }) {
  return (
    <div className="card" style={{ padding:0, overflow:"hidden", display:"flex", flexDirection:"column", color:T.charcoal }}>
      <div style={{ background:`linear-gradient(135deg,${tone}1f,${tone}4d)`, padding:"22px 22px 18px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
          <span className="pill" style={{ background:tone, color:T.white }}>{p.size}</span>
          <div style={{ textAlign:"right" }}>
            <div className="serif" style={{ fontSize:28, fontWeight:700, color:T.charcoal, lineHeight:1 }}>{money(p.srp)}</div>
            <div style={{ fontSize:10, color:T.stone, letterSpacing:".08em", textTransform:"uppercase", marginTop:3 }}>Suggested retail</div>
          </div>
        </div>
      </div>
      <div style={{ padding:"20px 22px 24px", flex:1 }}>
        <h3 className="serif" style={{ fontSize:25, fontWeight:600, marginBottom:6 }}>{p.name}</h3>
        <p style={{ fontSize:14, color:T.stone, lineHeight:1.6 }}>{p.spec}</p>
        {extra}
      </div>
    </div>
  );
}

function Fish() {
  return (
    <>
      <PageHero label="Frozen Fish" title="Walleye and perch," accent="frozen at the farm." bg={`linear-gradient(160deg,${T.lakeD},${T.lake})`}
        sub="Two product lines from the same Ohio-raised fish: plain frozen fillets for the home cook, and crispy breaded fillets par-fried in 100% beef tallow for the freezer-to-oven crowd." />

      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:20, flexWrap:"wrap", marginBottom:32 }}>
            <div>
              <div className="label">Line 1 · Frozen Fillets</div>
              <h2 className="h2">Just the fish.</h2>
            </div>
            <Status>Target launch pricing</Status>
          </div>
          <div className="g3" style={{ gridTemplateColumns:"repeat(2,1fr)" }}>
            {RAW.map(p => <ProductCard key={p.sku} p={p} tone={T.lake} />)}
          </div>
          <div className="g3" style={{ marginTop:24 }}>
            {[["Flash-frozen on site","Fillets are processed and frozen at the farm the same day they're harvested."],["Individually frozen","IQF fillets don't stick together, so you thaw only what you need."],["Nothing added","Fish. That's the ingredient list."]].map(([t,b],i) => (
              <div key={i} style={{ padding:"4px 4px" }}>
                <h3 style={{ fontSize:15, fontWeight:700, marginBottom:6 }}>{t}</h3>
                <p style={{ fontSize:14, color:T.stone, lineHeight:1.6 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background:`linear-gradient(160deg,#2b1d0c,${T.bark})`, color:T.white }}>
        <div className="wrap">
          <div className="g2" style={{ marginBottom:40, alignItems:"end" }}>
            <div>
              <div className="label" style={{ color:T.gold }}>Line 2 · Breaded & Tallow-Fried</div>
              <h2 className="h2">Crispy fish, <em style={{ color:T.gold }}>fried the old way.</em></h2>
            </div>
            <p style={{ fontSize:15, lineHeight:1.75, color:"rgba(255,255,255,.78)" }}>Before seed oils took over, fish fries ran on lard and beef tallow. We par-fry every fillet in 100% beef tallow, freeze it, and you finish it in the oven or air fryer. No soybean, canola, corn or cottonseed oil anywhere in the box.</p>
          </div>
          <div className="g4">
            {BREADED.map(p => <ProductCard key={p.sku} p={p} tone={T.tallow} />)}
          </div>
          <div className="g3" style={{ marginTop:36 }}>
            <div style={{ background:"rgba(255,255,255,.07)", borderRadius:18, padding:"22px 22px" }}>
              <h3 style={{ fontSize:14, fontWeight:700, marginBottom:10, color:T.gold, letterSpacing:".06em", textTransform:"uppercase" }}>The coating</h3>
              <p style={{ fontSize:14, lineHeight:1.65, color:"rgba(255,255,255,.8)" }}>Wheat flour, breadcrumbs, sea salt and spices, par-fried in beef tallow. Target ingredient list, final recipe in development.</p>
            </div>
            <div style={{ background:"rgba(255,255,255,.07)", borderRadius:18, padding:"22px 22px" }}>
              <h3 style={{ fontSize:14, fontWeight:700, marginBottom:10, color:T.gold, letterSpacing:".06em", textTransform:"uppercase" }}>Cooking</h3>
              <p style={{ fontSize:14, lineHeight:1.65, color:"rgba(255,255,255,.8)" }}>Straight from frozen. Oven or air fryer, about 15–20 minutes. Final times confirmed with product testing.</p>
            </div>
            <div style={{ background:"rgba(255,255,255,.07)", borderRadius:18, padding:"22px 22px" }}>
              <h3 style={{ fontSize:14, fontWeight:700, marginBottom:10, color:T.gold, letterSpacing:".06em", textTransform:"uppercase" }}>Allergens</h3>
              <p style={{ fontSize:14, lineHeight:1.65, color:"rgba(255,255,255,.8)" }}>Contains fish and wheat. The sandwich kit's buns and tartar sauce also contain egg and may contain milk.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap g2">
          <div>
            <div className="label">Line 3 · The Sauce</div>
            <h2 className="h2" style={{ marginBottom:16 }}>Herb tartar, <em style={{ color:T.green }}>from our own herbs.</em></h2>
            <p className="lead">An avocado-oil base with dill, parsley and basil grown in our indoor farm. It ships in every sandwich kit and sells on its own in the refrigerated aisle.</p>
          </div>
          <ProductCard p={SAUCE[0]} tone={T.green} extra={<div style={{ marginTop:12 }}><span className="pill" style={{ background:T.greenXL, color:T.green }}>Refrigerated</span></div>} />
        </div>
      </section>

      <CTA title="Want these in your store?" body="Case packs, wholesale pricing and ordering details are on the retailer page." primary={["Retail & Wholesale", href("retail")]} secondary={["Contact Us", href("contact")]} />
    </>
  );
}

// ── RETAIL & WHOLESALE ──────────────────────────────────────────────────────
function PriceTable({ rows, title, tone }) {
  return (
    <div style={{ marginBottom:34 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
        <span style={{ width:10, height:10, borderRadius:3, background:tone }} />
        <h3 className="serif" style={{ fontSize:26, fontWeight:600 }}>{title}</h3>
      </div>
      <div className="tmob">
        {rows.map(r => {
          const w = wholesale(r.srp);
          return (
            <div key={r.sku} className="prow">
              <div style={{ fontWeight:700, fontSize:15 }}>{r.name}</div>
              <div style={{ fontSize:12, color:T.stone, marginTop:2 }}>{r.spec}</div>
              <div className="pgrid">
                <div><span>Size</span>{r.size}</div>
                <div><span>Suggested retail</span>{money(r.srp)}</div>
                <div><span>Wholesale / unit</span><b style={{ color:T.green }}>{money(w)}</b></div>
                <div><span>Case ({r.pack} ct)</span><b>{money(w * r.pack)}</b></div>
              </div>
              <div style={{ fontSize:10, color:T.stone, opacity:.7, marginTop:8 }}>{r.sku}</div>
            </div>
          );
        })}
      </div>
      <div className="tscroll tdesk">
        <table className="ptable" style={{ minWidth:720 }}>
          <thead><tr><th>Item</th><th>Size</th><th className="num">Suggested retail</th><th className="num">Wholesale / unit</th><th className="num">Case</th><th className="num">Case price</th></tr></thead>
          <tbody>
            {rows.map(r => {
              const w = wholesale(r.srp);
              return (
                <tr key={r.sku}>
                  <td><div style={{ fontWeight:600 }}>{r.name}</div><div style={{ fontSize:12, color:T.stone, marginTop:2 }}>{r.spec}</div><div style={{ fontSize:10, color:T.stone, opacity:.7, marginTop:3, letterSpacing:".06em" }}>{r.sku}</div></td>
                  <td style={{ whiteSpace:"nowrap" }}>{r.size}</td>
                  <td className="num">{money(r.srp)}</td>
                  <td className="num" style={{ fontWeight:700, color:T.green }}>{money(w)}</td>
                  <td className="num">{r.pack} ct</td>
                  <td className="num" style={{ fontWeight:600 }}>{money(w * r.pack)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Retail() {
  const inquiry = "Store or restaurant name:\nCity:\nProducts of interest:\nEstimated weekly cases:\nBest phone number:\n";
  return (
    <>
      <PageHero label="For Retailers & Restaurants" title="Ohio-raised fish" accent="for your freezer case." bg={`linear-gradient(160deg,#2b1d0c,${T.bark} 55%,${T.orangeD})`}
        sub="A clean-label frozen fish line your shoppers can't find anywhere else: Ohio-raised walleye and perch, plus breaded fillets par-fried in beef tallow instead of seed oils.">
        <div className="btns" style={{ display:"flex", gap:12, marginTop:30, flexWrap:"wrap" }}>
          <a href={mail("Retail / wholesale inquiry", inquiry)} className="btn btn-o">Request a Sample</a>
          <a href={href("contact")} className="btn btn-l">Other Questions</a>
        </div>
      </PageHero>

      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap">
          <div className="label">Why Stock It</div>
          <h2 className="h2" style={{ marginBottom:36 }}>What it does for <em style={{ color:T.orange }}>your shelf.</em></h2>
          <div className="g4">
            {[
              ["🏷️","A real premium tier","Mainstream breaded fish sells for roughly $0.29–$0.44 per ounce. Ours sits at about $1 per ounce, with a story that justifies it."],
              ["🍳","No seed oils","Beef tallow, avocado-oil tartar. Built for the label-reading shopper who skips the frozen fish aisle today."],
              ["📍","Local and traceable","Ohio-raised and lot-coded to the tank. Something no imported pollock brand can say."],
              ["🐟","The Friday fish fry","Perch and walleye are Ohio fish-fry favorites, with strong demand in Lent and summer."],
            ].map(([e,t,b],i) => (
              <div key={i} className="card">
                <div style={{ fontSize:30, marginBottom:12 }}>{e}</div>
                <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>{t}</h3>
                <p style={{ fontSize:14, color:T.stone, lineHeight:1.6 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background:T.parchment }}>
        <div className="wrap">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:20, flexWrap:"wrap", marginBottom:30 }}>
            <div>
              <div className="label">Retail Catalog</div>
              <h2 className="h2">Pricing & case packs</h2>
            </div>
            <Status>Target launch pricing</Status>
          </div>
          <PriceTable title="Frozen fillets" rows={RAW} tone={T.lake} />
          <PriceTable title="Breaded, par-fried in beef tallow" rows={BREADED} tone={T.tallow} />
          <PriceTable title="Refrigerated" rows={SAUCE} tone={T.green} />
          <PriceTable title="Clean produce" rows={PRODUCE} tone={T.greenL} />

          <div style={{ marginBottom:34 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <span style={{ width:10, height:10, borderRadius:3, background:T.charcoal }} />
              <h3 className="serif" style={{ fontSize:26, fontWeight:600 }}>Foodservice (restaurants, bars, fish fries)</h3>
            </div>
            <div className="tmob">
              {FOODSERVICE.map(r => (
                <div key={r.sku} className="prow">
                  <div style={{ fontWeight:700, fontSize:15 }}>{r.name}</div>
                  <div style={{ fontSize:12, color:T.stone, marginTop:2 }}>{r.spec}</div>
                  <div className="pgrid">
                    <div><span>Per lb</span><b style={{ color:T.green }}>{money(r.perLb)}</b></div>
                    <div><span>Case ({r.lbs} lb)</span><b>{money(r.perLb * r.lbs)}</b></div>
                  </div>
                  <div style={{ fontSize:10, color:T.stone, opacity:.7, marginTop:8 }}>{r.sku}</div>
                </div>
              ))}
            </div>
            <div className="tscroll tdesk">
              <table className="ptable" style={{ minWidth:620 }}>
                <thead><tr><th>Item</th><th className="num">Per lb</th><th className="num">Case</th><th className="num">Case price</th></tr></thead>
                <tbody>
                  {FOODSERVICE.map(r => (
                    <tr key={r.sku}>
                      <td><div style={{ fontWeight:600 }}>{r.name}</div><div style={{ fontSize:12, color:T.stone, marginTop:2 }}>{r.spec}</div><div style={{ fontSize:10, color:T.stone, opacity:.7, marginTop:3, letterSpacing:".06em" }}>{r.sku}</div></td>
                      <td className="num" style={{ fontWeight:700, color:T.green }}>{money(r.perLb)}</td>
                      <td className="num">{r.lbs} lb</td>
                      <td className="num" style={{ fontWeight:600 }}>{money(r.perLb * r.lbs)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card" style={{ background:T.white }}>
            <h3 style={{ fontSize:15, fontWeight:700, marginBottom:10 }}>How we priced it</h3>
            <p style={{ fontSize:14, color:T.stone, lineHeight:1.7, marginBottom:10 }}>Suggested retail prices are set against what shoppers pay today. Wild walleye fillets currently run about $11–$22 per pound at retail, and Lake Erie perch about $9–$28. Mainstream breaded fish fillets sell for roughly $5.50–$8.50 a box. Wholesale prices above assume a 30% retailer margin.</p>
            <p style={{ fontSize:13, color:T.stone, lineHeight:1.7 }}>These are target launch prices for a farm still in development. Final pricing, case packs, minimums and delivery terms will be confirmed in writing before the first order. Distributor pricing is available on request.</p>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap">
          <div className="label">Working With Us</div>
          <h2 className="h2" style={{ marginBottom:36 }}>How it will <em style={{ color:T.orange }}>work.</em></h2>
          <div className="g3">
            {[
              ["1","Start with a sample","Tell us about your store or menu and we'll set up a tasting as soon as product is available."],
              ["2","Direct to Central Ohio","We plan to deliver frozen product directly to independent grocers and restaurants in Central Ohio first."],
              ["3","Then through distribution","Regional chains and wider markets will be served through a frozen food distributor."],
            ].map(([n,t,b]) => (
              <div key={n} className="card" style={{ display:"flex", gap:16 }}>
                <div className="serif" style={{ fontSize:38, fontWeight:700, color:T.orange, lineHeight:1 }}>{n}</div>
                <div><h3 style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>{t}</h3><p style={{ fontSize:14, color:T.stone, lineHeight:1.6 }}>{b}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Get on the launch list." body="Retailers and restaurants who reach out now get first allocation and launch pricing." primary={["Email Wholesale", mail("Retail / wholesale inquiry", inquiry)]} secondary={["See the Products", href("fish")]} />
    </>
  );
}

// ── PRODUCE ─────────────────────────────────────────────────────────────────
function Produce() {
  const emoji = { "OP-BL-01":"🥬", "OP-CU-01":"🥒", "OP-CT-10":"🍅", "OP-BA-075":"🌿", "OP-DI-075":"🌱", "OP-PA-075":"☘️" };
  return (
    <>
      <PageHero label="Clean Produce" title="The produce aisle has a" accent="recall problem." bg={`linear-gradient(160deg,#173826,${T.green})`}
        sub="Cucumbers, leafy greens and tomatoes show up again and again in food-safety recalls, usually traced back to open fields and irrigation water. We grow ours indoors on the same clean water loop as our fish." />
      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:20, flexWrap:"wrap", marginBottom:30 }}>
            <div><div className="label">What We Grow</div><h2 className="h2">Six crops.</h2></div>
            <Status>Target launch pricing</Status>
          </div>
          <div className="g3">
            {PRODUCE.map(p => (
              <div key={p.sku} className="card" style={{ display:"flex", gap:16, alignItems:"center" }}>
                <div style={{ fontSize:40 }}>{emoji[p.sku]}</div>
                <div style={{ flex:1 }}>
                  <h3 className="serif" style={{ fontSize:23, fontWeight:600 }}>{p.name}</h3>
                  <div style={{ fontSize:13, color:T.stone }}>{p.spec} · {p.size}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div className="serif" style={{ fontSize:24, fontWeight:700 }}>{money(p.srp)}</div>
                  <div style={{ fontSize:9, color:T.stone, letterSpacing:".08em", textTransform:"uppercase" }}>Sugg. retail</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize:13, color:T.stone, marginTop:18 }}>Wholesale and case pricing for produce is on the <a href={href("retail")} style={{ color:T.orangeD, fontWeight:600 }}>Retail & Wholesale</a> page.</p>
        </div>
      </section>
      <section className="sec" style={{ background:T.parchment }}>
        <div className="wrap">
          <div className="label">Our Promise</div>
          <h2 className="h2" style={{ marginBottom:36 }}>Clean, coded, <em style={{ color:T.green }}>and accountable.</em></h2>
          <div className="g3">
            {[
              ["Grown indoors","No field runoff, no wildlife, no irrigation-water surprises, the usual sources of produce contamination."],
              ["Every lot coded","Each harvest carries a lot code, so we know which grow room, which day and which water it came from."],
              ["We'll pull it first","If anything we grow ever falls short, we'll recall it ourselves and say why, publicly. That's a commitment, not fine print."],
            ].map(([t,b],i) => (
              <div key={i} className="card" style={{ display:"flex", gap:16 }}>
                <div className="serif" style={{ fontSize:38, fontWeight:700, color:T.orange, lineHeight:1 }}>{i+1}</div>
                <div><h3 style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>{t}</h3><p style={{ fontSize:14, color:T.stone, lineHeight:1.6 }}>{b}</p></div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop:20, background:T.green, color:T.white, border:"none" }}>
            <h3 className="serif" style={{ fontSize:26, fontWeight:600, marginBottom:8 }}>The herbs do double duty.</h3>
            <p style={{ fontSize:15, lineHeight:1.7, color:"rgba(255,255,255,.82)" }}>Our dill, parsley and basil season our breaded fish and go into our herb tartar sauce. What we don't use goes to grocery shelves and local kitchens.</p>
          </div>
        </div>
      </section>
      <CTA title="Carry clean produce." body="Grocers and restaurants can reach out now for launch allocation." primary={["Retail & Wholesale", href("retail")]} secondary={["Contact Us", href("contact")]} />
    </>
  );
}

// ── CAVIAR ──────────────────────────────────────────────────────────────────
function Caviar() {
  return (
    <>
      <PageHero label="Sturgeon Caviar" title="The long game," accent="started on day one." bg={`linear-gradient(160deg,#120d08,#2b1d0c 60%,${T.bark})`}
        sub="Sturgeon take years to produce caviar, so ours go in the water the day the farm opens. Ohio's naturally cool groundwater is well suited to them." />
      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap">
          <div className="g2" style={{ alignItems:"stretch" }}>
            {[
              ["Sterlet Sturgeon","Years 3–4","The smaller of our two sturgeon and the first to mature. Fine, delicate roe, and the first caviar we expect to harvest."],
              ["Siberian Sturgeon","Years 5–7","A larger, slower-maturing fish with bigger roe. Our second caviar line, and a source of sturgeon fillets in the meantime."],
            ].map(([n,y,b]) => (
              <div key={n} className="card" style={{ borderTop:`4px solid ${T.bark}` }}>
                <span className="pill" style={{ background:`${T.bark}1a`, color:T.bark, marginBottom:14 }}>First harvest · {y}</span>
                <h3 className="serif" style={{ fontSize:32, fontWeight:600, marginBottom:10 }}>{n}</h3>
                <p style={{ fontSize:15, color:T.stone, lineHeight:1.7 }}>{b}</p>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop:20, background:T.parchment, boxShadow:"none" }}>
            <h3 style={{ fontSize:15, fontWeight:700, marginBottom:8 }}>Pricing</h3>
            <p style={{ fontSize:14, color:T.stone, lineHeight:1.7 }}>Pricing will be set at first harvest. For reference, American farm-raised sturgeon caviar currently sells for roughly $70–$90 per ounce at retail. Harvest timing depends on how the fish grow and is an estimate, not a promise.</p>
          </div>
        </div>
      </section>
      <CTA title="Interested in Ohio caviar?" body="Chefs, retailers and specialty shops can get on our caviar list now." primary={["Join the Caviar List", mail("Caviar list")]} secondary={["Contact Us", href("contact")]} />
    </>
  );
}

// ── VERDE ENERGY ────────────────────────────────────────────────────────────
function Verde() {
  return (
    <>
      <PageHero label="Verde Energy" title="Nothing leaves the farm" accent="as waste." bg={`linear-gradient(160deg,#173826,${T.greenL})`}
        sub="Verde Energy is the part of the campus that turns fish solids, plant trimmings and farm waste into biogas, fertilizer and power." />
      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap">
          <div className="label">What It Does</div>
          <h2 className="h2" style={{ marginBottom:36 }}>Three outputs <em style={{ color:T.green }}>from one digester.</em></h2>
          <div className="g3">
            {[
              ["🔥","Biogas & power","An anaerobic digester breaks down farm waste into biogas that can heat the fish tanks and generate electricity for the campus."],
              ["🌱","Verde fertilizer","What's left after digestion becomes a nutrient-rich fertilizer, used on our own farmland and sold under the Verde Products name."],
              ["☀️","Solar","On-site solar, added in phases, to offset the farm's power use. Larger arrays are planned through partnerships rather than upfront cost."],
            ].map(([e,t,b],i) => (
              <div key={i} className="card"><div style={{ fontSize:34, marginBottom:12 }}>{e}</div><h3 className="serif" style={{ fontSize:25, fontWeight:600, marginBottom:8 }}>{t}</h3><p style={{ fontSize:14, color:T.stone, lineHeight:1.65 }}>{b}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" style={{ background:T.parchment }}>
        <div className="wrap g2">
          <div>
            <div className="label">Verde Products</div>
            <h2 className="h2" style={{ marginBottom:16 }}>Fertilizer, <em style={{ color:T.green }}>by the bag or by the load.</em></h2>
            <p className="lead">We plan to start with bagged and bulk liquid fertilizer for growers, garden centers and landscapers, then add a branded aquaponic blend.</p>
          </div>
          <div className="card">
            <Check color={T.green}>Bagged digestate fertilizer</Check>
            <Check color={T.green}>Bulk liquid fertilizer for farms and landscapers</Check>
            <Check color={T.green}>Verde Grow Aquaponic Blend (later phase)</Check>
            <div style={{ marginTop:14, display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}><Status>Comes online in a later phase</Status><span style={{ fontSize:13, color:T.stone }}>Pricing quoted on request.</span></div>
          </div>
        </div>
      </section>
      <CTA title="Growers, landscapers, energy partners." body="If you want fertilizer supply, or you're an energy developer interested in the campus, let's talk." primary={["Contact Verde", mail("Verde Energy inquiry")]} secondary={["See the Plan", href("company")]} />
    </>
  );
}

// ── OHIO FIELDS ─────────────────────────────────────────────────────────────
function OhioFields() {
  return (
    <>
      <PageHero label="Ohio Fields" title="The land" accent="around the farm." bg={`linear-gradient(160deg,#2b1d0c,${T.bark} 60%,${T.tallow})`}
        sub="Ohio Fields is the traditional farming side of the business: cropland and pasture that close the loop with the indoor farm." />
      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap">
          <div className="g3">
            {[
              ["🌾","Fed by Verde","Fertilizer from the Verde digester goes back onto our own fields, replacing synthetic fertilizer."],
              ["🚫","Soy-free rotation","A soy-free crop rotation of grains, hay and cover crops that keeps the soil healthy."],
              ["🚜","Ohio Fields Equipment","Our own equipment company owns and maintains the machinery that works the land and the campus."],
            ].map(([e,t,b],i) => (
              <div key={i} className="card"><div style={{ fontSize:34, marginBottom:12 }}>{e}</div><h3 className="serif" style={{ fontSize:25, fontWeight:600, marginBottom:8 }}>{t}</h3><p style={{ fontSize:14, color:T.stone, lineHeight:1.65 }}>{b}</p></div>
            ))}
          </div>
          <div style={{ marginTop:22 }}><Status>Planned for a later phase</Status></div>
        </div>
      </section>
      <CTA title="Own land near Central Ohio?" body="We're looking at rural sites for the campus and the fields around it. Landowners, we'd like to hear from you." primary={["Talk Land", mail("Land / site inquiry")]} secondary={["See the Plan", href("company")]} />
    </>
  );
}

// ── FOUNDER ─────────────────────────────────────────────────────────────────
const LINKEDIN = "https://www.linkedin.com/in/erclelan6/";

function Founder({ compact }) {
  return (
    <section className="sec" style={{ background:compact?T.cream:T.white }}>
      <div className="wrap founder">
        <div style={{ width:180, height:180, borderRadius:"50%", background:`linear-gradient(135deg,${T.orange},${T.orangeD})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 12px 40px ${T.orange}44`, flexShrink:0, margin:"0 auto" }}>
          <span className="serif" style={{ fontSize:68, fontWeight:700, color:T.white, letterSpacing:".02em" }}>EC</span>
        </div>
        <div>
          <div className="label">Leadership</div>
          <h2 className="h2" style={{ marginBottom:6 }}>Eric Cleland</h2>
          <div style={{ fontSize:13, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:T.orangeD, marginBottom:18 }}>Founder & President</div>
          <p className="lead" style={{ marginBottom:compact?20:14 }}>Eric is an HR and operations leader based in New Albany, Ohio. He manages HR systems and payroll for a multi-location company with more than 1,000 employees across roughly 120 locations, and holds the SPHR (Senior Professional in Human Resources) certification and a B.S. in Human Resources Management from Franklin University.</p>
          {!compact && <p className="lead" style={{ marginBottom:20 }}>As founder of Orange Foods, Eric leads the company's strategy, partnerships and fundraising, and is building the team, including an experienced aquaculture operator, that will run the farm.</p>}
          <div className="btns" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn-g">Connect on LinkedIn ↗</a>
            {compact && <a href={href("company")} className="btn btn-o">About Orange Foods</a>}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── COMPANY / PLAN ──────────────────────────────────────────────────────────
function Company() {
  const modules = [
    { n:"Module 1", t:"Fish, freezer & greens", c:T.orange, items:["Walleye and perch building","On-site processing and blast-freeze line","Frozen fillets and tallow-fried breaded line","Indoor produce and herb farm","Sturgeon stocked from day one"] },
    { n:"Module 2", t:"Scale the brand", c:T.green, items:["Expanded fish capacity","Sandwich kits and tartar sauce at scale","Regional grocery and foodservice distribution","More growing space"] },
    { n:"Module 3", t:"Close the loop", c:T.lake, items:["First sturgeon caviar harvests","Verde digester, biogas and fertilizer","On-site solar","Ohio Fields cropland","Full campus complete"] },
  ];
  const companies = [
    ["Orange Holdings LLC","Parent company"],
    ["Orange Foods LLC","Fish, produce and consumer products"],
    ["Orange Brands LLC","Holds and licenses the brand trademarks"],
    ["Verde Energy LLC","Digester, biogas and solar, with Verde Products LLC for fertilizer"],
    ["Ohio Fields LLC & Ohio Fields Equipment LLC","Farmland and equipment"],
    ["Orange Shared Services LLC","HR, payroll, finance and admin for every company"],
  ];
  const now = ["Securing a rural Ohio site","Bringing on an experienced aquaculture operator","Engineering the first building","Talking with Ohio grocers and restaurants","Building research and funding partnerships"];
  return (
    <>
      <PageHero label="About · Our Plan" title="One campus," accent="built in modules." bg={`linear-gradient(160deg,${T.lakeD},${T.green})`}
        sub="The full campus is designed as one site. We build it a piece at a time, and each module proves itself before the next one goes up." />
      <section className="sec" style={{ background:T.parchment }}>
        <div className="wrap">
          <div className="g3">
            {modules.map(m => (
              <div key={m.n} className="card" style={{ borderTop:`4px solid ${m.c}` }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:m.c, marginBottom:8 }}>{m.n}</div>
                <h3 className="serif" style={{ fontSize:27, fontWeight:600, marginBottom:16 }}>{m.t}</h3>
                {m.items.map((it,j) => <div key={j} style={{ display:"flex", gap:10, fontSize:14, color:T.stone, lineHeight:1.5, marginBottom:10 }}><span style={{ color:m.c }}>→</span>{it}</div>)}
              </div>
            ))}
          </div>
          <div className="g2" style={{ background:T.charcoal, color:T.white, borderRadius:20, padding:"30px", marginTop:24 }}>
            <div>
              <div className="pill" style={{ background:`${T.orange}33`, color:T.orangeL, marginBottom:14 }}>Where we are today</div>
              <h3 className="serif" style={{ fontSize:30, fontWeight:600, lineHeight:1.15 }}>We're at the very beginning, and we'd rather say so.</h3>
            </div>
            <div>{now.map((n,i) => <div key={i} style={{ display:"flex", gap:12, fontSize:14, color:"rgba(255,255,255,.82)", lineHeight:1.5, padding:"9px 0", borderBottom:i<now.length-1?"1px solid rgba(255,255,255,.08)":"none" }}><span style={{ color:T.orangeL }}>○</span>{n}</div>)}</div>
          </div>
        </div>
      </section>
      <Founder />
      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap g2" style={{ alignItems:"start" }}>
          <div>
            <div className="label">How We're Organized</div>
            <h2 className="h2" style={{ marginBottom:16 }}>A family of <em style={{ color:T.orange }}>companies.</em></h2>
            <p className="lead">Each part of the campus is planned as its own company under one parent, so each can be financed, run and measured on its own.</p>
          </div>
          <div className="card" style={{ padding:"8px 24px" }}>
            {companies.map(([n,r],i) => (
              <div key={n} style={{ padding:"14px 0", borderBottom:i<companies.length-1?`1px solid ${T.parchment}`:"none" }}>
                <div style={{ fontWeight:700, fontSize:15 }}>{n}</div>
                <div style={{ fontSize:13, color:T.stone, marginTop:2 }}>{r}</div>
              </div>
            ))}
            <div style={{ fontSize:11, color:T.stone, padding:"10px 0 14px", opacity:.85 }}>Planned structure.</div>
          </div>
        </div>
      </section>
      <CTA title="Help us build it." body="Investors, aquaculture operators, researchers and suppliers: we want to hear from you." primary={["Investor / Partner Inquiry", mail("Investor / partner inquiry")]} secondary={["Contact Page", href("contact")]} />
    </>
  );
}

// ── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const paths = [
    { e:"📬", t:"Customers", b:"Be first to know when our fish hits shelves near you.", cta:"Join the Waitlist", subj:"Waitlist — let me know when you launch" },
    { e:"🛒", t:"Grocers & Restaurants", b:"Samples, case packs, launch allocation and pricing.", cta:"Email Wholesale", subj:"Retail / wholesale inquiry" },
    { e:"✨", t:"Caviar", b:"Chefs and specialty shops who want Ohio sturgeon caviar.", cta:"Join the Caviar List", subj:"Caviar list" },
    { e:"♻️", t:"Verde & Land", b:"Fertilizer buyers, energy partners and landowners.", cta:"Contact Verde", subj:"Verde Energy inquiry" },
    { e:"🤝", t:"Investors & Partners", b:"Investors, operators, researchers and suppliers.", cta:"Start a Conversation", subj:"Investor / partner inquiry" },
    { e:"📰", t:"Press", b:"Media and interview requests.", cta:"Email Press", subj:"Press inquiry" },
  ];
  return (
    <>
      <PageHero label="Contact" title="Let's" accent="talk." bg={`linear-gradient(160deg,${T.orangeD},${T.orange})`}
        sub={<>Every button opens an email to <strong>{CONTACT_EMAIL}</strong> with the subject filled in, so it lands with the right person.</>} />
      <section className="sec" style={{ background:T.cream }}>
        <div className="wrap g3">
          {paths.map(p => (
            <div key={p.t} className="card" style={{ display:"flex", flexDirection:"column" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>{p.e}</div>
              <h3 className="serif" style={{ fontSize:26, fontWeight:600, marginBottom:6 }}>{p.t}</h3>
              <p style={{ fontSize:14, color:T.stone, lineHeight:1.6, marginBottom:20, flex:1 }}>{p.b}</p>
              <a href={mail(p.subj)} className="btn btn-g">{p.cta}</a>
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center", marginTop:30, fontSize:14, color:T.stone }}>Or email us directly at <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:T.orangeD, fontWeight:600 }}>{CONTACT_EMAIL}</a></p>
      </section>
    </>
  );
}

// ── Footer & App ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:T.charcoal, color:"rgba(255,255,255,.6)", padding:"52px 28px 30px" }}>
      <div className="wrap" style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:32 }}>
        <div style={{ maxWidth:320 }}>
          <Logo ink={T.white} />
          <p style={{ fontSize:13, lineHeight:1.75, marginTop:14 }}>Clean-label frozen fish and indoor-grown produce from a farm in development in rural Ohio.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ display:"inline-block", fontSize:13, marginTop:10, color:T.orangeL }}>{CONTACT_EMAIL}</a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,minmax(130px,auto))", gap:"10px 40px" }}>
          {PAGES.map(([k,l]) => <a key={k} href={href(k)} style={{ fontSize:13, textDecoration:"none" }}>{l}</a>)}
        </div>
      </div>
      <div className="wrap" style={{ borderTop:"1px solid rgba(255,255,255,.08)", marginTop:32, paddingTop:20, fontSize:11, color:"rgba(255,255,255,.38)", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <span>© {new Date().getFullYear()} Orange Foods LLC. Rural Ohio.</span>
        <span>Products and prices shown are in development and not yet available for sale.</span>
      </div>
    </footer>
  );
}

const VIEWS = { home:Home, fish:Fish, retail:Retail, produce:Produce, caviar:Caviar, verde:Verde, ohiofields:OhioFields, company:Company, contact:Contact };

export default function App() {
  const route = useRoute();
  const View = VIEWS[route];
  useEffect(() => {
    const name = PAGES.find(([k]) => k === route)[1];
    document.title = route === "home" ? "Orange Foods LLC — Ohio-Raised Fish, Nothing to Hide" : `${name} — Orange Foods LLC`;
  }, [route]);
  return (
    <>
      <style>{G}</style>
      <Nav route={route} darkHero />
      <main><View /></main>
      <Footer />
    </>
  );
}
