// Orange Foods LLC — v2.1
import { useState, useEffect } from "react";

const T = {
  cream:"#FAF7F2", parchment:"#F2EDE3", orange:"#E07B28", orangeD:"#C4651A",
  orangeL:"#F9A05C", green:"#2A5C45", greenL:"#3D7A5E", greenXL:"#EAF2EC",
  bark:"#5C3D1E", stone:"#8C7B6B", charcoal:"#1E1E1E", white:"#FFFFFF", gold:"#C9A84C",
};

const fontLink = `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&family=Playfair+Display:ital,wght@1,400&display=swap`;

const G = `
  @import url('${fontLink}');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:${T.cream}; color:${T.charcoal}; font-family:'Jost',sans-serif; overflow-x:hidden; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:${T.cream}; }
  ::-webkit-scrollbar-thumb { background:${T.orange}; border-radius:3px; }
  @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
  @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:.5;} }
  @keyframes marquee { from{transform:translateX(0);}to{transform:translateX(-50%);} }
  .float { animation:float 4s ease-in-out infinite; }
  .btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background:${T.orange}; color:${T.white}; border:none; border-radius:40px;
    padding:14px 32px; font-family:'Jost',sans-serif; font-size:14px;
    font-weight:600; letter-spacing:.08em; text-transform:uppercase;
    cursor:pointer; transition:all .3s ease; box-shadow:0 4px 24px ${T.orange}44;
  }
  .btn-primary:hover { background:${T.orangeD}; transform:translateY(-2px); }
  .btn-outline {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:${T.green}; border:2px solid ${T.green};
    border-radius:40px; padding:12px 28px; font-family:'Jost',sans-serif;
    font-size:14px; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
    cursor:pointer; transition:all .3s ease;
  }
  .btn-outline:hover { background:${T.green}; color:${T.white}; transform:translateY(-2px); }
  .btn-outline-light {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:${T.white}; border:2px solid rgba(255,255,255,.6);
    border-radius:40px; padding:12px 28px; font-family:'Jost',sans-serif;
    font-size:14px; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
    cursor:pointer; transition:all .3s ease;
  }
  .btn-outline-light:hover { background:rgba(255,255,255,.15); transform:translateY(-2px); }
  .btn-ghost {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(255,255,255,.15); color:${T.white};
    border:1.5px solid rgba(255,255,255,.4); border-radius:40px;
    padding:12px 28px; font-family:'Jost',sans-serif; font-size:14px;
    font-weight:600; letter-spacing:.08em; text-transform:uppercase;
    cursor:pointer; transition:all .3s ease; backdrop-filter:blur(8px);
  }
  .btn-ghost:hover { background:rgba(255,255,255,.25); transform:translateY(-2px); }
  .tag {
    display:inline-flex; align-items:center; gap:5px;
    background:${T.greenXL}; color:${T.green}; border:1px solid ${T.green}22;
    border-radius:20px; padding:4px 12px; font-size:11px; font-weight:600;
    letter-spacing:.1em; text-transform:uppercase; font-family:'Jost',sans-serif;
  }
  .section-label {
    font-family:'Jost',sans-serif; font-size:11px; font-weight:600;
    letter-spacing:.22em; text-transform:uppercase; color:${T.orange};
    display:flex; align-items:center; gap:10px;
  }
  .section-label::before { content:''; display:block; width:32px; height:2px; background:${T.orange}; }
  .display-serif { font-family:'Cormorant Garamond',serif; }
  .italic-serif { font-family:'Playfair Display',serif; font-style:italic; }
  .product-card { background:${T.white}; border-radius:20px; overflow:hidden; transition:all .35s ease; box-shadow:0 2px 20px rgba(0,0,0,.06); cursor:pointer; }
  .product-card:hover { transform:translateY(-8px); box-shadow:0 16px 48px rgba(0,0,0,.12); }
  .trust-badge { display:flex; align-items:center; gap:8px; background:${T.white}; border:1px solid ${T.green}22; border-radius:12px; padding:10px 16px; font-size:12px; font-weight:500; color:${T.green}; font-family:'Jost',sans-serif; box-shadow:0 2px 12px rgba(0,0,0,.04); white-space:nowrap; }
  .nav-link { font-family:'Jost',sans-serif; font-size:13px; font-weight:600; color:${T.charcoal}; text-decoration:none; cursor:pointer; transition:color .2s; position:relative; letter-spacing:.04em; }
  .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px; background:${T.orange}; transition:width .3s ease; }
  .nav-link:hover { color:${T.orange}; }
  .nav-link:hover::after { width:100%; }
  input, textarea, select { font-family:'Jost',sans-serif; border:1.5px solid #ddd; border-radius:10px; padding:12px 16px; font-size:14px; width:100%; outline:none; transition:border .2s; background:${T.white}; }
  input:focus, textarea:focus { border-color:${T.orange}; }
  .marquee-wrap { overflow:hidden; white-space:nowrap; }
  .marquee-inner { display:inline-flex; animation:marquee 28s linear infinite; }
  .cart-count { position:absolute; top:-6px; right:-6px; background:${T.orange}; color:white; width:18px; height:18px; border-radius:50%; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; }
  .freshness-pill { display:inline-flex; align-items:center; gap:8px; background:${T.green}; color:white; border-radius:30px; padding:8px 18px; font-family:'Jost',sans-serif; font-size:12px; font-weight:600; letter-spacing:.08em; }
  .fresh-dot { width:8px; height:8px; border-radius:50%; background:#4ade80; animation:pulse 1.5s ease infinite; flex-shrink:0; }
  .hamburger { display:none !important; }
  .desktop-nav { display:flex !important; }
  .desktop-btn { display:inline-flex !important; }
  @media (max-width:768px) {
    .hamburger { display:flex !important; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
    .desktop-nav { display:none !important; }
    .desktop-btn { display:none !important; }
    .hero-btns { flex-direction:column !important; align-items:stretch !important; }
    .hero-btns .btn-primary, .hero-btns .btn-ghost { width:100% !important; justify-content:center !important; }
    .ps { padding-left:20px !important; padding-right:20px !important; }
    .g2 { grid-template-columns:1fr !important; gap:28px !important; }
    .g3 { grid-template-columns:1fr !important; gap:16px !important; }
    .g4 { grid-template-columns:1fr 1fr !important; gap:10px !important; }
    .gs { grid-template-columns:1fr 1fr !important; gap:12px !important; }
    .hide-vis { display:none !important; }
    .trust-wrap { flex-wrap:nowrap !important; overflow-x:auto; padding-bottom:8px; }
    .trad-g { grid-template-columns:1fr 1fr !important; gap:12px !important; }
    .footer-g { grid-template-columns:1fr 1fr !important; gap:20px !important; }
    .sub-sizes { grid-template-columns:1fr !important; }
    .cart-panel { width:100vw !important; }
    .loop-inner { flex-direction:column !important; }
  }
`;

const PRODUCTS = [
  { id:1, name:"Orange Cauliflower", price:6.99, unit:"head", cat:"produce", emoji:"🟠", desc:"Signature beta-carotene variety. Sweeter than white, packed with nutrients.", badge:"Signature Crop", color:"#E07B28" },
  { id:2, name:"Persian Cucumbers", price:4.99, unit:"bunch", cat:"produce", emoji:"🥒", desc:"Crisp, thin-skinned, and bursting with freshness. Grown hydroponically for maximum crunch.", badge:"Best Seller", color:"#2A5C45" },
  { id:3, name:"Living Butter Lettuce", price:3.99, unit:"head", cat:"produce", emoji:"🥬", desc:"Roots still attached for maximum shelf life. Harvested to order, never stored.", badge:"Harvested Today", color:"#3D7A5E" },
  { id:4, name:"Rainbow Carrots", price:5.49, unit:"bunch", cat:"produce", emoji:"🥕", desc:"Five varieties in our aquaponic media beds. Sweeter than field-grown.", badge:"Limited", color:"#C4651A" },
  { id:5, name:"Barramundi Fillets", price:18.99, unit:"lb", cat:"seafood", emoji:"🐟", desc:"Asian sea bass raised in crystal-clear freshwater RAS tanks. Clean flavor, zero ocean impact.", badge:"Premium", color:"#1E5C8A" },
  { id:6, name:"Yellow Perch", price:14.99, unit:"lb", cat:"seafood", emoji:"🐠", desc:"Great Lakes' finest, raised sustainably. A regional delicacy with sweet, mild flavor.", badge:"Ohio Proud", color:"#8A6A1E" },
  { id:7, name:"Freshwater Prawns", price:22.99, unit:"lb", cat:"seafood", emoji:"🦐", desc:"Giant freshwater prawns — sweet, tender, domestic. No imported frozen shrimp.", badge:"No Imports", color:"#E05252" },
  { id:8, name:"Farm Box (Weekly)", price:49.99, unit:"box", cat:"subscription", emoji:"📦", desc:"8-10 seasonal items curated weekly. Free delivery within 300 miles.", badge:"Best Value", color:"#2A5C45" },
  { id:9, name:"Prime Rib Roast", price:54.99, unit:"lb", cat:"beef", emoji:"🥩", desc:"Bone-in prime rib from our Ohio Fields grass-fed herd. Soy-free, dry-aged 21 days. The centerpiece cut.", badge:"Signature Cut", color:"#8B1A1A" },
  { id:10, name:"Ribeye Steak", price:34.99, unit:"lb", cat:"beef", emoji:"🥩", desc:"Well-marbled, richly flavored grass-fed ribeye. Cut thick to order. Soy-free from pasture to plate.", badge:"Best Seller", color:"#8B1A1A" },
  { id:11, name:"NY Strip Steak", price:29.99, unit:"lb", cat:"beef", emoji:"🥩", desc:"Lean, tender, and deeply flavorful. Our grass-fed NY strip is the everyday premium steak.", badge:"Ohio Proud", color:"#7A1818" },
  { id:12, name:"Filet Mignon", price:44.99, unit:"lb", cat:"beef", emoji:"🥩", desc:"The most tender cut from our grass-fed herd. Buttery texture, clean flavor, zero compromise.", badge:"Premium", color:"#8B1A1A" },
  { id:13, name:"Brisket", price:16.99, unit:"lb", cat:"beef", emoji:"🥩", desc:"Slow-cook ready. Our grass-fed brisket develops deep, rich flavor when given time. Perfect for smoking.", badge:"Pit Master", color:"#6B3A1A" },
  { id:14, name:"Ground Beef (80/20)", price:9.99, unit:"lb", cat:"beef", emoji:"🥩", desc:"Grass-fed, soy-free ground beef from our Ohio Fields herd. No fillers, no additives. Just beef.", badge:"Everyday Essential", color:"#7A4A2A" },
  { id:15, name:"Chuck Roast", price:14.99, unit:"lb", cat:"beef", emoji:"🥩", desc:"Slow-braise perfection. Our grass-fed chuck roast breaks down into fork-tender, richly flavored beef.", badge:"Sunday Roast", color:"#6B3A1A" },
  { id:16, name:"Ohio Beef Box", price:129.99, unit:"box", cat:"subscription", emoji:"📦", desc:"Monthly curated selection of our finest grass-fed cuts — steaks, roasts, and ground beef. Soy-free, always.", badge:"Best Value", color:"#8B1A1A" },
];

