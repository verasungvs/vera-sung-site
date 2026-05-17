/* Vera Sung — shared components.
   All type uses the design-system classes (.label, .meta, .stamp, .printed). */
const { useEffect, useRef, useState } = React;

/* Single photograph slot. Either a real <img> or a toned placeholder
   composed of layered CSS gradients. Grain overlay always applied.
   When `natural` is true (or no aspect is given for a real src),
   the image keeps its own intrinsic ratio — no cropping. */
function Photo({ src, tone, aspect, natural, style, alt = "" }) {
  const useNatural = natural || (src && !aspect);
  const baseStyle = useNatural
    ? { background: src ? "transparent" : tone, ...style }
    : { aspectRatio: aspect || "4/5", background: src ? "var(--paper-bone)" : tone, ...style };

  const noSave = e => { e.preventDefault(); e.stopPropagation(); };

  return (
    <div className="vs-photo" style={baseStyle}
         onContextMenu={noSave} onDragStart={noSave}>
      {src && (
        useNatural
          ? <img src={src} alt={alt} draggable={false} onContextMenu={noSave} onDragStart={noSave}
                 style={{ display: "block", width: "100%", height: "auto" }} />
          : <img src={src} alt={alt} draggable={false} onContextMenu={noSave} onDragStart={noSave} />
      )}
      <div className="grain"></div>
    </div>
  );
}

/* The running spread head — a numeral on the left, a place-and-date on the right.
   Sits above a photograph or a group of photographs. */
function SpreadHead({ n, place, right }) {
  return (
    <div className="spread-head">
      <span className="numeral printed--soft">{n}</span>
      <span className="numeral meta--ink printed--soft">{place || right}</span>
    </div>
  );
}

/* Caption block — mono, faded. Sits under a photograph aligned to its left edge. */
function Caption({ children, meta, align = "left" }) {
  return (
    <div style={{ textAlign: align, display: "flex", flexDirection: "column", alignItems: align === "right" ? "flex-end" : "flex-start" }}>
      <div className="cap printed">{children}</div>
      {meta && <div className="cap-meta printed--soft">{meta}</div>}
    </div>
  );
}

/* Reveal-on-scroll wrapper — IntersectionObserver, slow fade. */
function Reveal({ children, delay = 0, as: As = "div", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("in"), delay); io.disconnect(); }
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <As ref={ref} className="reveal" {...rest}>{children}</As>;
}

/* A horizontal line in the design-system rule style. */
function Rule({ style }) { return <hr className="rule" style={style} />; }

/* Letterpress title — splits a string into chars, gives each a deterministic
   tiny rotation and y-offset so the line reads as hand-pressed type that
   was set just a touch out of alignment. The `.letterpress` CSS class on
   the parent supplies the layered ink-bleed text-shadow + soft blur. */
function LetterpressTitle({ text, style }) {
  /* Deterministic pseudo-random based on index, so the layout is stable
     across renders but feels organic per-character. */
  const jitter = i => {
    const a = ((i * 9301 + 49297) % 233280) / 233280;
    const b = ((i * 7349 + 12347) % 233280) / 233280;
    return {
      dy:  (a - 0.5) * 1.6,   /* ±0.8 px */
      rot: (b - 0.5) * 1.4,   /* ±0.7 deg */
      op:  0.86 + a * 0.14,   /* 0.86 – 1.00 — slight ink density variation */
    };
  };
  return (
    <span className="letterpress" style={style}>
      {[...text].map((ch, i) => {
        if (ch === " ") return <span key={i} style={{ whiteSpace: "pre" }}>{" "}</span>;
        const j = jitter(i);
        return (
          <span key={i} style={{
            transform: `translateY(${j.dy.toFixed(2)}px) rotate(${j.rot.toFixed(2)}deg)`,
            opacity: j.op,
          }}>{ch}</span>
        );
      })}
    </span>
  );
}

Object.assign(window, { Photo, SpreadHead, Caption, Reveal, Rule, LetterpressTitle });
