// Orange Foods LLC — v3.0 (pre-launch brand site)
import { useState, useEffect } from "react";

// ── Change this to the inbox you actually check ─────────────────────────────
const CONTACT_EMAIL = "founders@orangefoodsllc.com";

const T = {
  cream:"#FAF7F2", parchment:"#F2EDE3", orange:"#E07B28", orangeD:"#C4651A",
  orangeL:"#F9A05C", green:"#2A5C45", greenD:"#1A3A28", greenL:"#3D7A5E", greenXL:"#EAF2EC",
  lake:"#1E4E6E", lakeD:"#12324A", bark:"#5C3D1E", stone:"#7A6B5D", charcoal:"#1E1E1E",
  white:"#FFFFFF", gold:"#C9A84C",
};

const fontLink = `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600;700&display=swap`;

const G = `
  @import url('${fontLink}');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:${T.cream}; color:${T.charcoal}; font-family:'Jost',sans-serif; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
  a { color:inherit; }
  @keyframes marquee { from{transform:translateX(0);}to{transform:translateX(-50%);} }
  @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:.45;} }
  .serif { font-family:'Cormorant Garamond',serif; }
  .wrap { max-width:1160px; margin:0 auto; }
  .sec { padding:96px 28px; }
  .label { font-size:11px; font-weight:600; letter-spacing:.22em; text-transform:uppercase; color:${T.orange}; display:flex; align-items:center; gap:10px; margin-bottom:14px; }
  .label::before { content:''; width:32px; height:2px; background:currentColor; }
  .h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(34px,5vw,54px); line-height:1.05; font-weight:600; }
  .lead { font-size:16px; line-height:1.8; color:${T.stone}; font-weight:400; max-width:620px; }
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; border-radius:40px; padding:15px 30px; font-family:'Jost',sans-serif; font-size:13px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; transition:all .25s ease; text-decoration:none; border:2px solid transparent; }
  .btn-o { background:${T.orange}; color:${T.white}; box-shadow:0 6px 24px ${T.orange}44; }
  .btn-o:hover { background:${T.orangeD}; transform:translateY(-2px); }
  .btn-l { background:transparent; color:${T.white}; border-color:rgba(255,255,255,.55); }
  .btn-l:hover { background:rgba(255,255,255,.12); transform:translateY(-2px); }
  .btn-g { background:transparent; color:${T.green}; border-color:${T.green}; }
  .btn-g:hover { background:${T.green}; color:${T.white}; }
  .card { background:${T.white}; border-radius:20px; padding:30px 26px; box-shadow:0 2px 18px rgba(0,0,0,.05); border:1px solid rgba(0,0,0,.04); }
  .pill { display:inline-flex; align-items:center; gap:6px; border-radius:20px; padding:5px 12px; font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
  .navlink { font-size:13px; font-weight:600; letter-spacing:.04em; text-decoration:none; color:${T.charcoal}; transition:color .2s; }
  .navlink:hover { color:${T.orange}; }
  .g2 { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
  .g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .g4 { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
  .g6 { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .desk { display:flex; }
  .mob { display:none; }
  @media (max-width:860px) {
    .sec { padding:72px 20px; }
    .g2 { grid-template-columns:1fr; gap:32px; }
    .g3 { grid-template-columns:1fr; }
    .g4 { grid-template-columns:1fr 1fr; gap:12px; }
    .g6 { grid-template-columns:1fr 1fr; gap:12px; }
    .desk { display:none !important; }
    .mob { display:flex; }
    .hero-btns { flex-direction:column; align-items:stretch !important; }
  }
  @media (max-width:480px) {
    .g4 { grid-template-columns:1fr; }
    .g6 { grid-template-columns:1fr; }
  }
`;

const mail = (subject) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