const NAV_ITEMS = ["Shop","Our Farm","Verde Energy","Nutraceuticals","Recipes","About","Wholesale"];

const TRUST_BADGES = [
  { icon:"☀️", label:"Solar Powered" },
  { icon:"💧", label:"Closed-Loop Water" },
  { icon:"🌿", label:"Ohio Grown" },
  { icon:"🚫", label:"No Brackish Water" },
  { icon:"🐄", label:"Grass-Fed Beef & Dairy" },
  { icon:"🔄", label:"Soy-Free Always" },
  { icon:"🧬", label:"Pharmaceutical Chitosan" },
  { icon:"⚡", label:"30.9 MW Solar" },
];

function Nav({ setPage, cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const bg = scrolled || menuOpen ? "rgba(250,247,242,.97)" : "transparent";
  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, background:bg, backdropFilter:"blur(16px)", borderBottom:scrolled||menuOpen?"1px solid rgba(0,0,0,.07)":"none", padding:"0 24px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all .4s ease" }}>
        <div onClick={() => { setPage("home"); setMenuOpen(false); }} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${T.orange},${T.orangeD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, boxShadow:`0 4px 16px ${T.orange}44`, flexShrink:0 }}>🍊</div>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:T.charcoal, lineHeight:1 }}>Orange Foods</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:".18em", color:T.stone, textTransform:"uppercase" }}>Farm · Table · Ohio</div>
          </div>
        </div>
        <div className="desktop-nav" style={{ alignItems:"center", gap:24 }}>
          {NAV_ITEMS.map(item => <span key={item} className="nav-link" onClick={() => setPage(item.toLowerCase().replace(" ",""))}>{item}</span>)}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ position:"relative", cursor:"pointer" }} onClick={() => setPage("shop")}>
            <span style={{ fontSize:20 }}>🛒</span>
            {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
          </div>
          <button className="btn-primary desktop-btn" style={{ padding:"10px 20px", fontSize:13 }} onClick={() => setPage("shop")}>Shop Fresh</button>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            <div style={{ width:22, height:2, background:T.charcoal, borderRadius:2, transition:"all .3s", transform:menuOpen?"rotate(45deg) translateY(7px)":"none" }} />
            <div style={{ width:22, height:2, background:T.charcoal, borderRadius:2, transition:"opacity .3s", opacity:menuOpen?0:1 }} />
            <div style={{ width:22, height:2, background:T.charcoal, borderRadius:2, transition:"all .3s", transform:menuOpen?"rotate(-45deg) translateY(-7px)":"none" }} />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position:"fixed", top:68, left:0, right:0, zIndex:999, background:"rgba(250,247,242,.98)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(0,0,0,.07)", padding:"10px 24px 24px" }}>
          {NAV_ITEMS.map(item => (
            <div key={item} onClick={() => { setPage(item.toLowerCase().replace(" ","")); setMenuOpen(false); }} style={{ fontFamily:"'Jost',sans-serif", fontSize:17, fontWeight:500, color:T.charcoal, padding:"14px 0", borderBottom:"1px solid rgba(0,0,0,.06)", cursor:"pointer" }}>{item}</div>
          ))}
          <button className="btn-primary" style={{ marginTop:18, width:"100%", justifyContent:"center" }} onClick={() => { setPage("shop"); setMenuOpen(false); }}>Shop Fresh Now →</button>
        </div>
      )}
    </>
  );
}

function HeroSection({ setPage }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    { bg:"linear-gradient(135deg,#1a3a28,#2A5C45,#3d7a5e)", emoji:"🌱", h:"Grown in Light.", sub:"Harvested at Dawn." },
    { bg:"linear-gradient(135deg,#3d2a10,#7a4a1e,#E07B28)", emoji:"🍊", h:"Orange Cauliflower.", sub:"Taste the Difference." },
    { bg:"linear-gradient(135deg,#0d2a3d,#1e5c8a,#2e7fb5)", emoji:"🐟", h:"Freshwater. Fresh Flavor.", sub:"From Tank to Table." },
    { bg:"linear-gradient(135deg,#2a1a0a,#5C3D1E,#8a5e30)", emoji:"🐄", h:"Rooted in Tradition.", sub:"Grass-Fed. Soy-Free. Ohio." },
  ];
  useEffect(() => { const t = setInterval(() => setSlide(p => (p+1)%slides.length), 5000); return () => clearInterval(t); }, []);
  const s = slides[slide];
  return (
    <section style={{ minHeight:"100vh", position:"relative", overflow:"hidden", background:s.bg, transition:"background 1.2s ease", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"rgba(255,255,255,.04)", top:"-20%", right:"-10%", animation:"float 8s ease-in-out infinite" }} />
      <div style={{ textAlign:"center", zIndex:10, padding:"80px 28px 40px", maxWidth:860, width:"100%" }}>
        <div style={{ fontSize:72, marginBottom:16, animation:"float 4s ease-in-out infinite" }}>{s.emoji}</div>
        <div className="section-label" style={{ justifyContent:"center", color:"rgba(255,255,255,.7)", marginBottom:16 }}>
          <span style={{ background:"rgba(255,255,255,.7)" }} /> Orange Foods LLC · Rural Ohio
        </div>
        <h1 className="display-serif" style={{ fontSize:"clamp(40px,8vw,88px)", color:T.white, lineHeight:1.05, marginBottom:8, textShadow:"0 4px 32px rgba(0,0,0,.3)" }}>{s.h}</h1>
        <h2 className="italic-serif" style={{ fontSize:"clamp(20px,4vw,44px)", color:"rgba(255,255,255,.8)", marginBottom:32 }}>{s.sub}</h2>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:"rgba(255,255,255,.75)", maxWidth:520, margin:"0 auto 36px", lineHeight:1.7, fontWeight:300 }}>
          500,000 sq ft of solar-powered aquaponics alongside traditional grass-fed dairy and soy-free farmland. Fresh from our farms to your table.
        </p>
        <div className="hero-btns" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-primary" style={{ fontSize:15, padding:"16px 36px" }} onClick={() => setPage("shop")}>Shop Fresh Now →</button>
          <button className="btn-ghost" onClick={() => setPage("ourfarm")}>Tour Our Farm</button>
        </div>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:40 }}>
          {slides.map((_,i) => <div key={i} onClick={() => setSlide(i)} style={{ width:i===slide?28:8, height:8, borderRadius:4, background:i===slide?T.white:"rgba(255,255,255,.35)", cursor:"pointer", transition:"all .3s ease" }} />)}
        </div>
      </div>
      <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
        <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,.5)", letterSpacing:".15em", textTransform:"uppercase" }}>Scroll to Explore</span>
        <div style={{ width:1, height:32, background:"linear-gradient(to bottom,rgba(255,255,255,.5),transparent)", animation:"pulse 2s ease infinite" }} />
      </div>
    </section>
  );
}

function MarqueeBanner() {
  const items = ["Ohio Grown","Solar Powered","Grass-Fed Beef","Harvested Fresh Daily","No Brackish Water","Soy-Free Always","Pharmaceutical Chitosan","Closed-Loop System","30.9 MW Green Energy","Farm to Table","Zero Compromise","Premium Beef Cuts"];
  const doubled = [...items,...items];
  return (
    <div style={{ background:T.orange, padding:"13px 0", overflow:"hidden" }}>
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {doubled.map((item,i) => <span key={i} style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:600, letterSpacing:".18em", textTransform:"uppercase", color:T.white, marginRight:44, display:"inline-flex", alignItems:"center", gap:14 }}>{item} <span style={{ color:"rgba(255,255,255,.4)" }}>◆</span></span>)}
        </div>
      </div>
    </div>
  );
}

function TrustBadges() {
  return (
    <section style={{ background:T.cream, padding:"36px 24px 0" }}>
      <div className="trust-wrap" style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
        {TRUST_BADGES.map((b,i) => <div key={i} className="trust-badge"><span style={{ fontSize:14 }}>{b.icon}</span>{b.label}</div>)}
      </div>
    </section>
  );
}

