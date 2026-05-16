import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────────────────────── */
const T = {
  cream:   "#FAF7F2",
  parchment: "#F2EDE3",
  orange:  "#E07B28",
  orangeD: "#C4651A",
  orangeL: "#F9A05C",
  green:   "#2A5C45",
  greenL:  "#3D7A5E",
  greenXL: "#EAF2EC",
  bark:    "#5C3D1E",
  stone:   "#8C7B6B",
  charcoal:"#1E1E1E",
  white:   "#FFFFFF",
  gold:    "#C9A84C",
};

/* ─── FONTS (Google) ────────────────────────────────────────────────────────── */
const fontLink = `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&family=Playfair+Display:ital,wght@1,400&display=swap`;

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────────── */
const G = `
  @import url('${fontLink}');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${T.cream}; color: ${T.charcoal}; font-family: 'Jost', sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${T.cream}; }
  ::-webkit-scrollbar-thumb { background: ${T.orange}; border-radius: 3px; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
  @keyframes shimmer  { 0% { background-position:200% center; } 100% { background-position:-200% center; } }
  @keyframes spin     { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:.5; } }
  @keyframes marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes slideIn  { from { transform:translateX(-100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
  @keyframes counterUp { from { opacity:0; transform:scale(.8); } to { opacity:1; transform:scale(1); } }

  .fade-up   { animation: fadeUp .8s ease forwards; }
  .fade-in   { animation: fadeIn .6s ease forwards; }
  .float     { animation: float 4s ease-in-out infinite; }

  .btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    background:${T.orange}; color:${T.white};
    border:none; border-radius:40px;
    padding:14px 32px; font-family:'Jost',sans-serif;
    font-size:14px; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
    cursor:pointer; transition:all .3s ease;
    box-shadow: 0 4px 24px ${T.orange}44;
  }
  .btn-primary:hover { background:${T.orangeD}; transform:translateY(-2px); box-shadow:0 8px 32px ${T.orange}55; }

  .btn-outline {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:${T.green};
    border:2px solid ${T.green}; border-radius:40px;
    padding:12px 28px; font-family:'Jost',sans-serif;
    font-size:14px; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
    cursor:pointer; transition:all .3s ease;
  }
  .btn-outline:hover { background:${T.green}; color:${T.white}; transform:translateY(-2px); }

  .btn-ghost {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(255,255,255,.15); color:${T.white};
    border:1.5px solid rgba(255,255,255,.4); border-radius:40px;
    padding:12px 28px; font-family:'Jost',sans-serif;
    font-size:14px; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
    cursor:pointer; transition:all .3s ease; backdrop-filter:blur(8px);
  }
  .btn-ghost:hover { background:rgba(255,255,255,.25); transform:translateY(-2px); }

  .tag {
    display:inline-flex; align-items:center; gap:5px;
    background:${T.greenXL}; color:${T.green};
    border:1px solid ${T.green}22; border-radius:20px;
    padding:4px 12px; font-size:11px; font-weight:600;
    letter-spacing:.1em; text-transform:uppercase; font-family:'Jost',sans-serif;
  }

  .tag-orange {
    background:${T.orange}18; color:${T.orangeD};
    border:1px solid ${T.orange}33;
  }

  .section-label {
    font-family:'Jost',sans-serif; font-size:11px; font-weight:600;
    letter-spacing:.22em; text-transform:uppercase; color:${T.orange};
    display:flex; align-items:center; gap:10px;
  }
  .section-label::before {
    content:''; display:block; width:32px; height:2px; background:${T.orange};
  }

  .display-serif { font-family:'Cormorant Garamond',serif; }
  .italic-serif  { font-family:'Playfair Display',serif; font-style:italic; }

  .product-card {
    background:${T.white}; border-radius:20px;
    overflow:hidden; transition:all .35s ease;
    box-shadow:0 2px 20px rgba(0,0,0,.06);
    cursor:pointer;
  }
  .product-card:hover { transform:translateY(-8px); box-shadow:0 16px 48px rgba(0,0,0,.12); }
  .product-card:hover .card-img { transform:scale(1.06); }

  .card-img { transition:transform .5s ease; width:100%; height:100%; object-fit:cover; }

  .trust-badge {
    display:flex; align-items:center; gap:8px;
    background:${T.white}; border:1px solid ${T.green}22;
    border-radius:12px; padding:10px 16px;
    font-size:12px; font-weight:500; color:${T.green};
    font-family:'Jost',sans-serif;
    box-shadow:0 2px 12px rgba(0,0,0,.04);
  }

  .nav-link {
    font-family:'Jost',sans-serif; font-size:13px; font-weight:500;
    letter-spacing:.06em; color:${T.charcoal}; text-decoration:none;
    cursor:pointer; transition:color .2s;
    position:relative;
  }
  .nav-link::after {
    content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px;
    background:${T.orange}; transition:width .3s ease;
  }
  .nav-link:hover { color:${T.orange}; }
  .nav-link:hover::after { width:100%; }

  input, textarea, select {
    font-family:'Jost',sans-serif; border:1.5px solid #ddd;
    border-radius:10px; padding:12px 16px; font-size:14px;
    width:100%; outline:none; transition:border .2s;
    background:${T.white};
  }
  input:focus, textarea:focus { border-color:${T.orange}; }

  .green-section { background:${T.green}; color:${T.white}; }
  .cream-section { background:${T.cream}; }
  .parchment-section { background:${T.parchment}; }

  .divider-wave {
    width:100%; overflow:hidden; line-height:0;
  }

  .stat-number {
    font-family:'Cormorant Garamond',serif;
    font-size:64px; font-weight:700; color:${T.orange};
    line-height:1;
  }

  /* Marquee */
  .marquee-wrap { overflow:hidden; white-space:nowrap; }
  .marquee-inner { display:inline-flex; animation:marquee 28s linear infinite; }
  .marquee-inner:hover { animation-play-state:paused; }

  /* Cart badge */
  .cart-count {
    position:absolute; top:-6px; right:-6px;
    background:${T.orange}; color:white;
    width:18px; height:18px; border-radius:50%;
    font-size:10px; font-weight:700;
    display:flex; align-items:center; justify-content:center;
  }

  /* Freshness counter */
  .freshness-pill {
    display:inline-flex; align-items:center; gap:8px;
    background:${T.green}; color:white;
    border-radius:30px; padding:8px 18px;
    font-family:'Jost',sans-serif; font-size:12px; font-weight:600;
    letter-spacing:.08em;
  }
  .fresh-dot { width:8px; height:8px; border-radius:50%; background:#4ade80; animation:pulse 1.5s ease infinite; }

  @media (max-width:768px) {
    .stat-number { font-size:44px; }
    .hide-mobile { display:none !important; }
  }
`;

