/* global React, Card, CardHeader, Button, IconButton, Badge, Avatar, Divider, PageHeader, Icon */

// ---------------------------------------------------------------------------
// Data — 30 / 60 / 90 Day Plan · Diversified Botanics CoS
// ---------------------------------------------------------------------------
const timelineSections = [
  {
    id: "inventory",
    eyebrow: "Phase 01",
    range: "Days 1–14",
    title: "Operational Inventory",
    summary:
      "Before anything else: know what is actually in motion. Map every active initiative, surface every blocker, and identify every decision waiting for Ryan or Ari.",
    meta: { tasks: 5, owners: ["Chief of Staff", "All Functional Leads"] },
    items: [
      {
        date: "Day 01", day: "Mon",
        title: "Schedule functional leader one-on-ones",
        desc: "Block 30-minute sessions with every functional leader. Four questions each: What are you working on? What is blocked? What decision is waiting? What does Ryan or Ari need to approve?",
        owner: "Chief of Staff", tag: "Kickoff", status: "done",
      },
      {
        date: "Day 03", day: "Wed",
        title: "Cross-functional bottleneck assessment",
        desc: "Identify recurring founder escalations, unnecessary approval chains, coordination loops consuming executive bandwidth, and areas where teams lack decision authority.",
        owner: "Chief of Staff", tag: "Audit", status: "done",
      },
      {
        date: "Day 05", day: "Fri",
        title: "Master initiative register v1",
        desc: "First draft of every active project with named owner, defined outcome, target date, and current status. Shared with Ryan and Ari for gap identification.",
        owner: "Chief of Staff", tag: "Deliverable", status: "done",
      },
      {
        date: "Day 10", day: "Wed",
        title: "Escalation and decision rights framework",
        desc: "Document what decisions should not reach Ryan. Define authority thresholds by function, budget level, and risk tier. Start redirecting decisions immediately.",
        owner: "Chief of Staff", tag: "Framework", status: "done",
      },
      {
        date: "Day 14", day: "Tue",
        title: "Complete operational inventory delivered",
        desc: "Full initiative register, founder dependency map, identified bottlenecks, and first escalation framework delivered. This becomes the single source of truth from here forward.",
        owner: "Chief of Staff", tag: "Milestone", status: "done", pinned: true,
      },
    ],
  },
  {
    id: "rhythm",
    eyebrow: "Phase 02",
    range: "Days 7–21",
    title: "Operating Rhythm",
    summary:
      "Install the weekly cadence that replaces ad hoc escalations with predictable accountability moments. Founders stop being pulled into operational coordination.",
    meta: { tasks: 5, owners: ["Chief of Staff", "Ryan", "Ari"] },
    items: [
      {
        date: "Day 07", day: "Mon",
        title: "Monday Priority Reset launched",
        desc: "20-minute standing meeting with functional leads. Align on top 3 outcomes per function for the week. Run with initiative tracker open.",
        owner: "Chief of Staff", tag: "Cadence", status: "done",
      },
      {
        date: "Day 10", day: "Wed",
        title: "Wednesday Blocker Review launched",
        desc: "30-minute session for CoS + relevant leads. Surface and resolve blockers before they compound. Any blocker older than 5 days gets escalated.",
        owner: "Chief of Staff", tag: "Cadence", status: "done",
      },
      {
        date: "Day 14", day: "Fri",
        title: "Friday Accountability Pulse (async)",
        desc: "15-minute async format. All leads post committed vs. delivered update by noon. Exceptions and misses logged publicly in the initiative tracker.",
        owner: "All Leads", tag: "Cadence", status: "done",
      },
      {
        date: "Day 18", day: "Tue",
        title: "Founder dependency map complete",
        desc: "Decisions that should not be reaching Ryan or Ari documented. Transfer of operational coordination to CoS formally begins. Ryan's calendar cleared of status meetings.",
        owner: "Chief of Staff", tag: "Framework", status: "in-progress",
      },
      {
        date: "Day 21", day: "Fri",
        title: "First Monthly Leadership Review scheduled",
        desc: "60-minute monthly cadence with Ryan, Ari, CoS, and leads. Strategic progress, resource decisions, escalations only — not status reporting.",
        owner: "Chief of Staff", tag: "Milestone", status: "in-progress", pinned: true,
      },
    ],
  },
  {
    id: "knowledge",
    eyebrow: "Phase 03",
    range: "Days 14–60",
    title: "Knowledge Extraction",
    summary:
      "In a kava and kratom manufacturing company this is high-stakes. Identify the five highest-risk knowledge concentrations and begin systematic migration into documented, accessible systems.",
    meta: { tasks: 6, owners: ["Chief of Staff", "Functional Leads"] },
    items: [
      {
        date: "Day 14", day: "Tue",
        title: "Five knowledge risks identified",
        desc: "Identify five areas where critical operational or compliance knowledge lives in one person's head. Prioritize by regulatory and revenue exposure: KCPA landscape, FDA import alerts, kava hepatotoxicity requirements, supplier relationships, QA protocols.",
        owner: "Chief of Staff", tag: "Audit", status: "in-progress",
      },
      {
        date: "Day 21", day: "Fri",
        title: "Company-wide priority framework",
        desc: "KPI architecture documented. Ownership matrix (DRI model) live. Every function has measurable KPIs, targets, trends, and accountability owners.",
        owner: "Chief of Staff", tag: "Deliverable", status: "in-progress",
      },
      {
        date: "Day 30", day: "Mon",
        title: "30-day operational roadmap delivered",
        desc: "Tied to operating budget, forecast, goals, and KPIs. Implementation schedule with target improvements and outcomes for 30, 60, and 90 days. Shared with Ryan and Ari.",
        owner: "Chief of Staff", tag: "Milestone", status: "scheduled", pinned: true,
      },
      {
        date: "Day 45", day: "Wed",
        title: "Regulatory compliance knowledge documented",
        desc: "KCPA state tracker live. FDA alert watchlist active. Kava hepatotoxicity documentation requirements mapped. COA expiration tracking system in place.",
        owner: "Chief of Staff", tag: "Compliance", status: "scheduled",
      },
      {
        date: "Day 55", day: "Thu",
        title: "SOP documentation for top three risk areas",
        desc: "Standard operating procedures written and reviewed for the highest-risk workflows. Tribal knowledge begins moving into searchable, accessible systems.",
        owner: "Functional Leads", tag: "Documentation", status: "scheduled",
      },
      {
        date: "Day 60", day: "Fri",
        title: "60-day review — knowledge migration progress",
        desc: "All five knowledge concentrations documented or in active documentation. Dependency on any single individual for critical operational knowledge reduced measurably.",
        owner: "Chief of Staff", tag: "Review", status: "scheduled",
      },
    ],
  },
  {
    id: "systems",
    eyebrow: "Phase 04",
    range: "Days 60–90",
    title: "System Integration",
    summary:
      "Move from stabilization to infrastructure. Tier 1 systems connected, executive dashboard live, and automated reporting replacing manual assembly.",
    meta: { tasks: 5, owners: ["Chief of Staff", "Technology"] },
    items: [
      {
        date: "Day 62", day: "Mon",
        title: "Tier 1 system sync complete",
        desc: "Org ownership, system of accountability, and task tracking correlated across Salesforce, ClickUp/Asana, and QuickBooks. Automated reporting layer begins replacing manual data-pulling.",
        owner: "Chief of Staff", tag: "Integration", status: "scheduled",
      },
      {
        date: "Day 72", day: "Thu",
        title: "Executive visibility dashboard live",
        desc: "Four domains visible to Ryan in under two minutes: Financial Health (daily), Operational Throughput (daily), Commercial Health (weekly), Execution Health (weekly). Green / yellow / red only — drill-in on exceptions.",
        owner: "Chief of Staff", tag: "Deliverable", status: "scheduled",
      },
      {
        date: "Day 80", day: "Fri",
        title: "Weekly P&L automated summary",
        desc: "Weekly financial digest assembled and delivered automatically. Revenue by channel, gross margin by product line, cash position, AR aging. No manual compilation.",
        owner: "Chief of Staff", tag: "Automation", status: "scheduled",
      },
      {
        date: "Day 85", day: "Wed",
        title: "Meeting reduction plan executed",
        desc: "All standing meetings whose primary purpose was status reporting eliminated. Target: 30–50% reduction in meeting overhead. Recovered capacity goes to decisions, debate, and alignment.",
        owner: "Chief of Staff", tag: "Milestone", status: "scheduled",
      },
      {
        date: "Day 90", day: "Mon",
        title: "90-day retrospective and Month 3–9 plan",
        desc: "Full operating system review with Ryan and Ari. What stabilized, what still needs work, what the near-term AI buildout targets. Roadmap for internal knowledge agent and wholesale account health monitoring.",
        owner: "Ryan, Ari, CoS", tag: "Review", status: "scheduled", pinned: true,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Status visuals
// ---------------------------------------------------------------------------
const statusStyles = {
  done:          { dot: "var(--fg)",         ring: "var(--neutral-150)", label: "Done" },
  "in-progress": { dot: "var(--fg)",         ring: "var(--neutral-150)", label: "In progress", hollow: true },
  scheduled:    { dot: "var(--neutral-300)", ring: "var(--neutral-150)", label: "Scheduled" },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function Timeline() {
  const sectionRefs = React.useRef({});
  const [activeId, setActiveId] = React.useState(timelineSections[0].id);

  // Track which section is currently in view ------------------------------
  React.useEffect(() => {
    const scroller = document.querySelector("main");
    if (!scroller) return;

    const onScroll = () => {
      const scrollerTop = scroller.getBoundingClientRect().top;
      // The "current" section is the one whose top crossed an anchor line
      // just below the page header (offset ~120px).
      const anchor = scrollerTop + 140;
      let current = timelineSections[0].id;
      for (const sec of timelineSections) {
        const el = sectionRefs.current[sec.id];
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= anchor) current = sec.id;
      }
      setActiveId(prev => (prev === current ? prev : current));
    };

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const scroller = document.querySelector("main");
    const el = sectionRefs.current[id];
    if (!scroller || !el) return;
    const top =
      el.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop - 24;
    scroller.scrollTo({ top, behavior: "smooth" });
  };

  const totalTasks = timelineSections.reduce((n, s) => n + s.items.length, 0);
  const doneTasks = timelineSections.reduce(
    (n, s) => n + s.items.filter(i => i.status === "done").length, 0
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1400 }}>
      <PageHeader
        title="Timeline"
        subtitle="The full arc of the Forma rollout — what's shipped, what's in motion, and what's next."
        actions={
          <React.Fragment>
            <Button variant="ghost" size="sm" iconLeft="filter">Filter</Button>
            <Button variant="secondary" size="sm" iconLeft="download">Export</Button>
            <Button size="sm" iconLeft="plus">Add milestone</Button>
          </React.Fragment>
        }
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 300px",
        gap: 24,
        alignItems: "start",
      }}>
        {/* ----- Timeline column ------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingBottom: 80 }}>
          {timelineSections.map((sec, i) => (
            <TimelineSection
              key={sec.id}
              section={sec}
              isLast={i === timelineSections.length - 1}
              registerRef={(el) => { sectionRefs.current[sec.id] = el; }}
            />
          ))}
        </div>

        {/* ----- Sticky outline ------------------------------------- */}
        <div style={{ position: "sticky", top: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          <TimelineOutline
            sections={timelineSections}
            activeId={activeId}
            onJump={scrollToSection}
            totalTasks={totalTasks}
            doneTasks={doneTasks}
          />
          <PreAuditNote />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section block
// ---------------------------------------------------------------------------
function TimelineSection({ section, isLast, registerRef }) {
  return (
    <section
      ref={registerRef}
      data-section-id={section.id}
      style={{
        display: "grid",
        gridTemplateColumns: "72px 1fr",
        columnGap: 24,
        position: "relative",
      }}
    >
      {/* Left gutter — section marker + spine ------------------------ */}
      <div style={{ position: "relative" }}>
        {/* Spine */}
        <div style={{
          position: "absolute",
          left: "50%", top: 8, bottom: 0,
          width: 1, background: "var(--divider)",
          transform: "translateX(-50%)",
        }} />
        {/* Section marker */}
        <div style={{
          position: "relative", zIndex: 1,
          width: 12, height: 12,
          margin: "8px auto 0",
          background: "var(--surface)",
          border: "1px solid var(--fg)",
          borderRadius: 2,
        }} />
      </div>

      {/* Section header + tasks -------------------------------------- */}
      <div style={{ display: "flex", flexDirection: "column", paddingBottom: isLast ? 0 : 28 }}>
        {/* Header */}
        <header style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 2, paddingBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span className="eyebrow">{section.eyebrow}</span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)",
              color: "var(--fg-faint)", letterSpacing: "0",
            }}>{section.range}</span>
          </div>
          <h2 style={{
            fontSize: "var(--text-2xl)", fontWeight: 600,
            letterSpacing: "-0.025em", color: "var(--fg)",
          }}>{section.title}</h2>
          <p style={{
            fontSize: "var(--text-md)", color: "var(--fg-muted)",
            lineHeight: 1.55, maxWidth: 620,
          }}>{section.summary}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: "var(--text-xs)", color: "var(--fg-subtle)",
              fontVariantNumeric: "tabular-nums",
            }}>
              <Icon name="layout-dashboard" size={11} color="var(--fg-faint)" />
              {section.meta.tasks} items
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: "var(--text-xs)", color: "var(--fg-subtle)",
            }}>
              <Icon name="users" size={11} color="var(--fg-faint)" />
              {section.meta.owners.join(", ")}
            </span>
          </div>
        </header>

        {/* Task list */}
        <ul style={{
          listStyle: "none", margin: 0, padding: 0,
          display: "flex", flexDirection: "column", gap: 18,
        }}>
          {section.items.map((it, idx) => (
            <TimelineItem key={idx} item={it} />
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Individual task / activity row
// ---------------------------------------------------------------------------
function TimelineItem({ item }) {
  const s = statusStyles[item.status] || statusStyles.scheduled;

  return (
    <li style={{
      display: "grid",
      gridTemplateColumns: "64px 16px 1fr",
      columnGap: 14,
      alignItems: "start",
    }}>
      {/* Date */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "flex-end",
        paddingTop: 2,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)",
          color: "var(--fg-muted)", fontVariantNumeric: "tabular-nums",
          letterSpacing: 0, lineHeight: 1.2,
        }}>{item.date}</span>
        <span style={{
          fontSize: 10, color: "var(--fg-faint)",
          textTransform: "uppercase", letterSpacing: "0.06em",
          marginTop: 2,
        }}>{item.day}</span>
      </div>

      {/* Marker column */}
      <div style={{ position: "relative", height: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{
          width: 8, height: 8,
          marginTop: 6,
          borderRadius: 999,
          background: s.hollow ? "var(--surface)" : s.dot,
          border: `1px solid ${s.hollow ? "var(--fg)" : s.dot}`,
          boxShadow: item.pinned ? "0 0 0 3px var(--neutral-100)" : "none",
        }} />
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0, paddingBottom: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{
            fontSize: "var(--text-base)", fontWeight: 500,
            color: "var(--fg)", letterSpacing: "-0.005em",
          }}>{item.title}</span>
          {item.pinned && (
            <span style={{
              fontSize: 10, color: "var(--fg-faint)",
              textTransform: "uppercase", letterSpacing: "0.08em",
              fontWeight: 500,
            }}>· Pinned</span>
          )}
        </div>
        <p style={{
          fontSize: "var(--text-sm)", color: "var(--fg-subtle)",
          lineHeight: 1.5, maxWidth: 620, textWrap: "pretty",
        }}>{item.desc}</p>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          marginTop: 4, flexWrap: "wrap",
        }}>
          <span style={{
            fontSize: "var(--text-xs)", color: "var(--fg-subtle)",
          }}>{item.owner}</span>
          <span style={{ width: 2, height: 2, borderRadius: 999, background: "var(--fg-faint)" }} />
          <span style={{
            fontSize: "var(--text-xs)", color: "var(--fg-subtle)",
          }}>{item.tag}</span>
          <span style={{ width: 2, height: 2, borderRadius: 999, background: "var(--fg-faint)" }} />
          <span style={{
            fontSize: "var(--text-xs)", color: "var(--fg-faint)",
          }}>{s.label}</span>
        </div>
      </div>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Right-side outline card
// ---------------------------------------------------------------------------
function TimelineOutline({ sections, activeId, onJump, totalTasks, doneTasks }) {
  const pct = Math.round((doneTasks / totalTasks) * 100);

  return (
    <Card padding={18} style={{ display: "flex", flexDirection: "column" }}>
      <CardHeader
        eyebrow="Timeline outline"
        title="Jump to a phase"
        subtitle="Click any phase to scroll the timeline."
      />

      {/* Sections list */}
      <ol style={{
        listStyle: "none", margin: 0, padding: 0,
        display: "flex", flexDirection: "column",
        position: "relative",
      }}>
        {/* spine */}
        <div style={{
          position: "absolute",
          left: 11, top: 8, bottom: 8,
          width: 1, background: "var(--divider)",
        }} />

        {sections.map((sec, i) => {
          const active = sec.id === activeId;
          return (
            <li key={sec.id}>
              <button
                onClick={() => onJump(sec.id)}
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "22px 1fr auto",
                  gap: 10,
                  alignItems: "center",
                  textAlign: "left",
                  border: 0, background: "transparent", cursor: "pointer",
                  padding: "10px 8px 10px 0",
                  fontFamily: "var(--font-sans)",
                  borderRadius: "var(--radius-sm)",
                  transition: "background var(--dur) var(--ease-out)",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--neutral-50)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                {/* marker */}
                <span style={{
                  position: "relative", zIndex: 1,
                  width: 10, height: 10,
                  margin: "0 auto",
                  background: active ? "var(--fg)" : "var(--surface)",
                  border: `1px solid ${active ? "var(--fg)" : "var(--border-strong)"}`,
                  borderRadius: 2,
                  transition: "background var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)",
                }} />
                {/* label */}
                <span style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: "var(--text-base)",
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--fg)" : "var(--fg-muted)",
                    letterSpacing: "-0.005em",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{sec.title}</span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    color: "var(--fg-faint)",
                    fontVariantNumeric: "tabular-nums",
                  }}>{sec.range}</span>
                </span>
                {/* count */}
                <span style={{
                  fontSize: 10, color: "var(--fg-faint)",
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: "var(--font-mono)",
                  padding: "0 2px",
                }}>{String(sec.items.length).padStart(2, "0")}</span>
              </button>
              {i !== sections.length - 1 && (
                <div style={{ height: 0 }} />
              )}
            </li>
          );
        })}
      </ol>

      {/* Footer: progress */}
      <div style={{ height: 1, background: "var(--divider)", margin: "12px 0 14px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span className="eyebrow">Progress</span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)",
            color: "var(--fg-muted)", fontVariantNumeric: "tabular-nums",
          }}>{doneTasks}/{totalTasks} · {pct}%</span>
        </div>
        <div style={{
          height: 4, background: "var(--neutral-100)",
          borderRadius: 999, overflow: "hidden",
        }}>
          <div style={{
            width: `${pct}%`, height: "100%",
            background: "var(--fg)",
            transition: "width var(--dur-slow) var(--ease-out)",
          }} />
        </div>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Pre-audit disclaimer
// ---------------------------------------------------------------------------
function PreAuditNote() {
  return (
    <div style={{
      background: "var(--neutral-50)",
      border: "0.5px dashed var(--border-strong)",
      borderRadius: "var(--radius)",
      padding: "12px 14px",
      display: "grid",
      gridTemplateColumns: "16px 1fr",
      columnGap: 10,
      alignItems: "start",
    }}>
      <div style={{
        width: 16, height: 16, marginTop: 1,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "var(--fg-faint)",
      }}>
        <Icon name="file-text" size={12} color="var(--fg-faint)" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <span style={{
          fontSize: "var(--text-xs)", fontWeight: 500,
          textTransform: "uppercase", letterSpacing: "0.06em",
          color: "var(--fg-muted)",
        }}>Pre-audit note</span>
        <p style={{
          fontSize: "var(--text-sm)", color: "var(--fg-subtle)",
          lineHeight: 1.5, textWrap: "pretty",
        }}>
          This timeline is illustrative. Phases, dates, and priorities will be adjusted once the audit results are in.
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { Timeline });
