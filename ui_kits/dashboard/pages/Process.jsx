/* global React, leadershipBuckets, coordinationMechanisms,
   QAPage, QASectionList, QAVisual, QAPanel, QATable, QAGrid, QATile, QABucketGrid, QAGroup, QAPanelStack, QASplit, QASplitCol */

const observations = [
  "Multiple initiatives active at once",
  "Leaders busy; execution visibility inconsistent",
  "Projects stall when ownership is unclear",
  "Ryan and Ari outpace the org’s operating rhythm",
  "Heavy manual coordination and Slack",
  "AI tools adopted inconsistently",
  "Critical knowledge lives in people, not systems",
];

const priorities = [
  {
    n: 1,
    range: "Days 1–14",
    title: "Operational inventory & initiative mapping",
    why: "You cannot enforce accountability against invisible commitments.",
    stabilize: "One master register: every active project, owner, outcome, date, status.",
    how: "Leader 1:1s — four questions: working on, blocked, decision waiting, founder approval needed.",
  },
  {
    n: 2,
    range: "Days 7–21",
    title: "Weekly operating rhythm",
    why: "Without a cadence, founders get pulled into daily coordination they should not run.",
    stabilize: "Four lean accountability moments per week — visibility and decision velocity, not meeting bloat.",
  },
  {
    n: 3,
    range: "Days 14–60",
    title: "Critical knowledge extraction",
    why: "Regulatory and ops risk compound when expertise is tribal (KCPA, FDA alerts, kava COAs).",
    stabilize: "Top five knowledge concentrations mapped; 60-day plan to document and systematize.",
  },
];

const pipeline = [
  { label: "Decision made", value: "Owner logs in tracker within 24h" },
  { label: "In progress", value: "Weekly update; visible on dashboard" },
  { label: "Blocker", value: "Flag immediately → Wed review" },
  { label: "Delivered", value: "Close in tracker + leadership summary" },
  { label: "Missed (no notice)", value: "CoS escalates → miss protocol", alert: true },
];

const cadence = [
  { label: "Monday", value: "Priority reset — top 3 outcomes per function · 20 min" },
  { label: "Wednesday", value: "Blocker review — resolve before compound · 30 min" },
  { label: "Friday", value: "Accountability pulse — committed vs. delivered · 15 min async" },
  { label: "Monthly", value: "Leadership review — strategy, resources, escalations only · 60 min" },
];

const misses = [
  { label: "First miss", value: "Private conversation within 48h — diagnose root cause, realign." },
  { label: "Second miss", value: "Pattern + org cost on record; 30-day expectation; Ryan joins." },
  { label: "Chronic", value: "Talent decision — PIP or exit; commitments cannot be optional.", alert: true },
];