/* ─── MOCK DATA ──────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  { id:1, name:"Orange Cauliflower", price:6.99, unit:"head", cat:"produce", emoji:"🟠", desc:"Signature beta-carotene variety. Sweeter than white, packed with nutrients. Harvested this morning.", badge:"Signature Crop", color:"#E07B28" },
  { id:2, name:"Persian Cucumbers", price:4.99, unit:"bunch", cat:"produce", emoji:"🥒", desc:"Crisp, thin-skinned, and bursting with freshness. Grown hydroponically for maximum crunch.", badge:"Best Seller", color:"#2A5C45" },
  { id:3, name:"Living Butter Lettuce", price:3.99, unit:"head", cat:"produce", emoji:"🥬", desc:"Roots still attached for maximum shelf life. Harvested to order, never stored.", badge:"Harvested Today", color:"#3D7A5E" },
  { id:4, name:"Rainbow Carrots", price:5.49, unit:"bunch", cat:"produce", emoji:"🥕", desc:"Five varieties grown in our aquaponic media beds. Sweeter than field-grown — naturally.", badge:"Limited", color:"#C4651A" },
  { id:5, name:"Barramundi Fillets", price:18.99, unit:"lb", cat:"seafood", emoji:"🐟", desc:"Asian sea bass raised in crystal-clear freshwater RAS tanks. Clean flavor, zero ocean impact.", badge:"Premium", color:"#1E5C8A" },
  { id:6, name:"Yellow Perch", price:14.99, unit:"lb", cat:"seafood", emoji:"🐠", desc:"Great Lakes' finest, raised sustainably. A regional delicacy with sweet, mild flavor.", badge:"Ohio Proud", color:"#8A6A1E" },
  { id:7, name:"Freshwater Prawns", price:22.99, unit:"lb", cat:"seafood", emoji:"🦐", desc:"Giant freshwater prawns — sweet, tender, domestic. No imported frozen shrimp here.", badge:"No Imports", color:"#E05252" },
  { id:8, name:"Farm Box (Weekly)", price:49.99, unit:"box", cat:"subscription", emoji:"📦", desc:"8–10 seasonal items curated weekly from our harvest. Free delivery within 300 miles.", badge:"Best Value", color:"#2A5C45" },
];

const NAV_ITEMS = ["Shop","Our Farm","Verde Energy","Why Us","Recipes","About","Wholesale"];

const TRUST_BADGES = [
  { icon:"☀️", label:"Solar Powered by Verde Energy" },
  { icon:"💧", label:"Closed-Loop Freshwater System" },
  { icon:"🌿", label:"Ohio Grown & Harvested" },
  { icon:"🚫", label:"No Brackish Water. Ever." },
  { icon:"🐄", label:"Soy-Free Grass-Fed Dairy" },
  { icon:"🔄", label:"4-Crop Soy-Free Rotation" },
  { icon:"📍", label:"500,000 Sq Ft Farm" },
  { icon:"⚡", label:"30.9 MW On-Site Generation" },
];

const STATS = [
  { number:"500K", unit:"sq ft", label:"Indoor Farm" },
  { number:"30.9", unit:"MW", label:"Solar Power" },
  { number:"48h", unit:"max", label:"Farm to Door" },
  { number:"6", unit:"species", label:"Year-Round" },
];

/* ─── COMPONENTS ─────────────────────────────────────────────────────────────── */

function Nav({ page, setPage, cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:1000,
      background: scrolled ? "rgba(250,247,242,.96)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(0,0,0,.06)` : "none",
      padding:"0 48px", height:72,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      transition:"all .4s ease",
    }}>
      {/* Logo */}
      <div onClick={() => setPage("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg, ${T.orange}, ${T.orangeD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:`0 4px 16px ${T.orange}44` }}>🍊</div>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color: scrolled ? T.charcoal : T.white, lineHeight:1, transition:"color .3s" }}>Orange Foods</div>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:".18em", color: scrolled ? T.stone : "rgba(255,255,255,.7)", textTransform:"uppercase", transition:"color .3s" }}>Farm · Table · Ohio</div>
        </div>
      </div>

      {/* Desktop nav */}
      <div style={{ display:"flex", alignItems:"center", gap:32 }} className="hide-mobile">
        {NAV_ITEMS.map(item => (
          <span key={item} className="nav-link" onClick={() => setPage(item.toLowerCase().replace(" ",""))}
            style={{ color: scrolled ? T.charcoal : "rgba(255,255,255,.9)" }}>
            {item}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ position:"relative", cursor:"pointer" }} onClick={() => setPage("shop")}>
          <span style={{ fontSize:20 }}>🛒</span>
          {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
        </div>
        <button className="btn-primary" style={{ padding:"10px 22px", fontSize:13 }} onClick={() => setPage("shop")}>
          Shop Fresh
        </button>
      </div>
    </nav>
  );
}

function HeroSection({ setPage }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { bg:"linear-gradient(135deg, #1a3a28 0%, #2A5C45 40%, #3d7a5e 100%)", emoji:"🌱", headline:"Grown in Light.", sub:"Harvested at Dawn." },
    { bg:"linear-gradient(135deg, #3d2a10 0%, #7a4a1e 40%, #E07B28 100%)", emoji:"🍊", headline:"Orange Cauliflower.", sub:"Taste the Difference." },
    { bg:"linear-gradient(135deg, #0d2a3d 0%, #1e5c8a 40%, #2e7fb5 100%)", emoji:"🐟", headline:"Freshwater. Fresh Flavor.", sub:"From Tank to Table." },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = slides[currentSlide];

  return (
    <section style={{
      minHeight:"100vh", position:"relative", overflow:"hidden",
      background: s.bg, transition:"background 1.2s ease",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    }}>
      {/* Grain overlay */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.04'/%3E%3C/svg%3E\")", opacity:.6 }} />

      {/* Floating orbs */}
      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"rgba(255,255,255,.04)", top:"-20%", right:"-10%", animation:"float 8s ease-in-out infinite" }} />
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,.03)", bottom:"-10%", left:"-5%", animation:"float 6s ease-in-out infinite 2s" }} />

      {/* Freshness counter */}
      <div style={{ position:"absolute", top:100, right:48 }} className="hide-mobile">
        <div className="freshness-pill">
          <div className="fresh-dot" />
          Harvested within 48 hours
        </div>
      </div>

      {/* Main content */}
      <div style={{ textAlign:"center", zIndex:10, padding:"0 24px", maxWidth:900 }}>
        <div style={{ fontSize:80, marginBottom:24, animation:"float 4s ease-in-out infinite" }}>{s.emoji}</div>

        <div className="section-label" style={{ justifyContent:"center", color:"rgba(255,255,255,.7)", marginBottom:20 }}>
          <span style={{ background:"rgba(255,255,255,.7)" }} /> Orange Foods LLC · Rural Ohio
        </div>

        <h1 className="display-serif" style={{ fontSize:"clamp(52px,8vw,96px)", color:T.white, lineHeight:1.05, marginBottom:8, textShadow:"0 4px 32px rgba(0,0,0,.3)" }}>
          {s.headline}
        </h1>
        <h2 className="italic-serif" style={{ fontSize:"clamp(28px,4vw,52px)", color:"rgba(255,255,255,.8)", marginBottom:40, fontStyle:"italic" }}>
          {s.sub}
        </h2>

        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:18, color:"rgba(255,255,255,.75)", maxWidth:560, margin:"0 auto 48px", lineHeight:1.7, fontWeight:300 }}>
          500,000 sq ft of solar-powered aquaponics in rural Ohio. Crystal-clear water. Zero compromise. Fresh from our farms to your table.
        </p>

        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-primary" style={{ fontSize:15, padding:"16px 40px" }} onClick={() => setPage("shop")}>
            Shop Fresh Now →
          </button>
          <button className="btn-ghost" onClick={() => setPage("ourfarm")}>
            Tour Our Farm
          </button>
        </div>

        {/* Slide dots */}
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:48 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setCurrentSlide(i)} style={{ width: i === currentSlide ? 28 : 8, height:8, borderRadius:4, background: i === currentSlide ? T.white : "rgba(255,255,255,.35)", cursor:"pointer", transition:"all .3s ease" }} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
        <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.5)", letterSpacing:".15em", textTransform:"uppercase" }}>Scroll to Explore</span>
        <div style={{ width:1, height:40, background:"linear-gradient(to bottom, rgba(255,255,255,.5), transparent)", animation:"pulse 2s ease infinite" }} />
      </div>
    </section>
  );
}

