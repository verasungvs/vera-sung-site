/* App shell — sticky header with stamped wordmark + mono nav, hash routing. */
const { useEffect: useAppEffect, useState: useAppState } = React;

/* ================================================================
   QUICK EDIT PANEL
   For most future homepage / LE PASSAGE visual adjustments, edit
   ONLY the values in this block. No component rewrite is needed.
   ================================================================ */
const SITE = {
  cacheVersion: "20260815-footer-bottom-26",
  home: {
    images: [
      {
        src: "assets/home-passage-2026.jpg",
        alt: "LE PASSAGE, 2026",
        scale: 0.94,
      },
    ],
    fadeDuration: 10000,
    link: "photography/",
    desktopWidth: "88%",
    mobileWidth: "100%",
    maxWidth: 900,
    desktopBottomGap: 320,
    mobileBottomGap: 48,
    watermark: "LE PASSAGE, 2026",
    watermarkDesktopSize: 11,
    watermarkMobileSize: 9,
    watermarkOpacity: 0.40,
  },
  passage: {
    desktopWidth: "90%",
    mobileWidth: "100%",
    webImageWidth: 1100,
    webImageQuality: 74,
    first2026Positions: 6,
    watermark2026: "© Vera Sung · LE PASSAGE, 2026",
    watermark2023: "© Vera Sung · LE PASSAGE, 2023",
    watermarkSize: 9,
    watermarkOpacity: 0.58,
    desktopGap: 96,
  },
};

const LegacyPassageSequence = PassageSequence;

const passageWebSrc = (src) =>
  `/.netlify/images?url=/${src}&w=${SITE.passage.webImageWidth}&fm=jpg&q=${SITE.passage.webImageQuality}`;

function VisibleNaturalPhoto({ src, style }) {
  const noSave = e => { e.preventDefault(); e.stopPropagation(); };
  return (
    <div
      style={{ position: "relative", width: "100%", overflow: "hidden", lineHeight: 0, ...(style || {}) }}
      onContextMenu={noSave}
      onDragStart={noSave}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserDrag: "none",
          WebkitTouchCallout: "none",
        }}
      />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 5 }} onContextMenu={noSave} />
    </div>
  );
}

function PassageWatermarkedPhoto({ src, label }) {
  return (
    <div style={{ position: "relative" }}>
      <VisibleNaturalPhoto src={passageWebSrc(src)} />
      <span aria-hidden="true" style={{
        position: "absolute",
        right: 10,
        bottom: 8,
        zIndex: 12,
        pointerEvents: "none",
        fontFamily: "var(--mono)",
        fontSize: SITE.passage.watermarkSize,
        letterSpacing: "0.10em",
        color: `rgba(255,255,255,${SITE.passage.watermarkOpacity})`,
        textShadow: "0 1px 2px rgba(0,0,0,.28)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </div>
  );
}

HomePage = function HomePage2026({ go }) {
  const mob = useIsMobile();
  const [showFirst, setShowFirst] = useAppState(false);
  const [dimFirst, setDimFirst] = useAppState(false);
  const first = SITE.home.images[0];

  useAppEffect(() => {
    const mainTimer = window.setTimeout(() => setShowFirst(true), 50);
    const dimTimer = window.setTimeout(() => setDimFirst(true), 13050);
    return () => {
      window.clearTimeout(mainTimer);
      window.clearTimeout(dimTimer);
    };
  }, []);

  return (
    <div className="page-enter col-narrow" data-screen-label="Home" style={{ paddingTop: mob ? 80 : 190 }}>
      <section style={{
        position: "relative",
        width: mob ? "103vw" : "100vw",
        maxWidth: 1180,
        aspectRatio: "3 / 2",
        left: "50%",
        transform: "translateX(-50%)",
        margin: mob
          ? `0 0 ${SITE.home.mobileBottomGap}px`
          : `0 0 ${SITE.home.desktopBottomGap}px`,
      }}>
        <div
          onClick={() => go(SITE.home.link)}
          role="link"
          tabIndex={0}
          aria-label="Open Le Passage"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              go(SITE.home.link);
            }
          }}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "visible",
            cursor: "pointer",
            outline: "none",
            lineHeight: 0,
          }}
        >
          <img
            src={`${first.src}?v=${SITE.cacheVersion}`}
            alt={first.alt}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              display: "block",
              width: "auto",
              height: "100%",
              objectFit: "contain",
              background: "transparent",
              opacity: dimFirst ? 0.6 : (showFirst ? 1 : 0.08),
              transition: `opacity ${SITE.home.fadeDuration}ms ease-in-out`,
              transform: "translateX(-50%)",
              pointerEvents: "none",
              userSelect: "none",
              WebkitUserDrag: "none",
              WebkitTouchCallout: "none",
            }}
          />
          <div
            aria-hidden="true"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 8,
              WebkitTouchCallout: "none",
              userSelect: "none",
            }}
          />
        </div>
      </section>

    </div>
  );
};

