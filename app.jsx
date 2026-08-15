/* App shell — sticky header with stamped wordmark + mono nav, hash routing. */
const { useEffect: useAppEffect, useState: useAppState } = React;

/* ==================== 2026 PASSAGE PRESENTATION ====================
   Homepage hero, web-resolution Passage images, and subtle year marks.
   The original PassageSequence is retained for every other photographic series. */
const LegacyPassageSequence = PassageSequence;

const passageWebSrc = (src) =>
  `/.netlify/images?url=/${src}&w=1100&fm=jpg&q=74`;

function PassageWatermarkedPhoto({ src, label }) {
  return (
    <div style={{ position: "relative" }}>
      <Photo src={passageWebSrc(src)} natural />
      <span aria-hidden="true" style={{
        position: "absolute",
        right: 10,
        bottom: 8,
        zIndex: 12,
        pointerEvents: "none",
        fontFamily: "var(--mono)",
        fontSize: 9,
        letterSpacing: "0.10em",
        color: "rgba(255,255,255,.58)",
        textShadow: "0 1px 2px rgba(0,0,0,.28)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </div>
  );
}

/* Homepage override: the Passage image itself links to the series.
   Natural sizing keeps the photograph edge-to-edge, with no band beneath it. */
HomePage = function HomePage2026({ go }) {
  const mob = useIsMobile();
  return (
    <div className="page-enter col-narrow" data-screen-label="Home" style={{ paddingTop: 64 }}>
      <Reveal as="section" style={{
        margin: mob ? "0 -22px 48px" : "0 -12% 120px",
      }}>
        <div
          onClick={() => go("photography/passage")}
          role="link"
          tabIndex={0}
          aria-label="Open Le Passage"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              go("photography/passage");
            }
          }}
          style={{ position: "relative", cursor: "pointer", outline: "none", lineHeight: 0 }}>
          <Photo
            src="assets/home-passage-2026.jpg"
            natural
            style={{ background: "transparent" }}
          />
          <span aria-hidden="true" style={{
            position: "absolute",
            right: mob ? 12 : 16,
            bottom: mob ? 10 : 14,
            zIndex: 12,
            pointerEvents: "none",
            fontFamily: "var(--mono)",
            fontSize: mob ? 9 : 12,
            lineHeight: 1,
            letterSpacing: "0.11em",
            textTransform: "uppercase",
            color: "rgba(55,50,45,.43)",
            textShadow: "0 1px 1px rgba(255,255,255,.26)",
            whiteSpace: "nowrap",
          }}>
            LE PASSAGE, 2026
          </span>
        </div>
      </Reveal>

      <Reveal as="section" style={{ marginBottom: 160 }}>
        {PROJECTS.map(pr => (
          <div key={pr.id}
               onClick={() => go("photography/" + pr.id)}
               style={{
                 display: "grid",
                 gridTemplateColumns: mob ? "28px 1fr" : "60px 1fr",
                 alignItems: "baseline",
                 columnGap: mob ? 12 : 32,
                 padding: mob ? "3px 0" : "6px 0",
                 cursor: "pointer",
                 transition: "padding-left .8s var(--ease), opacity .8s var(--ease)",
               }}
               onMouseEnter={e => { e.currentTarget.style.paddingLeft = "6px"; e.currentTarget.style.opacity = "0.78"; }}
               onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.opacity = "1"; }}>
            <span style={{
              fontFamily: "var(--mono-worn)",
              fontSize: mob ? 9 : 11,
              letterSpacing: "0.22em",
            }}>
              <LetterpressTitle text={pr.no} />
            </span>
            <span style={{
              fontFamily: "var(--mono-worn)",
              fontSize: mob ? 12 : 18,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              opacity: mob ? 0.80 : 1,
            }}>
              <LetterpressTitle text={pr.title} />
            </span>
          </div>
        ))}
      </Reveal>
    </div>
  );
};

/* Passage override: slightly smaller than the original site presentation,
   but large enough to read comfortably. The first six visual positions are
   marked 2026; all following positions 2023. */