function MarqueeBanner() {
  const items = ["Ohio Grown", "Solar Powered", "Harvested Fresh Daily", "No Brackish Water", "Closed-Loop System", "30.9 MW Green Energy", "Farm to Table", "Zero Compromise"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background:T.orange, padding:"14px 0", overflow:"hidden" }}>
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {doubled.map((item, i) => (
            <span key={i} style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:600, letterSpacing:".18em", textTransform:"uppercase", color:T.white, marginRight:48, display:"inline-flex", alignItems:"center", gap:16 }}>
              {item} <span style={{ color:"rgba(255,255,255,.4)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustBadges() {
  return (
    <section style={{ background:T.cream, padding:"48px 48px 0" }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
        {TRUST_BADGES.map((b, i) => (
          <div key={i} className="trust-badge" style={{ animationDelay:`${i * .1}s` }}>
            <span style={{ fontSize:16 }}>{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts({ setPage, addToCart }) {
  const featured = PRODUCTS.slice(0, 4);
  return (
    <section style={{ padding:"80px 48px", background:T.cream }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48 }}>
          <div>
            <div className="section-label" style={{ marginBottom:12 }}>Today's Harvest</div>
            <h2 className="display-serif" style={{ fontSize:52, color:T.charcoal, lineHeight:1.1 }}>
              Fresh from the<br /><em style={{ color:T.orange }}>Farm Floor</em>
            </h2>
          </div>
          <button className="btn-outline" onClick={() => setPage("shop")}>View All Products</button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:24 }}>
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product: p, addToCart, delay = 0, large = false }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addToCart(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="product-card" style={{ animationDelay:`${delay}ms` }}>
      {/* Image area */}
      <div style={{ height: large ? 280 : 220, overflow:"hidden", background:`linear-gradient(135deg, ${p.color}22, ${p.color}44)`, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize: large ? 80 : 64, filter:"drop-shadow(0 8px 16px rgba(0,0,0,.15))", transition:"transform .4s ease" }} className="card-img">{p.emoji}</span>
        <div style={{ position:"absolute", top:12, left:12 }}>
          <span className="tag" style={{ background:p.color, color:T.white, border:"none", fontSize:10 }}>{p.badge}</span>
        </div>
        {p.cat === "subscription" && (
          <div style={{ position:"absolute", top:12, right:12 }}>
            <span className="tag tag-orange">Subscribe & Save</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding:"20px 20px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:600, color:T.charcoal, lineHeight:1.2 }}>{p.name}</h3>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:18, fontWeight:700, color:T.orange }}>${p.price}</div>
            <div style={{ fontSize:11, color:T.stone }}>per {p.unit}</div>
          </div>
        </div>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone, lineHeight:1.6, marginBottom:16 }}>{p.desc}</p>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div className="fresh-dot" style={{ width:6, height:6 }} />
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:T.green, fontWeight:600 }}>Harvested within 48 hrs</span>
        </div>
      </div>

      <div style={{ padding:"0 20px 20px" }}>
        <button onClick={handleAdd} style={{
          width:"100%", padding:"12px", border:"none", borderRadius:12,
          background: added ? T.green : T.orange,
          color:T.white, fontFamily:"'Jost',sans-serif",
          fontSize:13, fontWeight:600, letterSpacing:".06em",
          cursor:"pointer", transition:"all .3s ease",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        }}>
          {added ? "✓ Added to Box" : "Add to Box"}
        </button>
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <section style={{ background:T.green, padding:"80px 48px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-50%", right:"-10%", width:600, height:600, borderRadius:"50%", background:"rgba(255,255,255,.04)" }} />
      <div style={{ maxWidth:1000, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:16 }}>
            <span style={{ background:"rgba(255,255,255,.6)" }} /> By the Numbers
          </div>
          <h2 className="display-serif" style={{ fontSize:48, color:T.white }}>
            Scale that <em style={{ color:T.orangeL }}>matters</em>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign:"center", padding:"32px 16px", background:"rgba(255,255,255,.07)", borderRadius:20, border:"1px solid rgba(255,255,255,.1)" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:56, fontWeight:700, color:T.orangeL, lineHeight:1 }}>
                {s.number}
                <span style={{ fontSize:24, color:"rgba(255,255,255,.5)", marginLeft:4 }}>{s.unit}</span>
              </div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:"rgba(255,255,255,.65)", marginTop:8, letterSpacing:".1em", textTransform:"uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FarmStoryTeaser({ setPage }) {
  return (
    <section style={{ padding:"100px 48px", background:T.parchment, position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
        <div>
          <div className="section-label" style={{ marginBottom:20 }}>Our Farm</div>
          <h2 className="display-serif" style={{ fontSize:"clamp(40px,4vw,60px)", color:T.charcoal, lineHeight:1.1, marginBottom:24 }}>
            500,000 sq ft of<br /><em style={{ color:T.green }}>living, breathing</em><br />agriculture
          </h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:T.stone, lineHeight:1.8, marginBottom:24 }}>
            Inside our rural Ohio facility, fish and plants grow in a perfect closed-loop dance. Fish waste nourishes our crops. Crops filter the water for our fish. Every drop recirculated. Every nutrient captured.
          </p>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:T.stone, lineHeight:1.8, marginBottom:36 }}>
            No pesticides. No synthetic fertilizers. No brackish water. Just sunlight, clean water, and science working in harmony.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:36 }}>
            {["350,000 sq ft Crops","150,000 sq ft Aquaculture","3 Fish Species","4 Crop Varieties"].map((f, i) => (
              <span key={i} className="tag">{f}</span>
            ))}
          </div>
          <button className="btn-outline" onClick={() => setPage("ourfarm")}>Explore the Farm →</button>
        </div>

        {/* Visual grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, position:"relative" }}>
          {[
            { bg:`linear-gradient(135deg, ${T.green}, #3d7a5e)`, emoji:"🌿", label:"Crop Bays" },
            { bg:`linear-gradient(135deg, #1e5c8a, #2e7fb5)`, emoji:"💧", label:"Fish Tanks" },
            { bg:`linear-gradient(135deg, ${T.orange}, ${T.orangeD})`, emoji:"☀️", label:"Solar Array" },
            { bg:`linear-gradient(135deg, #5C3D1E, #8a5e30)`, emoji:"🌱", label:"Digestate Loop" },
          ].map((card, i) => (
            <div key={i} style={{ borderRadius:20, overflow:"hidden", height:180, background:card.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, cursor:"pointer", transition:"transform .3s", position:"relative" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <span style={{ fontSize:40 }}>{card.emoji}</span>
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:600, color:"rgba(255,255,255,.9)", letterSpacing:".12em", textTransform:"uppercase" }}>{card.label}</span>
            </div>
          ))}
          {/* Badge overlay */}
          <div style={{ position:"absolute", top:-20, right:-20, background:T.orange, color:T.white, borderRadius:"50%", width:80, height:80, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:700, textAlign:"center", lineHeight:1.2, boxShadow:`0 8px 24px ${T.orange}66` }}>
            Live<br />Farm Cam
          </div>
        </div>
      </div>
    </section>
  );
}

