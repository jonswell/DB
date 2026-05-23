/* global React, Card, CardHeader, Button, IconButton, Badge, Avatar, Divider,
   SegmentedControl, Sparkline, LineChart, BarChart, Donut,
   StatCard, DataTable, ActivityFeed, EmptyState, WelcomeVideoCard, Icon */

// Mock data ------------------------------------------------------------------
const revenueData = [12.4, 13.1, 12.8, 14.6, 15.2, 14.9, 16.3, 17.1, 16.8, 18.2, 19.4, 21.0, 20.4, 22.6, 24.1, 23.8, 25.6, 27.2, 28.4, 27.9, 29.6, 31.2, 33.0, 32.4, 34.7, 36.1, 37.8, 39.4, 41.2, 42.9];
const compareData = [10.1, 10.8, 11.2, 11.6, 12.0, 12.5, 13.0, 13.4, 13.8, 14.1, 14.5, 14.9, 15.4, 15.9, 16.3, 16.8, 17.2, 17.6, 18.0, 18.5, 19.0, 19.4, 19.8, 20.3, 20.7, 21.1, 21.6, 22.0, 22.5, 23.0];
const dayLabels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

const sessionsData  = [220, 245, 270, 260, 280, 300, 295, 310, 305, 330, 360, 348];
const conversionData= [2.1, 2.3, 2.4, 2.6, 2.5, 2.7, 2.9, 3.1, 3.0, 3.4, 3.6, 3.5];
const aovData       = [42, 41, 43, 44, 46, 45, 47, 49, 48, 51, 53, 52];

const channelBars = [
  { label: "Mon", value: 312 },
  { label: "Tue", value: 286 },
  { label: "Wed", value: 401 },
  { label: "Thu", value: 358 },
  { label: "Fri", value: 487 },
  { label: "Sat", value: 612 },
  { label: "Sun", value: 524 },
];

const tableRows = [
  { product: "Helix Notebook",   sku: "HLX-NB-01", units: 1284, revenue: 38520.00, change: 12.4, status: "active" },
  { product: "Loop Backpack",    sku: "LOOP-BP-02", units: 962,  revenue: 28860.00, change: 8.1,  status: "active" },
  { product: "Arc Lamp",         sku: "ARC-LMP-04", units: 718,  revenue: 21540.00, change: -3.2, status: "active" },
  { product: "Field Cap",        sku: "FLD-CAP-03", units: 540,  revenue: 10800.00, change: 4.6,  status: "active" },
  { product: "Quartz Watch",     sku: "QTZ-WTC-01", units: 412,  revenue: 24720.00, change: 22.8, status: "low" },
  { product: "Linen Tote",       sku: "LIN-TOT-02", units: 298,  revenue:  5960.00, change: -1.4, status: "active" },
  { product: "Mesa Mug",         sku: "MSA-MUG-01", units: 264,  revenue:  3168.00, change: 0.0,  status: "draft" },
];

const activity = [
  { actor: "Jordan Park",  action: "approved the report",          target: "Q2 Acquisition", time: "2m",  tone: "positive" },
  { actor: "Maya Chen",    action: "exported",                     target: "Revenue by SKU", time: "14m" },
  { actor: "System",       action: "flagged inventory low for",    target: "Quartz Watch",   time: "1h",  tone: "negative", meta: "Below reorder threshold" },
  { actor: "Sam Ortega",   action: "shared dashboard with",        target: "Finance team",   time: "3h" },
  { actor: "Maya Chen",    action: "created widget",               target: "Channel Mix",    time: "Yesterday" },
  { actor: "System",       action: "scheduled weekly digest",      target: "",               time: "2d ago", meta: "Every Monday, 9:00" },
];

const fmtUSD = v => "$" + (v >= 1000 ? (v / 1000).toFixed(1) + "k" : v.toFixed(2));
const fmtUSDfull = v => "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Page -----------------------------------------------------------------------
function Overview() {
  return (
    <div className="plan90-page">
      <div className="plan90-layout plan90-layout--overview">
        <div className="plan90-main">
          <WelcomeVideoCard
            className="plan90-welcome-video"
            fit="cover"
            style={{ height: "100%" }}
            src="./assets/90days.mov"
            badge="Welcome video"
            eyebrow={null}
            title="Chief of Staff · Diversified Botanics"
            subtitle={null}
            chapters={null}
          />
        </div>

        <aside className="plan90-aside">
          <div className="plan90-aside__stack">
            <Card padding={18} className="plan90-outline">
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <p className="card-subtitle">
                  Diversified Botanics is in a strong position to leverage systems automation, operational infrastructure, and agentic AI workflows to accelerate growth and scale the business efficiently. The first 90 days are focused on building the operational foundation for greater visibility, accountability, communication, and execution across the organization.
                </p>
                <p className="card-subtitle">
                  The framework emphasizes stronger operational rhythm, KPI-driven management, clearer ownership, and scalable systems that reduce friction between teams while creating real-time insight into company performance. By stabilizing execution and improving how information flows across the business, the organization can begin layering in AI-enabled workflows, automation, and decision-support systems that increase speed, efficiency, and leverage a shared knowledge base across all dimensions of the business.
                </p>
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Small helpers --------------------------------------------------------------
function Legend({ dot, label, dashed }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--fg-subtle)", whiteSpace: "nowrap" }}>
      <span style={{
        width: 14, height: 0, borderTop: `1.5px ${dashed ? "dashed" : "solid"} ${dot}`,
        display: "inline-block",
      }} />
      {label}
    </span>
  );
}

function ResponsiveChartWrap({ children, height }) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(600);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => {
      const cw = entries[0].contentRect.width;
      if (cw && Math.abs(cw - w) > 2) setW(cw);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: "100%", height, position: "relative" }}>
      {children(w)}
    </div>
  );
}

Object.assign(window, { Overview, ResponsiveChartWrap, Legend, fmtUSDfull, fmtUSD });