function TraditionalFarmingHero({ setPage }) {
  return (
    <section style={{ background:`linear-gradient(160deg,#2a1a0a 0%,${T.bark} 50%,#6b3a1a 100%)`, padding:"90px 28px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%,rgba(201,168,76,.12) 0%,transparent 50%),radial-gradient(circle at 80% 80%,rgba(42,92,69,.2) 0%,transparent 50%)" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div className="section-label" style={{ justifyContent:"center", color:"rgba(255,255,255,.5)", marginBottom:14 }}>
            <span style={{ background:"rgba(255,255,255,.5)" }} /> Ohio Fields LLC · Traditional Agriculture
          </div>
          <h2 className="display-serif" style={{ fontSize:"clamp(32px,6vw,64px)", color:T.white, lineHeight:1.1, marginBottom:14 }}>
            Where it all began.<br /><em style={{ color:T.gold }}>The land. The cattle. The craft.</em>
          </h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:"rgba(255,255,255,.7)", maxWidth:580, margin:"0 auto", lineHeight:1.8 }}>
            Before aquaponics. Before solar arrays. There was the farm. Ohio Fields LLC honors that heritage — soy-free, grass-fed, and rooted in the rhythms of the Ohio seasons.
          </p>
        </div>

        <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center", marginBottom:48 }}>
          <div style={{ background:"rgba(255,255,255,.06)", borderRadius:26, padding:"44px 36px", border:"1px solid rgba(255,255,255,.12)", textAlign:"center", position:"relative" }}>
            <div style={{ fontSize:88, marginBottom:20, animation:"float 5s ease-in-out infinite" }}>🐄</div>
            <h3 className="display-serif" style={{ fontSize:36, color:T.white, marginBottom:10 }}>Grass-Fed Dairy</h3>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.7)", lineHeight:1.8, marginBottom:24, maxWidth:300, margin:"0 auto 24px" }}>
              Our dairy herd grazes on Ohio pasture year-round. Soy-free feed only. No growth hormones. No shortcuts. Clean, honest dairy the way it was always meant to be raised.
            </p>
            <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
              {["100% Soy-Free","Pasture Raised","No Hormones","Ohio Pasture","Regional Co-op"].map((b,i) => (
                <span key={i} style={{ background:"rgba(255,255,255,.12)", color:"rgba(255,255,255,.9)", border:"1px solid rgba(255,255,255,.2)", borderRadius:20, padding:"4px 12px", fontSize:10, fontFamily:"'Jost',sans-serif", fontWeight:600 }}>{b}</span>
              ))}
            </div>
            <div style={{ position:"absolute", top:-14, right:-14, background:T.gold, color:T.white, borderRadius:"50%", width:68, height:68, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontWeight:700, textAlign:"center", lineHeight:1.2, boxShadow:`0 8px 24px ${T.gold}66` }}>Ohio<br />Proud</div>
          </div>
          <div>
            <div className="section-label" style={{ color:T.gold, marginBottom:18 }}><span style={{ background:T.gold }} /> Why Grass-Fed Matters</div>
            <h3 className="display-serif" style={{ fontSize:"clamp(24px,3vw,38px)", color:T.white, marginBottom:18, lineHeight:1.2 }}>The difference you can<br /><em style={{ color:T.gold }}>taste in every glass.</em></h3>
            {[
              { icon:"🌿", title:"Higher Omega-3s", body:"Grass-fed dairy contains 2-5x more omega-3 fatty acids than conventional grain-fed. Real nutritional difference, not marketing." },
              { icon:"🚫", title:"Zero Soy. Always.", body:"Our herd has never been fed soy — period. We know soy-free matters to families with sensitivities and those choosing cleaner food." },
              { icon:"🌍", title:"Better for the Land", body:"Rotational grazing rebuilds soil health. Our cattle work with the land, not against it. Every season leaves the pasture stronger." },
              { icon:"🔄", title:"Closes the Loop", body:"Dairy manure flows into Orange Digester LLC, producing biogas and premium fertilizer that returns to our fields." },
            ].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:12, marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,.08)" }}>
                <div style={{ fontSize:22, flexShrink:0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontWeight:700, fontSize:13, color:T.white, marginBottom:3 }}>{item.title}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"rgba(255,255,255,.65)", lineHeight:1.65 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:"rgba(255,255,255,.05)", borderRadius:18, padding:"28px 32px", border:"1px solid rgba(255,255,255,.1)", marginBottom:36 }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div className="section-label" style={{ justifyContent:"center", color:T.gold, marginBottom:8 }}><span style={{ background:T.gold }} /> Soy-Free Crop Rotation</div>
            <h3 className="display-serif" style={{ fontSize:"clamp(22px,3vw,32px)", color:T.white }}>Four crops. One living calendar.</h3>
          </div>
          <div className="trad-g" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {[
              { emoji:"🌽", crop:"Corn", season:"Summer", detail:"Non-GMO, soy-free rotation crop. Sold to grain elevator or used in dairy rations.", color:T.orange },
              { emoji:"🌾", crop:"Oats & Barley", season:"Spring", detail:"Specialty grain for malting and flour markets. High-value alternative.", color:T.gold },
              { emoji:"🌿", crop:"Alfalfa & Hay", season:"Year-Round", detail:"Primary feed for our dairy herd. Grown on-site to eliminate soy-based feed.", color:T.greenL },
              { emoji:"🌱", crop:"Winter Wheat & Rye", season:"Winter", detail:"Cover crop protecting soil health. Cash grain in shoulder season.", color:"#9ab87a" },
            ].map((c,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,.06)", borderRadius:14, padding:"18px 14px", border:`1px solid ${c.color}33`, textAlign:"center" }}>
                <div style={{ fontSize:32, marginBottom:8 }}>{c.emoji}</div>
                <div style={{ display:"inline-block", background:`${c.color}33`, color:c.color, borderRadius:20, padding:"2px 8px", fontSize:9, fontFamily:"'Jost',sans-serif", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", marginBottom:6 }}>{c.season}</div>
                <div className="display-serif" style={{ fontSize:18, color:T.white, marginBottom:4 }}>{c.crop}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.55)", lineHeight:1.5 }}>{c.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="trad-g" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:40 }}>
          {[
            { n:"100%", label:"Soy-Free", sub:"Every acre, every animal" },
            { n:"4", label:"Crop Varieties", sub:"In careful rotation" },
            { n:"Zero", label:"Synthetic Inputs", sub:"Digestate replaces fertilizer" },
            { n:"Ohio", label:"Born & Raised", sub:"Local dairy, local grain" },
          ].map((s,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.06)", borderRadius:14, padding:"18px 14px", textAlign:"center", border:"1px solid rgba(255,255,255,.08)" }}>
              <div className="display-serif" style={{ fontSize:32, fontWeight:700, color:T.gold, lineHeight:1, marginBottom:3 }}>{s.n}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:700, color:T.white, marginBottom:3 }}>{s.label}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,.5)" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center" }}>
          <button className="btn-outline-light" onClick={() => setPage("ourfarm")}>Learn More About Ohio Fields →</button>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product:p, addToCart }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => { addToCart(p); setAdded(true); setTimeout(() => setAdded(false), 1800); };
  return (
    <div className="product-card">
      <div style={{ height:190, overflow:"hidden", background:`linear-gradient(135deg,${p.color}22,${p.color}44)`, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:56, filter:"drop-shadow(0 8px 16px rgba(0,0,0,.15))" }}>{p.emoji}</span>
        <div style={{ position:"absolute", top:10, left:10 }}>
          <span className="tag" style={{ background:p.color, color:T.white, border:"none", fontSize:9 }}>{p.badge}</span>
        </div>
      </div>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
          <h3 className="display-serif" style={{ fontSize:19, fontWeight:600, color:T.charcoal, lineHeight:1.2 }}>{p.name}</h3>
          <div style={{ textAlign:"right", flexShrink:0, marginLeft:8 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:16, fontWeight:700, color:T.orange }}>${p.price}</div>
            <div style={{ fontSize:10, color:T.stone }}>/{p.unit}</div>
          </div>
        </div>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.stone, lineHeight:1.6, marginBottom:10 }}>{p.desc}</p>
        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:12 }}>
          <div className="fresh-dot" />
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:T.green, fontWeight:600 }}>Harvested within 48 hrs</span>
        </div>
      </div>
      <div style={{ padding:"0 16px 16px" }}>
        <button onClick={handleAdd} style={{ width:"100%", padding:"11px", border:"none", borderRadius:12, background:added?T.green:T.orange, color:T.white, fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .3s ease" }}>
          {added ? "✓ Added to Box" : "Add to Box"}
        </button>
      </div>
    </div>
  );
}

