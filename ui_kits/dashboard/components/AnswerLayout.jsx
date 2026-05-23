/* global React, Card, Icon */

// Shared Q&A layout for Approach + Systems · Answer tabs

function QAPage({ intro, children }) {
  return (
    <div className="qa-page">
      {intro && <p className="qa-intro">{intro}</p>}
      {children}
    </div>
  );
}

function QAAccordion({ n, title, open, onToggle, children }) {
  return (
    <div className="qa-accordion">
      <button
        type="button"
        className="qa-accordion__trigger"
        aria-expanded={open}
        onClick={onToggle}
      >
        <div className="qa-accordion__head">
          <span className="qa-accordion__num">{String(n).padStart(2, "0")}</span>
          <span className="qa-accordion__title">{title}</span>
        </div>
        <Icon name="chevron-down" size={18} className="qa-accordion__chevron" />
      </button>
      {open && <div className="qa-accordion__body">{children}</div>}
    </div>
  );
}

function QASectionList({ sections, defaultOpen = 1, Visual }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = (n) => setOpen((prev) => (prev === n ? null : n));

  return (
    <>
      {sections.map((sec) => (
        <QAAccordion
          key={sec.n}
          n={sec.n}
          title={sec.title}
          open={open === sec.n}
          onToggle={() => toggle(sec.n)}
        >
          <QAAnswerList items={sec.qa} Visual={Visual} />
        </QAAccordion>
      ))}
    </>
  );
}

function QAAnswerList({ items, Visual }) {
  return (
    <div className="qa-answers qa-answers--flat">
      {items.map((item, i) => (
        <div key={i} className="qa-question-block">
          <p className="qa-question">{item.q}</p>
          {item.a && <p className="qa-answer">{item.a}</p>}
          {item.visuals && item.visuals.length > 0 && Visual && (
            <div className="qa-visuals">
              {item.visuals.map((v, j) => <Visual key={j} visual={v} />)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function QAVisual({ label, lead, note, refText, children, flush }) {
  return (
    <div className={flush ? "qa-visual" : "qa-visual qa-visual--well"}>
      {label && <div className="qa-visual__label">{label}</div>}
      {lead && <p className="qa-visual__lead">{lead}</p>}
      {children}
      {note && <p className="qa-note">{note}</p>}
      {refText && <p className="qa-ref">{refText}</p>}
    </div>
  );
}

function QAPanel({ title, children }) {
  return (
    <div className="qa-panel">
      {title && <div className="qa-panel__title">{title}</div>}
      {children}
    </div>
  );
}

function QATable({ rows, inline }) {
  const body = rows.map((row, i) => (
    <div
      key={i}
      className={`qa-table__row${row.alert ? " qa-table__row--alert" : ""}`}
    >
      <div className="qa-table__label">{row.label}</div>
      <div className="qa-table__value">{row.value}</div>
    </div>
  ));
  if (inline) return body;
  return <div className="qa-panel">{body}</div>;
}

function QAGroup({ title, meta, rows, stacked }) {
  const body = (
    <>
      <div className="qa-group__head">
        <span className="qa-group__title">{title}</span>
        {meta && <span className="qa-group__meta">{meta}</span>}
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className={`qa-table__row${row.alert ? " qa-table__row--alert" : ""}`}
        >
          <div className="qa-table__label">{row.label}</div>
          <div className="qa-table__value">{row.value}</div>
        </div>
      ))}
    </>
  );
  if (stacked) {
    return <div className="qa-group qa-group--stacked">{body}</div>;
  }
  return <div className="qa-panel">{body}</div>;
}

function QAGrid({ cols = 3, children }) {
  const mod = cols === 2 ? "qa-grid--2" : cols === 3 ? "qa-grid--3" : "";
  return <div className={`qa-grid ${mod}`.trim()}>{children}</div>;
}

function QATile({ kicker, badge, title, body, muted, className, style, children }) {
  return (
    <div
      className={`qa-tile${muted ? " qa-tile--muted" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {(kicker || badge) && (
        <div className="qa-tile__head">
          {kicker && <span className="qa-tile__kicker">{kicker}</span>}
          {badge && <span className="qa-tile__badge">{badge}</span>}
        </div>
      )}
      {title && <div className="qa-tile__title">{title}</div>}
      {body && <p className="qa-tile__body">{body}</p>}
      {children}
    </div>
  );
}

function QABucketGrid({ lead, buckets }) {
  return (
    <QAVisual label="Leadership leverage model" lead={lead}>
      <div className="qa-buckets">
        {buckets.map((b, i) => (
          <div key={i} className="qa-bucket">
            <div className="qa-bucket__title">
              <span className="qa-bucket__dot" style={{ background: b.dotColor }} />
              {b.title}
            </div>
            <ul className="qa-bucket__list">
              {b.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </QAVisual>
  );
}

function QAPanelStack({ children }) {
  return <div className="qa-panel qa-panel--stack">{children}</div>;
}

function QASplit({ children }) {
  return <div className="qa-split">{children}</div>;
}

function QASplitCol({ title, children }) {
  return (
    <div className="qa-split__col">
      {title && <div className="qa-split__title">{title}</div>}
      {children}
    </div>
  );
}

function QARefPage({ intro, children }) {
  return (
    <div className="qa-ref-page">
      {intro && <p className="qa-intro">{intro}</p>}
      {children}
    </div>
  );
}

function QAMatrix({ rows }) {
  return (
    <div className="qa-panel">
      {rows.map((row, i) => (
        <div key={i} className="qa-matrix__row">
          <div className="qa-matrix__cell qa-matrix__cell--label">{row.area}</div>
          <div className="qa-matrix__cell">
            <span className="qa-matrix__sub">Why it matters</span>
            <p className="qa-matrix__text">{row.why}</p>
          </div>
          <div className="qa-matrix__cell">
            <span className="qa-matrix__sub">Approach</span>
            <p className="qa-matrix__text">{row.approach}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  QAPage,
  QAAccordion,
  QASectionList,
  QAAnswerList,
  QAVisual,
  QAPanel,
  QATable,
  QAGroup,
  QAGrid,
  QATile,
  QABucketGrid,
  QAMatrix,
  QAPanelStack,
  QASplit,
  QASplitCol,
  QARefPage,
});
