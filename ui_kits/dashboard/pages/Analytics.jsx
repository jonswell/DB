/* global React, Card, CardHeader, Button, IconButton, Badge, Icon,
   Sparkline, LineChart, BarChart, Donut, StatCard, DataTable, ActivityFeed,
   PageHeader, ResponsiveChartWrap */

// =====================================================================
// Shared helpers + mock data (per-tab) ================================
// =====================================================================
const _A_labels30 = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
const _A_fmtUSD   = v => "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const _A_fmtUSDk  = v => "$" + (v >= 1000 ? (v / 1000).toFixed(1) + "k" : v.toFixed(0));
const _A_dow      = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function _seq(n, fn) { return Array.from({ length: n }, (_, i) => fn(i)); }

function DetailTableCard({ eyebrow, title, action, columns, rows }) {
  return (
    <Card padding={0}>
      <div style={{
        padding: action ? "16px 18px 12px" : "16px 18px 0",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div className="card-inline-head">
            <span className="eyebrow">{eyebrow}</span>
            <span className="card-title card-title--sm">{title}</span>
          </div>
        </div>
        {action}
      </div>
      <DataTable columns={columns} rows={rows} />
    </Card>
  );
}

// =====================================================================
// ACTIVITY ============================================================
// =====================================================================
const _ACT_recent = [
  { kind: "team", actor: "Jordan Park", action: "commented on", target: "90-day systems plan", time: "8m", meta: "Initiative tracker · Phase 02", tone: "positive" },
  { kind: "channels", actor: "#wholesale", action: "new thread from", target: "Maya Chen", time: "22m", meta: "Pacific Naturals PO follow-up · 4 replies" },
  { kind: "team", actor: "Sam Ortega", action: "mentioned you in", target: "#ops-alerts", time: "41m", meta: "COA batch review — vendor escalation" },
  { kind: "channels", actor: "#leadership", action: "digest posted by", target: "System", time: "1h", meta: "Friday accountability pulse · 15 min async" },
  { kind: "team", actor: "Lara Tan", action: "assigned you", target: "KCPA legislative tracker review", time: "2h", meta: "ClickUp · due Friday", tone: "negative" },
];

const _ACT_agents = [
  { name: "Weekly financial digest", status: "Scheduled", schedule: "Every Monday · 9:00 AM", tone: "neutral" },
  { name: "Leadership status digest", status: "Running", schedule: "Daily · 5:00 PM", tone: "positive" },
  { name: "KCPA compliance scan", status: "Completed", schedule: "Daily · 6:00 AM", tone: "positive" },
  { name: "Inventory reorder alerts", status: "Active", schedule: "Every 4 hours", tone: "neutral" },
  { name: "Slack → initiative logger", status: "Active", schedule: "Real-time webhook", tone: "positive" },
];

const _ACT_files = [
  { name: "Q2 Revenue Forecast.xlsx", update: "Edited", owner: "Jordan Park", source: "drive", folder: "Finance / Forecasts", time: "18m" },
  { name: "COA — Batch B-2026-184.pdf", update: "Uploaded", owner: "Lara Tan", source: "drive", folder: "Compliance / COAs", time: "1h" },
  { name: "90-day systems plan", update: "Comment added", owner: "Sam Ortega", source: "slack", folder: "#leadership", time: "2h" },
  { name: "Receiving & testing SOP v3.docx", update: "Version 3 shared", owner: "Pierre Mahé", source: "sharepoint", folder: "Ops / SOPs", time: "3h" },
  { name: "Pacific Naturals PO follow-up", update: "Attachment added", owner: "Maya Chen", source: "gmail", folder: "Wholesale inbox", time: "4h" },
  { name: "Initiative tracker export.csv", update: "Synced", owner: "System", source: "clickup", folder: "CoS workspace", time: "6h" },
  { name: "KCPA legislative tracker.xlsx", update: "Moved to shared", owner: "Lara Tan", source: "dropbox", folder: "Legal / Regulatory", time: "Yesterday" },
  { name: "Weekly leadership digest.pdf", update: "Generated", owner: "System", source: "drive", folder: "Leadership / Digests", time: "Yesterday" },
];

const _ACT_rss = [
  { title: "FDA updates import guidance for botanical ingredients", publisher: "Nutraceuticals World", time: "2h ago" },
  { title: "Kratom category grows 18% YoY in natural retail", publisher: "NBJ", time: "5h ago" },
  { title: "Hawaii advances kava quality standards bill", publisher: "Star-Advertiser", time: "8h ago" },
  { title: "Wholesale buyers prioritize transparent COA portals", publisher: "Natural Products Insider", time: "12h ago" },
  { title: "DB expands Pacific Northwest distribution", publisher: "Industry Wire", time: "1d ago" },
];

function RssFeedList({ items }) {
  return (
    <div className="activity-card-list">
      {items.map((item, i) => (
        <div
          key={i}
          className="activity-card-list__row"
          style={{ borderBottom: i < items.length - 1 ? "0.5px solid var(--divider)" : "none" }}
        >
          <div className="card-strong activity-card-list__title">{item.title}</div>
          <div className="activity-card-list__meta">
            <Badge tone="neutral">{item.publisher}</Badge>
            <span className="card-meta">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const _SHARED_SOURCES = {
  drive:      { label: "Google Drive", domain: "drive.google.com" },
  slack:      { label: "Slack",        domain: "slack.com" },
  dropbox:    { label: "Dropbox",      domain: "dropbox.com" },
  gmail:      { label: "Gmail",        domain: "mail.google.com" },
  clickup:    { label: "ClickUp",      domain: "clickup.com" },
  sharepoint: { label: "SharePoint",   domain: "sharepoint.com" },
};

function _faviconUrl(domain) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
}

function SharedSourceLogo({ source }) {
  const meta = _SHARED_SOURCES[source];
  if (!meta) {
    return (
      <span className="shared-files__logo">
        <Icon name="folder" size={18} color="var(--fg-muted)" />
      </span>
    );
  }
  return (
    <span className="shared-files__logo">
      <img
        className="shared-files__favicon"
        src={_faviconUrl(meta.domain)}
        alt=""
        width={20}
        height={20}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

function SharedFilesList({ items }) {
  return (
    <div className="shared-files">
      <div className="shared-files__head" aria-hidden>
        <span>Source</span>
        <span>File</span>
        <span>Owner</span>
        <span>Updated</span>
      </div>
      {items.map((file, i) => (
        <div
          key={i}
          className="shared-files__row"
          style={{ borderBottom: i < items.length - 1 ? "0.5px solid var(--divider)" : "none" }}
        >
          <div className="shared-files__source">
            <SharedSourceLogo source={file.source} />
            <span className="shared-files__source-label">{_SHARED_SOURCES[file.source]?.label || file.source}</span>
          </div>
          <div className="shared-files__file">
            <div className="shared-files__file-top">
              <span className="card-strong">{file.name}</span>
              <Badge tone="neutral">{file.update}</Badge>
            </div>
            <span className="card-meta">{file.folder}</span>
          </div>
          <div className="shared-files__owner">
            <Icon name="user" size={14} color="var(--fg-faint)" />
            <span>{file.owner}</span>
          </div>
          <span className="shared-files__time card-meta">{file.time}</span>
        </div>
      ))}
    </div>
  );
}

function AgentWorkflowList({ items }) {
  return (
    <div className="activity-card-list">
      {items.map((a, i) => (
        <div
          key={i}
          className="activity-card-list__row"
          style={{ borderBottom: i < items.length - 1 ? "0.5px solid var(--divider)" : "none" }}
        >
          <div className="activity-card-list__head">
            <span className="card-strong activity-card-list__title">{a.name}</span>
            <Badge tone={a.tone === "positive" ? "positive" : a.tone === "negative" ? "negative" : "neutral"} dot={a.status === "Running"}>
              {a.status}
            </Badge>
          </div>
          <span className="card-meta">{a.schedule}</span>
        </div>
      ))}
    </div>
  );
}

function ActivityView() {
  return (
    <>
      <div className="activity-cards-row">
        <Card padding={18} className="activity-cards-row__card">
          <CardHeader title="Recent activity" />
          <div className="activity-card-list activity-card-list--feed">
            <ActivityFeed items={_ACT_recent} />
          </div>
        </Card>

        <Card padding={18} className="activity-cards-row__card">
          <CardHeader title="Agents & workflows" />
          <AgentWorkflowList items={_ACT_agents} />
        </Card>

        <Card padding={18} className="activity-cards-row__card">
          <CardHeader title="Kratom & industry RSS" />
          <RssFeedList items={_ACT_rss} />
        </Card>
      </div>

      <Card padding={18}>
        <CardHeader title="Shared files" />
        <SharedFilesList items={_ACT_files} />
      </Card>
    </>
  );
}

// =====================================================================
// REVENUE =============================================================
// =====================================================================
const _R_revenue = [12.4, 13.1, 12.8, 14.6, 15.2, 14.9, 16.3, 17.1, 16.8, 18.2, 19.4, 21.0, 20.4, 22.6, 24.1, 23.8, 25.6, 27.2, 28.4, 27.9, 29.6, 31.2, 33.0, 32.4, 34.7, 36.1, 37.8, 39.4, 41.2, 42.9];
const _R_compare = [10.1, 10.8, 11.2, 11.6, 12.0, 12.5, 13.0, 13.4, 13.8, 14.1, 14.5, 14.9, 15.4, 15.9, 16.3, 16.8, 17.2, 17.6, 18.0, 18.5, 19.0, 19.4, 19.8, 20.3, 20.7, 21.1, 21.6, 22.0, 22.5, 23.0];
const _R_activity = [
  { actor: "Pacific Naturals",   action: "closed invoice for", target: "$48,240", time: "2h",  tone: "positive", meta: "Wholesale · 124 orders · Net 30" },
  { actor: "Net revenue",        action: "up",                 target: "+12.4%",  time: "today", tone: "positive", meta: "vs. previous 30-day period" },
  { actor: "Summit Wholesale",   action: "payment delayed on", target: "$22,180", time: "4h",  tone: "negative", meta: "AR aging · follow-up sent" },
  { actor: "Coastal Botanicals", action: "MRR added",          target: "$1,840",  time: "today", tone: "positive", meta: "DTC subscription tier upgrade" },
  { actor: "Refund batch",       action: "processed",          target: "$2,312",  time: "yesterday", meta: "1.62% refund rate · 18 orders" },
  { actor: "Mountain Herb Co.",  action: "renewed annual PO at", target: "$31,820", time: "yesterday", tone: "positive", meta: "Wholesale · +8.1% MoM" },
];
const _R_rows = [
  { account: "Pacific Naturals",   segment: "Wholesale", revenue: 48240, orders: 124, mom: 12.4 },
  { account: "Mountain Herb Co.",  segment: "Wholesale", revenue: 31820, orders: 86,  mom: 8.1 },
  { account: "Green Leaf Dist.",   segment: "Wholesale", revenue: 28410, orders: 72,  mom: 5.6 },
  { account: "Summit Wholesale",   segment: "Wholesale", revenue: 22180, orders: 48,  mom: -2.3 },
  { account: "Coastal Botanicals", segment: "DTC",       revenue: 18420, orders: 412, mom: 14.2 },
  { account: "River City Supply",  segment: "Wholesale", revenue: 16240, orders: 38,  mom: 3.8 },
  { account: "Desert Sun Trading", segment: "Wholesale", revenue: 12860, orders: 31,  mom: 1.2 },
];

function RevenueView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Revenue"      value={142840}   format={_A_fmtUSD} delta={12.4} deltaLabel="vs prev. 30d" />
        <StatCard label="MRR"          value={"$38.4k"}                   delta={6.2}  deltaLabel="vs prev. 30d" />
        <StatCard label="ARPU"         value={"$52.14"}                   delta={1.8}  deltaLabel="vs prev. 30d" />
        <StatCard label="Refund rate"  value={"1.62%"}                    delta={-0.4} deltaLabel="vs prev. 30d" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 12 }}>
        <Card padding={18}>
          <CardHeader eyebrow="Revenue" title="Net revenue, last 30 days" subtitle="Compared against the previous period" />
          <ResponsiveChartWrap height={210}>
            {(w) => (
              <LineChart
                width={w} height={210}
                variant="compare"
                showGrid
                series={[
                  { label: "This period", data: _R_revenue, color: "var(--chart-1)" },
                  { label: "Previous",    data: _R_compare, color: "var(--chart-3)" },
                ]}
                labels={_A_labels30}
              />
            )}
          </ResponsiveChartWrap>
        </Card>

        <Card padding={18}>
          <CardHeader eyebrow="Revenue" title="Recent activity" />
          <ActivityFeed items={_R_activity} />
        </Card>
      </div>

      <DetailTableCard
        eyebrow="Revenue"
        title="Top accounts (30d)"
        columns={[
          { key: "account", label: "Account", sortable: true, tabular: false, render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
          { key: "segment", label: "Segment", tabular: false },
          { key: "revenue", label: "Revenue", align: "right", sortable: true, render: v => _A_fmtUSD(v) },
          { key: "orders",  label: "Orders",  align: "right" },
          { key: "mom",     label: "MoM",     align: "right", render: v => (
            <span style={{ color: v >= 0 ? "var(--positive)" : "var(--negative)", fontWeight: 500 }}>
              {v >= 0 ? "+" : ""}{v.toFixed(1)}%
            </span>
          )},
        ]}
        rows={_R_rows}
      />
    </>
  );
}

// =====================================================================
// ORDERS ==============================================================
// =====================================================================
const _O_volume = _A_dow.map((d, i) => ({ label: d, value: [312, 286, 401, 358, 487, 612, 524][i] }));
const _O_rows = [
  { id: "A-3194", customer: "Lara Tan",     items: 3, total: 184.50, status: "fulfilled", placed: "Today · 12m ago" },
  { id: "A-3193", customer: "Pierre Mahé",  items: 1, total: 42.00,  status: "pending",   placed: "Today · 28m ago" },
  { id: "A-3192", customer: "Yuki Sato",    items: 4, total: 312.40, status: "fulfilled", placed: "Today · 1h ago" },
  { id: "A-3191", customer: "Jamal Reed",   items: 2, total: 96.00,  status: "refunded",  placed: "Today · 2h ago" },
  { id: "A-3190", customer: "Anya Petrov",  items: 5, total: 401.20, status: "fulfilled", placed: "Today · 3h ago" },
  { id: "A-3189", customer: "Dani Cruz",    items: 2, total: 128.00, status: "fulfilled", placed: "Yesterday" },
  { id: "A-3188", customer: "Sasha Lee",    items: 7, total: 612.00, status: "picking",   placed: "Today · 5h ago" },
  { id: "A-3187", customer: "Maya Chen",    items: 6, total: 540.80, status: "fulfilled", placed: "Yesterday" },
];
const _O_activity = [
  { actor: "Order #A-3194", action: "fulfilled for", target: "Lara Tan",    time: "12m",  tone: "positive", meta: "$184.50 · 3 items" },
  { actor: "Order #A-3193", action: "pending for",   target: "Pierre Mahé", time: "28m",  meta: "$42.00 · 1 item" },
  { actor: "Order #A-3192", action: "fulfilled for", target: "Yuki Sato",   time: "1h",   tone: "positive", meta: "$312.40 · 4 items" },
  { actor: "Order #A-3191", action: "refunded for",  target: "Jamal Reed",  time: "2h",   tone: "negative", meta: "$96.00 · 2 items" },
  { actor: "Order #A-3190", action: "fulfilled for", target: "Anya Petrov", time: "3h",   tone: "positive", meta: "$401.20 · 5 items" },
  { actor: "Order #A-3188", action: "awaiting pick for", target: "Sasha Lee", time: "5h", meta: "$612.00 · 7 items" },
];

function OrdersView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Total orders"    value={"2,980"} delta={8.4}  deltaLabel="vs prev. 30d" />
        <StatCard label="Avg order value" value={"$52.14"} delta={1.8} deltaLabel="vs prev. 30d" />
        <StatCard label="Fulfilled"       value={"94.2%"}  delta={2.1} deltaLabel="vs prev. 30d" />
        <StatCard label="Refunded"        value={"1.8%"}   delta={-0.3} deltaLabel="vs prev. 30d" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 12 }}>
        <Card padding={18}>
          <CardHeader
            eyebrow="Orders"
            title="Orders by day of week"
            subtitle="Saturday continues to lead — Friday is closing the gap."
          />
          <ResponsiveChartWrap height={210}>
            {(w) => <BarChart width={w} height={210} data={_O_volume} highlightIndex={5} color="var(--chart-1)" />}
          </ResponsiveChartWrap>
        </Card>

        <Card padding={18}>
          <CardHeader eyebrow="Orders" title="Recent activity" />
          <ActivityFeed items={_O_activity} />
        </Card>
      </div>

      <DetailTableCard
        eyebrow="Orders"
        title="Recent orders"
        columns={[
          { key: "id",       label: "Order",    sortable: true, render: v => <span className="mono">{v}</span> },
          { key: "customer", label: "Customer", sortable: true, tabular: false, render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
          { key: "items",    label: "Items",    align: "right" },
          { key: "total",    label: "Total",    align: "right", render: v => _A_fmtUSD(v) },
          { key: "status",   label: "Status",   render: v => (
            v === "fulfilled" ? <Badge tone="positive" dot>Fulfilled</Badge>
            : v === "pending"   ? <Badge tone="neutral"  dot>Pending</Badge>
            : v === "picking"   ? <Badge tone="info"     dot>Picking</Badge>
            : v === "refunded"  ? <Badge tone="negative" dot>Refunded</Badge>
            :                     <Badge tone="neutral"  dot>{v}</Badge>
          )},
          { key: "placed",   label: "Placed", align: "right", tabular: false, render: v => <span style={{ color: "var(--fg-subtle)" }}>{v}</span> },
        ]}
        rows={_O_rows}
      />
    </>
  );
}

// =====================================================================
// PRODUCTION ==========================================================
// =====================================================================
const _P_output = _seq(30, i => 220 + Math.sin(i / 2) * 30 + i * 3);
const _P_activity = [
  { actor: "Batch B-2026-184", action: "passed QA with", target: "6 defects", time: "12m", tone: "positive", meta: "Line 02 · 1,240 units" },
  { actor: "Line 03", action: "running batch", target: "B-2026-182", time: "live", meta: "1,480 units · ETA tomorrow" },
  { actor: "Batch B-2026-180", action: "halted on", target: "Line 01", time: "2h", tone: "negative", meta: "22 defects — maintenance dispatched" },
  { actor: "Line 02", action: "defect rate down to", target: "0.82%", time: "today", tone: "positive", meta: "Best 7-day avg this quarter" },
  { actor: "Batch B-2026-183", action: "in QA with", target: "14 defects", time: "1h", meta: "Line 01 · 980 units" },
  { actor: "Batch B-2026-181", action: "shipped", target: "720 units", time: "yesterday", tone: "positive", meta: "Line 02 · 4 defects" },
];
const _P_batches = [
  { batch: "B-2026-184", line: "Line 02", units: 1240, defects: 6,  status: "shipped",   eta: "Today" },
  { batch: "B-2026-183", line: "Line 01", units: 980,  defects: 14, status: "qa",        eta: "Today" },
  { batch: "B-2026-182", line: "Line 03", units: 1480, defects: 9,  status: "running",   eta: "Tomorrow" },
  { batch: "B-2026-181", line: "Line 02", units: 720,  defects: 4,  status: "shipped",   eta: "Yesterday" },
  { batch: "B-2026-180", line: "Line 01", units: 1100, defects: 22, status: "halted",    eta: "—" },
  { batch: "B-2026-179", line: "Line 04", units: 860,  defects: 3,  status: "shipped",   eta: "May 12" },
];

function ProductionView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Units produced"  value={"38,612"} delta={6.4}  deltaLabel="vs prev. 30d" />
        <StatCard label="In progress"     value={"4,280"}  delta={2.1}  deltaLabel="vs prev. 30d" />
        <StatCard label="Defect rate"     value={"0.94%"}  delta={-0.3} deltaLabel="vs prev. 30d" />
        <StatCard label="Cycle time"      value={"4.2 hr"} delta={-1.2} deltaLabel="vs prev. 30d" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 12 }}>
        <Card padding={18}>
          <CardHeader eyebrow="Output" title="Units / day" subtitle="Production line throughput, last 30 days" />
          <ResponsiveChartWrap height={210}>
            {(w) => <LineChart width={w} height={210} variant="area" showGrid labels={_A_labels30}
              series={[{ label: "Units", data: _P_output, color: "var(--chart-1)" }]} />}
          </ResponsiveChartWrap>
        </Card>
        <Card padding={18}>
          <CardHeader eyebrow="Production" title="Recent activity" />
          <ActivityFeed items={_P_activity} />
        </Card>
      </div>

      <Card padding={0}>
        <div style={{ padding: "16px 18px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div className="card-inline-head">
              <span className="eyebrow">Production</span>
              <span className="card-title card-title--sm">Recent batches</span>
            </div>
          </div>
          <Button variant="secondary" size="sm" iconLeft="plus">Start batch</Button>
        </div>
        <DataTable
          columns={[
            { key: "batch", label: "Batch", render: v => <span className="mono">{v}</span> },
            { key: "line",  label: "Line",  tabular: false, render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
            { key: "units", label: "Units",   align: "right", render: v => v.toLocaleString() },
            { key: "defects", label: "Defects", align: "right" },
            { key: "status", label: "Status", render: v => (
              v === "shipped" ? <Badge tone="positive" dot>Shipped</Badge>
              : v === "qa"      ? <Badge tone="info"     dot>QA</Badge>
              : v === "running" ? <Badge tone="neutral"  dot>Running</Badge>
              :                    <Badge tone="negative" dot>Halted</Badge>
            )},
            { key: "eta",    label: "ETA",    align: "right", tabular: false, render: v => <span style={{ color: "var(--fg-subtle)" }}>{v}</span> },
          ]}
          rows={_P_batches}
        />
      </Card>
    </>
  );
}

// =====================================================================
// SALES ===============================================================
// =====================================================================
const _S_rows = [
  { deal: "Globex — Expansion",     stage: "negotiation", value: 96000, owner: "Maya Chen",   close: "Jun 18" },
  { deal: "Acme Foods — Annual",    stage: "proposal",    value: 72000, owner: "Jordan Park", close: "May 28" },
  { deal: "Northwind — Renewal",    stage: "proposal",    value: 42000, owner: "Sam Ortega",  close: "Jun 04" },
  { deal: "Wayne Co. — New",        stage: "discovery",   value: 38000, owner: "Sam Ortega",  close: "Jun 04" },
  { deal: "Initech — New",          stage: "qualified",   value: 24000, owner: "Lara Tan",    close: "Jul 12" },
  { deal: "Pacific Naturals — PO",  stage: "won",         value: 48240, owner: "Maya Chen",   close: "May 10" },
  { deal: "Summit Wholesale — Q3",  stage: "negotiation", value: 112000, owner: "Pierre Mahé", close: "Jun 30" },
];
const _S_pipeline = [
  { label: "Lead",       value: 482 },
  { label: "Qualified",  value: 318 },
  { label: "Discovery",  value: 196 },
  { label: "Proposal",   value: 112 },
  { label: "Negotiation", value: 64 },
  { label: "Won",        value: 38 },
];
const _S_activity = [
  { actor: "Globex — Expansion",     action: "moved to",              target: "negotiation", time: "2h",        tone: "positive", meta: "$96k · Maya Chen" },
  { actor: "Acme Foods — Annual",    action: "close date updated to", target: "May 28",    time: "4h",        meta: "Jordan Park" },
  { actor: "Northwind — Renewal",    action: "proposal sent for",     target: "$42k ARR",  time: "today",     tone: "positive" },
  { actor: "Wayne Co. — New",        action: "discovery call booked", target: "",          time: "yesterday", meta: "Sam Ortega · Jun 04 close" },
  { actor: "Initech — New",          action: "stalled in",            target: "qualified", time: "3d ago",    tone: "negative", meta: "No activity 12 days" },
];

const _S_funnelStages = [
  { key: "lead", label: "Lead" },
  { key: "qualified", label: "Qualified" },
  { key: "discovery", label: "Discovery" },
  { key: "proposal", label: "Proposal" },
  { key: "negotiation", label: "Negotiation" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
];

const _S_funnelByRep = [
  {
    rep: "Maya Chen",
    pipeline: 286240,
    stages: {
      lead: { deals: 14, value: 84000 }, qualified: { deals: 11, value: 72000 },
      discovery: { deals: 7, value: 68000 }, proposal: { deals: 5, value: 62000 },
      negotiation: { deals: 3, value: 192000 }, won: { deals: 2, value: 96480 },
      lost: { deals: 2, value: 22000 },
    },
  },
  {
    rep: "Jordan Park",
    pipeline: 198000,
    stages: {
      lead: { deals: 10, value: 52000 }, qualified: { deals: 8, value: 48000 },
      discovery: { deals: 5, value: 44000 }, proposal: { deals: 4, value: 126000 },
      negotiation: { deals: 1, value: 28000 }, won: { deals: 1, value: 42000 },
      lost: { deals: 3, value: 18000 },
    },
  },
  {
    rep: "Sam Ortega",
    pipeline: 164000,
    stages: {
      lead: { deals: 12, value: 64000 }, qualified: { deals: 9, value: 56000 },
      discovery: { deals: 6, value: 76000 }, proposal: { deals: 3, value: 42000 },
      negotiation: { deals: 0, value: 0 }, won: { deals: 1, value: 38000 },
      lost: { deals: 4, value: 32000 },
    },
  },
  {
    rep: "Lara Tan",
    pipeline: 92000,
    stages: {
      lead: { deals: 9, value: 38000 }, qualified: { deals: 7, value: 52000 },
      discovery: { deals: 2, value: 18000 }, proposal: { deals: 1, value: 24000 },
      negotiation: { deals: 0, value: 0 }, won: { deals: 0, value: 0 },
      lost: { deals: 5, value: 28000 },
    },
  },
  {
    rep: "Pierre Mahé",
    pipeline: 224000,
    stages: {
      lead: { deals: 11, value: 48000 }, qualified: { deals: 6, value: 36000 },
      discovery: { deals: 4, value: 32000 }, proposal: { deals: 2, value: 34000 },
      negotiation: { deals: 2, value: 142000 }, won: { deals: 1, value: 28000 },
      lost: { deals: 2, value: 16000 },
    },
  },
];

function _fmtPipelineCell(n) {
  if (!n) return "—";
  return n >= 1000 ? `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : _A_fmtUSD(n);
}

function SalesFunnelByRep({ reps, stages }) {
  return (
    <div className="sales-funnel">
      <table>
        <thead>
          <tr>
            <th>Rep</th>
            {stages.map((s) => (
              <th key={s.key} className="sales-funnel__stage-head">{s.label}</th>
            ))}
            <th className="sales-funnel__num-head">Pipeline</th>
          </tr>
        </thead>
        <tbody>
          {reps.map((row) => (
            <tr key={row.rep}>
              <td><span className="sales-funnel__rep">{row.rep}</span></td>
              {stages.map((s) => {
                const cell = row.stages[s.key] || { deals: 0, value: 0 };
                const stageClass = [
                  "sales-funnel__stage",
                  (s.key === "negotiation" || s.key === "won") && cell.deals ? " sales-funnel__stage--hot" : "",
                  s.key === "lost" && cell.deals ? " sales-funnel__stage--lost" : "",
                ].join("");
                return (
                  <td key={s.key} className={stageClass}>
                    <span className="sales-funnel__deals">{cell.deals || "—"}</span>
                    <span className="sales-funnel__value">{_fmtPipelineCell(cell.value)}</span>
                  </td>
                );
              })}
              <td className="sales-funnel__total">{_A_fmtUSD(row.pipeline)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SalesView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Deals won (30d)"  value={"38"}        delta={12.5} deltaLabel="vs prev. 30d" />
        <StatCard label="Pipeline"         value={"$1.84M"}    delta={4.2}  deltaLabel="vs prev. 30d" />
        <StatCard label="Win rate"         value={"34%"}       delta={2.1}  deltaLabel="vs prev. 30d" />
        <StatCard label="Avg deal size"    value={"$48.4k"}    delta={-1.8} deltaLabel="vs prev. 30d" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 12 }}>
        <Card padding={18}>
          <CardHeader
            eyebrow="Pipeline"
            title="Deals by stage"
            subtitle="Negotiation and proposal carry the most value this quarter."
          />
          <ResponsiveChartWrap height={210}>
            {(w) => <BarChart width={w} height={210} data={_S_pipeline} highlightIndex={5} color="var(--chart-1)" />}
          </ResponsiveChartWrap>
        </Card>

        <Card padding={18}>
          <CardHeader eyebrow="Deals" title="Recent activity" />
          <ActivityFeed items={_S_activity} />
        </Card>
      </div>

      <DetailTableCard
        eyebrow="Sales"
        title="Open pipeline"
        columns={[
          { key: "deal",  label: "Deal",       sortable: true, tabular: false, render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
          { key: "stage", label: "Stage",      render: v => (
            v === "won"         ? <Badge tone="positive" dot>Won</Badge>
            : v === "negotiation" ? <Badge tone="info"     dot>Negotiation</Badge>
            : v === "proposal"    ? <Badge tone="neutral"  dot>Proposal</Badge>
            : v === "discovery"   ? <Badge tone="neutral"  dot>Discovery</Badge>
            :                       <Badge tone="neutral"  dot>Qualified</Badge>
          )},
          { key: "value", label: "Value",      align: "right", sortable: true, render: v => _A_fmtUSD(v) },
          { key: "owner", label: "Owner",      tabular: false },
          { key: "close", label: "Close date", align: "right", tabular: false, render: v => <span style={{ color: "var(--fg-subtle)" }}>{v}</span> },
        ]}
        rows={_S_rows}
      />

      <Card padding={18}>
        <CardHeader
          eyebrow="Sales"
          title="Funnel by rep"
          subtitle="Deal count and pipeline value at each stage."
        />
        <SalesFunnelByRep reps={_S_funnelByRep} stages={_S_funnelStages} />
      </Card>
    </>
  );
}

// =====================================================================
// MARKETING ===========================================================
// =====================================================================
const _M_rows = [
  { name: "Spring launch — paid",       channel: "Paid social",  spend: 12400, conv: "3.8%", status: "live" },
  { name: "Newsletter #142",            channel: "Email",        spend: 820,   conv: "2.1%", status: "sent" },
  { name: "Retargeting — display",      channel: "Display",      spend: 4680,  conv: "1.9%", status: "live" },
  { name: "Affiliate program",          channel: "Affiliate",    spend: 2100,  conv: "4.2%", status: "live" },
  { name: "Brand awareness — TikTok",   channel: "Paid social",  spend: 3200,  conv: "0.6%", status: "paused" },
  { name: "SEO content — kratom guide", channel: "Organic",      spend: 0,     conv: "—",    status: "live" },
  { name: "Wholesale nurture drip",     channel: "Email",        spend: 640,   conv: "6.4%", status: "scheduled" },
];
const _M_channels = [
  { label: "Direct",   value: 412 },
  { label: "Organic",  value: 386 },
  { label: "Paid",     value: 298 },
  { label: "Email",    value: 184 },
  { label: "Social",   value: 142 },
  { label: "Referral", value: 96 },
];
const _M_campaigns = [
  { actor: "Spring launch — paid",  action: "is converting at",       target: "3.8%",  time: "live",    tone: "positive" },
  { actor: "Newsletter #142",        action: "sent to",                target: "12,840 contacts", time: "2h" },
  { actor: "Retargeting — display",  action: "CPC dropped to",         target: "$0.24", time: "today",   tone: "positive" },
  { actor: "Affiliate program",      action: "added",                  target: "8 new partners",  time: "yesterday" },
  { actor: "Brand awareness — TikTok", action: "underperforming",       target: "",      time: "3d ago",  tone: "negative", meta: "ROAS 0.6 — paused" },
];

function MarketingView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Sessions"        value={"38,214"} delta={4.1}  deltaLabel="vs prev. 30d" />
        <StatCard label="Conversion rate" value={"3.42%"}  delta={0.6}  deltaLabel="vs prev. 30d" />
        <StatCard label="CAC"             value={"$28.40"} delta={-2.4} deltaLabel="vs prev. 30d" />
        <StatCard label="ROAS"            value={"3.8×"}   delta={6.1}  deltaLabel="vs prev. 30d" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 12 }}>
        <Card padding={18}>
          <CardHeader
            eyebrow="Acquisition"
            title="Sessions by channel"
            subtitle="Direct and organic continue to lead — paid is recovering."
          />
          <ResponsiveChartWrap height={210}>
            {(w) => <BarChart width={w} height={210} data={_M_channels} highlightIndex={0} color="var(--chart-1)" />}
          </ResponsiveChartWrap>
        </Card>

        <Card padding={18}>
          <CardHeader eyebrow="Campaigns" title="Recent activity" />
          <ActivityFeed items={_M_campaigns} />
        </Card>
      </div>

      <DetailTableCard
        eyebrow="Marketing"
        title="Campaign performance"
        columns={[
          { key: "name",    label: "Campaign",   sortable: true, tabular: false, render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
          { key: "channel", label: "Channel",    tabular: false },
          { key: "spend",   label: "Spend",      align: "right", sortable: true, render: v => v ? _A_fmtUSD(v) : "—" },
          { key: "conv",    label: "Conv.",      align: "right" },
          { key: "status",  label: "Status",     render: v => (
            v === "live"      ? <Badge tone="positive" dot>Live</Badge>
            : v === "paused"    ? <Badge tone="negative" dot>Paused</Badge>
            : v === "scheduled" ? <Badge tone="info"     dot>Scheduled</Badge>
            :                       <Badge tone="neutral"  dot>Sent</Badge>
          )},
        ]}
        rows={_M_rows}
      />
    </>
  );
}

// =====================================================================
// SUPPORT =============================================================
// =====================================================================
const _SP_volume = _seq(30, i => 32 + Math.sin(i / 2) * 8 + Math.cos(i / 5) * 4);
const _SP_rows = [
  { id: "T-8412", subject: "Refund on order #A-3191",           requester: "Jamal Reed",  priority: "high",   status: "open",     updated: "12m ago" },
  { id: "T-8411", subject: "Can't update shipping address",     requester: "Yuki Sato",   priority: "medium", status: "open",     updated: "38m ago" },
  { id: "T-8410", subject: "Discount code FREESHIP not working", requester: "Lara Tan",    priority: "low",    status: "open",     updated: "1h ago" },
  { id: "T-8409", subject: "Damaged item on arrival",           requester: "Pierre Mahé", priority: "high",   status: "open",     updated: "2h ago" },
  { id: "T-8408", subject: "Question about subscription tier",  requester: "Anya Petrov", priority: "low",    status: "resolved", updated: "3h ago" },
  { id: "T-8407", subject: "Where is my order?",                requester: "Dani Cruz",   priority: "medium", status: "resolved", updated: "Yesterday" },
  { id: "T-8406", subject: "COA request for lot B-2026-184",    requester: "Maya Chen",   priority: "medium", status: "pending",  updated: "Yesterday" },
];
const _SP_activity = [
  { actor: "Jamal Reed",  action: "opened",   target: "Refund on order #A-3191",          time: "12m",       tone: "negative", meta: "#T-8412 · High" },
  { actor: "Yuki Sato",   action: "updated",  target: "Can't update shipping address", time: "38m",       meta: "#T-8411 · Medium" },
  { actor: "Lara Tan",    action: "reported", target: "Discount code FREESHIP not working", time: "1h",     meta: "#T-8410 · Low" },
  { actor: "Pierre Mahé", action: "opened",   target: "Damaged item on arrival",        time: "2h",       tone: "negative", meta: "#T-8409 · High" },
  { actor: "Anya Petrov", action: "resolved", target: "Question about subscription tier", time: "3h",     tone: "positive", meta: "#T-8408" },
  { actor: "Dani Cruz",   action: "resolved", target: "Where is my order?",             time: "Yesterday", tone: "positive", meta: "#T-8407" },
];

function SupportView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Open tickets"      value={"128"}    delta={-4.2} deltaLabel="vs prev. 30d" />
        <StatCard label="First response"    value={"42m"}    delta={-12.4} deltaLabel="vs prev. 30d" />
        <StatCard label="CSAT"              value={"4.62"}   delta={1.8}  deltaLabel="vs prev. 30d" />
        <StatCard label="Resolution time"   value={"6.4 hr"} delta={-8.1} deltaLabel="vs prev. 30d" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 12 }}>
        <Card padding={18}>
          <CardHeader eyebrow="Volume" title="Tickets / day" subtitle="Volume trending down for the third week in a row." />
          <ResponsiveChartWrap height={210}>
            {(w) => <LineChart width={w} height={210} variant="dots" showGrid labels={_A_labels30}
              series={[{ label: "Tickets", data: _SP_volume, color: "var(--chart-1)" }]} />}
          </ResponsiveChartWrap>
        </Card>

        <Card padding={18}>
          <CardHeader eyebrow="Tickets" title="Recent activity" />
          <ActivityFeed items={_SP_activity} />
        </Card>
      </div>

      <DetailTableCard
        eyebrow="Support"
        title="Open tickets"
        columns={[
          { key: "id",        label: "Ticket",   sortable: true, render: v => <span className="mono">{v}</span> },
          { key: "subject",   label: "Subject",  sortable: true, tabular: false, render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
          { key: "requester", label: "Requester", tabular: false },
          { key: "priority",  label: "Priority", render: v => (
            v === "high"   ? <Badge tone="negative" dot>High</Badge>
            : v === "medium" ? <Badge tone="neutral"  dot>Medium</Badge>
            :                  <Badge tone="neutral"  dot>Low</Badge>
          )},
          { key: "status",    label: "Status",   render: v => (
            v === "resolved" ? <Badge tone="positive" dot>Resolved</Badge>
            : v === "pending"  ? <Badge tone="info"     dot>Pending</Badge>
            :                    <Badge tone="negative" dot>Open</Badge>
          )},
          { key: "updated",   label: "Updated",  align: "right", tabular: false, render: v => <span style={{ color: "var(--fg-subtle)" }}>{v}</span> },
        ]}
        rows={_SP_rows}
      />
    </>
  );
}

// =====================================================================
// DELIVERIES ==========================================================
// =====================================================================
const _D_byDay     = _A_dow.map((d, i) => ({ label: d, value: [38, 44, 52, 48, 61, 28, 22][i] }));
const _D_rows = [
  { id: "SH-8841", account: "Pacific Naturals",   carrier: "UPS Ground",  units: 240, status: "delivered",  eta: "Delivered 2h ago" },
  { id: "SH-8840", account: "Mountain Herb Co.",  carrier: "FedEx",       units: 120, status: "in_transit", eta: "ETA tomorrow" },
  { id: "SH-8839", account: "Green Leaf Dist.",   carrier: "UPS Ground",  units: 480, status: "picked",     eta: "Ships today 4pm" },
  { id: "SH-8838", account: "Summit Wholesale",   carrier: "LTL Freight", units: 960, status: "exception",  eta: "Weather delay" },
  { id: "SH-8837", account: "Coastal Botanicals", carrier: "FedEx",       units: 80,  status: "delivered",  eta: "Delivered 5h ago" },
  { id: "SH-8836", account: "River City Supply",  carrier: "UPS Ground",  units: 360, status: "in_transit", eta: "ETA May 22" },
  { id: "SH-8835", account: "Desert Sun Trading", carrier: "FedEx",       units: 200, status: "delivered",  eta: "Delivered yesterday" },
];
const _D_activity = [
  { actor: "SH-8841", action: "delivered to", target: "Pacific Naturals",   time: "2h ago",      tone: "positive", meta: "UPS Ground · 240 units" },
  { actor: "SH-8840", action: "in transit to", target: "Mountain Herb Co.", time: "ETA tomorrow", meta: "FedEx · 120 units" },
  { actor: "SH-8839", action: "picked for",  target: "Green Leaf Dist.",  time: "Ships 4pm",   meta: "UPS Ground · 480 units" },
  { actor: "SH-8838", action: "exception on", target: "Summit Wholesale", time: "Weather delay", tone: "negative", meta: "LTL Freight · 960 units" },
  { actor: "SH-8837", action: "delivered to", target: "Coastal Botanicals", time: "5h ago",      tone: "positive", meta: "FedEx · 80 units" },
  { actor: "SH-8836", action: "in transit to", target: "River City Supply", time: "ETA May 22",  meta: "UPS Ground · 360 units" },
];

function DeliveriesView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Shipments (7d)" value={"312"} delta={5.2} deltaLabel="vs prev. 7d" />
        <StatCard label="On-time delivery" value={"96.1%"} delta={1.4} deltaLabel="vs prev. 7d" />
        <StatCard label="Avg transit" value={"2.4 days"} delta={-0.2} deltaLabel="vs prev. 7d" />
        <StatCard label="Exceptions" value={"4"} delta={-2} deltaLabel="open now" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 12 }}>
        <Card padding={18}>
          <CardHeader
            eyebrow="Deliveries"
            title="Outbound volume by day"
            subtitle="Wholesale and DTC shipments from fulfillment nodes."
          />
          <ResponsiveChartWrap height={210}>
            {(w) => <BarChart width={w} height={210} data={_D_byDay} highlightIndex={4} color="var(--chart-1)" />}
          </ResponsiveChartWrap>
        </Card>

        <Card padding={18}>
          <CardHeader eyebrow="Shipments" title="Recent activity" />
          <ActivityFeed items={_D_activity} />
        </Card>
      </div>

      <DetailTableCard
        eyebrow="Deliveries"
        title="Active & recent shipments"
        columns={[
          { key: "id",      label: "Shipment", sortable: true, render: v => <span className="mono">{v}</span> },
          { key: "account", label: "Account",  sortable: true, tabular: false, render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
          { key: "carrier", label: "Carrier",  tabular: false },
          { key: "units",   label: "Units",    align: "right" },
          { key: "status",  label: "Status",   render: v => (
            v === "delivered"  ? <Badge tone="positive" dot>Delivered</Badge>
            : v === "in_transit" ? <Badge tone="neutral"  dot>In transit</Badge>
            : v === "picked"     ? <Badge tone="info"     dot>Picked</Badge>
            :                      <Badge tone="negative" dot>Exception</Badge>
          )},
          { key: "eta",     label: "ETA / status", align: "right", tabular: false, render: v => <span style={{ color: "var(--fg-subtle)" }}>{v}</span> },
        ]}
        rows={_D_rows}
      />
    </>
  );
}

// =====================================================================
// Page wrapper ========================================================
// =====================================================================
function Analytics() {
  const [tab, setTab] = React.useState("activity");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1400 }}>
      <PageHeader
        title="Dashboard"
        titleBadge="EXAMPLE"
        collapsible
        autoHideIntroMs={15000}
        introStorageKey="dashboard-intro-open"
        subtitle="A visual illustration of how leadership can access the most important real-time metrics in one place through platform APIs—highly customizable, without juggling separate logins, and without manual reporting processes."
        subtitleStyle={{
          fontSize: "var(--text-sm)",
          maxWidth: 780,
          lineHeight: 1.55,
        }}
        tabs={[
          { value: "activity",   label: "Activity" },
          { value: "orders",     label: "Orders" },
          { value: "deliveries", label: "Deliveries" },
          { value: "production", label: "Production" },
          { value: "revenue",    label: "Revenue" },
          { value: "sales",      label: "Sales" },
          { value: "marketing",  label: "Marketing" },
          { value: "support",    label: "Support" },
        ]}
        activeTab={tab}
        onTabChange={setTab}
      />

      {tab === "activity"   && <ActivityView />}
      {tab === "revenue"    && <RevenueView />}
      {tab === "orders"     && <OrdersView />}
      {tab === "production" && <ProductionView />}
      {tab === "sales"      && <SalesView />}
      {tab === "marketing"  && <MarketingView />}
      {tab === "support"    && <SupportView />}
      {tab === "deliveries" && <DeliveriesView />}
    </div>
  );
}

window.Analytics = Analytics;
