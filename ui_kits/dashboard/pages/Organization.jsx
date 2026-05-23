/* global React, Card, PageHeader */

// ---------------------------------------------------------------------------
// Page — leadership leverage & coordination moved to Approach tab
// ---------------------------------------------------------------------------
function Organization() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1080 }}>
      <PageHeader
        title="Organization"
        subtitle="Long-term role evolution and personal development live on Systems. Leadership leverage and coordination overhead live on Approach."
      />
      <Card padding={20}>
        <span className="eyebrow" style={{ display: "block", marginBottom: 8 }}>Where to find this content</span>
        <p className="card-body" style={{ margin: 0 }}>
          Approach — leadership leverage model, what founders exit, and three coordination mechanisms.
          Systems — long-term role evolution and personal development areas.
        </p>
      </Card>
    </div>
  );
}

Object.assign(window, { Organization });