function FeaturedProducts({ setPage, addToCart }) {
  return (
    <section className="ps" style={{ padding:"72px 28px", background:T.cream }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:36, flexWrap:"wrap", gap:16 }}>
          <div>
            <div className="section-label" style={{ marginBottom:10 }}>Today's Harvest</div>
            <h2 className="display-serif" style={{ fontSize:"clamp(32px,5vw,48px)", color:T.charcoal, lineHeight:1.1 }}>Fresh from the<br /><em style={{ color:T.orange }}>Farm Floor</em></h2>
          </div>
          <button className="btn-outline" onClick={() => setPage("shop")}>View All Products</button>
        </div>
        <div className="g4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
          {PRODUCTS.slice(0,4).map((p,i) => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="ps" style={{ background:T.green, padding:"72px 28px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-50%", right:"-10%", width:500, height:500, borderRadius:"50%", background:"rgba(255,255,255,.04)" }} />
      <div style={{ maxWidth:1000, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:10 }}>
            <span style={{ background:"rgba(255,255,255,.6)" }} /> By the Numbers
          </div>
          <h2 className="display-serif" style={{ fontSize:"clamp(28px,5vw,44px)", color:T.white }}>Scale that <em style={{ color:T.orangeL }}>matters</em></h2>
        </div>
        <div className="gs" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
          {[{number:"500K",unit:"sq ft",label:"Indoor Farm"},{number:"30.9",unit:"MW",label:"Solar Power"},{number:"48h",unit:"max",label:"Farm to Door"},{number:"100%",unit:"",label:"Soy-Free"}].map((s,i) => (
            <div key={i} style={{ textAlign:"center", padding:"24px 14px", background:"rgba(255,255,255,.07)", borderRadius:18, border:"1px solid rgba(255,255,255,.1)" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,5vw,52px)", fontWeight:700, color:T.orangeL, lineHeight:1 }}>{s.number}<span style={{ fontSize:18, color:"rgba(255,255,255,.5)", marginLeft:3 }}>{s.unit}</span></div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.65)", marginTop:6, letterSpacing:".1em", textTransform:"uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FarmStoryTeaser({ setPage }) {
  return (
    <section className="ps" style={{ padding:"72px 28px", background:T.parchment }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
          <div>
            <div className="section-label" style={{ marginBottom:14 }}>Our Farm</div>
            <h2 className="display-serif" style={{ fontSize:"clamp(30px,4vw,48px)", color:T.charcoal, lineHeight:1.1, marginBottom:18 }}>500,000 sq ft of<br /><em style={{ color:T.green }}>living, breathing</em><br />agriculture</h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:T.stone, lineHeight:1.8, marginBottom:16 }}>Inside our rural Ohio facility, fish and plants grow in a perfect closed-loop dance. Fish waste nourishes our crops. Crops filter the water for our fish. Every drop recirculated.</p>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:T.stone, lineHeight:1.8, marginBottom:24 }}>No pesticides. No synthetic fertilizers. No brackish water. Just sunlight, clean water, and science working in harmony.</p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:24 }}>
              {["350K sq ft Crops","150K sq ft Aquaculture","3 Fish Species","4 Crop Varieties"].map((f,i) => <span key={i} className="tag">{f}</span>)}
            </div>
            <button className="btn-outline" onClick={() => setPage("ourfarm")}>Explore the Farm →</button>
          </div>
          <div className="hide-vis" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, position:"relative" }}>
            {[{bg:`linear-gradient(135deg,${T.green},#3d7a5e)`,emoji:"🌿",label:"Crop Bays"},{bg:`linear-gradient(135deg,#1e5c8a,#2e7fb5)`,emoji:"💧",label:"Fish Tanks"},{bg:`linear-gradient(135deg,${T.orange},${T.orangeD})`,emoji:"☀️",label:"Solar Array"},{bg:`linear-gradient(135deg,${T.bark},#8a5e30)`,emoji:"🐄",label:"Ohio Fields"}].map((card,i) => (
              <div key={i} style={{ borderRadius:16, height:160, background:card.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer", transition:"transform .3s" }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                <span style={{ fontSize:32 }}>{card.emoji}</span>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:600, color:"rgba(255,255,255,.9)", letterSpacing:".12em", textTransform:"uppercase" }}>{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VerdeTeaser({ setPage }) {
  return (
    <section className="ps" style={{ background:`linear-gradient(135deg,#1a3a28,${T.green})`, padding:"72px 28px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 50%,rgba(224,123,40,.15) 0%,transparent 60%)" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ background:"rgba(255,255,255,.08)", borderRadius:22, padding:32, border:"1px solid rgba(255,255,255,.12)" }}>
              <div style={{ fontSize:40, marginBottom:10 }}>☀️</div>
              <div className="display-serif" style={{ fontSize:"clamp(44px,6vw,60px)", fontWeight:700, color:T.orangeL, lineHeight:1 }}>30.9<span style={{ fontSize:24, color:"rgba(255,255,255,.5)" }}>MW</span></div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"rgba(255,255,255,.6)", letterSpacing:".1em", textTransform:"uppercase", marginTop:8 }}>Solar Generation Capacity</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[{emoji:"♻️",label:"Anaerobic Digester",sub:"Waste → Biogas → Power"},{emoji:"🌿",label:"Digestate Fertilizer",sub:"Closing the nutrient loop"}].map((x,i) => (
                <div key={i} style={{ background:"rgba(255,255,255,.07)", borderRadius:14, padding:16, border:"1px solid rgba(255,255,255,.1)" }}>
                  <div style={{ fontSize:24, marginBottom:6 }}>{x.emoji}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:600, color:T.white, marginBottom:3 }}>{x.label}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,.5)" }}>{x.sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.1)", borderRadius:20, padding:"6px 14px", marginBottom:18 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", animation:"pulse 1.5s ease infinite" }} />
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,.8)", letterSpacing:".14em", textTransform:"uppercase" }}>Verde Energy LLC — Live Generation</span>
            </div>
            <h2 className="display-serif" style={{ fontSize:"clamp(30px,4vw,48px)", color:T.white, lineHeight:1.1, marginBottom:18 }}>The farm that<br /><em style={{ color:T.orangeL }}>powers itself</em></h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:"rgba(255,255,255,.7)", lineHeight:1.8, marginBottom:16 }}>Verde Energy LLC is the engine behind Orange Foods. Our 30.9 MW solar array covers 100% of farm electrical demand. Excess power flows back to Ohio's grid.</p>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:"rgba(255,255,255,.7)", lineHeight:1.8, marginBottom:28 }}>Our anaerobic digester converts fish waste, crop trimmings, and dairy manure into biogas and premium fertilizer. Nothing wasted. Everything cycles.</p>
            <button className="btn-ghost" onClick={() => setPage("verdeenergy")}>Learn About Verde Energy →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubscriptionBuilder({ addToCart }) {
  const [size, setSize] = useState("medium");
  const [selected, setSelected] = useState([]);
  const sizes = [{key:"small",label:"Starter Box",items:"4-5 items",price:29.99},{key:"medium",label:"Family Box",items:"8-10 items",price:49.99},{key:"large",label:"Harvest Box",items:"14-16 items",price:79.99}];
  const toggle = (id) => setSelected(s => s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const sel = sizes.find(s=>s.key===size);
  return (
    <section className="ps" style={{ padding:"72px 28px", background:T.cream }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <div className="section-label" style={{ justifyContent:"center", marginBottom:10 }}>Build Your Box</div>
          <h2 className="display-serif" style={{ fontSize:"clamp(28px,5vw,44px)", color:T.charcoal, marginBottom:10 }}>Your Weekly <em style={{ color:T.orange }}>Farm Box</em></h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:T.stone, maxWidth:420, margin:"0 auto" }}>Fresh within 48 hours, guaranteed. Cancel or pause anytime.</p>
        </div>
        <div className="sub-sizes" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:36 }}>
          {sizes.map(s => (
            <div key={s.key} onClick={() => setSize(s.key)} style={{ border:`2px solid ${size===s.key?T.orange:"#ddd"}`, borderRadius:14, padding:"18px 14px", textAlign:"center", cursor:"pointer", background:size===s.key?`${T.orange}0e`:T.white, transition:"all .2s" }}>
              <div className="display-serif" style={{ fontSize:20, fontWeight:700, color:size===s.key?T.orange:T.charcoal, marginBottom:3 }}>{s.label}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:T.stone, marginBottom:6 }}>{s.items}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:18, fontWeight:700, color:T.green }}>${s.price}<span style={{ fontSize:11, color:T.stone }}>/wk</span></div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:10, marginBottom:32 }}>
          {PRODUCTS.slice(0,7).map(p => (
            <div key={p.id} onClick={() => toggle(p.id)} style={{ borderRadius:12, padding:12, textAlign:"center", cursor:"pointer", border:`2px solid ${selected.includes(p.id)?T.orange:"transparent"}`, background:`linear-gradient(135deg,${p.color}14,${p.color}28)`, transition:"all .25s", transform:selected.includes(p.id)?"scale(1.04)":"scale(1)" }}>
              <div style={{ fontSize:28, marginBottom:5 }}>{p.emoji}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, fontWeight:600, color:T.charcoal, marginBottom:2 }}>{p.name}</div>
              {selected.includes(p.id) && <div style={{ marginTop:4, background:T.orange, color:T.white, borderRadius:6, padding:"2px 0", fontSize:10, fontWeight:700 }}>✓</div>}
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center" }}>
          <button className="btn-primary" style={{ fontSize:15, padding:"16px 44px" }} onClick={() => addToCart({...sel,name:`${sel.label} Subscription`,price:sel.price,id:"sub",emoji:"📦"})}>
            Subscribe — ${sel.price}/week →
          </button>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.stone, marginTop:10 }}>Free delivery · Cancel anytime · Harvested to order</p>
        </div>
      </div>
    </section>
  );
}

function RecipesTeaser({ setPage }) {
  const recipes = [
    { emoji:"🥗", name:"Barramundi Crudo", sub:"Orange cauliflower vinaigrette · Garden lettuce", time:"15 min" },
    { emoji:"🥘", name:"Prawn Bisque", sub:"Fresh prawns · Cream · Farm herbs", time:"35 min" },
    { emoji:"🫕", name:"Perch Piccata", sub:"Yellow perch · Lemon caper butter · Carrots", time:"25 min" },
  ];
  return (
    <section className="ps" style={{ padding:"72px 28px", background:T.parchment }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:36, flexWrap:"wrap", gap:16 }}>
          <div>
            <div className="section-label" style={{ marginBottom:10 }}>Recipes & Inspiration</div>
            <h2 className="display-serif" style={{ fontSize:"clamp(28px,5vw,44px)", color:T.charcoal }}>Cook with <em style={{ color:T.orange }}>what's fresh</em></h2>
          </div>
          <button className="btn-outline" onClick={() => setPage("recipes")}>All Recipes</button>
        </div>
        <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {recipes.map((r,i) => (
            <div key={i} style={{ background:T.white, borderRadius:18, overflow:"hidden", cursor:"pointer", transition:"transform .3s, box-shadow .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ height:180, background:`linear-gradient(135deg,${T.green},${T.greenL})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:64 }}>{r.emoji}</div>
              <div style={{ padding:20 }}>
                <h3 className="display-serif" style={{ fontSize:24, color:T.charcoal, marginBottom:6 }}>{r.name}</h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.stone, lineHeight:1.6, marginBottom:10 }}>{r.sub}</p>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ fontSize:13 }}>⏱</span>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:T.green, fontWeight:600 }}>{r.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const quotes = [
    { q:"I've never tasted lettuce this fresh. It's like a completely different food.", name:"Sarah M.", loc:"Columbus, OH" },
    { q:"The barramundi is incredible — clean, sweet, nothing like store-bought.", name:"James T.", loc:"Cleveland, OH" },
    { q:"Knowing it's solar-powered and soy-free makes every bite taste even better.", name:"Rachel K.", loc:"Cincinnati, OH" },
  ];
  return (
    <section className="ps" style={{ padding:"72px 28px", background:T.green, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 80%,rgba(224,123,40,.12) 0%,transparent 50%)" }} />
      <div style={{ maxWidth:1000, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:10 }}>
            <span style={{ background:"rgba(255,255,255,.6)" }} /> What People Say
          </div>
          <h2 className="display-serif" style={{ fontSize:"clamp(28px,5vw,44px)", color:T.white }}>From our <em style={{ color:T.orangeL }}>community</em></h2>
        </div>
        <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {quotes.map((q,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.07)", borderRadius:18, padding:28, border:"1px solid rgba(255,255,255,.1)" }}>
              <div className="display-serif" style={{ fontSize:52, color:T.orange, lineHeight:1, marginBottom:6 }}>"</div>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.85)", lineHeight:1.7, marginBottom:16, fontStyle:"italic" }}>{q.q}</p>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.orangeL, fontWeight:600 }}>{q.name}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,.45)" }}>{q.loc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="ps" style={{ padding:"72px 28px", background:T.orange, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 20%,rgba(255,255,255,.12) 0%,transparent 50%)" }} />
      <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:44, marginBottom:12 }}>🌾</div>
        <h2 className="display-serif" style={{ fontSize:"clamp(28px,5vw,40px)", color:T.white, marginBottom:12 }}>Harvest Updates, Weekly</h2>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.8)", marginBottom:28 }}>What's growing this week, new recipes, and seasonal specials — straight to your inbox.</p>
        {!done ? (
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" style={{ flex:1, minWidth:200, background:"rgba(255,255,255,.15)", border:"1.5px solid rgba(255,255,255,.4)", color:T.white, borderRadius:40 }} />
            <button className="btn-ghost" onClick={() => { if(email) setDone(true); }}>Subscribe</button>
          </div>
        ) : (
          <div style={{ background:"rgba(255,255,255,.15)", borderRadius:18, padding:"18px 28px", border:"1px solid rgba(255,255,255,.3)" }}>
            <div className="display-serif" style={{ fontSize:26, color:T.white }}>Welcome to the farm ✓</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:"rgba(255,255,255,.7)", marginTop:6 }}>We'll be in touch at next harvest.</div>
          </div>
        )}
      </div>
    </section>
  );
}