function ApproachVisual({ visual }) {
  if (!visual) return null;

  if (visual.priorities) {
    return (
      <QAVisual label="Three priorities · first 90 days">
        <QAGrid cols={3}>
          {priorities.map((p) => (
            <QATile
              key={p.n}
              title={p.title}
              body={p.stabilize}
            />
          ))}
        </QAGrid>
      </QAVisual>
    );
  }

  if (visual.priorityWhy) {
    return (
      <QAVisual label="Why each comes first">
        <QAPanelStack>
          {priorities.map((p) => (
            <QAGroup
              key={p.n}
              stacked
              title={`Priority ${p.n}`}
              meta={p.range}
              rows={[
                { label: "Why first", value: p.why },
                { label: "Stabilize", value: p.stabilize },
                ...(p.how ? [{ label: "How", value: p.how }] : []),
              ]}
            />
          ))}
        </QAPanelStack>
      </QAVisual>
    );
  }

  if (visual.observations) {
    return (
      <QAVisual label="Problems to stabilize immediately">
        <ul className="card-list">
          {observations.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      </QAVisual>
    );
  }

  if (visual.pipeline) {
    return (
      <QAVisual
        label="Execution pipeline"
        note="Standard: every commitment has one named owner, one deliverable, one date."
      >
        <QATable rows={pipeline} />
      </QAVisual>
    );
  }

  if (visual.rhythmSystems) {
    return (
      <QAVisual label="Rhythms & systems introduced first">
        <QASplit>
          <QASplitCol title="Operating rhythm">
            <QATable rows={cadence} inline />
          </QASplitCol>
          <QASplitCol title="Systems">
            <QATable rows={[
              { label: "Tracker", value: "Single initiative register — source of truth for all active work." },
              { label: "Dashboard", value: "Exception-based agentic view; drill yellow/red only." },
              { label: "Digests", value: "Automated briefs so founders read before they meet." },
            ]} inline />
          </QASplitCol>
        </QASplit>
      </QAVisual>
    );
  }

  if (visual.misses) {
    return (
      <QAVisual label="Repeated misses">
        <QATable rows={misses} />
      </QAVisual>
    );
  }

  if (visual.leadershipModel) {
    return (
      <QABucketGrid
        lead="Ryan's highest-value activities are setting direction, capital and market decisions, key external relationships, and culture. Every hour on operational coordination is an hour not spent there."
        buckets={leadershipBuckets}
      />
    );
  }

  if (visual.mechanisms) {
    return (
      <QAVisual label="Three mechanisms to reduce coordination overhead">
        <QAGrid cols={3}>
          {coordinationMechanisms.map((m) => (
            <QATile key={m.num} kicker={m.num} title={m.title} body={m.desc} />
          ))}
        </QAGrid>
      </QAVisual>
    );
  }

  return null;
}

const APPROACH_SECTIONS = [
  {
    n: 1,
    title: "Top priorities",
    qa: [
      {
        q: "What are the first 3 priorities you would focus on?",
        a: "Operational inventory, weekly operating rhythm, then critical knowledge extraction — in that sequence because you cannot enforce, cadence, or automate what you cannot see. That sits on learning the product, the business, the people, and the process first: meet the team through 1:1s and team meetings to get up to speed, map strengths and weaknesses, and internalize people, process, and pace. Be humble, stay curious, and learn by doing.",
        visuals: [{ priorities: true }],
      },
      {
        q: "Why those first?",
        a: "Each unlocks the next: invisible work must surface before rhythm holds anyone accountable; rhythm must exist before tribal knowledge can be extracted into systems.",
        visuals: [{ priorityWhy: true }],
      },
      {
        q: "What operational problems are you trying to stabilize immediately?",
        a: "Stabilize before you optimize — clarity, decision velocity, and reliable execution across fragmented ownership, inconsistent visibility, and founder-dependent coordination.",
        visuals: [{ observations: true }],
      },
    ],
  },
  {
    n: 2,
    title: "Accountability & execution",
    qa: [
      {
        q: "How would you ensure initiatives move from decision → execution → completion?",
        a: "A single execution pipeline logged in the initiative tracker — every decision gets an owner, deliverable, and date; blockers surface immediately; misses trigger escalation.",
        visuals: [{ pipeline: true }],
      },
      {
        q: "What operational rhythms, dashboards, or systems would you introduce first?",
        a: "Four lean weekly touchpoints plus one tracker and one exception-based dashboard — not more meetings, better signals.",
        visuals: [{ rhythmSystems: true }],
      },
      {
        q: "How would you handle leaders repeatedly missing commitments?",
        a: "Accountability becomes cultural, not emotional: diagnose first miss, document pattern on second with Ryan involved, talent decision on chronic failure.",
        visuals: [{ misses: true }],
      },
    ],
  },
  {
    n: 3,
    title: "CEO / leadership leverage",
    qa: [
      {
        q: "What decisions or coordination should Ryan and Ari stop being involved in because of you?",
        a: "Everything in the CoS transfer column — tracking, cross-functional coordination, status loops, operational admin, and routine approvals within documented thresholds. Founders keep strategy, capital, partnerships, brand, senior talent, and external regulatory matters.",
        visuals: [{ leadershipModel: true }],
      },
      {
        q: "How would you reduce leadership coordination overhead?",
        a: "Replace ad hoc check-ins with fixed rhythm, replace status conversations with an initiative tracker, and replace escalation creep with a decision rights framework.",
        visuals: [{ mechanisms: true }],
      },
    ],
  },
];

function Process() {
  return (
    <QAPage intro="Describe your approach to the first 90 days. Expand each section for assignment questions and answers in order.">
      <QASectionList sections={APPROACH_SECTIONS} Visual={ApproachVisual} />
    </QAPage>
  );
}

Object.assign(window, { Process });
