/* Vera Sung — site pages.
   Mono-first voice. Sentence-case prose. Tracked uppercase only on labels. */

const { useState: usePgState } = React;

/* Returns true when viewport width ≤ 900 px.
   Used to swap mobile-only inline-style values without touching desktop. */
function useIsMobile() {
  const [m, setM] = usePgState(window.innerWidth <= 900);
  React.useEffect(() => {
    const fn = () => setM(window.innerWidth <= 900);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
}

/* ============================== HOME ============================== */
function HomePage({ go }) {
  const mob = useIsMobile();
  return (
    <div className="page-enter col-narrow" data-screen-label="Home" style={{ paddingTop: 64 }}>

      {/* the opening photograph — alone, no label, no caption.
         Breaks out slightly wider than the column on desktop so it reads
         like a full-bleed photobook plate. */}
      {/* mobile: negative margin cancels the col-narrow 22px side padding → full-bleed */}
      <Reveal as="section" style={{
        margin: mob ? "0 -22px 48px" : "0 -12% 120px",
      }}>
        <Photo src="assets/drifting-01.jpg" aspect="3/2" />
      </Reveal>

      {/* the four projects — a quiet index, like an opening contents page.
          No dividing lines; titles printed with a heavy ink-bleed treatment,
          slightly under-inked (opacity) so they read like a worn stamp on
          uncoated paper. */}
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
              letterSpacing: "0.06em", textTransform: "uppercase",
              opacity: mob ? 0.80 : 1,
            }}>
              <LetterpressTitle text={pr.title} />
            </span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

/* ============================== PHOTOGRAPHY ============================== */
function PhotographyPage({ sub, go }) {
  const pid = sub || "passage";
  const pr = PROJECTS.find(p => p.id === pid) || PROJECTS[0];
  const mob = useIsMobile();

  return (
    <div className="page-enter col-narrow" data-screen-label={"Photography / " + pr.title} style={{ paddingTop: 48 }}>

      {/* sub-nav: projects label, then the four projects beneath as stacked items */}
      <div style={{
        paddingBottom: 18, borderBottom: "1px solid rgba(85,82,75,.10)",
        marginBottom: mob ? 16 : 25,
      }}>
        <div className="label printed--soft" style={{
          fontSize: 15, fontWeight: 700, color: "var(--ink)",
          marginBottom: mob ? 14 : 28, letterSpacing: "0.22em",
        }}>
          projects
        </div>
        <div style={mob ? {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px 20px",
          alignItems: "start",
        } : {
          display: "flex",
          flexWrap: "nowrap",
          gap: "0 40px",
          alignItems: "start",
        }}>
          {PROJECTS.map(p => {
            const active = p.id === pid;
            return (
              <button key={p.id} onClick={() => go("photography/" + p.id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "flex-start",
                  gap: mob ? 4 : 10,
                  textAlign: "left", paddingBottom: 0, border: 0,
                  width: mob ? "100%" : "auto",
                }}>
                <span style={{
                  fontFamily: "var(--mono-worn)",
                  fontSize: mob ? 9 : 11,
                  letterSpacing: "0.28em",
                }}>
                  <LetterpressTitle text={p.no} />
                </span>
                <span style={{
                  fontFamily: "var(--mono-worn)",
                  fontSize: mob ? 11 : 15,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  <LetterpressTitle text={p.title} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* title spread */}
      <section style={{ marginBottom: mob ? 40 : 96 }}>
        <div className="numeral printed--soft" style={{ marginBottom: 18, fontSize: 15 }}>series {pr.no}</div>
        <div className="stamp stamp--big printed--stamp" style={{ marginBottom: 32 }}>
          {pr.title}
        </div>
        {pr.id === "passage" ? (
          <div className="printed" style={{
            fontFamily: "var(--mono)",
            fontSize: mob ? 14 : 18,
            lineHeight: mob ? 1.55 : 1.75,
            color: "var(--ink-2)", maxWidth: 720,
            marginTop: mob ? 16 : 24,
          }}>
            <p style={{ margin: mob ? "0 0 8px" : "0 0 14px" }}>
              Around the vast sandy expanse of Mont-Saint-Michel, as the sea
              withdraws, people begin to step onto the sand, wandering,
              lingering, observing.
            </p>
            <p style={{ margin: mob ? "0 0 8px" : "0 0 14px" }}>
              They walk or drift, forming a circle, as if taking part in a
              brief ritual already on the verge of disappearing.
            </p>
            <p style={{ margin: mob ? "0 0 8px" : "0 0 14px" }}>
              On this stretch of sand, each day, there is a temporary moment
              in which we are allowed to walk here.
            </p>
            <p style={{ margin: mob ? "0 0 8px" : "0 0 14px" }}>
              When the time comes, the sea returns, rushing in or slowly
              spreading across the ground. The sand does not disappear, it
              is simply covered.
            </p>
            <p style={{ margin: 0 }}>
              Those who have stepped onto this sandy territory also move
              with the rhythm of nature, having briefly crossed this place.
            </p>
          </div>
        ) : pr.id === "night-walks" ? (
          <div className="printed" style={{
            fontFamily: "var(--mono)",
            fontSize: mob ? 14 : 18,
            lineHeight: mob ? 1.55 : 1.75,
            color: "var(--paper-light)", maxWidth: 720,
            marginTop: mob ? 16 : 24,
          }}>
            <p style={{ margin: mob ? "0 0 8px" : "0 0 14px" }}>
              Night walks in the American town of Wilson.
            </p>
            <p style={{ margin: mob ? "0 0 8px" : "0 0 14px" }}>
              Under the cover of darkness, I move forward, feeling as if
              nothing but a thin skin wraps around me.
            </p>
            <p style={{ margin: mob ? "0 0 8px" : "0 0 14px" }}>
              For nearly a month, my walking has been animal, instinctive,
              almost a premonition in motion.
            </p>
            <p style={{ margin: mob ? "0 0 8px" : "0 0 14px" }}>
              Look, someone slips quietly past that window. Strands of hair
              on the wooden floor, traces scattered by the watcher.
            </p>
            <p style={{ margin: 0 }}>
              Another day, night is about to fall again. Stepping once more
              into the unease and danger that darkness carries alters the
              rhythm of my breath and heartbeat, as if I could sense the
              tremors of what has yet to happen.
            </p>
          </div>
        ) : null}
      </section>

      <Rule />

      {/* the sequence — projects with a hand-composed `sequence` array use the
          bespoke editorial layout; older projects fall back to ProjectSequence. */}
      {pr.sequence && pr.sequence.length > 0
        ? <PassageSequence project={pr} />
        : <ProjectSequence project={pr} />
      }

      <NextProject current={pid} go={go} />
    </div>
  );
}

/* ============================== PASSAGE — bespoke editorial sequence ==========
   Each spread is hand-composed. No grid, no repeating cycle. Photographs are
   given asymmetric placement, generous whitespace, and only a quiet roman
   numeral / date in the running margin. Captions are absent on purpose —
   the design system favours the photograph speaking first.
=============================================================================*/
function PassageSequence({ project }) {
  const seq = project.sequence || [];
  const mob = useIsMobile();

  /* Plates share the same column width — no dramatic size differences.
     Vertical rhythm comes from gap variation; a few openings are wider.
     A `diptych` plate is a special row that shows two images side by side
     at half-column each.

     For Passage specifically, the whole sequence breaks out wider than the
     reading column so the photographs feel like full-bleed photobook plates.
     The opening plate (index 0) breaks out even further so it reads as the
     largest image in the series. */
  const gaps = [64, 64, 128, 64, 96, 64, 64, 144, 64];
  const isPassage = project.id === "passage";

  /* All Passage plates share the same breakout — consistent width throughout.
     Mobile breakouts are zeroed separately below. */
  const breakout = isPassage ? "-10%" : "0";
  const firstBreakout = breakout; // no size exception for the opening plate

  return (
    <div style={{ paddingTop: 40 }}>
      {seq.map((p, i) => {
        const isLast = i === seq.length - 1;
        /* Desktop Passage: fixed 96px gap — equal breathing space throughout.
           Mobile / other projects: original repeating gap array. */
        const baseGap = isLast ? 40 : (isPassage && !mob ? 96 : gaps[i % gaps.length]);
        const mb = (isPassage && !mob) ? baseGap : (baseGap + (p.extraGap || 0));

        const offset = mob ? "0" : (p.breakout || (i === 0 ? firstBreakout : breakout));
        const wrapStyle = { marginLeft: offset, marginRight: offset, marginBottom: mb };

        if (p.kind === "diptych") {
          return (
            <Reveal as="section" key={i} style={wrapStyle}>
              <div style={{
                display: "grid",
                gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
                columnGap: mob ? 0 : 18,
                rowGap: mob ? 14 : 0,
              }}>
                <Photo src={p.a.src} natural />
                <Photo src={p.b.src} natural />
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
                <Photo src={p.a.src} natural />
                <Photo src={p.b.src} natural />
                <Photo src={p.c.src} natural />
              </div>
            </Reveal>
          );
        }

        return (
          <Reveal as="section" key={i} style={wrapStyle}>
            <Photo src={p.src} natural />
          </Reveal>
        );
      })}
    </div>
  );
}

/* Editorial sequencing — varies pacing across plates.
   Pattern: solo hero → diptych-with-fragment → offset right → offset left → wide. */
function ProjectSequence({ project }) {
  const fragments = [
    "she returns to the same place, but the place has already moved.",
    "a gesture, half-finished. held in the air like a small bell.",
    "some afternoons the room remembers more than the body does.",
    "i am here, very briefly.",
    "to remain, without arriving.",
    "the photograph is a small permission.",
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      {project.plates.map((p, idx) => {
        const platForPhoto = p.kind === "real" ? { src: p.src } : { tone: p.tone };

        if (p.wide) {
          return (
            <Reveal key={idx} as="section" className="section" style={{ marginLeft: "-4%", marginRight: "-4%" }}>
              <div style={{ marginLeft: "4%", marginRight: "4%" }}>
                <SpreadHead n={p.n} place={p.y.toUpperCase()} />
              </div>
              <Photo {...platForPhoto} aspect="21/9" />
              <div style={{ marginLeft: "4%", marginRight: "4%", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Caption meta={p.y}>{p.t}</Caption>
                <span className="meta printed--soft">pg. {(idx + 1) * 2}</span>
              </div>
            </Reveal>
          );
        }

        const cycle = idx % 4;
        if (cycle === 0) {
          // Solo, centered, comfortable margins
          return (
            <Reveal key={idx} as="section" className="section">
              <SpreadHead n={p.n} place={p.y.toUpperCase()} />
              <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <Photo {...platForPhoto} aspect="3/2" />
                <Caption meta={p.y}>{p.t}</Caption>
              </div>
            </Reveal>
          );
        }
        if (cycle === 1) {
          // Photograph + caption column on the right with a fragment
          return (
            <Reveal key={idx} as="section" className="section">
              <SpreadHead n={p.n} place={p.y.toUpperCase()} />
              <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 36, alignItems: "flex-end" }}>
                <Photo {...platForPhoto} aspect="4/5" />
                <div style={{ paddingBottom: 12 }}>
                  <div className="cap printed" style={{ marginTop: 0, lineHeight: 1.6 }}>
                    {fragments[idx % fragments.length]}
                  </div>
                  <div className="cap-meta printed--soft" style={{ marginTop: 18 }}>{p.t}</div>
                  <div className="cap-meta printed--soft">{p.y}</div>
                </div>
              </div>
            </Reveal>
          );
        }
        if (cycle === 2) {
          // Photograph offset slightly right of center
          return (
            <Reveal key={idx} as="section" className="section">
              <SpreadHead n={p.n} place={p.y.toUpperCase()} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr 1fr", gap: 12 }}>
                <div></div>
                <Photo {...platForPhoto} aspect="3/2" />
                <div></div>
              </div>
              <div style={{ marginLeft: "16.66%", marginRight: "16.66%" }}>
                <Caption meta={p.y}>{p.t}</Caption>
              </div>
            </Reveal>
          );
        }
        // Diptych — photograph + a small toned echo
        return (
          <Reveal key={idx} as="section" className="section">
            <SpreadHead n={p.n} place={p.y.toUpperCase()} />
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, alignItems: "flex-end" }}>
              <Photo {...platForPhoto} aspect="4/5" />
              <Photo tone={PHOTO_TONES.light} aspect="1/1" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginTop: 12 }}>
              <Caption meta={p.y}>{p.t}</Caption>
              <Caption meta="echo">a quieter print, same afternoon.</Caption>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function NextProject({ current, go }) {
  const i = PROJECTS.findIndex(p => p.id === current);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  return (
    <Reveal style={{ marginTop: 120, paddingTop: 28, borderTop: "1px solid rgba(85,82,75,.10)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="label printed--soft">next series</span>
        <button onClick={() => go("photography/" + next.id)} style={{ textAlign: "right" }}>
          <span className="stamp stamp--page printed--stamp">{next.title}</span>
          <span className="label printed--soft" style={{ display: "block", marginTop: 10 }}>continue →</span>
        </button>
      </div>
    </Reveal>
  );
}

/* ============================== PERFORMANCE ============================== */
/* Irregular photo wall — original numbers (07, 12, …) preserved as labels so
   the artist can refer to specific frames. Mix of solo / diptych / triptych
   rows, with varied horizontal offsets, for a less linear flow. */
const P = (n) => ({ n: String(n).padStart(2, "0"), src: "assets/performance/p" + String(n).padStart(2, "0") + (n === 22 ? ".png" : ".jpg") });

/* Paired & triple rows use very narrow margins (x ~ 2, r ~ 2) so the photos
   sit large; solo rows vary widely to keep the page's irregular rhythm. */
const PERFORMANCE_ROWS = [
  { items: [P(7)],                x:  2, r:  2, gap: 110 },  /* large solo — full width */
  { items: [P(25), P(26)],        x:  2, r:  2, gap: 100 },  /* pair — large */
  { items: [P(31)],               x:  6, r:  8, gap: 120 },  /* large solo */
  { items: [P(5), P(13)],         x:  2, r:  2, gap: 100 },  /* pair */
  { items: [P(12)],               x:  2, r:  2, gap: 120 },  /* panoramic */
  /* image 08 (P19) deleted */
  { items: [P(20)],               x:  6, r:  8, gap: 120 },  /* large solo */
  { items: [P(4)],                x:  4, r:  8, gap: 110 },  /* large solo */
  { items: [P(6)],                x:  8, r:  4, gap: 120 },  /* large solo */
  /* images 11 + 12 — equal-size pairing, full available width */
  { items: [P(8), P(17)],         x:  0, r:  0, gap: 120, layout: "1fr 1fr" },
  { items: [P(1)],                x:  6, r:  8, gap: 120 },  /* large solo */
  { items: [P(3)],                x:  8, r:  6, gap: 120 },  /* large solo */
  /* image 15 — standalone large solo */
  { items: [P(23)],               x:  4, r:  6, gap: 110 },
  /* image 16 — standalone large solo, slight offset for rhythm */
  { items: [P(24)],               x:  6, r:  4, gap: 120 },
  { items: [P(11)],               x:  6, r: 10, gap: 120 },  /* large solo */
  { items: [P(39)],               x:  8, r:  6, gap: 120 },  /* large solo */
  { items: [P(14)],               x: 26, r: 26, gap: 110 },
  { items: [P(22)],               x:  6, r:  8, gap: 120 },  /* large solo */
  /* P17 removed from here (moved to pair with P8 above) → diptych */
  { items: [P(15), P(16)],        x:  2, r:  2, gap: 110 },  /* diptych — large */
  { items: [P(18)],               x: 10, r: 30, gap: 120 },
  /* images 25/26 swapped with 15/16: P9/P10 now occupy these positions */
  { items: [P(9)],                x:  4, r:  8, gap: 120 },  /* large solo */
  { items: [P(10)],               x:  8, r:  4, gap: 120 },  /* large solo */
  { items: [P(35)],               x:  6, r: 10, gap: 120 },  /* large solo */
  { items: [P(30)],               x: 14, r: 30, gap: 120 },
  { items: [P(28)],               x:  6, r:  8, gap: 120 },  /* large solo */
  { items: [P(27), P(32)],        x:  2, r:  2, gap: 100 },  /* pair — large */
  /* image 32 (P33): enlarged single — reduced margins for more presence */
  { items: [P(33)],               x:  2, r:  4, gap: 130 },  /* large solo — enlarged */
  { items: [P(29)],               x:  6, r: 10, gap: 120 },  /* large solo */
  /* image 34 (P36) deleted; P37 kept solo; image 36 (P38) as larger single */
  { items: [P(37)],               x:  8, r:  6, gap: 120 },  /* large solo */
  { items: [P(38)],               x:  2, r:  4, gap: 120 },  /* image 36 — enlarged single */
  /* three new photos — sewing machine scene solo, then intimate pair */
  { items: [P(40)],               x:  2, r:  2, gap: 120 },  /* new — theatrical scene */
  { items: [P(41), P(42)],        x:  2, r:  2, gap: 100 },  /* new — intimate pair */
  { items: [P(34)],               x:  6, r:  8, gap: 80 },   /* large solo — final */
];

function PhotoNum({ item }) {
  const mob = useIsMobile();
  return (
    <div style={{ display: "flex", gap: mob ? 5 : 12, alignItems: "flex-start" }}>
      <div className="printed--soft" style={{
        fontFamily: "var(--mono)",
        fontSize: mob ? 8 : 11,
        letterSpacing: "0.18em", color: "var(--ink-4)",
        width: mob ? 14 : 28, flexShrink: 0,
        paddingTop: mob ? 3 : 6,
        opacity: mob ? 0.35 : 1,
      }}>{item.n}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Photo src={item.src} natural />
      </div>
    </div>
  );
}

function PerformancePage() {
  const mob = useIsMobile();

  /* Renumber labels sequentially based on the current visual order. */
  let counter = 0;
  const numbered = PERFORMANCE_ROWS.map(row => ({
    ...row,
    items: row.items.map(it => ({ ...it, n: String(++counter).padStart(2, "0") })),
  }));

  return (
    <div className="page-enter" data-screen-label="Performance"
         style={{ paddingTop: 56, paddingLeft: "6vw", paddingRight: "6vw", maxWidth: 1600, margin: "0 auto" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
        paddingBottom: 14, borderBottom: "1px solid rgba(85,82,75,.10)",
        marginBottom: mob ? 40 : 80 }}>
        <span className="label printed--soft">III · performance · portfolio</span>
      </div>

      {numbered.map((row, i) => {
        const cols = row.items.length;
        /* Mobile: zero out the editorial left/right offsets so images use the
           full available width; compress vertical gaps to ~⅓ of desktop. */
        const mLeft  = mob ? 0 : row.x;
        const mRight = mob ? 0 : row.r;
        const mGap   = mob ? Math.round(row.gap * 0.33) : row.gap;
        return (
          <Reveal as="section" key={i} style={{
            marginBottom: mGap,
            marginLeft: mLeft + "%",
            marginRight: mRight + "%",
          }}>
            {cols === 1 ? (
              <PhotoNum item={row.items[0]} />
            ) : (
              <div style={{
                display: "grid",
                /* Mobile: all multi-image rows collapse to 1-col so each
                   image fills the available width and stays clearly legible */
                gridTemplateColumns: mob
                  ? "1fr"
                  : (row.layout || (cols === 2 ? "1fr 1fr" : "1fr 1fr 1fr")),
                columnGap: mob ? 8 : 24,
                rowGap: mob ? 24 : 0,
                alignItems: "start",
              }}>
                {row.items.map((it, j) => <PhotoNum key={j} item={it} />)}
              </div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

/* ============================== ABOUT ============================== */
function AboutPage({ go }) {
  const mob = useIsMobile();
  const links = [
    {
      label: "hans lucas",
      desc:  "French photojournalism agency photography works",
      href:  "https://hanslucas.com/vsung/photo",
    },
    {
      label: "verasung_vs",
      desc:  "Instagram",
      href:  "https://www.instagram.com/verasung_vs/",
    },
  ];
  const cvRows = (CV_GROUPS[0] && CV_GROUPS[0].rows) || [];

  return (
    <div className="page-enter col-wide" data-screen-label="About" style={{ paddingTop: 72 }}>

      {/* === Top: About title + portrait ============================= */}
      {/* Mobile: stack bio above portrait (single column) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "6fr 4fr",
        gap: mob ? 32 : 80,
        alignItems: "start",
      }}>
        <Reveal>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: mob ? 20 : 36,
          }}>
            <div className="label printed--soft" style={{
              fontSize: mob ? 13 : 18,
              letterSpacing: mob ? "0.12em" : "0.22em",
            }}>
              About
            </div>
            {mob && (
              <button
                onClick={() => document.getElementById("about-cv").scrollIntoView({ behavior: "smooth" })}
                className="printed--soft"
                style={{
                  fontFamily: "var(--mono)", fontSize: 13,
                  letterSpacing: "0.18em", color: "var(--ink-2)",
                  opacity: 0.88, textTransform: "uppercase",
                }}>
                cv ↓
              </button>
            )}
          </div>

          {/* Wordmark — same pattern as the top-left header */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
            <span className="stamp stamp--page printed--stamp">vera sung</span>
            <span style={{
              fontFamily: "var(--mono-worn)", fontSize: 15,
              letterSpacing: "0.22em", color: "var(--ink)", opacity: 0.5,
              transform: "rotate(-0.35deg)", display: "inline-block",
            }} className="printed--stamp">宋 孟璇</span>
          </div>

          {/* Biography */}
          <div className="printed" style={{
            fontFamily: "var(--mono)",
            fontSize: mob ? 14 : 17,
            lineHeight: mob ? 1.55 : 1.7,
            color: "var(--ink-2)",
            maxWidth: mob ? "100%" : 560,
            marginTop: mob ? 24 : 40,
            letterSpacing: mob ? "0.005em" : undefined,
          }}>
            <p style={{ margin: mob ? "0 0 10px" : "0 0 16px" }}>
              Born in Taiwan, Vera Sung lives and works between Taiwan and France.
            </p>
            <p style={{ margin: 0 }}>
              Rooted in her background in performance, her artistic practice
              explores the boundaries between presence and absence, the body
              and disappearance. Through gestures, traces, and scenes, she
              investigates the forms and memories of being there, and not
              being there.
            </p>
          </div>

          {/* Links */}
          <div style={{
            display: "flex", flexDirection: "column",
            gap: mob ? 20 : 30,
            maxWidth: mob ? "100%" : 560,
            marginTop: mob ? 36 : 56,
          }}>
            {links.map((it, i) => (
              <a key={i} href={it.href} target="_blank" rel="noreferrer"
                 style={{ display: "block", borderBottom: "none", paddingBottom: 0 }}>
                <div className="printed" style={{
                  fontFamily: "var(--mono)",
                  fontSize: mob ? 12 : 15,
                  color: "var(--ink-4)",
                  letterSpacing: ".02em", marginBottom: 6,
                }}>
                  {it.desc}
                </div>
                <div className="printed" style={{
                  fontFamily: "var(--mono)",
                  fontSize: mob ? 16 : 20,
                  color: "oklch(0.38 0.10 40)",
                  letterSpacing: ".03em", fontWeight: 500,
                }}>
                  {it.label} →
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ paddingTop: mob ? 0 : 8 }}>
            <Photo src="assets/vera-portrait-bw.jpg" natural />
          </div>
        </Reveal>
      </div>

      {/* === Divider ================================================= */}
      <div style={{ height: 1, background: "rgba(85,82,75,.14)", margin: mob ? "48px 0 32px" : "96px 0 56px" }}/>

      {/* === CV section — two columns ================================ */}
      <Reveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
          gap: mob ? 40 : 80,
          alignItems: "start",
        }}>

          {/* Left — Performance CV */}
          <div id="about-cv">
            <div className="stamp stamp--page printed--stamp" style={{ marginBottom: 36 }}>
              Performance CV
            </div>
            <Rule />
            {cvRows.map((r, i) => (
              <div key={i} className="cv">
                <div className="y printed--soft">{r[0]}</div>
                <div className="b printed">
                  <span className="role printed--soft">{r[1]}</span>
                  {r[2]}
                  <span className="meta">{r[3]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Photography CV (reserved space) */}
          <div>
            <div className="stamp stamp--page printed--stamp" style={{ marginBottom: 36 }}>
              Photography CV
            </div>
            <Rule />
            <div style={{ minHeight: 320 }} />
          </div>

        </div>
      </Reveal>
    </div>
  );
}

/* ============================== CV ============================== */
function CVPage() {
  return (
    <div className="page-enter col-narrow" data-screen-label="CV" style={{ paddingTop: 72 }}>

      <div className="label printed--soft" style={{ marginBottom: 18 }}>V · curriculum vitae</div>
      <div className="stamp stamp--page printed--stamp" style={{ marginBottom: 18 }}>vera · sung</div>
      <div className="printed" style={{ fontFamily: "var(--mono)", fontSize: 18, lineHeight: 1.65,
        color: "var(--ink-3)", maxWidth: 460, margin: "8px 0 80px" }}>
        a record of performances, residencies and improvisation work.<br/>
        updated 2024.
      </div>

      {CV_GROUPS.map(g => (
        <Reveal key={g.title} style={{ marginBottom: 96 }}>
          <div className="spread-head">
            <span className="numeral printed--soft">— {g.title}</span>
            <span className="numeral meta--ink printed--soft">{g.rows.length} entries</span>
          </div>
          <Rule />
          {g.rows.map((r, i) => (
            <div key={i} className="cv">
              <div className="y printed--soft">{r[0]}</div>
              <div className="b printed">
                <span className="role printed--soft">{r[1]}</span>
                {r[2]}
                <span className="meta">{r[3]}</span>
              </div>
            </div>
          ))}
        </Reveal>
      ))}

      <Reveal style={{ marginTop: 32, marginBottom: 64 }}>
        <span className="label printed--soft">— end of document</span>
      </Reveal>
    </div>
  );
}

/* ============================== LINKS ============================== */
function LinksPage() {
  const items = [
    {
      label: "hans lucas",
      desc:  "French photojournalism agency photography works",
      href:  "https://hanslucas.com/vsung/photo",
    },
    {
      label: "verasung_vs",
      desc:  "Instagram",
      href:  "https://www.instagram.com/verasung_vs/",
    },
  ];
  return (
    <div className="page-enter col-narrow" data-screen-label="Links" style={{ paddingTop: 72 }}>
      <div className="label printed--soft" style={{ marginBottom: 18 }}>VII · links</div>
      <div className="stamp stamp--page printed--stamp" style={{ marginBottom: 56 }}>elsewhere</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 36, maxWidth: 720 }}>
        {items.map((it, i) => (
          <a key={i} href={it.href} target="_blank" rel="noreferrer"
             style={{ display: "block", borderBottom: "none", paddingBottom: 0 }}>
            <div className="printed" style={{
              fontFamily: "var(--mono)", fontSize: 17, color: "var(--ink-3)",
              letterSpacing: ".02em", marginBottom: 6,
            }}>
              {it.desc}
            </div>
            <div className="printed" style={{
              fontFamily: "var(--mono)", fontSize: 17, color: "var(--ink)",
              letterSpacing: ".02em",
            }}>
              {it.label} →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ============================== CONTACT ============================== */
function ContactPage() {
  const [copied, setCopied] = usePgState(false);
  const mob = useIsMobile();
  const email = "verasung_vs@gmail.com";
  const copy = () => { navigator.clipboard?.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <div className="page-enter col-wide" data-screen-label="Contact" style={{ paddingTop: 72 }}>
      {/* Mobile: stack contact info above portrait (1 col).
          Desktop: side-by-side (1fr 1fr). */}
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
        gap: mob ? 40 : 96,
        alignItems: mob ? "start" : "center",
      }}>
        <Reveal>
          <div className="label printed--soft" style={{ marginBottom: 18 }}>VI · contact</div>

          {/* Inner grid — mobile: narrower label col so values never overflow */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mob ? "100px 1fr" : "160px 1fr",
            columnGap: mob ? 14 : 28,
            rowGap: mob ? 20 : 36,
            alignItems: "baseline",
            marginTop: mob ? 6 : 8,
          }}>
            <span className="meta printed--soft" style={{ fontSize: mob ? 10 : 14 }}>email</span>
            <button onClick={copy} className="printed" style={{
              fontFamily: "var(--mono)",
              fontSize: mob ? 13 : 18,
              color: "var(--ink)", letterSpacing: ".02em",
              borderBottom: "1px solid rgba(85,82,75,.18)", paddingBottom: 3, textAlign: "left",
            }}>
              {email}
              <span className="meta printed--soft" style={{
                marginLeft: mob ? 8 : 14,
                fontSize: mob ? 10 : 13,
                color: copied ? "var(--ink)" : "var(--ink-4)",
              }}>
                {copied ? "✓ copied" : "(click to copy)"}
              </span>
            </button>

            <span className="meta printed--soft" style={{ fontSize: mob ? 10 : 14 }}>instagram</span>
            <a href="https://www.instagram.com/verasung_vs/" target="_blank" rel="noreferrer" className="printed"
               style={{ fontFamily: "var(--mono)", fontSize: mob ? 13 : 18, color: "var(--ink-2)", letterSpacing: ".02em" }}>
              @verasung_vs
            </a>

            <span className="meta printed--soft" style={{ fontSize: mob ? 10 : 14 }}>
              {mob ? "press / agency" : "photojournalism works"}
            </span>
            <a href="https://hanslucas.com/vsung/photo" target="_blank" rel="noreferrer" className="printed"
               style={{ fontFamily: "var(--mono)", fontSize: mob ? 13 : 18, color: "var(--ink-2)", letterSpacing: ".02em" }}>
              hanslucas.com / vsung
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ paddingTop: mob ? 0 : 28 }}>
            <Photo src="assets/contact-portrait.jpg" natural />
            <div className="printed" style={{
              fontFamily: "var(--mono)",
              fontSize: mob ? 11 : 12,
              lineHeight: 1.7,
              color: "var(--ink-4)",
              maxWidth: mob ? "100%" : 380,
              marginTop: mob ? 20 : 56,
              letterSpacing: ".02em",
            }}>
              all photographs © vera sung.<br/>
              please write before reproducing any image.
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, PhotographyPage, PerformancePage, AboutPage, CVPage, LinksPage, ContactPage });