function CartSidebar({ items, isOpen, onClose, removeItem }) {
  const total = items.reduce((s,i) => s+i.price*i.qty, 0);
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.4)", zIndex:1999, opacity:isOpen?1:0, pointerEvents:isOpen?"all":"none", transition:"opacity .3s", backdropFilter:"blur(4px)" }} />
      <div className="cart-panel" style={{ position:"fixed", top:0, right:0, bottom:0, width:380, background:T.white, zIndex:2000, transform:isOpen?"translateX(0)":"translateX(100%)", transition:"transform .4s cubic-bezier(.4,0,.2,1)", boxShadow:"-8px 0 48px rgba(0,0,0,.12)", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"22px 24px", borderBottom:"1px solid #eee", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h3 className="display-serif" style={{ fontSize:26, color:T.charcoal }}>Your Box</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:T.stone }}>✕</button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
          {items.length===0 ? (
            <div style={{ textAlign:"center", padding:"56px 0" }}>
              <div style={{ fontSize:44, marginBottom:12 }}>🌾</div>
              <p className="display-serif" style={{ fontSize:22, color:T.stone }}>Your box is empty</p>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.stone, marginTop:6 }}>Add fresh items from the shop</p>
            </div>
          ) : items.map((item,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:"1px solid #f0f0f0" }}>
              <div style={{ width:48, height:48, borderRadius:10, background:`linear-gradient(135deg,${T.green}22,${T.orange}22)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{item.emoji||"📦"}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:600, color:T.charcoal }}>{item.name}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:T.stone }}>Qty: {item.qty} × ${item.price}</div>
              </div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:700, color:T.orange }}>${(item.price*item.qty).toFixed(2)}</div>
              <button onClick={() => removeItem(i)} style={{ background:"none", border:"none", color:T.stone, cursor:"pointer", fontSize:15 }}>✕</button>
            </div>
          ))}
        </div>
        {items.length>0 && (
          <div style={{ padding:"18px 24px", borderTop:"1px solid #eee" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone }}>Subtotal</span>
              <span className="display-serif" style={{ fontSize:20, fontWeight:700, color:T.charcoal }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:16 }}>
              <div className="fresh-dot" />
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:T.green }}>Harvested within 48 hrs · Free delivery over $60</span>
            </div>
            <button className="btn-primary" style={{ width:"100%", justifyContent:"center", padding:"15px" }}>Checkout → ${total.toFixed(2)}</button>
          </div>
        )}
      </div>
    </>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background:T.charcoal, color:"rgba(255,255,255,.6)", padding:"56px 28px 28px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="footer-g" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36, marginBottom:36 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${T.orange},${T.orangeD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🍊</div>
              <div>
                <div className="display-serif" style={{ fontSize:18, fontWeight:700, color:T.white }}>Orange Foods LLC</div>
                <div style={{ fontSize:9, letterSpacing:".16em", color:T.stone, textTransform:"uppercase" }}>Powered by Verde Energy</div>
              </div>
            </div>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, lineHeight:1.8, maxWidth:240, marginBottom:16 }}>Fresh from our farms to your table. 500,000 sq ft of solar-powered aquaponics + traditional grass-fed dairy in rural Ohio.</p>
            <div style={{ display:"flex", gap:8 }}>
              {["📘","📸","🐦","▶️"].map((icon,i) => <div key={i} style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14 }}>{icon}</div>)}
            </div>
          </div>
          {[
            {title:"Shop",links:["Fresh Produce","Seafood","Subscription Boxes","Wholesale","Gift Cards"]},
            {title:"Company",links:["Our Farm","Verde Energy","Ohio Fields","About Us","Careers"]},
            {title:"Support",links:["Contact","FAQ","Delivery Info","Returns","Press"]},
          ].map((col,i) => (
            <div key={i}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:T.white, marginBottom:14 }}>{col.title}</div>
              {col.links.map((link,j) => <div key={j} onClick={() => setPage(link.toLowerCase().replace(/ /g,""))} style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"rgba(255,255,255,.5)", marginBottom:8, cursor:"pointer" }}>{link}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>© 2026 Orange Foods LLC & Verde Energy LLC. Rural Ohio.</div>
          <div style={{ display:"flex", gap:8 }}>
            <span className="trust-badge" style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", fontSize:10 }}>☀️ Solar Powered</span>
            <span className="trust-badge" style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", fontSize:10 }}>🐄 Grass-Fed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ShopPage({ addToCart }) {
  const [cat, setCat] = useState("all");
  const cats = ["all","produce","seafood","beef","subscription"];
  const filtered = cat==="all"?PRODUCTS:PRODUCTS.filter(p=>p.cat===cat);
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:`linear-gradient(135deg,${T.green},#1a3a28)`, padding:"72px 28px 52px", textAlign:"center" }}>
        <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:12 }}><span style={{ background:"rgba(255,255,255,.6)" }} /> Fresh Daily</div>
        <h1 className="display-serif" style={{ fontSize:"clamp(36px,7vw,56px)", color:T.white, marginBottom:10 }}>The Farm Shop</h1>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:"rgba(255,255,255,.7)", maxWidth:420, margin:"0 auto" }}>Everything harvested within 48 hours. Grown without pesticides. Powered by the sun.</p>
      </div>
      <div className="ps" style={{ padding:"36px 28px", background:T.cream }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", gap:10, marginBottom:32, flexWrap:"wrap", alignItems:"center" }}>
            {cats.map(c => <button key={c} onClick={() => setCat(c)} style={{ padding:"10px 20px", borderRadius:30, border:`2px solid ${cat===c?T.orange:"#ddd"}`, background:cat===c?T.orange:T.white, color:cat===c?T.white:T.stone, fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .2s" }}>{c==="all"?"All Products":c.charAt(0).toUpperCase()+c.slice(1)}</button>)}
            <div className="freshness-pill" style={{ marginLeft:"auto" }}><div className="fresh-dot" /> Live inventory</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20 }}>
            {filtered.map((p) => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function OurFarmPage() {
  const sections = [
    { emoji:"🌿", title:"350,000 sq ft of Crop Production", body:"Our crops grow in nutrient-film technique channels, deep-water culture rafts, and media beds — all fed by nutrient-rich water from our fish systems. No synthetic fertilizer. Pure, sunlit growth.", stats:["4 Crop Varieties","52-Week Harvest","Zero Pesticides"] },
    { emoji:"💧", title:"150,000 sq ft of Freshwater Aquaculture", body:"Three species thrive in our recirculating aquaculture systems. Crystal-clear freshwater. Monitored 24/7. No brackish water — ever. No ocean impact. Just clean, domestic protein.", stats:["Barramundi","Yellow Perch","Freshwater Prawns"] },
    { emoji:"🔄", title:"The Closed Loop — Nothing Wasted", body:"Fish produce ammonia-rich waste. Bacteria convert it to nitrates. Plants absorb nitrates and filter the water. Clean water returns to the fish. 95% of all water recirculated.", stats:[">95% Water Recirculated","Zero Synthetic Inputs","Carbon Net Neutral"] },
    { emoji:"🐄", title:"Ohio Fields — Traditional Farming, Reimagined", body:"Beyond the greenhouse walls, Ohio Fields LLC tends traditional farmland with a modern conscience. Grass-fed dairy cattle. Soy-free four-crop rotation. Digestate from our digester replaces synthetic fertilizer entirely.", stats:["Grass-Fed Dairy","Soy-Free Always","4-Crop Rotation","Digestate Fertilized"] },
  ];
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:`linear-gradient(135deg,#1e3a28,${T.green})`, padding:"80px 28px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 60% 40%,rgba(224,123,40,.15) 0%,transparent 60%)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:14 }}><span style={{ background:"rgba(255,255,255,.6)" }} /> Rural Ohio</div>
          <h1 className="display-serif" style={{ fontSize:"clamp(40px,7vw,68px)", color:T.white, lineHeight:1.1, marginBottom:14 }}>Our Farm.<br /><em style={{ color:T.orangeL }}>Our Promise.</em></h1>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:"rgba(255,255,255,.75)", maxWidth:500, margin:"0 auto" }}>A 500,000 sq ft living ecosystem plus traditional dairy and soy-free farmland where science, sustainability, and flavor work in perfect harmony.</p>
        </div>
      </div>
      <div className="ps" style={{ padding:"72px 28px", background:T.cream }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          {sections.map((sec,i) => (
            <div key={i} className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", marginBottom:72, direction:i%2===1?"rtl":"ltr" }}>
              <div style={{ direction:"ltr" }}>
                <div style={{ fontSize:52, marginBottom:18 }}>{sec.emoji}</div>
                <h2 className="display-serif" style={{ fontSize:"clamp(26px,4vw,36px)", color:T.charcoal, lineHeight:1.2, marginBottom:14 }}>{sec.title}</h2>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:T.stone, lineHeight:1.8, marginBottom:18 }}>{sec.body}</p>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>{sec.stats.map((s,j) => <span key={j} className="tag">{s}</span>)}</div>
              </div>
              <div style={{ direction:"ltr", background:`linear-gradient(135deg,${T.green}22,${T.orange}22)`, borderRadius:22, height:280, display:"flex", alignItems:"center", justifyContent:"center", fontSize:90, border:`2px solid ${T.green}14` }}>{sec.emoji}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VerdeEnergyPage() {
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:"linear-gradient(135deg,#0d2218,#1a3a28)", padding:"80px 28px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 70% 30%,rgba(249,160,92,.2) 0%,transparent 55%)" }} />
        <div style={{ maxWidth:720, position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.1)", borderRadius:20, padding:"6px 14px", marginBottom:20 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", animation:"pulse 1.5s ease infinite" }} />
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,.8)", letterSpacing:".14em", textTransform:"uppercase" }}>Verde Energy LLC · Live Generation</span>
          </div>
          <h1 className="display-serif" style={{ fontSize:"clamp(36px,6vw,68px)", color:T.white, lineHeight:1.1, marginBottom:14 }}>The renewable<br />engine behind<br /><em style={{ color:T.orangeL }}>Orange Foods</em></h1>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:"rgba(255,255,255,.7)", lineHeight:1.7, maxWidth:500 }}>30.9 MW of solar. An anaerobic digester converting waste into fuel. Energy independence as a reality, not a goal.</p>
        </div>
      </div>
      <section className="ps" style={{ padding:"72px 28px", background:T.cream }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:56 }}>
            {[{emoji:"☀️",title:"30.9 MW Solar Array",body:"Ground-mount and rooftop panels cover 100%+ of facility electrical demand. Excess sold to Ohio's grid under a 20-year PPA.",stat:"30.9 MW",statLabel:"Generation Capacity"},{emoji:"♻️",title:"Anaerobic Digester",body:"25 wet tons of fish waste, crop trimmings, and dairy manure processed daily into biogas and premium fertilizer.",stat:"25 tons",statLabel:"Processed Daily"},{emoji:"🌿",title:"Digestate Fertilizer",body:"Rich in N-P-K, digestate is applied to Ohio Fields as organic fertilizer, completely replacing synthetic inputs.",stat:"$175K+",statLabel:"Annual Savings"}].map((card,i) => (
              <div key={i} style={{ background:T.white, borderRadius:20, padding:28, boxShadow:"0 4px 32px rgba(0,0,0,.06)" }}>
                <div style={{ fontSize:40, marginBottom:14 }}>{card.emoji}</div>
                <div className="display-serif" style={{ fontSize:32, fontWeight:700, color:T.orange, lineHeight:1, marginBottom:2 }}>{card.stat}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:T.stone, letterSpacing:".1em", textTransform:"uppercase", marginBottom:12 }}>{card.statLabel}</div>
                <h3 className="display-serif" style={{ fontSize:22, color:T.charcoal, marginBottom:8 }}>{card.title}</h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone, lineHeight:1.7 }}>{card.body}</p>
              </div>
            ))}
          </div>
          <div style={{ background:`linear-gradient(135deg,${T.green},#1a3a28)`, borderRadius:22, padding:"44px 36px", color:T.white, textAlign:"center" }}>
            <h2 className="display-serif" style={{ fontSize:"clamp(26px,4vw,40px)", marginBottom:12 }}>A farm that <em style={{ color:T.orangeL }}>gives back to the grid</em></h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.75)", maxWidth:520, margin:"0 auto 24px", lineHeight:1.7 }}>When our solar array generates more than the farm needs — which is most days — that clean energy flows back to Ohio homes and businesses.</p>
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              {["100% Renewable Electricity","20-Year PPA","Ohio Grid Contributor","D3 RIN Certified Biogas"].map((b,i) => <span key={i} className="trust-badge" style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", color:"rgba(255,255,255,.85)" }}>{b}</span>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WholesalePage() {
  const [form, setForm] = useState({ name:"", company:"", email:"", type:"", message:"" });
  const [sent, setSent] = useState(false);
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:`linear-gradient(135deg,${T.bark},#8a5e30)`, padding:"72px 28px", textAlign:"center" }}>
        <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:12 }}><span style={{ background:"rgba(255,255,255,.6)" }} /> Business Partnerships</div>
        <h1 className="display-serif" style={{ fontSize:"clamp(32px,6vw,52px)", color:T.white, marginBottom:10 }}>Wholesale & Partnerships</h1>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.75)", maxWidth:440, margin:"0 auto" }}>Restaurants, grocers, distributors — bring Ohio's freshest aquaponics to your customers.</p>
      </div>
      <section className="ps" style={{ padding:"72px 28px", background:T.cream }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 }}>
            <div>
              <h2 className="display-serif" style={{ fontSize:"clamp(26px,4vw,36px)", color:T.charcoal, marginBottom:14 }}>Built for <em style={{ color:T.orange }}>professionals</em></h2>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:T.stone, lineHeight:1.8, marginBottom:22 }}>We supply regional grocery chains, food service distributors, restaurants, hospitals, universities, and corporate dining programs across Ohio and the Midwest.</p>
              {[{icon:"📋",title:"Long-Term Supply Contracts",body:"Volume commitments with predictable pricing and weekly delivery schedules."},{icon:"🌡️",title:"Cold Chain Guaranteed",body:"On-site cold storage and refrigerated delivery within 300 miles."},{icon:"🏷️",title:"Private Label Available",body:"Your brand on our product. Custom packaging for grocery retail."},{icon:"📊",title:"Traceability Documentation",body:"Full batch tracking from seed or fingerling to your loading dock."}].map((x,i) => (
                <div key={i} style={{ display:"flex", gap:12, marginBottom:16 }}>
                  <div style={{ fontSize:20 }}>{x.icon}</div>
                  <div><div style={{ fontFamily:"'Jost',sans-serif", fontWeight:600, fontSize:13, color:T.charcoal, marginBottom:2 }}>{x.title}</div><div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.stone, lineHeight:1.6 }}>{x.body}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background:T.white, borderRadius:20, padding:32, boxShadow:"0 4px 32px rgba(0,0,0,.06)" }}>
              <h3 className="display-serif" style={{ fontSize:26, color:T.charcoal, marginBottom:18 }}>Inquire Now</h3>
              {!sent ? (
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {[["name","Your Name"],["company","Company / Store"],["email","Email Address"]].map(([key,ph]) => <input key={key} placeholder={ph} value={form[key]} onChange={e => setForm(f => ({...f,[key]:e.target.value}))} />)}
                  <select value={form.type} onChange={e => setForm(f => ({...f,type:e.target.value}))} style={{ fontFamily:"'Jost',sans-serif", border:"1.5px solid #ddd", borderRadius:10, padding:"12px 16px", fontSize:14, background:T.white, cursor:"pointer" }}>
                    <option value="">Type of Partnership...</option>
                    <option>Grocery / Retail</option>
                    <option>Restaurant / Food Service</option>
                    <option>Distributor</option>
                    <option>Institutional</option>
                    <option>Other</option>
                  </select>
                  <textarea placeholder="Tell us about your volume needs..." rows={4} value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))} style={{ resize:"vertical" }} />
                  <button className="btn-primary" style={{ marginTop:4 }} onClick={() => { if(form.email) setSent(true); }}>Send Inquiry →</button>
                </div>
              ) : (
                <div style={{ textAlign:"center", padding:"32px 0" }}>
                  <div style={{ fontSize:40, marginBottom:10 }}>🌾</div>
                  <h3 className="display-serif" style={{ fontSize:26, color:T.green, marginBottom:8 }}>We'll be in touch!</h3>
                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone }}>Our wholesale team responds within one business day.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:`linear-gradient(160deg,${T.parchment} 60%,${T.greenXL} 100%)`, padding:"80px 28px" }}>
        <div style={{ maxWidth:720 }}>
          <div className="section-label" style={{ marginBottom:14 }}>Our Story</div>
          <h1 className="display-serif" style={{ fontSize:"clamp(36px,6vw,64px)", color:T.charcoal, lineHeight:1.1, marginBottom:18 }}>Built to feed Ohio<br />the way it <em style={{ color:T.orange }}>deserves</em><br />to be fed.</h1>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:T.stone, lineHeight:1.8, maxWidth:580 }}>Orange Foods was born from a single conviction: that the gap between the farm and the table had grown too wide. We built a 500,000 sq ft facility — plus traditional dairy farmland — to close it permanently.</p>
        </div>
      </div>
      <section className="ps" style={{ padding:"72px 28px", background:T.white }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56 }}>
            <div>
              <h2 className="display-serif" style={{ fontSize:"clamp(26px,4vw,38px)", color:T.charcoal, marginBottom:14 }}>Orange Foods LLC<br /><em style={{ color:T.orange }}>+ Verde Energy LLC<br />+ Ohio Fields LLC</em></h2>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:T.stone, lineHeight:1.8, marginBottom:14 }}>Orange Foods LLC is our flagship aquaponics operation — 350,000 sq ft of crops and 150,000 sq ft of freshwater aquaculture in a single integrated facility.</p>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:T.stone, lineHeight:1.8, marginBottom:14 }}>Verde Energy LLC is our renewable energy subsidiary — 30.9 MW of solar and an anaerobic digester converting organic waste into power and fertilizer.</p>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:T.stone, lineHeight:1.8 }}>Ohio Fields LLC is our traditional farming operation — grass-fed dairy cattle and a soy-free four-crop rotation that honors the land and feeds the digester loop.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[{emoji:"🎯",title:"Our Mission",body:"Produce the freshest, most nutrient-dense food in North America through technology-driven aquaponics and traditional agriculture — while generating clean energy and creating quality rural jobs."},{emoji:"🌍",title:"Our Vision",body:"To become the leading integrated freshwater aquaponics company in the United States — setting the standard for closed-loop, zero-waste food production."},{emoji:"💡",title:"Our Values",body:"Transparency. Sustainability. Excellence. We don't cut corners. We don't compromise on freshness. We don't pretend sustainability and quality are competing values."}].map((x,i) => (
                <div key={i} style={{ background:T.cream, borderRadius:16, padding:22, border:`1px solid ${T.green}18` }}>
                  <div style={{ fontSize:26, marginBottom:8 }}>{x.emoji}</div>
                  <h3 className="display-serif" style={{ fontSize:20, color:T.charcoal, marginBottom:6 }}>{x.title}</h3>
                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone, lineHeight:1.7 }}>{x.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HomePage({ setPage, addToCart }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <MarqueeBanner />
      <TrustBadges />
      <FeaturedProducts setPage={setPage} addToCart={addToCart} />
      <StatsSection />
      <FarmStoryTeaser setPage={setPage} />
      <VerdeTeaser setPage={setPage} />
      <TraditionalFarmingHero setPage={setPage} />
      <SubscriptionBuilder addToCart={addToCart} />
      <RecipesTeaser setPage={setPage} />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}

function NutraceuticalsPage() {
  const [form, setForm] = useState({ name:"", company:"", email:"", grade:"", volume:"", message:"" });
  const [sent, setSent] = useState(false);

  const grades = [
    {
      grade:"Industrial Grade", purity:"75–85% DDA", price:"$62–67/kg", color:"#2A5C45",
      icon:"🏭", badge:"Entry Point",
      apps:["Municipal water treatment","Agricultural flocculant","Wastewater clarification","Soil amendment"],
      specs:"Ash content <2%, Moisture <10%, Solubility >70%",
      timeline:"Available Year 1",
    },
    {
      grade:"Food & Cosmetic Grade", purity:"85–95% DDA", price:"$78–140/kg", color:"#E07B28",
      icon:"✨", badge:"Most Requested",
      apps:["Hair care & film-forming","Skin care & wound dressings","Food preservation films","Clean beauty formulations"],
      specs:"FDA GRAS compliant, Ash <1%, Moisture <8%, Non-GMO verified",
      timeline:"Available Year 2",
    },
    {
      grade:"Pharmaceutical Grade", purity:">95% DDA", price:"$188–273/kg", color:"#1E5C8A",
      icon:"🧬", badge:"Highest Value",
      apps:["Drug delivery & encapsulation","Wound care & hemostatic dressings","Tissue engineering scaffolds","Nasal & ocular drug systems"],
      specs:"USP/EP compliant, GMP manufactured, Full CoA & batch documentation, Low endotoxin",
      timeline:"Available Year 3+ (GMP certified)",
    },
  ];

  const whyFreshwater = [
    { icon:"💧", title:"Freshwater Origin", body:"Derived from Macrobrachium rosenbergii (giant freshwater prawn) shells — not marine shrimp. Reduced marine allergen profile. Highly valued by cosmetic and nutraceutical formulators seeking alternative sourcing." },
    { icon:"🇺🇸", title:"Domestic Supply", body:"Over 80% of U.S. chitosan is imported from Asia. Orange Foods produces domestically from our Ohio aquaculture operation — shorter lead times, no import dependencies, traceable from tank to shipment." },
    { icon:"♻️", title:"Zero Feedstock Cost", body:"Prawn shells are a by-product of our harvest operation. What would otherwise be a disposal cost becomes a premium ingredient. This is genuine circular economy — not a marketing claim." },
    { icon:"📋", title:"Full Traceability", body:"Every batch is traceable to specific harvest lots from our Ohio facility. Batch documentation, CoA, and supply chain transparency available to all qualified buyers. GMP pathway in development." },
    { icon:"🌿", title:"Soy-Free Supply Chain", body:"Our prawn herd is raised soy-free on clean aquaponic water. No cross-contamination with common allergens in the production environment. Critical for certain pharma and clean-label cosmetic applications." },
    { icon:"📈", title:"Consistent Year-Round Supply", body:"Unlike wild-catch marine processors with seasonal variability, our controlled aquaculture operation produces consistent shell volumes year-round — predictable supply for long-term offtake agreements." },
  ];

  return (
    <div style={{ paddingTop:68 }}>
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#0A1A2E 0%,#0d2a4d 50%,#1a3a6b 100%)", padding:"88px 28px 72px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 70% 30%,rgba(82,183,136,.15) 0%,transparent 55%),radial-gradient(circle at 20% 80%,rgba(30,92,138,.2) 0%,transparent 50%)" }} />
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(82,183,136,.15)", border:"1px solid rgba(82,183,136,.3)", borderRadius:20, padding:"6px 16px", marginBottom:20 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"#52B788", animation:"pulse 1.5s ease infinite" }} />
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"#52B788", letterSpacing:".18em", textTransform:"uppercase", fontWeight:700 }}>Orange Foods LLC · Nutraceuticals Division</span>
              </div>
              <h1 className="display-serif" style={{ fontSize:"clamp(36px,6vw,68px)", color:T.white, lineHeight:1.05, marginBottom:16 }}>
                Pharmaceutical-Grade<br /><em style={{ color:"#52B788" }}>Freshwater Chitosan</em>
              </h1>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:"rgba(255,255,255,.7)", lineHeight:1.8, marginBottom:24, maxWidth:520 }}>
                Derived from <em style={{ color:"rgba(255,255,255,.9)" }}>Macrobrachium rosenbergii</em> — giant freshwater prawns raised in our Ohio aquaculture facility. Domestic supply. Traceable batches. Three grade tiers from industrial to pharmaceutical.
              </p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:32 }}>
                {["Freshwater Origin","Domestic US Supply","FDA GRAS Pathway","GMP Certified (Y3)","Soy-Free Process"].map((b,i) => (
                  <span key={i} style={{ background:"rgba(82,183,136,.12)", color:"#52B788", border:"1px solid rgba(82,183,136,.3)", borderRadius:20, padding:"4px 12px", fontSize:10, fontFamily:"'Jost',sans-serif", fontWeight:700, letterSpacing:".08em" }}>{b}</span>
                ))}
              </div>
              <button className="btn-primary" style={{ background:"#52B788", boxShadow:"0 4px 24px rgba(82,183,136,.4)" }} onClick={() => document.getElementById("chitosan-inquiry").scrollIntoView({ behavior:"smooth" })}>
                Request a Sample →
              </button>
            </div>
            {/* Stats panel */}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:"rgba(255,255,255,.06)", borderRadius:20, padding:28, border:"1px solid rgba(255,255,255,.1)" }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,.5)", letterSpacing:".18em", textTransform:"uppercase", marginBottom:10 }}>Annual Production Capacity</div>
                <div className="display-serif" style={{ fontSize:52, fontWeight:700, color:"#52B788", lineHeight:1 }}>12–18<span style={{ fontSize:24, color:"rgba(255,255,255,.4)", marginLeft:6 }}>MT/yr</span></div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"rgba(255,255,255,.5)", marginTop:6 }}>Scaling with aquaculture ramp · Year 1 → Year 5</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[
                  { n:"$62–273", u:"/kg", label:"Price by Grade" },
                  { n:">95%", u:"DDA", label:"Pharma Purity" },
                  { n:"100%", u:"", label:"Domestic Origin" },
                  { n:"Zero", u:"", label:"Feedstock Cost" },
                ].map((s,i) => (
                  <div key={i} style={{ background:"rgba(255,255,255,.05)", borderRadius:14, padding:"16px 14px", border:"1px solid rgba(255,255,255,.08)", textAlign:"center" }}>
                    <div className="display-serif" style={{ fontSize:26, fontWeight:700, color:"#52B788", lineHeight:1 }}>{s.n}<span style={{ fontSize:13, color:"rgba(255,255,255,.4)" }}>{s.u}</span></div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,.5)", marginTop:4, letterSpacing:".08em", textTransform:"uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grade tiers */}
      <section className="ps" style={{ padding:"72px 28px", background:"#0D1A24" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#52B788", display:"flex", alignItems:"center", gap:10, justifyContent:"center", marginBottom:14 }}>
              <span style={{ display:"block", width:32, height:2, background:"#52B788" }} /> Grade Portfolio
            </div>
            <h2 className="display-serif" style={{ fontSize:"clamp(30px,5vw,48px)", color:T.white, marginBottom:12 }}>Three grades. <em style={{ color:"#52B788" }}>One source.</em></h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:"rgba(255,255,255,.55)", maxWidth:520, margin:"0 auto" }}>Phased certification pathway from industrial launch through pharmaceutical GMP. All derived from the same Ohio freshwater prawn operation.</p>
          </div>
          <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {grades.map((g,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,.04)", borderRadius:20, padding:28, border:`1px solid ${g.color}33`, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:g.color }} />
                <div style={{ display:"inline-block", background:`${g.color}22`, color:g.color, borderRadius:20, padding:"3px 12px", fontSize:10, fontFamily:"'Jost',sans-serif", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", marginBottom:16 }}>{g.badge}</div>
                <div style={{ fontSize:36, marginBottom:12 }}>{g.icon}</div>
                <h3 className="display-serif" style={{ fontSize:26, color:T.white, marginBottom:6 }}>{g.grade}</h3>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:22, fontWeight:700, color:g.color, marginBottom:4 }}>{g.price}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.4)", marginBottom:18 }}>Purity: {g.purity}</div>
                <div style={{ marginBottom:16 }}>
                  {g.apps.map((app,j) => (
                    <div key={j} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", background:g.color, flexShrink:0 }} />
                      <span style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"rgba(255,255,255,.65)" }}>{app}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background:"rgba(255,255,255,.04)", borderRadius:10, padding:"10px 14px", marginBottom:14 }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, color:"rgba(255,255,255,.4)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:4 }}>Key Specs</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.6)", lineHeight:1.55 }}>{g.specs}</div>
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${g.color}18`, borderRadius:20, padding:"4px 12px" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:g.color }} />
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:g.color, fontWeight:700 }}>{g.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why freshwater */}
      <section className="ps" style={{ padding:"72px 28px", background:"#0A1520" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#52B788", display:"flex", alignItems:"center", gap:10, justifyContent:"center", marginBottom:14 }}>
              <span style={{ display:"block", width:32, height:2, background:"#52B788" }} /> Sourcing Advantage
            </div>
            <h2 className="display-serif" style={{ fontSize:"clamp(28px,5vw,44px)", color:T.white, marginBottom:12 }}>Why freshwater prawn chitosan <em style={{ color:"#52B788" }}>is different.</em></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
            {whyFreshwater.map((item,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,.03)", borderRadius:16, padding:24, border:"1px solid rgba(255,255,255,.07)" }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{item.icon}</div>
                <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:T.white, marginBottom:8 }}>{item.title}</h4>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:"rgba(255,255,255,.55)", lineHeight:1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market context */}
      <section className="ps" style={{ padding:"72px 28px", background:"#0D1A24" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#52B788", display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <span style={{ display:"block", width:32, height:2, background:"#52B788" }} /> Market Context
              </div>
              <h2 className="display-serif" style={{ fontSize:"clamp(28px,4vw,44px)", color:T.white, lineHeight:1.1, marginBottom:18 }}>
                A $1.75B market<br /><em style={{ color:"#52B788" }}>growing at 14% annually.</em>
              </h2>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:"rgba(255,255,255,.6)", lineHeight:1.8, marginBottom:20 }}>
                The global chitosan market was valued at $1.75B in 2025 and is projected to reach $6.4B by 2035 — driven by pharmaceutical drug delivery, cosmetic clean-beauty formulations, and agricultural biopesticide demand.
              </p>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:"rgba(255,255,255,.6)", lineHeight:1.8, marginBottom:28 }}>
                Over 80% of U.S. supply is currently imported from Asian marine shrimp processors. Orange Foods represents one of the only domestic freshwater prawn chitosan producers at scale — with supply chain transparency and allergen-profile differentiation that import sources cannot match.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[{n:"$1.75B",label:"Global Market (2025)"},{n:"14.3%",label:"Annual CAGR"},{n:">80%",label:"US Import Share"},{n:"3–4×",label:"Pharma vs Industrial Premium"}].map((s,i) => (
                  <div key={i} style={{ background:"rgba(82,183,136,.08)", borderRadius:12, padding:"16px 14px", border:"1px solid rgba(82,183,136,.2)" }}>
                    <div className="display-serif" style={{ fontSize:28, fontWeight:700, color:"#52B788", lineHeight:1 }}>{s.n}</div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.5)", marginTop:4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:"rgba(255,255,255,.04)", borderRadius:18, padding:24, border:"1px solid rgba(255,255,255,.08)" }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,.4)", letterSpacing:".14em", textTransform:"uppercase", marginBottom:12 }}>Target Market Segments</div>
                {[
                  { segment:"Pharmaceutical / Biomedical", share:"31%", color:"#1E5C8A", apps:"Drug delivery, wound care, tissue engineering" },
                  { segment:"Cosmetics & Personal Care", share:"14%", color:"#E07B28", apps:"Hair care, skin care, clean beauty brands" },
                  { segment:"Agriculture", share:"19%", color:"#52B788", apps:"Biopesticide, seed treatment, soil amendment" },
                  { segment:"Water Treatment", share:"28%", color:"#2A5C45", apps:"Flocculation, heavy metal removal, clarification" },
                  { segment:"Food & Packaging", share:"8%", color:"#C9A84C", apps:"Preservation films, packaging coatings" },
                ].map((seg,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                    <div style={{ width:36, height:36, borderRadius:8, background:`${seg.color}22`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontWeight:700, color:seg.color }}>{seg.share}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:600, color:T.white }}>{seg.segment}</div>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.4)" }}>{seg.apps}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="chitosan-inquiry" className="ps" style={{ padding:"72px 28px", background:"#0A1520" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#52B788", display:"flex", alignItems:"center", gap:10, justifyContent:"center", marginBottom:14 }}>
              <span style={{ display:"block", width:32, height:2, background:"#52B788" }} /> B2B Inquiries
            </div>
            <h2 className="display-serif" style={{ fontSize:"clamp(28px,5vw,44px)", color:T.white, marginBottom:12 }}>Request a Sample or<br /><em style={{ color:"#52B788" }}>Discuss Offtake</em></h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:"rgba(255,255,255,.55)", maxWidth:480, margin:"0 auto" }}>We work with pharmaceutical manufacturers, cosmetic ingredient buyers, agricultural formulators, and water treatment operators. Minimum orders, pricing, and certification documentation available on request.</p>
          </div>
          <div style={{ background:"rgba(255,255,255,.04)", borderRadius:22, padding:"40px 36px", border:"1px solid rgba(255,255,255,.08)" }}>
            {!sent ? (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <input placeholder="Your Name" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} style={{ background:"rgba(255,255,255,.06)", border:"1.5px solid rgba(255,255,255,.12)", color:T.white, borderRadius:10 }} />
                  <input placeholder="Company / Organization" value={form.company} onChange={e => setForm(f=>({...f,company:e.target.value}))} style={{ background:"rgba(255,255,255,.06)", border:"1.5px solid rgba(255,255,255,.12)", color:T.white, borderRadius:10 }} />
                </div>
                <input placeholder="Business Email Address" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} style={{ background:"rgba(255,255,255,.06)", border:"1.5px solid rgba(255,255,255,.12)", color:T.white, borderRadius:10 }} />
                <select value={form.grade} onChange={e => setForm(f=>({...f,grade:e.target.value}))} style={{ background:"rgba(255,255,255,.06)", border:"1.5px solid rgba(255,255,255,.12)", color:T.white, borderRadius:10 }}>
                  <option value="">Grade of Interest...</option>
                  <option>Industrial Grade ($62–67/kg)</option>
                  <option>Food & Cosmetic Grade ($78–140/kg)</option>
                  <option>Pharmaceutical Grade ($188–273/kg)</option>
                  <option>Multiple Grades / Not Sure Yet</option>
                </select>
                <select value={form.volume} onChange={e => setForm(f=>({...f,volume:e.target.value}))} style={{ background:"rgba(255,255,255,.06)", border:"1.5px solid rgba(255,255,255,.12)", color:T.white, borderRadius:10 }}>
                  <option value="">Annual Volume Requirement...</option>
                  <option>Under 100 kg (sample / trial)</option>
                  <option>100 kg – 1 MT</option>
                  <option>1 MT – 5 MT</option>
                  <option>5 MT – 15 MT</option>
                  <option>15 MT+ (long-term offtake)</option>
                </select>
                <textarea placeholder="Tell us about your application, required specifications, and any certification needs..." rows={4} value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} style={{ background:"rgba(255,255,255,.06)", border:"1.5px solid rgba(255,255,255,.12)", color:T.white, borderRadius:10, resize:"vertical" }} />
                <button onClick={() => { if(form.email) setSent(true); }} style={{ background:"#52B788", color:T.white, border:"none", borderRadius:40, padding:"15px 40px", fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", cursor:"pointer", transition:"all .3s", boxShadow:"0 4px 24px rgba(82,183,136,.4)", marginTop:4 }}>
                  Submit Inquiry →
                </button>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)", textAlign:"center", marginTop:4 }}>Our nutraceuticals team responds within 2 business days. No retail sales — B2B inquiries only.</p>
              </div>
            ) : (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ fontSize:56, marginBottom:16 }}>🧬</div>
                <h3 className="display-serif" style={{ fontSize:32, color:"#52B788", marginBottom:10 }}>Inquiry Received</h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.6)", lineHeight:1.7 }}>Our nutraceuticals team will review your requirements and be in touch within 2 business days with pricing, specifications, and sample availability.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id===product.id);
      if(idx>=0){ const next=[...prev]; next[idx]={...next[idx],qty:next[idx].qty+1}; return next; }
      return [...prev,{...product,qty:1}];
    });
    setCartOpen(true);
  };

  const removeItem = (idx) => setCart(prev => prev.filter((_,i) => i!==idx));
  const cartCount = cart.reduce((s,i) => s+i.qty, 0);
  const pageNav = (p) => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };

  return (
    <div style={{ minHeight:"100vh", background:T.cream }}>
      <style>{G}</style>
      <Nav setPage={p => { pageNav(p); setCartOpen(false); }} cartCount={cartCount} />
      <CartSidebar items={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} removeItem={removeItem} />
      <main>
        {page==="home" && <HomePage setPage={pageNav} addToCart={addToCart} />}
        {page==="shop" && <ShopPage addToCart={addToCart} />}
        {page==="ourfarm" && <OurFarmPage />}
        {page==="verdeenergy" && <VerdeEnergyPage />}
        {page==="nutraceuticals" && <NutraceuticalsPage />}
        {page==="wholesale" && <WholesalePage />}
        {page==="about" && <AboutPage />}
        {(page==="recipes"||page==="whyus"||page==="contact"||page==="whyus") && (
          <div style={{ paddingTop:68, minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:14 }}>
            <div style={{ fontSize:56 }}>🌱</div>
            <h2 className="display-serif" style={{ fontSize:44, color:T.charcoal }}>Coming Soon</h2>
            <p style={{ fontFamily:"'Jost',sans-serif", color:T.stone }}>This page is being freshly grown.</p>
            <button className="btn-primary" onClick={() => pageNav("home")}>← Back to Home</button>
          </div>
        )}
      </main>
      {page!=="home" && <Footer setPage={pageNav} />}
    </div>
  );
}

export default App;