// ── Nav ─────────────────────────────────────────────────────────────────────
const NAV = [["The Fish","fish"],["Clean Produce","produce"],["The Farm","farm"],["The Plan","plan"],["Partner","partner"]];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const solid = scrolled || open;
  const ink = solid ? T.charcoal : T.white;
  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:68, padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", background:solid?"rgba(250,247,242,.97)":"transparent", backdropFilter:solid?"blur(14px)":"none", borderBottom:solid?"1px solid rgba(0,0,0,.07)":"none", transition:"all .35s ease" }}>
        <a href="#top" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${T.orange},${T.orangeD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🍊</div>
          <div>
            <div className="serif" style={{ fontSize:19, fontWeight:700, color:ink, lineHeight:1 }}>Orange Foods</div>
            <div style={{ fontSize:8, letterSpacing:".2em", color:solid?T.stone:"rgba(255,255,255,.7)", textTransform:"uppercase", marginTop:2 }}>Raised in Ohio</div>
          </div>
        </a>
        <div className="desk" style={{ gap:26, alignItems:"center" }}>
          {NAV.map(([l,id]) => <a key={id} href={`#${id}`} className="navlink" style={{ color:ink }}>{l}</a>)}
          <a href="#partner" className="btn btn-o" style={{ padding:"10px 20px", fontSize:12 }}>Get Updates</a>
        </div>
        <button className="mob" onClick={() => setOpen(o=>!o)} aria-label="Menu" style={{ flexDirection:"column", gap:5, background:"none", border:"none", cursor:"pointer", padding:6 }}>
          {[0,1,2].map(i => <span key={i} style={{ display:"block", width:22, height:2, background:ink, borderRadius:2 }} />)}
        </button>
      </nav>
      {open && (
        <div style={{ position:"fixed", top:68, left:0, right:0, zIndex:99, background:"rgba(250,247,242,.98)", padding:"8px 24px 24px", borderBottom:"1px solid rgba(0,0,0,.07)" }}>
          {NAV.map(([l,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} style={{ display:"block", fontSize:17, fontWeight:500, padding:"14px 0", borderBottom:"1px solid rgba(0,0,0,.06)", textDecoration:"none", color:T.charcoal }}>{l}</a>)}
          <a href="#partner" onClick={() => setOpen(false)} className="btn btn-o" style={{ marginTop:18, width:"100%" }}>Get Updates</a>
        </div>
      )}
    </>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" style={{ minHeight:"100vh", background:`linear-gradient(160deg,${T.lakeD} 0%,${T.lake} 45%,${T.green} 100%)`, display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 85% 20%,${T.orange}33 0%,transparent 45%),radial-gradient(circle at 10% 90%,rgba(255,255,255,.06) 0%,transparent 40%)` }} />
      <div className="wrap" style={{ padding:"120px 28px 80px", position:"relative", zIndex:1, width:"100%" }}>
        <div className="pill" style={{ background:"rgba(255,255,255,.12)", color:"rgba(255,255,255,.9)", marginBottom:26 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:T.orangeL, animation:"pulse 1.6s ease infinite" }} /> In development · Rural Ohio
        </div>
        <h1 className="serif" style={{ fontSize:"clamp(46px,8.5vw,104px)", color:T.white, lineHeight:.98, fontWeight:600, maxWidth:900, marginBottom:22 }}>
          Ohio-raised fish.<br /><em style={{ color:T.orangeL }}>Nothing to hide.</em>
        </h1>
        <p style={{ fontSize:"clamp(16px,2vw,19px)", color:"rgba(255,255,255,.82)", lineHeight:1.7, maxWidth:600, marginBottom:38, fontWeight:300 }}>
          Clean-label frozen walleye and yellow perch from an indoor farm we're building in rural Ohio. No seed oils, no antibiotics, and every package traceable to the tank it came from.
        </p>
        <div className="hero-btns" style={{ display:"flex", gap:14, flexWrap:"wrap", alignItems:"center" }}>
          <a href="#partner" className="btn btn-o">Join the Waitlist</a>
          <a href="#plan" className="btn btn-l">See the Plan</a>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["No Seed Oils","Raised in Ohio","Zero Antibiotics","Closed-Loop Water","Traceable to the Tank","Herbs Grown On-Site","Clean Ingredient List","Fish Fry Ready"];
  const d = [...items, ...items];
  return (
    <div style={{ background:T.orange, padding:"13px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-flex", animation:"marquee 30s linear infinite" }}>
        {d.map((t,i) => <span key={i} style={{ fontSize:11, fontWeight:600, letterSpacing:".18em", textTransform:"uppercase", color:T.white, marginRight:44 }}>{t} <span style={{ opacity:.45, marginLeft:14 }}>◆</span></span>)}
      </div>
    </div>
  );
}

// ── The promise: label comparison ───────────────────────────────────────────
function Promise() {
  const typical = ["Imported or ocean-caught fish","Soybean or canola frying oil","Long additive list","Little to no traceability"];
  const ours = ["Ohio-raised walleye & perch","Avocado oil or beef tallow — never seed oils","Ingredients you can pronounce","Lot code traces back to the tank"];
  return (
    <section className="sec" style={{ background:T.cream }}>
      <div className="wrap g2">
        <div>
          <div className="label">The Idea</div>
          <h2 className="h2" style={{ marginBottom:20 }}>The frozen fish fillet,<br /><em style={{ color:T.orange }}>done honestly.</em></h2>
          <p className="lead" style={{ marginBottom:16 }}>Frozen breaded fish is a Friday-night staple, but most of it comes with an ingredient list nobody wants to read. We think families who read labels deserve the same convenience without the compromise.</p>
          <p className="lead">So we're raising the fish ourselves, growing the herbs that season them, and keeping the ingredient list short enough to fit on the front of the box.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div className="card" style={{ background:T.parchment, boxShadow:"none" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:T.stone, marginBottom:18 }}>Typical frozen fish</div>
            {typical.map((t,i) => <div key={i} style={{ display:"flex", gap:10, fontSize:14, color:T.stone, lineHeight:1.5, marginBottom:14 }}><span style={{ color:"#B5523B", fontWeight:700 }}>✕</span>{t}</div>)}
          </div>
          <div className="card" style={{ background:T.green, color:T.white, border:"none" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:T.orangeL, marginBottom:18 }}>Orange Foods</div>
            {ours.map((t,i) => <div key={i} style={{ display:"flex", gap:10, fontSize:14, lineHeight:1.5, marginBottom:14 }}><span style={{ color:T.orangeL, fontWeight:700 }}>✓</span>{t}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Product line ────────────────────────────────────────────────────────────
const PRODUCTS = [
  { emoji:"🐟", name:"Walleye Fillets", tier:"Frozen · Raw", desc:"Ohio's state fish, raised indoors and flash-frozen at the farm. Skinless, boneless, ready for the pan or the grill.", color:T.lake },
  { emoji:"🐠", name:"Yellow Perch Fillets", tier:"Frozen · Raw", desc:"The Lake Erie fish-fry classic. Sweet, mild, and sized for a proper Friday perch dinner.", color:"#8A6A1E" },
  { emoji:"🔥", name:"Crispy Breaded Fillets", tier:"Frozen · Ready to Cook", desc:"Walleye and perch in a simple crunchy coating, fried in avocado oil or beef tallow. Oven or air fryer.", color:T.orangeD },
  { emoji:"🥪", name:"Fish Sandwich Kit", tier:"Frozen · Complete Meal", desc:"Breaded fillet, bun, and our herb tartar sauce in one box. The drive-thru fish sandwich, rebuilt clean.", color:T.green },
  { emoji:"🌿", name:"Herb Tartar Sauce", tier:"Refrigerated", desc:"Made with dill, parsley, and basil grown in our own farm. No seed-oil mayo.", color:T.greenL },
  { emoji:"✨", name:"Ohio Sturgeon Caviar", tier:"The Long Game", desc:"Our sturgeon go in on day one. Caviar takes years to mature, so this one is worth the wait.", color:T.bark },
];

function Products() {
  return (
    <section className="sec" style={{ background:T.parchment }}>
      <div className="wrap">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20, marginBottom:40 }}>
          <div>
            <div className="label">The Lineup</div>
            <h2 className="h2">What we're <em style={{ color:T.orange }}>making</em></h2>
          </div>
          <p style={{ fontSize:14, color:T.stone, maxWidth:380, lineHeight:1.7 }}>None of this is on shelves yet. Join the waitlist to hear first when it is, and where to find it.</p>
        </div>
        <div className="g3">
          {PRODUCTS.map((p,i) => (
            <div key={i} className="card" style={{ padding:0, overflow:"hidden" }}>
              <div style={{ height:128, background:`linear-gradient(135deg,${p.color}22,${p.color}55)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52, position:"relative" }}>
                {p.emoji}
                <span className="pill" style={{ position:"absolute", top:12, left:12, background:p.color, color:T.white }}>{p.tier}</span>
              </div>
              <div style={{ padding:"22px 22px 26px" }}>
                <h3 className="serif" style={{ fontSize:24, fontWeight:600, marginBottom:8 }}>{p.name}</h3>
                <p style={{ fontSize:14, color:T.stone, lineHeight:1.65 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── The fish ────────────────────────────────────────────────────────────────
function Fish() {
  const fish = [
    { name:"Walleye", role:"Flagship", temp:"Temperate water", body:"Ohio's state fish and a Midwest restaurant favorite. Sought-after, rarely farmed at scale, and the heart of our brand." },
    { name:"Yellow Perch", role:"Fish-fry staple", temp:"Temperate water", body:"A Great Lakes native with a long history of indoor farming. Shares a water system with our walleye." },
    { name:"Sterlet & Siberian Sturgeon", role:"Caviar, in time", temp:"Cold water", body:"Ohio's naturally cool groundwater suits sturgeon well. Sterlet mature first; Siberian follow a few years later." },
  ];
  return (
    <section id="fish" className="sec" style={{ background:`linear-gradient(160deg,${T.lakeD},${T.lake})`, color:T.white }}>
      <div className="wrap">
        <div className="label" style={{ color:T.orangeL }}>The Fish</div>
        <h2 className="h2" style={{ marginBottom:16, maxWidth:720 }}>Species chosen for <em style={{ color:T.orangeL }}>Ohio,</em> not imported from somewhere else.</h2>
        <p className="lead" style={{ color:"rgba(255,255,255,.75)", marginBottom:44 }}>We picked fish that belong here. Freshwater species that Midwesterners already love, raised in water temperatures Ohio's climate makes easy to hold.</p>
        <div className="g3">
          {fish.map((f,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding:"28px 24px" }}>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
                <span className="pill" style={{ background:T.orange, color:T.white }}>{f.role}</span>
                <span className="pill" style={{ background:"rgba(255,255,255,.12)", color:"rgba(255,255,255,.85)" }}>{f.temp}</span>
              </div>
              <h3 className="serif" style={{ fontSize:28, fontWeight:600, marginBottom:10 }}>{f.name}</h3>
              <p style={{ fontSize:14, color:"rgba(255,255,255,.72)", lineHeight:1.7 }}>{f.body}</p>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginTop:36 }}>
          {["Zero antibiotics","No hormones","Recirculating clean water","Processed & frozen on-site"].map((t,i) => (
            <span key={i} className="pill" style={{ background:"rgba(255,255,255,.1)", color:T.white, padding:"8px 14px", fontSize:11 }}>✓ {t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Clean produce ───────────────────────────────────────────────────────────
function Produce() {
  const crops = [
    { e:"🥒", n:"Cucumbers" }, { e:"🥬", n:"Butter Lettuce" }, { e:"🍅", n:"Cherry Tomatoes" },
    { e:"🌿", n:"Basil" }, { e:"🌱", n:"Dill" }, { e:"☘️", n:"Parsley" },
  ];
  const points = [
    { t:"Grown indoors", b:"No field runoff, no wildlife, no irrigation-water surprises — the usual sources of produce contamination." },
    { t:"Every lot coded", b:"Each harvest carries a lot code, so we know exactly which room, which day, and which water it came from." },
    { t:"We'll pull it first", b:"If anything we grow ever falls short, we'll recall it ourselves and tell you why. That's a promise, not a policy we hope to never use." },
  ];
  return (
    <section id="produce" className="sec" style={{ background:T.cream }}>
      <div className="wrap g2" style={{ alignItems:"start" }}>
        <div>
          <div className="label">Clean Produce</div>
          <h2 className="h2" style={{ marginBottom:20 }}>The produce aisle has a<br /><em style={{ color:T.green }}>recall problem.</em> We don't plan to.</h2>
          <p className="lead" style={{ marginBottom:30 }}>Cucumbers, lettuce and tomatoes are some of the most-recalled foods in America, mostly because of what happens in open fields. We grow ours indoors, fed by the same clean water loop as our fish. The herbs go straight into our tartar sauce and seasonings.</p>
          <div className="g6">
            {crops.map((c,i) => (
              <div key={i} style={{ background:T.greenXL, borderRadius:14, padding:"16px 14px", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:24 }}>{c.e}</span>
                <span style={{ fontSize:14, fontWeight:600, color:T.green }}>{c.n}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {points.map((p,i) => (
            <div key={i} className="card" style={{ display:"flex", gap:18 }}>
              <div className="serif" style={{ fontSize:36, fontWeight:700, color:T.orange, lineHeight:1, minWidth:28 }}>{i+1}</div>
              <div>
                <h3 style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>{p.t}</h3>
                <p style={{ fontSize:14, color:T.stone, lineHeight:1.65 }}>{p.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── The farm: closed loop ───────────────────────────────────────────────────
function Farm() {
  const steps = [
    { e:"🐟", t:"Fish", b:"Walleye, perch and sturgeon in recirculating tanks." },
    { e:"💧", t:"Water", b:"Filtered and reused, with only a small daily top-up." },
    { e:"🌿", t:"Plants", b:"Nutrient-rich water feeds our produce and herbs." },
    { e:"♻️", t:"Nothing wasted", b:"Solids become biogas and fertilizer through Verde Energy." },
  ];
  return (
    <section id="farm" className="sec" style={{ background:T.green, color:T.white, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 90% 10%,${T.orange}26 0%,transparent 45%)` }} />
      <div className="wrap" style={{ position:"relative" }}>
        <div className="label" style={{ color:T.orangeL }}>The Farm</div>
        <h2 className="h2" style={{ marginBottom:16 }}>One loop. <em style={{ color:T.orangeL }}>Everything feeds something.</em></h2>
        <p className="lead" style={{ color:"rgba(255,255,255,.75)", marginBottom:48 }}>The campus is designed as a single system. The fish feed the plants, the plants clean the water, and what's left over becomes energy and fertilizer.</p>
        <div className="g4">
          {steps.map((s,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding:"26px 22px", position:"relative" }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", color:T.orangeL, marginBottom:14 }}>0{i+1}</div>
              <div style={{ fontSize:34, marginBottom:12 }}>{s.e}</div>
              <h3 className="serif" style={{ fontSize:24, fontWeight:600, marginBottom:6 }}>{s.t}</h3>
              <p style={{ fontSize:13, color:"rgba(255,255,255,.7)", lineHeight:1.65 }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── The plan: modular build ─────────────────────────────────────────────────
function Plan() {
  const modules = [
    { n:"Module 1", t:"Fish, freezer & greens", items:["Walleye and perch building","On-site processing and blast-freeze line","Indoor produce and herb farm","Sturgeon stocked from day one"] },
    { n:"Module 2", t:"Scale the brand", items:["Expanded fish capacity","Breaded fillets and sandwich kits","Regional grocery and restaurant supply","More growing space"] },
    { n:"Module 3", t:"Close the loop", items:["First sturgeon caviar harvests","Digester, biogas and fertilizer (Verde Energy)","On-site solar","Full campus complete"] },
  ];
  const next = ["Securing a rural Ohio site","Bringing on an experienced aquaculture operator","Engineering the first building","Talking with Ohio grocers and restaurants","Building research and funding partnerships"];
  return (
    <section id="plan" className="sec" style={{ background:T.parchment }}>
      <div className="wrap">
        <div className="label">The Plan</div>
        <h2 className="h2" style={{ marginBottom:16 }}>One campus, <em style={{ color:T.orange }}>built in modules.</em></h2>
        <p className="lead" style={{ marginBottom:44 }}>The full campus is designed as one site. We build it a piece at a time, and each module proves itself before the next one goes up.</p>
        <div className="g3" style={{ marginBottom:28 }}>
          {modules.map((m,i) => (
            <div key={i} className="card" style={{ borderTop:`4px solid ${[T.orange,T.green,T.lake][i]}` }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:[T.orange,T.green,T.lake][i], marginBottom:8 }}>{m.n}</div>
              <h3 className="serif" style={{ fontSize:26, fontWeight:600, marginBottom:16 }}>{m.t}</h3>
              {m.items.map((it,j) => <div key={j} style={{ display:"flex", gap:10, fontSize:14, color:T.stone, lineHeight:1.5, marginBottom:10 }}><span style={{ color:T.orange }}>→</span>{it}</div>)}
            </div>
          ))}
        </div>
        <div style={{ background:T.charcoal, color:T.white, borderRadius:20, padding:"30px 30px" }} className="g2">
          <div>
            <div className="pill" style={{ background:`${T.orange}33`, color:T.orangeL, marginBottom:14 }}>Where we are today</div>
            <h3 className="serif" style={{ fontSize:30, fontWeight:600, lineHeight:1.15 }}>We're at the very beginning, and we'd rather say so.</h3>
          </div>
          <div>
            {next.map((n,i) => <div key={i} style={{ display:"flex", gap:12, fontSize:14, color:"rgba(255,255,255,.8)", lineHeight:1.5, padding:"9px 0", borderBottom:i<next.length-1?"1px solid rgba(255,255,255,.08)":"none" }}><span style={{ color:T.orangeL }}>○</span>{n}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Partner / contact ───────────────────────────────────────────────────────
function Partner() {
  const paths = [
    { e:"📬", t:"Customers", b:"Be first to know when our fish hits shelves near you.", cta:"Join the Waitlist", subj:"Waitlist — let me know when you launch" },
    { e:"🛒", t:"Grocers & Restaurants", b:"Want Ohio-raised walleye and perch on your shelf or menu? Let's talk supply.", cta:"Talk Wholesale", subj:"Wholesale / foodservice interest" },
    { e:"🤝", t:"Investors & Partners", b:"Investors, aquaculture operators, researchers and suppliers who want to help build this.", cta:"Start a Conversation", subj:"Investor / partner inquiry" },
  ];
  return (
    <section id="partner" className="sec" style={{ background:T.orange, color:T.white, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 15% 15%,rgba(255,255,255,.14) 0%,transparent 45%)" }} />
      <div className="wrap" style={{ position:"relative" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <div className="label" style={{ color:"rgba(255,255,255,.85)", justifyContent:"center" }}>Get Involved</div>
          <h2 className="h2">Help us build it.</h2>
        </div>
        <div className="g3">
          {paths.map((p,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.25)", borderRadius:20, padding:"30px 26px", display:"flex", flexDirection:"column" }}>
              <div style={{ fontSize:34, marginBottom:14 }}>{p.e}</div>
              <h3 className="serif" style={{ fontSize:26, fontWeight:600, marginBottom:8 }}>{p.t}</h3>
              <p style={{ fontSize:14, color:"rgba(255,255,255,.88)", lineHeight:1.65, marginBottom:22, flex:1 }}>{p.b}</p>
              <a href={mail(p.subj)} className="btn" style={{ background:T.white, color:T.orangeD }}>{p.cta}</a>
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center", marginTop:30, fontSize:14, color:"rgba(255,255,255,.85)" }}>Or email us directly at <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontWeight:600 }}>{CONTACT_EMAIL}</a></p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:T.charcoal, color:"rgba(255,255,255,.55)", padding:"48px 28px 32px" }}>
      <div className="wrap" style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:28 }}>
        <div style={{ maxWidth:320 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${T.orange},${T.orangeD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>🍊</div>
            <div className="serif" style={{ fontSize:19, fontWeight:700, color:T.white }}>Orange Foods LLC</div>
          </div>
          <p style={{ fontSize:13, lineHeight:1.75 }}>Clean-label fish and produce from an indoor farm in development in rural Ohio.</p>
        </div>
        <div style={{ display:"flex", gap:22, flexWrap:"wrap", alignItems:"flex-start" }}>
          {NAV.map(([l,id]) => <a key={id} href={`#${id}`} style={{ fontSize:13, textDecoration:"none" }}>{l}</a>)}
        </div>
      </div>
      <div className="wrap" style={{ borderTop:"1px solid rgba(255,255,255,.08)", marginTop:32, paddingTop:20, fontSize:11, color:"rgba(255,255,255,.35)", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <span>© {new Date().getFullYear()} Orange Foods LLC. Rural Ohio.</span>
        <span>Products shown are in development and not yet available for sale.</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{G}</style>
      <Nav />
      <Hero />
      <Marquee />
      <Promise />
      <Products />
      <Fish />
      <Produce />
      <Farm />
      <Plan />
      <Partner />
      <Footer />
    </>
  );
}
