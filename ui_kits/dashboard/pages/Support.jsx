/* global React, Card, CardHeader, Button, Icon */

function Support() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
      <Card padding={22}>
        <CardHeader
          eyebrow="Help"
          title="Support"
          subtitle="Documentation, contact options, and workspace help."
        />
        <p style={{ fontSize: "var(--text-md)", color: "var(--fg-muted)", lineHeight: 1.55, margin: "0 0 16px" }}>
          Reach the operations team for access issues, data questions, or dashboard configuration. Response targets are listed in your workspace SLA.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button variant="primary" size="sm" iconLeft="life-buoy">Contact support</Button>
          <Button variant="secondary" size="sm" iconLeft="file-text">View docs</Button>
        </div>
      </Card>
    </div>
  );
}

window.Support = Support;