function VerdeTeaser({ setPage }) {
  return (
    <section style={{ background:`linear-gradient(135deg, #1a3a28, ${T.green})`, padding:"100px 48px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 50%, rgba(224,123,40,.15) 0%, transparent 60%)" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
        {/* Visual */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div style={{ background:"rgba(255,255,255,.08)", borderRadius:24, padding:40, border:"1px solid rgba(255,255,255,.12)", backdropFilter:"blur(8px)" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>☀️</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:64, fontWeight:700, color:T.orangeL, lineHeight:1 }}>30.9<span style={{ fontSize:32, color:"rgba(255,255,255,.5)" }}>MW</span></div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.6)", letterSpacing:".1em", textTransform:"uppercase", marginTop:8 }}>Solar Generation Capacity</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {[{ emoji:"♻️", label:"Anaerobic Digester", sub:"Waste → Biogas → Power" }, { emoji:"🌿", label:"Digestate Fertilizer", sub:"Closing the nutrient loop" }].map((x, i) => (
              <div key={i} style={{ background:"rgba(255,255,255,.07)", borderRadius:16, padding:20, border:"1px solid rgba(255,255,255,.1)" }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{x.emoji}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:600, color:T.white, marginBottom:4 }}>{x.label}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.5)" }}>{x.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.1)", borderRadius:20, padding:"6px 16px", marginBottom:24 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", animation:"pulse 1.5s ease infinite" }} />
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.8)", letterSpacing:".14em", textTransform:"uppercase" }}>Verde Energy LLC — Live Generation</span>
          </div>
          <h2 className="display-serif" style={{ fontSize:"clamp(36px,4vw,56px)", color:T.white, lineHeight:1.1, marginBottom:24 }}>
            The farm that<br /><em style={{ color:T.orangeL }}>powers itself</em>
          </h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:"rgba(255,255,255,.7)", lineHeight:1.8, marginBottom:24 }}>
            Verde Energy LLC is the engine behind Orange Foods. Our 30.9 MW solar array covers 100% of farm electrical demand — and then some. Excess power flows back to Ohio's grid.
          </p>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:"rgba(255,255,255,.7)", lineHeight:1.8, marginBottom:36 }}>
            Our anaerobic digester converts fish waste, crop trimmings, and dairy manure into biogas and premium fertilizer. Nothing is wasted. Everything cycles.
          </p>
          <button className="btn-ghost" onClick={() => setPage("verdeenergy")}>
            Learn About Verde Energy →
          </button>
        </div>
      </div>
    </section>
  );
}