PassageSequence = function PassageSequence2026({ project }) {
  if (project.id !== "passage") return <LegacyPassageSequence project={project} />;

  const seq = project.sequence || [];
  const mob = useIsMobile();
  const gaps = [64, 64, 128, 64, 96, 64, 64, 144, 64];

  return (
    <div style={{ paddingTop: 40 }}>
      {seq.map((p, i) => {
        const isLast = i === seq.length - 1;
        const baseGap = isLast ? 40 : (!mob ? SITE.passage.desktopGap : gaps[i % gaps.length]);
        const mb = !mob ? baseGap : (baseGap + (p.extraGap || 0));
        const label = i < SITE.passage.first2026Positions
          ? SITE.passage.watermark2026
          : SITE.passage.watermark2023;
        const width = mob ? SITE.passage.mobileWidth : SITE.passage.desktopWidth;
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
  const [photoMenuOpen, setPhotoMenuOpen] = useAppState(false);
  const items = [
    { id: "home", label: "Home" },
    { id: "photography/passage", label: "Photography", match: "photography" },
    { id: "performance", label: "Performance" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const projectMenu = !mob && photoMenuOpen && (
    <div
      role="menu"
      aria-label="Photography projects"
      onMouseEnter={() => setPhotoMenuOpen(true)}
      onMouseLeave={() => setPhotoMenuOpen(false)}
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 390,
        padding: "20px 24px 22px",
        background: "rgba(250, 248, 242, 0.70)",
        border: "1px solid rgba(85,82,75,.10)",
        boxShadow: "0 12px 30px rgba(70,62,50,.05)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        zIndex: 40,
      }}
    >
      {PROJECTS.map(pr => (
        <button
          key={pr.id}
          role="menuitem"
          onClick={() => {
            setPhotoMenuOpen(false);
            go("photography/" + pr.id);
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "44px 1fr",
            alignItems: "baseline",
            columnGap: 18,
            width: "100%",
            padding: "5px 0",
            transition: "padding-left .8s var(--ease), opacity .8s var(--ease)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.paddingLeft = "6px";
            e.currentTarget.style.opacity = "0.72";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.paddingLeft = "0";
            e.currentTarget.style.opacity = "1";
          }}
        >
          <span style={{
            fontFamily: "var(--mono-worn)",
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "var(--ink-3)",
          }}>
            <LetterpressTitle text={pr.no} />
          </span>
          <span style={{
            fontFamily: "var(--mono-worn)",
            fontSize: 15,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            <LetterpressTitle text={pr.title} />
          </span>
        </button>
      ))}
    </div>
  );

  const navChildren = items.map((it) => {
    const active = top === (it.match || it.id.split("/")[0]) || (it.id === "home" && top === "home");
    if (it.match === "photography" && !mob) {
      return (
        <div
          key={it.id}
          style={{ position: "relative", display: "flex", alignItems: "baseline" }}
          onMouseEnter={() => setPhotoMenuOpen(true)}
          onMouseLeave={() => setPhotoMenuOpen(false)}
        >
          <button
            onClick={() => go(it.id)}
            className={active ? "active" : ""}
            aria-haspopup="menu"
            aria-expanded={photoMenuOpen}
          >
            <span className="printed--soft">{it.label}</span>
          </button>
          {projectMenu}
        </div>
      );
    }
    return (
      <button key={it.id} onClick={() => go(it.id)} className={active ? "active" : ""}>
        <span className="printed--soft">{it.label}</span>
      </button>
    );
  });

  if (mob) navChildren.splice(3, 0, <span key="nav-break" style={{ flexBasis: "100%", height: 0 }} />);

  return (
    <header className="site">
      <div className="row">
        <button onClick={() => go("home")} className="stamp stamp--wordmark printed--stamp"
                style={{
                  display: "flex",
                  flexDirection: mob ? "row" : "column",
                  alignItems: mob ? "baseline" : "flex-start",
                  gap: mob ? 10 : 1,
                  opacity: 0.68,
                }}>
          <span style={{ fontSize: mob ? 16 : undefined }}>vera sung</span>
          <span style={{
            fontFamily: "var(--mono-worn)", fontSize: mob ? 9 : 13,
            letterSpacing: mob ? "0.12em" : "0.22em", textTransform: "none",
            color: "var(--ink)", opacity: 0.5,
            transform: "rotate(-0.35deg)",
            whiteSpace: "nowrap",
          }}>宋 孟璇</span>
        </button>
        <nav className="primary">{navChildren}</nav>
        <span className="meta-right"></span>
      </div>
      <div className="crease"></div>
    </header>
  );
}

function Footer({ go, compact = false }) {
  const mob = useIsMobile();
  const compactStyle = compact
    ? (mob ? { marginTop: 38, minHeight: "220px", padding: "0 22px 8px", rowGap: 0, alignContent: "end" } : { paddingBottom: 24 })
    : undefined;
  const footerTextStyle = {
    fontSize: 14,
    letterSpacing: "0.04em",
    textTransform: "none",
    lineHeight: mob && compact ? 1.25 : undefined,
  };
  return (
    <footer className="site" style={compactStyle}>
      <div className="meta printed--soft" style={footerTextStyle}>© 2026 Vera Sung. All rights reserved.</div>
      <div className="c">
        <button className="link meta printed--soft" onClick={() => go("contact")} style={footerTextStyle}>
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

  useAppEffect(() => {
    const isNightWalks = top === "photography" && sub === "night-walks";
    document.body.classList.toggle("theme-dark", isNightWalks);
  }, [top, sub]);

  let body;
  switch (top) {
    case "photography": body = <PhotographyPage sub={sub} go={go} />; break;
    case "performance": body = <PerformancePage />; break;
    case "about": body = <AboutPage go={go} />; break;
    case "cv": body = <AboutPage go={go} />; break;
    case "links": body = <AboutPage go={go} />; break;
    case "contact": body = <ContactPage />; break;
    default: body = <HomePage go={go} />;
  }

  return (
    <>
      <Header route={route} go={go} />
      {body}
      <Footer go={go} compact={top === "home"} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);