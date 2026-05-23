/* global React, Card, CardHeader, Button, Badge, Icon, PageHeader */

// ===========================================================================
// Diagram data — 5 horizontal layers, each with cards
// ===========================================================================
const accents = {
  blue:    "var(--info)",         // CRM / dashboard / data
  orange:  "oklch(0.62 0.13 40)", // ops / events / inventory
  green:   "var(--positive)",     // finance / data store
  neutral: "var(--fg-muted)",     // compliance / generic
};

const stack = [
  {
    id: "sources",
    label: "Data sources",
    note: "QuickBooks, Salesforce, inventory, and compliance feeds — systems of record across the business",
    cards: [
      { title: "Salesforce",      accent: "blue",    lines: ["Accounts · Pipeline", "Order history · Churn"], meta: "REST API · OAuth · Webhooks" },
      { title: "ClickUp / Asana", accent: "orange",  lines: ["Initiatives · Tasks", "Owners · Blockers", "Due dates · Status"], meta: "REST API · Webhooks" },
      { title: "QuickBooks / NetSuite", accent: "green", lines: ["Revenue · Margins", "Cash · AR aging", "Burn · Forecasts"], meta: "REST API · OAuth" },
      { title: "ERP / Inventory", accent: "orange",  italic: "(system TBD)", lines: ["Batch status · QA", "Raw materials · COAs", "Supplier POs"], meta: "API or direct DB" },
      { title: "Compliance sources", accent: "neutral", lines: ["FDA alert RSS feed", "KCPA LegiScan API", "COA document store"], meta: "RSS · LegiScan API" },
      { title: "Google Workspace", accent: "blue",   lines: ["Calendar · Docs", "Sheets · Drive", "Meeting records"], meta: "Google Workspace API" },
    ],
  },
  {
    id: "etl",
    label: "ETL / Sync",
    note: "Scheduled + webhook sync into Snowflake. Jobs and webhooks normalize records from every source",
    splitCards: [
      {
        title: "Scheduled ETL jobs", accent: "green",
        inner: [
          { name: "Daily",   sub: "Finance · Operations · Compliance alerts" },
          { name: "Weekly",  sub: "Commercial · Execution · Commitment rates" },
          { name: "Real-time webhooks", sub: "Threshold breaches · Overdue task events" },
        ],
        footer: ["Automation layer:", ["Zapier / Make", "n8n", "Python services"]],
      },
      {
        title: "Real-time event triggers", accent: "orange",
        inner: [
          { name: "Inventory events",   sub: "Raw material below threshold → auto procurement task", meta: "ERP webhook → n8n" },
          { name: "CRM / task events",  sub: "Deal closes → onboard task · Task overdue → CoS alert", meta: "Salesforce / Asana webhooks" },
        ],
        rules: [
          "COA expiring <30 days → compliance flag",
          "AR aging breach → finance alert",
          "Blocker age >5 days → yellow status",
        ],
      },
    ],
  },
  {
    id: "store",
    label: "Data store",
    note: "Single source of truth. Data warehouse; backend API exposes computed metrics with role-based access",
    threeCol: [
      {
        title: "Snowflake data store", accent: "green",
        sub: "Normalized schemas · computed metrics layer",
        cols: [
          { name: "Normalized tables", items: ["kpi_snapshots", "initiatives", "accounts", "compliance_docs", "anomaly_flags"] },
          { name: "Computed metrics", items: ["commit completion %", "churn risk scores", "margin WoW deltas", "blocker age (days)", "Agent status flags"] },
        ],
      },
      {
        title: "Backend API", accent: "blue",
        sub: "Node / FastAPI — auth, caching, computed metrics",
        cols: [
          { name: "Endpoints", items: ["/financial-health", "/commercial-health", "/ops-throughput", "/compliance", "/alerts"] },
          { name: "Access",    items: ["Ryan: full", "Ari: full", "CoS: full", "Leads: dept", "— via Google SSO"] },
        ],
      },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    note: "Financial, Operations, Commercial, Execution, Compliance, and Agent Dashboard. Always-on modules with automated refresh cadences",
    cards: [
      { title: "Financial",   accent: "green",   lines: ["Revenue by channel", "Gross margin / product", "Cash position", "AR aging buckets", "Burn + forecast"], cadence: "Daily automated", source: "QuickBooks / NetSuite" },
      { title: "Operations",  accent: "orange",  lines: ["Active batch status", "Inventory vs thresholds", "Fulfillment cycle time", "Supplier on-time %", "COA expiry calendar"], cadence: "Daily automated", source: "ERP / Inventory system" },
      { title: "Commercial",  accent: "blue",    lines: ["Top 20 account status", "Reorder frequency trend", "Churn risk scores", "Revenue concentration", "Retail conversion / ret."], cadence: "Weekly + live alerts", source: "Salesforce CRM" },
      { title: "Execution",   accent: "orange",  lines: ["Initiative completion %", "Commit ratio by leader", "Blocker count + age", "Escalated items", "Overdue initiatives"], cadence: "Weekly + live alerts", source: "Asana / ClickUp" },
      { title: "Compliance",  accent: "neutral", lines: ["COA status by batch", "KCPA state tracker", "FDA alert watchlist", "Cert expiry calendar", "Open compliance tasks"], cadence: "Daily + persistent alert", source: "RSS / LegiScan / COA store" },
      {
        title: "Agent Dashboard",
        accent: "blue",
        lines: [
          "Agent card tiles · drill-down on exceptions",
          "Cross-module brief · top items for leadership",
          "Natural-language queries on Snowflake metrics",
        ],
        cadence: "Daily + on-demand",
        source: "Claude · Snowflake · Google SSO",
      },
    ],
  },
  {
    id: "ai",
    label: "AI layer",
    note: "Digest assembly, exception synthesis, Slack + email delivery. LLM summarizes the data layer",
    splitCards: [
      {
        title: "AI layer — Claude / GPT-4", accent: "orange",
        inner: [
          { name: "Daily digest",       sub: "Pulls all 5 modules · Top 3 items for Ryan · 150–200 word brief", meta: "Claude API" },
          { name: "Anomaly detection",  sub: "Margin WoW delta · Account churn score · Blocker patterns",       meta: "Rules → ML later" },
        ],
      },
      {
        title: "Delivery channels", accent: "blue",
        channels: [
          { name: "Dashboard UI", icon: "layout-dashboard", lines: ["React + charting", "Card status tiles", "Agent drill-down on exceptions"], meta: "Google SSO" },
          { name: "Slack bot",    icon: "bell",             lines: ["Morning digest push", "Red alerts instant", "Friday pulse async"], meta: "Slack Events API" },
          { name: "Email digest", icon: "file-text",        lines: ["Daily brief 7am", "Weekly summary", "Monthly review pack"], meta: "SendGrid / Postmark" },
          { name: "Mobile view",  icon: "users",            lines: ["Responsive dashboard", "Push notifs (red only)", "No app install required"], meta: "Progressive web app" },
        ],
      },
    ],
  },
];

const phases = [
  { id: "p1", label: "Phase 1", range: "Days 1–30",   note: "Execution + stub compliance",       accent: "green"  },
  { id: "p2", label: "Phase 2", range: "Days 30–60",  note: "Financial + commercial",             accent: "blue"   },
  { id: "p3", label: "Phase 3", range: "Days 60–90",  note: "Operations (ERP) + compliance live", accent: "orange" },
  { id: "p4", label: "Phase 4", range: "Months 3–9",  note: "AI anomaly + churn scoring",         accent: "neutral"},
];

// ===========================================================================
// Where automation applies — business areas
// ===========================================================================
const automationDomains = [
  {
    id: "org-comms",
    title: "Org comms",
    summary: "Unify the channels people already work in. Push curated rollups upward, surface answers downward.",
    level: "High leverage",
    groups: [
      { label: "All employees", items: ["Slack · ClickUp · Salesforce · Calendar · Support tickets", "Data lake + shared storage", "Team knowledgebase", "Company knowledgebase + comms standards"] },
      { label: "Executive",     items: ["Rollup to dashboard", "Shared storage + data lake access"] },
    ],
  },
  {
    id: "order-comms",
    title: "Order management communications",
    summary: "Outbound order touchpoints across the customer lifecycle. Nearly fully automatable.",
    level: "Fully automatable",
    items: [
      "Order confirmation emails",
      "Shipping + tracking notifications",
      "Reorder reminders by SKU cadence",
      "Account status updates",
    ],
  },
  {
    id: "reporting",
    title: "Internal reporting assembly",
    summary: "Real-time dashboards replace manual data-pulling entirely. No more screenshots into decks.",
    level: "Fully automatable",
    items: [
      "Weekly financial pack — auto-generated",
      "Monthly board review — assembled, exec edits",
      "On-demand KPI snapshots in Slack",
    ],
  },
  {
    id: "inventory",
    title: "Inventory management",
    summary: "Material thresholds, batch state, and reorder triggers feed the procurement task queue automatically.",
    level: "High leverage",
    items: [
      "Raw material reorder triggers",
      "Active batch status + QA progression",
      "Cycle-time tracking by product line",
      "Stale stock alerts",
    ],
  },
  {
    id: "supplier",
    title: "Supplier communication tracking",
    summary: "PO monitoring with overdue flags and templated follow-up sequences.",
    level: "Mostly automatable",
    items: [
      "PO status monitoring",
      "Overdue delivery flags",
      "Follow-up email sequences",
      "Supplier on-time delivery scoring",
    ],
  },
  {
    id: "compliance",
    title: "Compliance documentation",
    summary: "Drafts and trackers — humans review and approve, but no one starts from a blank page.",
    level: "Mostly automatable",
    items: [
      "COA summary drafts",
      "Certificate expiration tracking",
      "Regulatory correspondence first drafts",
      "State-level legislative change alerts",
    ],
  },
];

// ===========================================================================
// Administrative layer health categories
// ===========================================================================
const healthCategories = [
  {
    id: "financial",
    title: "Financial health",
    accent: "green",
    cadence: "Daily automated",
    items: ["Revenue by channel", "Gross margin by product", "Period Spend vs. Operating budget", "Cash position & AP and AR aging"],
  },
  {
    id: "operational",
    title: "Operational throughput",
    accent: "orange",
    cadence: "Daily automated",
    items: ["Production and batch status.", "Raw material inventory & reorder thresholds", "Order book & fulfillment schedule with cycle time", "Production Schedule & Run Times"],
  },
  {
    id: "commercial",
    title: "Commercial health",
    accent: "blue",
    cadence: "Weekly automated",
    items: ["Account Volumes & Activity", "Unit Sales by channel & region", "Lead conversion & Sales Cycle", "Safety and Compliance", "Sales funnel activity"],
  },
  {
    id: "execution",
    title: "Execution health",
    accent: "orange",
    cadence: "Weekly automated",
    items: ["Project status and deliverable deadlines", "KPI & OKR tracking + WoW, MoM, QoQ, YoY metrics", "Critical Blockers & Supply interruptions", "CAC and funnel metrics"],
  },
];

// ===========================================================================
// Organization — leadership leverage (shared with Systems Answer tab)
// ===========================================================================
const leadershipBuckets = [
  {
    title: "Ryan always owns",
    dotColor: "var(--fg)",
    items: [
      "Final say on strategic direction",
      "Capital allocation decisions",
      "Key wholesale partnerships",
      "Brand positioning",
      "Senior talent decisions",
      "External regulatory / legal matters",
      "Priority interactions with external stakeholders",
      "Keep path clear 3–6 months ahead",
      "Establish beacons 6–18 months out",
    ],
  },
  {
    title: "Transfers to CoS immediately",
    dotColor: "var(--info)",
    items: [
      "Initiative tracking and accountability enforcement",
      "Cross-functional coordination",
      "Meeting prep and facilitation",
      "Vendor management (below strategic tier)",
      "Scheduling and status reporting",
      "Administrative oversight",
      "Weekly P&L review",
      "New initiative definition and program management",
      "Department and project weeklies",
    ],
  },
  {
    title: "Moves to functional leads",
    dotColor: "var(--fg-muted)",
    items: [
      "Routine operational decisions within defined parameters",
      "Team-level priority setting",
      "Customer escalation resolution within authority levels",
      "Standard purchasing within approved budgets",
    ],
  },
];

const coordinationMechanisms = [
  {
    num: "01",
    title: "Weekly rhythm eliminates ad hoc check-ins",
    desc: "There is always a predictable near-term moment to address something. Run meetings with ClickUp open, against timeline, roadmap, and milestones.",
  },
  {
    num: "02",
    title: "Initiative tracker replaces status conversations",
    desc: "Ryan can check any active project in two minutes asynchronously. Leadership should never need to ask: \"Where does this stand?\"",
  },
  {
    num: "03",
    title: "Decision rights framework stops escalation creep",
    desc: "A documented decision rights framework stops leaders from escalating decisions they should be making themselves. Clarity replaces friction.",
  },
];

const orgRolePhases = [
  {
    phase: "Execution Engine",
    accentColor: "var(--positive)",
    desc: "Enforcement, visibility, removing friction between decision and outcome. Building the accountability infrastructure.",
    focus: [
      "Install Mon / Wed / Fri operating cadence",
      "Build and maintain complete initiative tracker",
      "Enforce commitment accountability across all leads",
      "Advance knowledge base value",
      "Build executive visibility dashboard",
    ],
  },
  {
    phase: "Systems Architect",
    accentColor: "var(--info)",
    desc: "Operating leverage: scale revenue and complexity without scaling headcount. Designing architecture, selecting AI tools, building data infrastructure.",
    focus: [
      "AI-queryable internal knowledge agent",
      "Wholesale account health monitoring",
      "Compliance monitoring and documentation system",
      "Operational anomaly detection dashboard",
      "Cross-platform automation layer",
    ],
  },
];

const personalDevAreas = [
  {
    area: "Technical AI fluency",
    why: "Sound build-vs-buy-vs-integrate decisions and leading technical partners without dependency on others to interpret.",
    approach: "Deliberate investment in months 1–12, learning in parallel with executing.",
  },
  {
    area: "Org design for AI-first teams",
    why: "Traditional operating models do not translate cleanly when a 15-person team can operate with the throughput of 60 through smart automation.",
    approach: "Develop original POV grounded in what is actually working at comparable companies.",
  },
  {
    area: "Data strategy and interpretation",
    why: "Dashboards leadership trusts require understanding how metrics are generated, where they can be gamed, and what absence of data means.",
    approach: "Build through direct partnership with whoever owns data and technology at Diversified Botanics.",
  },
];

Object.assign(window, {
  stack, phases, accents, automationDomains, healthCategories,
  leadershipBuckets, coordinationMechanisms, orgRolePhases, personalDevAreas,
});
