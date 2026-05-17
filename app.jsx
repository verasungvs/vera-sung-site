/* App shell — sticky header with stamped wordmark + mono nav, hash routing. */
const { useEffect: useAppEffect, useState: useAppState } = React;

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
