/* global React, Card, CardHeader, Button, Badge, Icon, PageHeader,
          stack, phases, accents, automationDomains, healthCategories,
          orgRolePhases, personalDevAreas */

// ===========================================================================
// Small shared visual atoms
// ===========================================================================
function AccentRule({ tone = "neutral", style }) {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, top: 0,
      height: 2, background: accents[tone],
      ...style,
    }} />
  );
}

function LayerLabel({ children }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500,
      color: "var(--fg-faint)", textTransform: "uppercase",
      letterSpacing: "0.14em",
    }}>{children}</div>
  );
}

function MetaLine({ children }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 10,
      color: "var(--fg-faint)", marginTop: 6, letterSpacing: 0,
    }}>{children}</div>
  );
}

// Connector arrow between layers (subtle)
function Connector({ count = 1 }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${count}, 1fr)`,
      gap: 0, padding: "0 2px",
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px 0" }}>
          <div style={{ width: 1, height: 16, background: "var(--border)" }} />
        </div>
      ))}
    </div>
  );
}

// ===========================================================================
// Stack card primitives
// ===========================================================================
function StackCard({ title, accent = "neutral", italic, lines = [], meta, cadence, source, badge, children, compact, dense, style }) {
  if (compact) {
    return (
      <div
        className="qa-tile qa-tile--stack"
        style={{ "--qa-stack-accent": accents[accent] || accents.neutral, ...style }}
      >
        <div className="qa-tile__head">
          <span className="qa-tile__title">{title}</span>
          {badge && <span className="qa-tile__badge">{badge}</span>}
        </div>
        {italic && <p className="qa-tile__body" style={{ fontStyle: "italic", color: "var(--fg-faint)" }}>{italic}</p>}
        {lines.length > 0 && (
          <ul className="qa-tile__list">
            {lines.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        )}
        {children}
      </div>
    );
  }

  const pad = dense ? "10px 10px 8px" : "14px 14px 12px";
  const titleSize = dense ? "var(--text-xs)" : "var(--text-sm)";
  const lineSize = dense ? "var(--text-xs)" : "var(--text-sm)";

  return (
    <div
      className={`qa-stack-card${dense ? " qa-stack-card--dense" : ""}`}
      style={{
        position: "relative",
        background: "var(--surface)",
        border: "0.5px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: pad,
        display: "flex",
        flexDirection: "column",
        gap: dense ? 2 : 4,
        minHeight: 0,
        ...style,
      }}
    >
      <AccentRule tone={accent} />
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginTop: 2 }}>
        <span style={{
          fontSize: titleSize, fontWeight: 600,
          color: accents[accent], letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>{title}</span>
        {badge && <span style={{ fontSize: 10, color: "var(--fg-faint)", fontFamily: "var(--font-mono)" }}>{badge}</span>}
      </div>
      {italic && (
        <span style={{ fontSize: "var(--text-xs)", color: "var(--fg-faint)", fontStyle: "italic" }}>{italic}</span>
      )}
      {lines.length > 0 && (
        <ul style={{ listStyle: "none", margin: dense ? "2px 0 0" : "4px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: dense ? 2 : 3 }}>
          {lines.map((l, i) => (
            <li key={i} style={{ fontSize: lineSize, color: "var(--fg-muted)", lineHeight: 1.4 }}>{l}</li>
          ))}
        </ul>
      )}
      {children}
      {cadence && (
        <div style={{ marginTop: dense ? 4 : 8, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: accents[accent] }} />
          <span style={{ fontSize: "var(--text-xs)", color: "var(--fg-subtle)" }}>{cadence}</span>
        </div>
      )}
      {source && <MetaLine>{source}</MetaLine>}
      {meta && <MetaLine>{meta}</MetaLine>}
    </div>
  );
}

// ===========================================================================
// Layer renderers (one per shape pattern in the diagram)
// ===========================================================================
function SourcesLayer({ layer, dense }) {
  const gap = dense ? 8 : 10;
  const cols = dense ? "repeat(3, minmax(0, 1fr))" : "repeat(6, 1fr)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap }}>
      {layer.cards.map((c, i) => <StackCard key={i} dense={dense} {...c} />)}
    </div>
  );
}

function DashboardLayer({ layer, dense }) {
  const gap = dense ? 8 : 10;
  const cols = layer.cards.length >= 6 || dense
    ? "repeat(3, minmax(0, 1fr))"
    : "repeat(5, 1fr)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap }}>
      {layer.cards.map((c, i) => <StackCard key={i} dense={dense} {...c} />)}
    </div>
  );
}

function ETLLayer({ layer, dense }) {
  const gap = dense ? 8 : 10;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)", gap }}>
      {layer.splitCards.map((card, i) => (
        <ETLPanel key={i} dense={dense} {...card} />
      ))}
    </div>
  );
}

function ETLPanel({ title, accent, inner, footer, rules, dense }) {
  const pad = dense ? 10 : 14;
  return (
    <div
      className={`qa-stack-panel${dense ? " qa-stack-panel--dense" : ""}`}
      style={{
      position: "relative",
      background: "var(--surface)",
      border: "0.5px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: pad,
    }}>
      <AccentRule tone={accent} />
      <div style={{
        fontSize: dense ? "var(--text-xs)" : "var(--text-sm)", fontWeight: 600,
        color: accents[accent], letterSpacing: "0.04em",
        textTransform: "uppercase", marginTop: 2, marginBottom: dense ? 8 : 12,
      }}>{title}</div>

      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${inner.length}, 1fr)`,
        gap: dense ? 6 : 8,
      }}>
        {inner.map((p, i) => (
          <div key={i} style={{
            border: "0.5px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: dense ? "8px 8px 10px" : "10px 10px 12px",
            background: "var(--neutral-50)",
          }}>
            <div style={{ fontSize: dense ? "var(--text-xs)" : "var(--text-sm)", fontWeight: 600, color: "var(--fg)" }}>{p.name}</div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--fg-muted)", marginTop: dense ? 2 : 4, lineHeight: 1.4 }}>{p.sub}</div>
            {p.meta && <MetaLine>{p.meta}</MetaLine>}
          </div>
        ))}
      </div>

      {footer && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--fg-faint)" }}>{footer[0]}</span>
          {footer[1].map((chip, i) => (
            <span key={i} style={{
              fontSize: "var(--text-xs)", color: "var(--fg-muted)",
              padding: "2px 8px", background: "var(--neutral-100)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-mono)",
            }}>{chip}</span>
          ))}
        </div>
      )}

      {rules && (
        <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
          {rules.map((r, i) => (
            <li key={i} style={{ fontSize: "var(--text-xs)", color: "var(--fg-subtle)", fontStyle: "italic" }}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StoreLayer({ layer, dense }) {
  const gap = dense ? 8 : 10;
  const n = layer.threeCol?.length || 3;
  const cols = dense
    ? "minmax(0, 1fr)"
    : `repeat(${n}, minmax(0, 1fr))`;
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap }}>
      {layer.threeCol.map((card, i) => <StoreCard key={i} dense={dense} {...card} />)}
    </div>
  );
}

function StoreCard({ title, accent, sub, cols, rules, dense }) {
  const pad = dense ? 10 : 14;
  return (
    <div
      className={`qa-stack-panel${dense ? " qa-stack-panel--dense" : ""}`}
      style={{
      position: "relative",
      background: "var(--surface)",
      border: "0.5px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: pad,
    }}>
      <AccentRule tone={accent} />
      <div style={{
        fontSize: dense ? "var(--text-xs)" : "var(--text-sm)", fontWeight: 600,
        color: accents[accent], letterSpacing: "0.04em",
        textTransform: "uppercase", marginTop: 2,
      }}>{title}</div>
      <div style={{ fontSize: "var(--text-xs)", color: "var(--fg-faint)", fontStyle: "italic", marginTop: dense ? 2 : 4, marginBottom: dense ? 8 : 12 }}>{sub}</div>

      {cols && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: dense ? 6 : 8 }}>
          {cols.map((col, i) => (
            <div key={i} style={{
              border: "0.5px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 10px 12px",
              background: "var(--neutral-50)",
            }}>
              <div style={{
                fontSize: 10, fontWeight: 600, color: "var(--fg-muted)",
                textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6,
              }}>{col.name}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                {col.items.map((it, j) => (
                  <li key={j} style={{ fontSize: "var(--text-xs)", color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {rules && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
          {rules.map((r, i) => (
            <li key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 10px",
              background: "var(--neutral-50)",
              border: "0.5px solid var(--border)",
              borderRadius: "var(--radius-sm)",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: 999,
                background: r.tone === "negative" ? "var(--negative)" : "var(--warning)",
                flexShrink: 0,
              }} />
              <span style={{ fontSize: "var(--text-xs)", color: "var(--fg-muted)", flex: 1, fontFamily: "var(--font-mono)" }}>{r.rule}</span>
              <span style={{
                fontSize: 10, color: r.tone === "negative" ? "var(--negative)" : "var(--warning)",
                textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600,
              }}>{r.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AILayer({ layer, dense }) {
  const gap = dense ? 8 : 10;
  const cols = dense ? "minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 1.8fr)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap }}>
      {layer.splitCards.map((card, i) => (
        card.channels ? <ChannelsPanel key={i} dense={dense} {...card} /> : <ETLPanel key={i} dense={dense} {...card} />
      ))}
    </div>
  );
}

function ChannelsPanel({ title, accent, channels, dense }) {
  const pad = dense ? 10 : 14;
  const channelCols = dense ? "repeat(2, minmax(0, 1fr))" : "repeat(4, 1fr)";
  return (
    <div
      className={`qa-stack-panel${dense ? " qa-stack-panel--dense" : ""}`}
      style={{
      position: "relative",
      background: "var(--surface)",
      border: "0.5px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: pad,
    }}>
      <AccentRule tone={accent} />
      <div style={{
        fontSize: dense ? "var(--text-xs)" : "var(--text-sm)", fontWeight: 600,
        color: accents[accent], letterSpacing: "0.04em",
        textTransform: "uppercase", marginTop: 2, marginBottom: dense ? 8 : 12,
      }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: channelCols, gap: dense ? 6 : 8 }}>
        {channels.map((c, i) => (
          <div key={i} style={{
            border: "0.5px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 10px 12px",
            background: "var(--neutral-50)",
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name={c.icon} size={12} color="var(--fg-muted)" />
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--fg)" }}>{c.name}</span>
            </div>
            <ul style={{ listStyle: "none", margin: "2px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
              {c.lines.map((l, j) => (
                <li key={j} style={{ fontSize: "var(--text-xs)", color: "var(--fg-muted)", lineHeight: 1.45 }}>{l}</li>
              ))}
            </ul>
            <MetaLine>{c.meta}</MetaLine>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===========================================================================
// Main: stack diagram
// ===========================================================================
function StackDiagram({ dense }) {
  const layers = stack.map((layer, idx) => (
    <React.Fragment key={layer.id}>
      <StackLayer layer={layer} dense={dense} />
      {idx !== stack.length - 1 && (
        <div className={`qa-ref-stack-divider${dense ? " qa-ref-stack-divider--tight" : ""}`}>
          <div className="qa-ref-stack-divider__line" />
          <Icon name="chevron-down" size={dense ? 10 : 12} color="var(--fg-faint)" />
          <div className="qa-ref-stack-divider__line" />
        </div>
      )}
    </React.Fragment>
  ));

  if (dense) {
    return <div className="qa-ref-stack--plan90">{layers}</div>;
  }

  return (
    <div className="qa-ref-card">
      <div className="qa-ref-card__head">
        <span className="qa-ref-card__eyebrow">Operating intelligence stack</span>
      </div>
      <div className="qa-ref-card__body">{layers}</div>
    </div>
  );
}

function StackLayer({ layer, dense }) {
  return (
    <div className={`qa-ref-stack-layer${dense ? " qa-ref-stack-layer--tight" : ""}`}>
      <div>
        <div className="qa-ref-stack-layer__label">{layer.label}</div>
        {layer.note && <div className="qa-ref-stack-layer__note">{layer.note}</div>}
      </div>
      <div>
        {layer.id === "sources"   && <SourcesLayer layer={layer} dense={dense} />}
        {layer.id === "etl"       && <ETLLayer layer={layer} dense={dense} />}
        {layer.id === "store"     && <StoreLayer layer={layer} dense={dense} />}
        {layer.id === "dashboard" && <DashboardLayer layer={layer} dense={dense} />}
        {layer.id === "ai"        && <AILayer layer={layer} dense={dense} />}
      </div>
    </div>
  );
}

// ===========================================================================
// Where automation applies — domain cards
// ===========================================================================
const levelStyle = {
  "Fully automatable":  { fg: "var(--positive)", bg: "var(--positive-bg)" },
  "High leverage":      { fg: "var(--fg)",       bg: "var(--neutral-100)" },
  "Mostly automatable": { fg: "var(--fg-muted)", bg: "var(--neutral-100)" },
};

function AutomationDomains({ dense }) {
  return (
    <div className={dense ? "qa-ref-domains--plan90" : undefined}>
      {!dense && <p className="qa-ref-domain-section__label">Standard operations</p>}
      <div className={`qa-ref-domain-grid${dense ? " qa-ref-domain-grid--tight" : ""}`}>
        {automationDomains.map((d, i) => (
          <DomainCard key={d.id} domain={d} index={i} dense={dense} />
        ))}
      </div>
    </div>
  );
}

function DomainCard({ domain, index, dense }) {
  const tone = levelStyle[domain.level];

  return (
    <div className={`qa-ref-domain${dense ? " qa-ref-domain--tight" : ""}`}>
      <div className="qa-ref-domain__head">
        {dense ? (
          <div className="qa-ref-domain__title">{domain.title}</div>
        ) : (
          <>
            <div style={{ minWidth: 0 }}>
              <div className="qa-ref-domain__index">{String(index + 1).padStart(2, "0")}</div>
              <div className="qa-ref-domain__title">{domain.title}</div>
            </div>
            <span className="qa-domain__badge" style={{ color: tone.fg, background: tone.bg }}>
              {domain.level}
            </span>
          </>
        )}
      </div>

      <p className="qa-ref-domain__summary">{domain.summary}</p>

      {domain.groups ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {domain.groups.map((g, i) => (
            <DomainGroup key={i} label={g.label} items={g.items} />
          ))}
        </div>
      ) : (
        <DomainItems items={domain.items} />
      )}
    </div>
  );
}

function DomainGroup({ label, items }) {
  return (
    <div className="qa-ref-domain__group">
      <h4 className="qa-ref-domain__group-label">{label}</h4>
      <ul className="qa-tile__list">
        {items.map((it, j) => <li key={j}>{it}</li>)}
      </ul>
    </div>
  );
}

function DomainItems({ items }) {
  return (
    <ul className="qa-tile__list" style={{ borderTop: 0, paddingTop: 0 }}>
      {items.map((it, j) => <li key={j}>{it}</li>)}
    </ul>
  );
}

// ===========================================================================
// Administrative layer health
// ===========================================================================
function HealthGrid() {
  return (
    <div className="qa-ref-card">
      <div className="qa-ref-card__head">
        <span className="qa-ref-card__eyebrow">Core health lenses</span>
        <span className="qa-ref-card__meta">Four lenses · always-on</span>
      </div>
      <div className="qa-ref-health">
        {healthCategories.map((h, i) => (
          <HealthCard key={h.id} h={h} index={i} />
        ))}
      </div>
    </div>
  );
}

function HealthCard({ h, index }) {
  return (
    <div className="qa-ref-health__cell">
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        <span className="qa-bucket__dot" style={{ background: accents[h.accent] }} />
        <span className="qa-ref-health__index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="qa-ref-health__title">{h.title}</div>
      <span className="qa-ref-health__cadence">
        <Icon name="calendar" size={11} color="var(--fg-muted)" />
        {h.cadence}
      </span>
      <ul className="qa-tile__list">
        {h.items.map((it, j) => <li key={j}>{it}</li>)}
      </ul>
    </div>
  );
}

// ===========================================================================
// Systems evolution — assignment (shared Q&A layout with Approach)
// ===========================================================================
/* global QAPage, QASectionList, QAVisual, QAGrid, QATile, QAMatrix, QARefPage */

function DomainTile({ domain }) {
  const tone = levelStyle[domain.level];
  return (
    <div className="qa-tile">
      <div className="qa-tile__head">
        <span className="qa-tile__title">{domain.title}</span>
        <span className="qa-domain__badge" style={{ color: tone.fg, background: tone.bg }}>
          {domain.level}
        </span>
      </div>
      <p className="qa-tile__body">{domain.summary}</p>
      {domain.items && (
        <ul className="qa-tile__list">
          {domain.items.slice(0, 4).map((it, j) => <li key={j}>{it}</li>)}
        </ul>
      )}
    </div>
  );
}

function HealthTile({ h }) {
  return (
    <div className="qa-tile qa-tile--muted">
      <div className="qa-tile__head" style={{ alignItems: "center" }}>
        <span className="qa-bucket__dot" style={{ background: accents[h.accent] }} />
        <span className="qa-tile__title">{h.title}</span>
      </div>
      <span className="qa-tile__timeline">{h.cadence}</span>
      <ul className="qa-tile__list">
        {h.items.map((it, j) => <li key={j}>{it}</li>)}
      </ul>
    </div>
  );
}

function SystemsAnswerVisual({ visual }) {
  if (!visual) return null;

  if (visual.stackLayer) {
    const layer = stack.find((l) => l.id === visual.stackLayer);
    if (!layer) return null;
    const cols = visual.cols || Math.min(layer.cards?.length || 3, 3);
    return (
      <QAVisual label={`${layer.label} · architecture`} refText={visual.ref}>
        {layer.cards && (
          <QAGrid cols={cols}>
            {layer.cards.map((c, i) => <StackCard key={i} compact {...c} />)}
          </QAGrid>
        )}
        {layer.splitCards && visual.stackLayer === "etl" && (
          <QAGrid cols={2}>
            {layer.splitCards.map((card, i) => (
              <QATile
                key={i}
                title={card.title}
                className="qa-tile--stack"
                style={{ "--qa-stack-accent": accents[card.accent] }}
              >
                {card.inner.map((p, j) => (
                  <p key={j} className="qa-tile__body">
                    <strong>{p.name}</strong> — {p.sub}
                  </p>
                ))}
              </QATile>
            ))}
          </QAGrid>
        )}
        {layer.splitCards && visual.stackLayer === "ai" && (
          <QAGrid cols={2}>
            <QATile
              title={layer.splitCards[0].title}
              className="qa-tile--stack"
              style={{ "--qa-stack-accent": accents.orange }}
            >
              {layer.splitCards[0].inner.map((p, j) => (
                <p key={j} className="qa-tile__body">{p.name}: {p.sub}</p>
              ))}
            </QATile>
            <QAGrid cols={2}>
              {layer.splitCards[1].channels.map((c, j) => (
                <QATile key={j} muted title={c.name}>
                  {c.lines.slice(0, 2).map((l, k) => <p key={k} className="qa-tile__body">{l}</p>)}
                </QATile>
              ))}
            </QAGrid>
          </QAGrid>
        )}
      </QAVisual>
    );
  }

  if (visual.stackPath) {
    const layers = ["sources", "etl", "store", "dashboard", "ai"];
    return (
      <QAVisual label="Operating intelligence stack" refText="Full diagram → Architecture tab">
        <div className="qa-stack-path">
          {layers.map((id) => {
            const layer = stack.find((l) => l.id === id);
            if (!layer) return null;
            return (
              <div key={id} className="qa-stack-path__item">
                <div className="qa-stack-path__label">{layer.label}</div>
                <p className="qa-stack-path__note">{layer.note}</p>
              </div>
            );
          })}
        </div>
      </QAVisual>
    );
  }

  if (visual.domains) {
    const domains = automationDomains.filter((d) => visual.domains.includes(d.id));
    return (
      <QAVisual label="Domains · where it applies" refText={visual.ref}>
        <QAGrid cols={visual.cols || 2}>
          {domains.map((d) => <DomainTile key={d.id} domain={d} />)}
        </QAGrid>
      </QAVisual>
    );
  }

  if (visual.health) {
    return (
      <QAVisual
        label="Core health lenses · architecture"
        refText="Maps to dashboard modules (Financial, Operations, Commercial, Execution) + Compliance"
      >
        <QAGrid cols={2}>
          {healthCategories.map((h) => <HealthTile key={h.id} h={h} />)}
        </QAGrid>
      </QAVisual>
    );
  }

  if (visual.rolePhases) {
    return (
      <QAVisual
        label="Long-term role evolution"
        lead="The role becomes less about manually driving execution and more about designing systems that drive execution automatically."
      >
        <QAGrid cols={orgRolePhases.length <= 2 ? 2 : 3}>
          {orgRolePhases.map((p, i) => (
            <QATile key={i} className="qa-tile--phase">
              <span className="qa-tile__accent" style={{ background: p.accentColor }} />
              <div className="qa-tile__phase" style={{ color: p.accentColor }}>{p.phase}</div>
              <p className="qa-tile__body">{p.desc}</p>
              <ul className="qa-tile__list">
                {p.focus.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
            </QATile>
          ))}
        </QAGrid>
      </QAVisual>
    );
  }

  if (visual.personalDev) {
    return (
      <QAVisual
        label="Personal development areas"
        lead="Part operator, part systems engineer, part organizational architect — designing environments where execution is structurally easier, faster, and more intelligent."
      >
        <QAMatrix rows={personalDevAreas} />
      </QAVisual>
    );
  }

  if (visual.alerts) {
    const store = stack.find((l) => l.id === "store");
    const rules = store?.threeCol?.find((c) => c.rules)?.rules || [];
    return (
      <QAVisual label="Alert engine · data store">
        <div className="qa-alert">
          {rules.map((r, i) => (
            <div key={i} className="qa-alert__row">
              <span
                className="qa-alert__dot"
                style={{ background: r.tone === "negative" ? "var(--negative)" : "var(--warning)" }}
              />
              <span className="qa-alert__rule">{r.rule}</span>
            </div>
          ))}
        </div>
      </QAVisual>
    );
  }

  if (visual.cards) {
    return (
      <QAVisual label={visual.label}>
        <QAGrid cols={visual.cols || 3}>
          {visual.cards.map((c, i) => <StackCard key={i} compact {...c} />)}
        </QAGrid>
      </QAVisual>
    );
  }

  return null;
}

const EVOLUTION_SECTIONS = [
  {
    n: 1,
    title: "Organizational evolution",
    qa: [
      {
        q: "What operational functions or workflows would you prioritize automating first?",
        a: "Wire systems of record into one store, then layer reporting and exception alerts on top — not the reverse.",
        visuals: [
          { stackLayer: "sources", cols: 3 },
          { stackLayer: "etl", ref: "Scheduled + webhook sync → Architecture · ETL" },
          { domains: ["reporting", "inventory", "compliance"], cols: 3, ref: "Domain depth → Domains tab" },
        ],
      },
      {
        q: "What should remain highly human?",
        a: "Anything that sets direction, allocates capital, holds key relationships, or decides on people — AI supports, never substitutes.",
        visuals: [{
          label: "Human-owned",
          cols: 3,
          cards: [
            { title: "Judgment", accent: "neutral", lines: ["Strategy", "Capital", "Regulatory calls"] },
            { title: "Relationships", accent: "blue", lines: ["Partnerships", "Conflict", "Culture"] },
            { title: "Talent", accent: "neutral", lines: ["Hiring", "PIPs", "Org design"] },
          ],
        }],
      },
      {
        q: "What organizational bottlenecks do you think AI can realistically solve?",
        a: "Searchable ops memory, cross-system truth, and synthesized status — the work currently done in Slack threads and standing meetings.",
        visuals: [
          { domains: ["org-comms"], cols: 1 },
          { stackLayer: "ai", ref: "Digest + delivery → Architecture · AI layer" },
        ],
      },
    ],
  },
  {
    n: 2,
    title: "AI & systems thinking",
    qa: [
      {
        q: "Give examples of AI-enabled workflows, automations, dashboards, agents, or operational systems you would explore implementing.",
        a: "A single stack from sources through delivery — Snowflake at the center, six dashboard modules (including Agent Dashboard), Claude on top, Slack and email out.",
        visuals: [
          { stackPath: true },
          { stackLayer: "dashboard", cols: 3 },
        ],
      },
      {
        q: "Where do you believe AI creates the greatest leverage operationally?",
        a: "Exception-based visibility on a trusted data layer — leadership reads a two-minute brief and drills only where status is yellow or red.",
        visuals: [
          { health: true },
          { alerts: true },
        ],
      },
      {
        q: "Where do you think companies misuse AI operationally?",
        a: "Summaries without data, chatbots on broken workflows, and automation before ownership exists.",
        visuals: [{
          label: "Anti-patterns",
          cols: 3,
          cards: [
            { title: "No data layer", accent: "orange", lines: ["Strategy theater", "Untrusted summaries"] },
            { title: "Broken workflow", accent: "orange", lines: ["Chatbot on chaos", "Vanity dashboards"] },
            { title: "Wrong sequence", accent: "neutral", lines: ["Automate before Approach", "No single owner"] },
          ],
        }],
      },
    ],
  },
  {
    n: 3,
    title: "Visibility & decision-making",
    qa: [
      {
        q: "What data or operational visibility do you think leadership should have in real time?",
        a: "Four health lenses plus compliance — always agentic, never a wall of metrics. Drill in only on exceptions.",
        visuals: [
          { health: true },
          { stackLayer: "dashboard", cols: 3, ref: "Module detail → Architecture · Dashboard" },
        ],
      },
      {
        q: "How would you reduce reliance on meetings and manual status updates?",
        a: "Tracker for async truth, fixed weekly rhythm for coordination, automated digests for founders, decision rights so status meetings are not escalations.",
        visuals: [
          { domains: ["reporting", "org-comms"], cols: 2 },
          { stackLayer: "ai", ref: "Slack + email delivery → Architecture · AI layer" },
        ],
      },
    ],
  },
  {
    n: 4,
    title: "Long-term role evolution",
    qa: [
      {
        q: "As the company matures, how do you see this role changing?",
        a: "Three phases: execution engine (accountability infrastructure), systems architect (data + AI leverage), then organizational design at scale — with a natural path toward COO or Head of Strategy and Operations.",
        visuals: [{ rolePhases: true }],
      },
      {
        q: "Where do you think you would personally need to level up to succeed in the systems leadership phase?",
        a: "Deliberate development in technical AI fluency, org design for AI-first teams, and data strategy — invested in parallel with executing, not deferred.",
        visuals: [{ personalDev: true }],
      },
    ],
  },
];

function SystemsEvolutionIntro() {
  return (
    <QAPage>
      <QASectionList sections={EVOLUTION_SECTIONS} Visual={SystemsAnswerVisual} />
    </QAPage>
  );
}

// ===========================================================================
// Page
// ===========================================================================
function Automation() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 1400 }}>
      <PageHeader
        title="Systems"
        subtitle="Operating intelligence — narrative and role evolution. Architecture and automation domains live on the 90 Day Assessment."
      />
      <SystemsEvolutionIntro />
    </div>
  );
}

Object.assign(window, {
  Automation,
  SystemsStackDiagram: StackDiagram,
  SystemsAutomationDomains: AutomationDomains,
});