PassageSequence = function PassageSequence2026({ project }) {
  if (project.id !== "passage") {
    return <LegacyPassageSequence project={project} />;
  }

  const seq = project.sequence || [];
  const mob = useIsMobile();
  const gaps = [64, 64, 128, 64, 96, 64, 64, 144, 64];

  return (
    <div style={{ paddingTop: 40 }}>
      {seq.map((p, i) => {
        const isLast = i === seq.length - 1;
        const baseGap = isLast ? 40 : (!mob ? 96 : gaps[i % gaps.length]);
        const mb = !mob ? baseGap : (baseGap + (p.extraGap || 0));
        const label = i < 6 ? "LE PASSAGE, 2026" : "LE PASSAGE, 2023";
        const width = mob ? "94%" : "76%";
        const wrapStyle = {
          width,
          maxWidth: width,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: mb,
        };

        if (p.kind === "diptych") {
          return (
            <Reveal as="section" key={i} style={wrapStyle}>
              <div style={{
                display: "grid",
                gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
                columnGap: mob ? 0 : 18,
                rowGap: mob ? 14 : 0,
              }}>
                <PassageWatermarkedPhoto src={p.a.src} label={label} />
                <PassageWatermarkedPhoto src={p.b.src} label={label} />
              </div>
            </Reveal>
          );
        }

        if (p.kind === "triptych") {
          return (
            <Reveal as="section" key={i} style={wrapStyle}>
              <div style={{
                display: "grid",
                gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr",
                columnGap: mob ? 0 : 18,
                rowGap: mob ? 14 : 0,
              }}>
                <PassageWatermarkedPhoto src={p.a.src} label={label} />
                <PassageWatermarkedPhoto src={p.b.src} label={label} />
                <PassageWatermarkedPhoto src={p.c.src} label={label} />
              </div>
            </Reveal>
          );
        }

        return (
          <Reveal as="section" key={i} style={wrapStyle}>
            <PassageWatermarkedPhoto src={p.src} label={label} />
          </Reveal>
        );
      })}
    </div>
  );
};

function useHashRoute() {
  const parse = () => (location.hash.replace(/^#\/?/, "") || "home");
  const [route, setRoute] = useAppState(parse());
  useAppEffect(() => {
    const onHash = () => {
      setRoute(parse());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (r) => { location.hash = "#/" + r; };
  return [route, go];
}

function Header({ route, go }) {
  const [top] = route.split("/");
  const mob = useIsMobile();
  const items = [
    { id: "home",                 label: "Home" },
    { id: "photography/passage",  label: "Photography", match: "photography" },
    { id: "performance",          label: "Performance" },
    { id: "about",                label: "About" },
    { id: "contact",              label: "Contact" },
  ];

  /* On mobile: insert a flex-break span before "About" (index 3) so the nav
     wraps intentionally as Home / Photography / Performance on line one,
     and About / Contact on line two — never a single isolated item. */
  const navChildren = items.map((it, idx) => {
    const active = top === (it.match || it.id.split("/")[0]) ||
                   (it.id === "home" && top === "home");
    return (
      <button key={it.id} onClick={() => go(it.id)} className={active ? "active" : ""}>
        <span className="printed--soft">{it.label}</span>
      </button>
    );
  });
  if (mob) {
    navChildren.splice(3, 0, <span key="nav-break" style={{ flexBasis: "100%", height: 0 }} />);
  }

  return (
    <header className="site">
      <div className="row">
        <button onClick={() => go("home")} className="stamp stamp--wordmark printed--stamp"
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          <span>vera sung</span>
          <span style={{
            fontFamily: "var(--mono-worn)", fontSize: 13,
            letterSpacing: "0.22em", textTransform: "none",
            color: "var(--ink)", opacity: 0.5,
            transform: "rotate(-0.35deg)",
          }}>宋 孟璇</span>
        </button>
        <nav className="primary">
          {navChildren}
        </nav>
        <span className="meta-right"></span>
      </div>
      <div className="crease"></div>
    </header>
  );
}

function Footer({ go }) {
  const footerTextStyle = { fontSize: 14, letterSpacing: "0.04em", textTransform: "none" };
  return (
    <footer className="site">
      <div className="meta printed--soft" style={footerTextStyle}>© 2026 Vera Sung. All rights reserved.</div>
      <div className="c">
        <button className="link meta printed--soft" onClick={() => go("contact")}
          style={footerTextStyle}>
          verasung_vs@gmail.com
        </button>
      </div>
      <div className="r">
        <a className="meta printed--soft" href="https://www.instagram.com/verasung_vs/"
           target="_blank" rel="noreferrer"
           style={{ ...footerTextStyle, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
               style={{ flexShrink: 0, opacity: 0.85 }} aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
          </svg>
          instagram
        </a>
      </div>
    </footer>
  );
}

function App() {
  const [route, go] = useHashRoute();
  const [top, sub] = route.split("/");

  /* Night Walks runs on the dark theme; everything else stays on warm paper. */
  useAppEffect(() => {
    const isNightWalks = top === "photography" && sub === "night-walks";
    document.body.classList.toggle("theme-dark", isNightWalks);
  }, [top, sub]);

  let body;
  switch (top) {
    case "photography": body = <PhotographyPage sub={sub} go={go} />; break;
    case "performance": body = <PerformancePage />; break;
    case "about":       body = <AboutPage go={go} />; break;
    case "cv":          body = <AboutPage go={go} />; break;
    case "links":       body = <AboutPage go={go} />; break;
    case "contact":     body = <ContactPage />; break;
    default:            body = <HomePage go={go} />;
  }

  return (
    <>
      <Header route={route} go={go} />
      {body}
      <Footer go={go} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