function OhioFieldsSection({ setPage }) {
  const crops = [
    { emoji:"🌽", name:"Corn", detail:"Non-GMO, soy-free rotation crop", season:"Summer" },
    { emoji:"🌾", name:"Oats & Barley", detail:"Specialty grain — malting & flour market", season:"Spring" },
    { emoji:"🌿", name:"Alfalfa & Grass Hay", detail:"Fed to our dairy herd on-site", season:"Year-Round" },
    { emoji:"🌱", name:"Winter Wheat & Rye", detail:"Cover crop, soil health & cash grain", season:"Winter" },
  ];

  return (
    <section style={{ background:T.parchment, padding:"100px 48px", position:"relative", overflow:"hidden" }}>
      {/* Subtle texture */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 10% 90%, ${T.gold}18 0%, transparent 50%), radial-gradient(circle at 90% 10%, ${T.green}0f 0%, transparent 50%)` }} />

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* Header */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center", marginBottom:72 }}>
          <div>
            <div className="section-label" style={{ marginBottom:16 }}>Ohio Fields LLC</div>
            <h2 className="display-serif" style={{ fontSize:"clamp(40px,4vw,60px)", color:T.charcoal, lineHeight:1.1, marginBottom:24 }}>
              Rooted in the<br /><em style={{ color:T.bark }}>oldest tradition</em><br />of all.
            </h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:T.stone, lineHeight:1.8, marginBottom:20 }}>
              Alongside our aquaponics facility, Ohio Fields LLC tends traditional farmland the way it was meant to be tended — with patience, rotation, and respect for the land. Dairy cattle graze on pasture. Crops rotate in careful sequence. Nothing is rushed.
            </p>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:T.stone, lineHeight:1.8, marginBottom:32 }}>
              Our soy-free commitment runs through every acre. Our dairy herd eats what we grow. Our digestate from Orange Digester LLC returns nutrients to the soil — closing the loop between the most ancient and most modern forms of farming.
            </p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {["100% Soy-Free","Grass-Fed Dairy","4-Crop Rotation","Digestate Fertilized"].map((tag, i) => (
                <span key={i} className="tag" style={{ background:`${T.bark}18`, color:T.bark, border:`1px solid ${T.bark}28` }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Dairy hero card */}
          <div style={{ position:"relative" }}>
            <div style={{
              background:`linear-gradient(145deg, ${T.bark}, #8a5e30)`,
              borderRadius:28, padding:48,
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              textAlign:"center", minHeight:340,
              boxShadow:`0 24px 64px ${T.bark}44`,
            }}>
              <div style={{ fontSize:72, marginBottom:20, animation:"float 5s ease-in-out infinite" }}>🐄</div>
              <h3 className="display-serif" style={{ fontSize:34, color:T.white, marginBottom:12 }}>
                Grass-Fed Dairy Cattle
              </h3>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.75)", lineHeight:1.7, maxWidth:280, marginBottom:24 }}>
                Our herd grazes on the same Ohio pasture their ancestors did. Soy-free feed. No shortcuts. Milk marketed through regional cooperatives and direct to processor.
              </p>
              <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                {["Soy-Free Feed","Pasture Raised","Regional Dairy Co-op"].map((b, i) => (
                  <span key={i} style={{
                    background:"rgba(255,255,255,.15)", color:"rgba(255,255,255,.9)",
                    border:"1px solid rgba(255,255,255,.25)", borderRadius:20,
                    padding:"4px 12px", fontSize:11, fontFamily:"'Jost',sans-serif",
                    fontWeight:600, letterSpacing:".08em",
                  }}>{b}</span>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <div style={{
              position:"absolute", top:-16, right:-16,
              background:T.gold, color:T.white, borderRadius:"50%",
              width:76, height:76,
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontWeight:700,
              textAlign:"center", lineHeight:1.25,
              boxShadow:`0 8px 24px ${T.gold}66`,
            }}>
              Ohio<br />Proud
            </div>
          </div>
        </div>

        {/* Crop rotation grid */}
        <div style={{ marginBottom:56 }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div className="section-label" style={{ justifyContent:"center", marginBottom:12 }}>Soy-Free Crop Rotation</div>
            <h3 className="display-serif" style={{ fontSize:38, color:T.charcoal }}>
              Four crops. One <em style={{ color:T.green }}>living calendar.</em>
            </h3>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {crops.map((crop, i) => (
              <div key={i} style={{
                background:T.white, borderRadius:20, padding:28,
                boxShadow:"0 2px 20px rgba(0,0,0,.05)",
                border:`1px solid ${T.bark}14`,
                transition:"all .3s ease", cursor:"default",
                position:"relative", overflow:"hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 20px rgba(0,0,0,.05)"; }}>
                {/* Season ribbon */}
                <div style={{
                  position:"absolute", top:14, right:-22,
                  background: i === 0 ? T.orange : i === 1 ? T.green : i === 2 ? T.greenL : T.bark,
                  color:T.white, fontSize:9, fontWeight:700,
                  fontFamily:"'Jost',sans-serif", letterSpacing:".12em",
                  padding:"3px 28px", transform:"rotate(45deg)",
                  textTransform:"uppercase",
                }}>
                  {crop.season}
                </div>
                <div style={{ fontSize:44, marginBottom:16 }}>{crop.emoji}</div>
                <h4 className="display-serif" style={{ fontSize:24, color:T.charcoal, marginBottom:8 }}>{crop.name}</h4>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone, lineHeight:1.6 }}>{crop.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The loop connection banner */}
        <div style={{
          background:`linear-gradient(135deg, ${T.green}, #1a3a28)`,
          borderRadius:24, padding:"44px 48px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:24,
        }}>
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.55)", letterSpacing:".2em", textTransform:"uppercase", marginBottom:10 }}>The Full Circle</div>
            <h3 className="display-serif" style={{ fontSize:34, color:T.white, lineHeight:1.2, marginBottom:12 }}>
              Ohio Fields feeds the digester.<br />
              <em style={{ color:T.orangeL }}>The digester feeds Ohio Fields.</em>
            </h3>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.7)", lineHeight:1.7, maxWidth:520 }}>
              Dairy manure from our cattle flows into Orange Digester LLC. The anaerobic process produces biogas — and rich digestate. That digestate returns to our fields as premium organic fertilizer, replacing synthetic inputs entirely. Traditional farming and cutting-edge technology, in perfect rhythm.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12, alignItems:"flex-end" }}>
            {[
              { icon:"🐄", flow:"Dairy Manure →" },
              { icon:"⚗️", flow:"Orange Digester →" },
              { icon:"⚡", flow:"Biogas + Heat →" },
              { icon:"🌱", flow:"Digestate → Ohio Fields" },
            ].map((step, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:10,
                background:"rgba(255,255,255,.08)", borderRadius:12,
                padding:"10px 18px", border:"1px solid rgba(255,255,255,.12)",
                minWidth:240,
              }}>
                <span style={{ fontSize:20 }}>{step.icon}</span>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:"rgba(255,255,255,.85)", fontWeight:500 }}>{step.flow}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function SubscriptionBuilder({ addToCart }) {
  const [selected, setSelected] = useState([]);
  const [size, setSize] = useState("medium");
  const sizes = [
    { key:"small", label:"Starter Box", items:"4–5 items", price:29.99 },
    { key:"medium", label:"Family Box", items:"8–10 items", price:49.99 },
    { key:"large", label:"Harvest Box", items:"14–16 items", price:79.99 },
  ];
  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const sel = sizes.find(s => s.key === size);

  return (
    <section style={{ padding:"100px 48px", background:T.cream }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div className="section-label" style={{ justifyContent:"center", marginBottom:16 }}>Build Your Box</div>
          <h2 className="display-serif" style={{ fontSize:52, color:T.charcoal, marginBottom:16 }}>
            Your Weekly <em style={{ color:T.orange }}>Farm Box</em>
          </h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:T.stone, maxWidth:480, margin:"0 auto" }}>
            Customize your weekly delivery. Cancel or pause anytime. Fresh within 48 hours, guaranteed.
          </p>
        </div>

        {/* Size selector */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:48 }}>
          {sizes.map(s => (
            <div key={s.key} onClick={() => setSize(s.key)} style={{
              border:`2px solid ${size === s.key ? T.orange : "#ddd"}`,
              borderRadius:16, padding:"20px 16px", textAlign:"center", cursor:"pointer",
              background: size === s.key ? `${T.orange}0e` : T.white,
              transition:"all .2s",
            }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color: size === s.key ? T.orange : T.charcoal, marginBottom:4 }}>{s.label}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.stone, marginBottom:8 }}>{s.items}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:20, fontWeight:700, color:T.green }}>${s.price}<span style={{ fontSize:12, color:T.stone }}>/week</span></div>
            </div>
          ))}
        </div>

        {/* Category toggles */}
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginBottom:32 }}>
          {["All","Produce","Seafood","Value-Added"].map((cat, i) => (
            <span key={i} className="tag" style={{ cursor:"pointer", fontSize:12, padding:"6px 16px" }}>{cat}</span>
          ))}
        </div>

        {/* Product grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14, marginBottom:40 }}>
          {PRODUCTS.slice(0, 7).map(p => (
            <div key={p.id} onClick={() => toggle(p.id)} style={{
              borderRadius:14, overflow:"hidden", cursor:"pointer",
              border:`2px solid ${selected.includes(p.id) ? T.orange : "transparent"}`,
              background:`linear-gradient(135deg, ${p.color}18, ${p.color}30)`,
              padding:16, textAlign:"center", transition:"all .25s",
              transform: selected.includes(p.id) ? "scale(1.03)" : "scale(1)",
            }}>
              <div style={{ fontSize:36, marginBottom:8 }}>{p.emoji}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:600, color:T.charcoal, marginBottom:4 }}>{p.name}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:T.stone }}>${p.price}/{p.unit}</div>
              {selected.includes(p.id) && (
                <div style={{ marginTop:8, background:T.orange, color:T.white, borderRadius:8, padding:"3px 0", fontSize:11, fontWeight:700 }}>✓ Added</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center" }}>
          <button className="btn-primary" style={{ fontSize:15, padding:"16px 48px" }}
            onClick={() => addToCart({ ...sel, name:`${sel.label} Subscription`, price:sel.price, id:"sub" })}>
            Subscribe — ${sel.price}/week →
          </button>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.stone, marginTop:12 }}>Free delivery · Cancel anytime · Harvested to order</p>
        </div>
      </div>
    </section>
  );
}

function RecipesTeaser({ setPage }) {
  const recipes = [
    { emoji:"🥗", name:"Barramundi Crudo", sub:"Orange cauliflower vinaigrette · Garden lettuce", time:"15 min" },
    { emoji:"🥘", name:"Prawn Bisque", sub:"Fresh prawns · Cream · Herbs from the farm", time:"35 min" },
    { emoji:"🫕", name:"Perch Piccata", sub:"Yellow perch · Lemon caper butter · Carrots", time:"25 min" },
  ];

  return (
    <section style={{ padding:"100px 48px", background:T.parchment }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48 }}>
          <div>
            <div className="section-label" style={{ marginBottom:12 }}>Recipes & Inspiration</div>
            <h2 className="display-serif" style={{ fontSize:52, color:T.charcoal }}>
              Cook with <em style={{ color:T.orange }}>what's fresh</em>
            </h2>
          </div>
          <button className="btn-outline" onClick={() => setPage("recipes")}>All Recipes</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
          {recipes.map((r, i) => (
            <div key={i} style={{ background:T.white, borderRadius:20, overflow:"hidden", cursor:"pointer", transition:"transform .3s, box-shadow .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ height:200, background:`linear-gradient(135deg, ${T.green}, ${T.greenL})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:72 }}>{r.emoji}</div>
              <div style={{ padding:24 }}>
                <h3 className="display-serif" style={{ fontSize:26, color:T.charcoal, marginBottom:8 }}>{r.name}</h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone, lineHeight:1.6, marginBottom:12 }}>{r.sub}</p>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:14 }}>⏱</span>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.green, fontWeight:600 }}>{r.time}</span>
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
    { q:"The barramundi is incredible — clean, sweet, nothing like store-bought. Ordered again immediately.", name:"James T.", loc:"Cleveland, OH" },
    { q:"Knowing it's solar-powered and zero-waste makes every bite taste even better.", name:"Rachel K.", loc:"Cincinnati, OH" },
  ];
  return (
    <section style={{ padding:"80px 48px", background:T.green, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, backgroundImage:"radial-gradient(circle at 20% 80%, rgba(224,123,40,.12) 0%, transparent 50%)" }} />
      <div style={{ maxWidth:1000, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:12 }}>
            <span style={{ background:"rgba(255,255,255,.6)" }} /> What People Say
          </div>
          <h2 className="display-serif" style={{ fontSize:48, color:T.white }}>From our <em style={{ color:T.orangeL }}>community</em></h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
          {quotes.map((q, i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.07)", borderRadius:20, padding:32, border:"1px solid rgba(255,255,255,.1)" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:56, color:T.orange, lineHeight:1, marginBottom:8 }}>"</div>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:"rgba(255,255,255,.85)", lineHeight:1.7, marginBottom:20, fontStyle:"italic" }}>{q.q}</p>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.orangeL, fontWeight:600 }}>{q.name}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.45)" }}>{q.loc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section style={{ padding:"80px 48px", background:T.orange, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 20%, rgba(255,255,255,.12) 0%, transparent 50%)" }} />
      <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🌾</div>
        <h2 className="display-serif" style={{ fontSize:48, color:T.white, marginBottom:16 }}>
          Harvest Updates, Weekly
        </h2>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:"rgba(255,255,255,.8)", marginBottom:36 }}>
          What's growing this week, new recipes, and seasonal specials — straight to your inbox.
        </p>
        {!submitted ? (
          <div style={{ display:"flex", gap:12 }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" style={{ flex:1, background:"rgba(255,255,255,.15)", border:"1.5px solid rgba(255,255,255,.4)", color:T.white, borderRadius:40 }} />
            <button className="btn-ghost" onClick={() => { if(email) setSubmitted(true); }}>Subscribe</button>
          </div>
        ) : (
          <div style={{ background:"rgba(255,255,255,.15)", borderRadius:20, padding:"20px 32px", border:"1px solid rgba(255,255,255,.3)" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:T.white }}>Welcome to the farm ✓</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.7)", marginTop:8 }}>We'll be in touch at next harvest.</div>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background:T.charcoal, color:"rgba(255,255,255,.6)", padding:"64px 48px 32px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:48 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg, ${T.orange}, ${T.orangeD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🍊</div>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:T.white }}>Orange Foods LLC</div>
                <div style={{ fontSize:10, letterSpacing:".16em", color:T.stone, textTransform:"uppercase" }}>Powered by Verde Energy</div>
              </div>
            </div>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, lineHeight:1.8, maxWidth:280, marginBottom:24 }}>Fresh from our farms to your table. 500,000 sq ft of solar-powered aquaponics in rural Ohio.</p>
            <div style={{ display:"flex", gap:12 }}>
              {["📘","📸","🐦","▶️"].map((icon, i) => (
                <div key={i} style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, transition:"background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,.16)"}
                  onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,.08)"}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
          {[
            { title:"Shop", links:["Fresh Produce","Seafood","Subscription Boxes","Wholesale","Gift Cards"] },
            { title:"Company", links:["Our Farm","Verde Energy","Why Orange Foods","About Us","Careers"] },
            { title:"Support", links:["Contact","FAQ","Delivery Info","Returns","Press"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:T.white, marginBottom:20 }}>{col.title}</div>
              {col.links.map((link, j) => (
                <div key={j} onClick={() => setPage(link.toLowerCase().replace(/ /g,""))} style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:"rgba(255,255,255,.5)", marginBottom:10, cursor:"pointer", transition:"color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = T.orangeL}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.5)"}>
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"rgba(255,255,255,.3)" }}>© 2026 Orange Foods LLC & Verde Energy LLC. All rights reserved. Rural Ohio.</div>
          <div style={{ display:"flex", gap:6 }}>
            <span className="trust-badge" style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", fontSize:11 }}>☀️ Solar Powered</span>
            <span className="trust-badge" style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", fontSize:11 }}>🌿 Ohio Grown</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE: SHOP ─────────────────────────────────────────────────────────────── */
function ShopPage({ addToCart }) {
  const [cat, setCat] = useState("all");
  const cats = ["all","produce","seafood","subscription"];
  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  return (
    <div style={{ paddingTop:72 }}>
      <div style={{ background:`linear-gradient(135deg, ${T.green}, #1a3a28)`, padding:"80px 48px 60px", textAlign:"center" }}>
        <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:16 }}>
          <span style={{ background:"rgba(255,255,255,.6)" }} /> Fresh Daily
        </div>
        <h1 className="display-serif" style={{ fontSize:64, color:T.white, marginBottom:16 }}>The Farm Shop</h1>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:"rgba(255,255,255,.7)", maxWidth:480, margin:"0 auto" }}>
          Everything harvested within 48 hours. Grown without pesticides. Powered by the sun.
        </p>
      </div>

      <div style={{ padding:"40px 48px", background:T.cream }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          {/* Filter tabs */}
          <div style={{ display:"flex", gap:10, marginBottom:40, flexWrap:"wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding:"10px 24px", borderRadius:30,
                border:`2px solid ${cat === c ? T.orange : "#ddd"}`,
                background: cat === c ? T.orange : T.white,
                color: cat === c ? T.white : T.stone,
                fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:600,
                letterSpacing:".08em", textTransform:"capitalize", cursor:"pointer",
                transition:"all .2s",
              }}>{c === "all" ? "All Products" : c.charAt(0).toUpperCase() + c.slice(1)}</button>
            ))}
            <div className="freshness-pill" style={{ marginLeft:"auto" }}>
              <div className="fresh-dot" /> Live inventory — harvested today
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:24 }}>
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} addToCart={addToCart} large delay={i * 80} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE: OUR FARM ─────────────────────────────────────────────────────────── */
function OurFarmPage() {
  const sections = [
    { emoji:"🌿", title:"350,000 sq ft of Crop Production", body:"Our crops grow in nutrient-film technique (NFT) channels, deep-water culture rafts, and media beds — all fed by the nutrient-rich water from our fish systems. No synthetic fertilizer. No soil-borne disease. Just pure, sunlit growth.", stats:["4 Crop Varieties","52-Week Harvest","Zero Pesticides"] },
    { emoji:"💧", title:"150,000 sq ft of Freshwater Aquaculture", body:"Three species of fish and prawns thrive in our recirculating aquaculture systems (RAS). Crystal-clear freshwater. Monitored 24/7. No brackish water — ever. No ocean impact. Just clean, domestic protein.", stats:["Barramundi","Yellow Perch","Freshwater Prawns"] },
    { emoji:"🔄", title:"The Closed Loop — Nothing Wasted", body:"Fish produce ammonia-rich waste. Beneficial bacteria convert it to nitrates. Plants absorb nitrates and filter the water. Clean water returns to the fish. 95% of all water recirculated. Every nutrient captured.", stats:[">95% Water Recirculated","Zero Synthetic Inputs","Carbon Net Neutral"] },
    { emoji:"🐄", title:"Ohio Fields — Traditional Farming, Reimagined", body:"Beyond the greenhouse walls, Ohio Fields LLC tends traditional farmland with a modern conscience. Our grass-fed dairy cattle graze soy-free. Our four-crop rotation — corn, oats and barley, alfalfa and hay, winter wheat and rye — rebuilds soil year after year. Digestate from our anaerobic digester returns nutrients to the earth, replacing synthetic fertilizer entirely.", stats:["Grass-Fed Dairy","Soy-Free Always","4-Crop Rotation","Digestate Fertilized"] },
  ];

  return (
    <div style={{ paddingTop:72 }}>
      <div style={{ background:`linear-gradient(135deg, #1e3a28, ${T.green})`, padding:"100px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 60% 40%, rgba(224,123,40,.15) 0%, transparent 60%)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:16 }}>
            <span style={{ background:"rgba(255,255,255,.6)" }} /> Rural Ohio
          </div>
          <h1 className="display-serif" style={{ fontSize:"clamp(48px,7vw,80px)", color:T.white, lineHeight:1.1, marginBottom:20 }}>
            Our Farm.<br /><em style={{ color:T.orangeL }}>Our Promise.</em>
          </h1>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:18, color:"rgba(255,255,255,.75)", maxWidth:560, margin:"0 auto" }}>
            A 500,000 sq ft living ecosystem where science, sustainability, and flavor work in perfect harmony.
          </p>
        </div>
      </div>

      <div style={{ padding:"80px 48px", background:T.cream }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          {sections.map((sec, i) => (
            <div key={i} style={{ display:"grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap:64, alignItems:"center", marginBottom:100, direction: i % 2 === 1 ? "rtl" : "ltr" }}>
              <div style={{ direction:"ltr" }}>
                <div style={{ fontSize:64, marginBottom:24 }}>{sec.emoji}</div>
                <h2 className="display-serif" style={{ fontSize:42, color:T.charcoal, lineHeight:1.2, marginBottom:20 }}>{sec.title}</h2>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:T.stone, lineHeight:1.8, marginBottom:28 }}>{sec.body}</p>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  {sec.stats.map((s, j) => <span key={j} className="tag">{s}</span>)}
                </div>
              </div>
              <div style={{ direction:"ltr", background:`linear-gradient(135deg, ${T.green}22, ${T.orange}22)`, borderRadius:28, height:360, display:"flex", alignItems:"center", justifyContent:"center", fontSize:120, border:`2px solid ${T.green}18` }}>
                {sec.emoji}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE: VERDE ENERGY ─────────────────────────────────────────────────────── */
function VerdeEnergyPage() {
  return (
    <div style={{ paddingTop:72 }}>
      <div style={{ background:"linear-gradient(135deg, #0d2218, #1a3a28)", padding:"100px 48px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 70% 30%, rgba(249,160,92,.2) 0%, transparent 55%)" }} />
        <div style={{ maxWidth:800, position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.1)", borderRadius:20, padding:"6px 16px", marginBottom:28 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", animation:"pulse 1.5s ease infinite" }} />
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.8)", letterSpacing:".14em", textTransform:"uppercase" }}>Verde Energy LLC · Live Generation</span>
          </div>
          <h1 className="display-serif" style={{ fontSize:"clamp(48px,6vw,80px)", color:T.white, lineHeight:1.1, marginBottom:20 }}>
            The renewable<br />engine behind<br /><em style={{ color:T.orangeL }}>Orange Foods</em>
          </h1>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:18, color:"rgba(255,255,255,.7)", lineHeight:1.7, maxWidth:560 }}>
            Verde Energy LLC is our fully integrated renewable energy subsidiary. 30.9 MW of solar power. An anaerobic digester that converts waste into fuel. Energy independence — not as a goal, as a reality.
          </p>
        </div>
      </div>

      <section style={{ padding:"80px 48px", background:T.cream }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, marginBottom:80 }}>
            {[
              { emoji:"☀️", title:"30.9 MW Solar Array", body:"Ground-mount and rooftop solar panels cover 100%+ of facility electrical demand. Excess generation sold back to the Ohio utility grid under a 20-year power purchase agreement.", stat:"30.9 MW", statLabel:"Generation Capacity" },
              { emoji:"♻️", title:"Anaerobic Digester", body:"25 wet tons of fish waste, crop trimmings, and dairy manure processed daily. Converted into biogas electricity and heat. Nothing wasted. Everything cycled.", stat:"25 tons", statLabel:"Processed Daily" },
              { emoji:"🌿", title:"Nutrient-Rich Digestate", body:"The digestate — rich in nitrogen, phosphorus, and potassium — is applied to our Ohio Fields crop rotation as premium organic fertilizer. Closing the loop completely.", stat:"$175K+", statLabel:"Annual Fertilizer Savings" },
            ].map((card, i) => (
              <div key={i} style={{ background:T.white, borderRadius:24, padding:36, boxShadow:"0 4px 32px rgba(0,0,0,.06)" }}>
                <div style={{ fontSize:48, marginBottom:20 }}>{card.emoji}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:700, color:T.orange, lineHeight:1, marginBottom:4 }}>{card.stat}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:T.stone, letterSpacing:".1em", textTransform:"uppercase", marginBottom:16 }}>{card.statLabel}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, color:T.charcoal, marginBottom:12 }}>{card.title}</h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:T.stone, lineHeight:1.7 }}>{card.body}</p>
              </div>
            ))}
          </div>

          <div style={{ background:`linear-gradient(135deg, ${T.green}, #1a3a28)`, borderRadius:28, padding:"60px 48px", color:T.white, textAlign:"center" }}>
            <h2 className="display-serif" style={{ fontSize:48, marginBottom:16 }}>A farm that <em style={{ color:T.orangeL }}>gives back to the grid</em></h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:16, color:"rgba(255,255,255,.75)", maxWidth:600, margin:"0 auto 32px", lineHeight:1.7 }}>
              When our solar array generates more power than the farm needs — which is most days — that clean energy flows back to Ohio homes and businesses. Verde Energy isn't just powering Orange Foods. It's powering the community.
            </p>
            <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
              {["100% Renewable Electricity","20-Year PPA Agreement","Ohio Grid Contributor","D3 RIN Certified Biogas"].map((b, i) => (
                <span key={i} className="trust-badge" style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", color:"rgba(255,255,255,.85)" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: WHOLESALE ────────────────────────────────────────────────────────── */
function WholesalePage() {
  const [form, setForm] = useState({ name:"", company:"", email:"", type:"", message:"" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ paddingTop:72 }}>
      <div style={{ background:`linear-gradient(135deg, ${T.bark}, #8a5e30)`, padding:"80px 48px", textAlign:"center" }}>
        <div className="section-label" style={{ color:"rgba(255,255,255,.6)", justifyContent:"center", marginBottom:16 }}>
          <span style={{ background:"rgba(255,255,255,.6)" }} /> Business Partnerships
        </div>
        <h1 className="display-serif" style={{ fontSize:64, color:T.white, marginBottom:16 }}>Wholesale & Partnerships</h1>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:17, color:"rgba(255,255,255,.75)", maxWidth:520, margin:"0 auto" }}>
          Restaurants, grocers, distributors, and institutions — bring Ohio's freshest aquaponics to your customers.
        </p>
      </div>

      <section style={{ padding:"80px 48px", background:T.cream }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64 }}>
          <div>
            <h2 className="display-serif" style={{ fontSize:42, color:T.charcoal, marginBottom:20 }}>Built for <em style={{ color:T.orange }}>professionals</em></h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:T.stone, lineHeight:1.8, marginBottom:28 }}>
              We supply regional grocery chains, food service distributors, restaurants, hospitals, universities, and corporate dining programs across Ohio and the Midwest.
            </p>
            {[{ icon:"📋", title:"Long-Term Supply Contracts", body:"Volume commitments with predictable pricing and weekly delivery schedules." }, { icon:"🌡️", title:"Cold Chain Guaranteed", body:"On-site cold storage and refrigerated delivery within 300 miles." }, { icon:"🏷️", title:"Private Label Available", body:"Your brand on our product. Custom packaging for grocery retail." }, { icon:"📊", title:"Traceability Documentation", body:"Full batch tracking from seed or fingerling to your loading dock." }].map((x, i) => (
              <div key={i} style={{ display:"flex", gap:14, marginBottom:20 }}>
                <div style={{ fontSize:24 }}>{x.icon}</div>
                <div><div style={{ fontFamily:"'Jost',sans-serif", fontWeight:600, fontSize:14, color:T.charcoal, marginBottom:4 }}>{x.title}</div><div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone, lineHeight:1.6 }}>{x.body}</div></div>
              </div>
            ))}
          </div>

          <div style={{ background:T.white, borderRadius:24, padding:40, boxShadow:"0 4px 32px rgba(0,0,0,.06)" }}>
            <h3 className="display-serif" style={{ fontSize:32, color:T.charcoal, marginBottom:24 }}>Inquire Now</h3>
            {!sent ? (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[["name","Your Name"],["company","Company / Restaurant / Store"],["email","Email Address"]].map(([key, ph]) => (
                  <input key={key} placeholder={ph} value={form[key]} onChange={e => setForm(f => ({...f, [key]:e.target.value}))} />
                ))}
                <select value={form.type} onChange={e => setForm(f => ({...f, type:e.target.value}))} style={{ fontFamily:"'Jost',sans-serif", border:"1.5px solid #ddd", borderRadius:10, padding:"12px 16px", fontSize:14, background:T.white, cursor:"pointer" }}>
                  <option value="">Type of Partnership...</option>
                  <option>Grocery / Retail</option>
                  <option>Restaurant / Food Service</option>
                  <option>Distributor</option>
                  <option>Institutional (hospital, university)</option>
                  <option>Other</option>
                </select>
                <textarea placeholder="Tell us about your volume needs and delivery area..." rows={4} value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))} style={{ resize:"vertical" }} />
                <button className="btn-primary" style={{ marginTop:8 }} onClick={() => { if(form.email) setSent(true); }}>
                  Send Inquiry →
                </button>
              </div>
            ) : (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🌾</div>
                <h3 className="display-serif" style={{ fontSize:32, color:T.green, marginBottom:12 }}>We'll be in touch!</h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:T.stone }}>Our wholesale team typically responds within one business day.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: ABOUT ────────────────────────────────────────────────────────────── */
function AboutPage() {
  return (
    <div style={{ paddingTop:72 }}>
      <div style={{ background:`linear-gradient(160deg, ${T.parchment} 60%, ${T.greenXL} 100%)`, padding:"100px 48px" }}>
        <div style={{ maxWidth:800 }}>
          <div className="section-label" style={{ marginBottom:20 }}>Our Story</div>
          <h1 className="display-serif" style={{ fontSize:"clamp(48px,6vw,72px)", color:T.charcoal, lineHeight:1.1, marginBottom:24 }}>
            Built to feed Ohio<br />the way it <em style={{ color:T.orange }}>deserves</em><br />to be fed.
          </h1>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:18, color:T.stone, lineHeight:1.8, maxWidth:640 }}>
            Orange Foods was born from a single conviction: that the gap between the farm and the table had grown too wide. We built a 500,000 sq ft facility to close it — permanently.
          </p>
        </div>
      </div>

      <section style={{ padding:"80px 48px", background:T.white }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80 }}>
          <div>
            <h2 className="display-serif" style={{ fontSize:44, color:T.charcoal, marginBottom:20 }}>
              Orange Foods LLC<br /><em style={{ color:T.orange }}>+ Verde Energy LLC</em>
            </h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:T.stone, lineHeight:1.8, marginBottom:20 }}>
              Orange Foods LLC is our flagship aquaponics operation — 350,000 sq ft of crops and 150,000 sq ft of freshwater aquaculture in a single, integrated facility. Every product leaves our farm within 48 hours of harvest.
            </p>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:T.stone, lineHeight:1.8, marginBottom:20 }}>
              Verde Energy LLC is our renewable energy subsidiary — 30.9 MW of solar generation and an anaerobic digester that converts organic waste into biogas and premium fertilizer. The farm that powers itself.
            </p>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, color:T.stone, lineHeight:1.8 }}>
              Together, they form something unprecedented: a fully integrated, energy-independent food and agriculture platform built on the belief that sustainability and profitability are not opposites.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {[
              { emoji:"🎯", title:"Our Mission", body:"Produce the freshest, most nutrient-dense food in North America through technology-driven aquaponics and agriculture — while generating clean energy and creating quality rural jobs." },
              { emoji:"🌍", title:"Our Vision", body:"To become the leading integrated freshwater aquaponics company in the United States — setting the standard for closed-loop, zero-waste food production." },
              { emoji:"💡", title:"Our Values", body:"Transparency. Sustainability. Excellence. We don't cut corners. We don't compromise on freshness. We don't pretend sustainability and quality are competing values." },
            ].map((x, i) => (
              <div key={i} style={{ background:T.cream, borderRadius:20, padding:28, border:`1px solid ${T.green}18` }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{x.emoji}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, color:T.charcoal, marginBottom:10 }}>{x.title}</h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone, lineHeight:1.7 }}>{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CART SIDEBAR ───────────────────────────────────────────────────────────── */
function CartSidebar({ items, isOpen, onClose, removeItem }) {
  const total = items.reduce((s, item) => s + item.price * item.qty, 0);
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.4)", zIndex:1999, opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "all" : "none", transition:"opacity .3s", backdropFilter:"blur(4px)" }} />
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width:400, background:T.white, zIndex:2000, transform: isOpen ? "translateX(0)" : "translateX(100%)", transition:"transform .4s cubic-bezier(.4,0,.2,1)", boxShadow:"-8px 0 48px rgba(0,0,0,.12)", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"24px 28px", borderBottom:`1px solid #eee`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h3 className="display-serif" style={{ fontSize:28, color:T.charcoal }}>Your Box</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:24, cursor:"pointer", color:T.stone }}>✕</button>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"20px 28px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 0" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🌾</div>
              <p className="display-serif" style={{ fontSize:24, color:T.stone }}>Your box is empty</p>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:T.stone, marginTop:8 }}>Add fresh items from the farm shop</p>
            </div>
          ) : items.map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:16, padding:"16px 0", borderBottom:`1px solid #f0f0f0` }}>
              <div style={{ width:52, height:52, borderRadius:12, background:`linear-gradient(135deg, ${T.green}22, ${T.orange}22)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{item.emoji || "📦"}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:600, color:T.charcoal }}>{item.name}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:T.stone }}>Qty: {item.qty} × ${item.price}</div>
              </div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:700, color:T.orange }}>${(item.price * item.qty).toFixed(2)}</div>
              <button onClick={() => removeItem(i)} style={{ background:"none", border:"none", color:T.stone, cursor:"pointer", fontSize:16 }}>✕</button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding:"20px 28px", borderTop:`1px solid #eee` }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:T.stone }}>Subtotal</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:T.charcoal }}>${total.toFixed(2)}</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:20 }}>
              <div className="fresh-dot" />
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:T.green }}>Harvested within 48 hours · Free delivery on orders over $60</span>
            </div>
            <button className="btn-primary" style={{ width:"100%", justifyContent:"center", padding:"16px" }}>
              Checkout → ${total.toFixed(2)}
            </button>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:T.stone, textAlign:"center", marginTop:12 }}>Secure checkout · Farm-fresh guarantee</p>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── HOMEPAGE ───────────────────────────────────────────────────────────────── */
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
      <OhioFieldsSection setPage={setPage} />
      <SubscriptionBuilder addToCart={addToCart} />
      <RecipesTeaser setPage={setPage} />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...product, qty:1 }];
    });
    setCartOpen(true);
  };

  const removeItem = (idx) => setCart(prev => prev.filter((_, i) => i !== idx));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const pageNav = (p) => {
    setPage(p);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  return (
    <div style={{ minHeight:"100vh", background:T.cream }}>
      <style>{G}</style>

      <Nav page={page} setPage={p => { pageNav(p); setCartOpen(false); }} cartCount={cartCount} />

      <CartSidebar items={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} removeItem={removeItem} />

      <main>
        {page === "home"         && <HomePage setPage={pageNav} addToCart={addToCart} />}
        {page === "shop"         && <ShopPage addToCart={addToCart} />}
        {page === "ourfarm"      && <OurFarmPage />}
        {page === "verdeenergy"  && <VerdeEnergyPage />}
        {page === "wholesale"    && <WholesalePage />}
        {page === "about"        && <AboutPage />}
        {(page === "recipes" || page === "whyus" || page === "contact") && (
          <div style={{ paddingTop:72, minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16 }}>
            <div style={{ fontSize:64 }}>🌱</div>
            <h2 className="display-serif" style={{ fontSize:48, color:T.charcoal }}>Coming Soon</h2>
            <p style={{ fontFamily:"'Jost',sans-serif", color:T.stone }}>This page is being freshly grown. Check back soon.</p>
            <button className="btn-primary" onClick={() => pageNav("home")}>← Back to Home</button>
          </div>
        )}
      </main>

      {page !== "home" && <Footer setPage={pageNav} />}
    </div>
  );
}
