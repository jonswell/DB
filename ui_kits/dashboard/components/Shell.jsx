/* global React, Icon, IconButton, Avatar */
// Forma — App Shell: Sidebar + Topbar + Page chrome

function Sidebar({ active = "overview", brand = "Forma", onNav }) {
  const sections = [
    {
      label: null,
      items: [
        { id: "overview",  icon: "layout-dashboard", label: "Overview" },
        { id: "analytics", icon: "bar-chart-3",      label: "Analytics" },
        { id: "reports",   icon: "file-text",        label: "Reports" },
        { id: "audience",  icon: "users",            label: "Audience" },
      ]
    },
    {
      label: "Workspace",
      items: [
        { id: "projects", icon: "folder",  label: "Projects", trailing: "12" },
        { id: "team",     icon: "user",    label: "Team" },
        { id: "billing",  icon: "wallet",  label: "Billing" },
      ]
    },
    {
      label: "Account",
      items: [
        { id: "settings", icon: "settings",      label: "Settings" },
        { id: "support",  icon: "life-buoy",     label: "Help & support" },
      ]
    },
  ];

  return React.createElement("aside", {
    style: {
      width: 220, height: "100%", flexShrink: 0,
      background: "var(--surface)",
      borderRight: "0.5px solid var(--border)",
      display: "flex", flexDirection: "column",
      padding: "16px 12px 12px",
    }
  },
    /* Brand */
    React.createElement("div", {
      style: { display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 16px" }
    },
      React.createElement("div", {
        style: {
          width: 22, height: 22, borderRadius: 6,
          background: "var(--accent)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          color: "var(--accent-fg)", fontWeight: 700, fontSize: 11, letterSpacing: "-0.02em",
        }
      }, brand[0]),
      React.createElement("span", { style: { fontSize: "var(--text-md)", fontWeight: 600, letterSpacing: "-0.015em", color: "var(--fg)" } }, brand),
      React.createElement("div", { style: { flex: 1 } }),
      React.createElement(IconButton, { icon: "chevrons-left", label: "Collapse", size: 24 }),
    ),

    /* Workspace switcher */
    React.createElement("button", {
      style: {
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 10px", margin: "0 0 10px",
        background: "transparent", border: "0.5px solid var(--border)",
        borderRadius: "var(--radius-sm)", cursor: "pointer",
        fontFamily: "var(--font-sans)", textAlign: "left",
      }
    },
      React.createElement("div", { style: { width: 18, height: 18, borderRadius: 4, background: "var(--neutral-200)" } }),
      React.createElement("div", { style: { flex: 1, minWidth: 0 } },
        React.createElement("div", { style: { fontSize: 11, color: "var(--fg-faint)", lineHeight: 1.2 } }, "Workspace"),
        React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--fg)", fontWeight: 500, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, "Acme Co."),
      ),
      React.createElement(Icon, { name: "chevrons-up-down", size: 12, color: "var(--fg-faint)" }),
    ),

    /* Nav */
    React.createElement("nav", { style: { display: "flex", flexDirection: "column", gap: 14, flex: 1, overflowY: "auto" } },
      sections.map((sec, i) =>
        React.createElement("div", { key: i, style: { display: "flex", flexDirection: "column", gap: 1 } },
          sec.label && React.createElement("div", {
            className: "eyebrow",
            style: { padding: "8px 10px 4px", fontSize: 10 }
          }, sec.label),
          ...sec.items.map(item => React.createElement(NavItem, {
            key: item.id,
            ...item,
            active: item.id === active,
            onClick: () => onNav && onNav(item.id)
          }))
        )
      )
    ),

    /* Bottom user */
    React.createElement("div", {
      style: {
        marginTop: 8, padding: 8, borderTop: "0.5px solid var(--divider)",
        display: "flex", alignItems: "center", gap: 8,
      }
    },
      React.createElement(Avatar, { name: "Maya Chen", size: 26 }),
      React.createElement("div", { style: { minWidth: 0, flex: 1 } },
        React.createElement("div", { style: { fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--fg)", lineHeight: 1.2 } }, "Maya Chen"),
        React.createElement("div", { style: { fontSize: 11, color: "var(--fg-faint)", lineHeight: 1.2 } }, "maya@acme.co"),
      ),
      React.createElement(IconButton, { icon: "log-out", label: "Sign out", size: 24 }),
    ),
  );
}

function NavItem({ icon, label, active, trailing, onClick }) {
  return React.createElement("button", {
    onClick,
    style: {
      display: "flex", alignItems: "center", gap: 10,
      padding: "6px 10px", border: 0, cursor: "pointer",
      background: active ? "var(--neutral-100)" : "transparent",
      color: active ? "var(--fg)" : "var(--fg-muted)",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
      fontWeight: active ? 500 : 400,
      textAlign: "left",
      transition: "background var(--dur) var(--ease-out), color var(--dur) var(--ease-out)",
    },
    onMouseEnter: e => { if (!active) e.currentTarget.style.background = "var(--neutral-50)"; },
    onMouseLeave: e => { if (!active) e.currentTarget.style.background = "transparent"; },
  },
    React.createElement(Icon, { name: icon, size: 14, color: active ? "var(--fg)" : "var(--fg-subtle)" }),
    React.createElement("span", { style: { flex: 1 } }, label),
    trailing && React.createElement("span", { style: { fontSize: 11, color: "var(--fg-faint)", fontVariantNumeric: "tabular-nums" } }, trailing),
  );
}

// ----- Topbar (now includes brand + horizontal nav) ----------------------
function Topbar({ active = "overview", onNav, actions }) {
  const nav = [
    { id: "overview",     label: "Overview" },
    { id: "plan90",       label: "90 Day Assessment" },
    { id: "dashboard",    label: "Example" },
  ];

  const navBtnStyle = (isActive) => ({
    background: "transparent",
    color:      isActive ? "var(--fg)" : "var(--fg-muted)",
    border: 0, cursor: "pointer",
    borderRadius: "var(--radius-sm)",
    padding: "6px 10px", height: 28,
    fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
    fontWeight: isActive ? 500 : 400,
    letterSpacing: "-0.005em",
    transition: "background var(--dur) var(--ease-out), color var(--dur) var(--ease-out)",
  });

  return React.createElement("header", {
    style: {
      height: 56, flexShrink: 0,
      background: "transparent",
      display: "flex", alignItems: "center", gap: 20,
      padding: "0 20px",
    }
  },
    // Brand
    React.createElement("div", {
      style: { display: "flex", alignItems: "center", paddingRight: 4, flexShrink: 0 }
    },
      React.createElement("img", {
        src: "../../assets/diversified-botanics-logo-transparent.png",
        alt: "Diversified Botanics",
        height: 22,
        style: {
          display: "block",
          height: 22,
          width: "auto",
          objectFit: "contain",
          objectPosition: "left center",
        },
      }),
    ),

    // Divider between brand and nav
    React.createElement("div", { style: { width: 1, height: 18, background: "var(--divider)" } }),

    React.createElement("nav", { style: { display: "flex", alignItems: "center", gap: 2 } },
      ...nav.map(item => {
        const isActive = active === item.id;
        return React.createElement("button", {
          key: item.id,
          type: "button",
          onClick: () => {
            if (!onNav) return;
            if (item.id === "dashboard" && isActive) onNav("overview");
            else onNav(item.id);
          },
          style: navBtnStyle(isActive),
        }, item.label);
      }),
    ),
  );
}

// ----- PageHeader (inside content area) -----------------------------------
function PageHeaderTitle({ title, size, badge }) {
  const h1Style = size === "lg"
    ? { fontSize: "var(--text-lg)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--fg)", margin: 0 }
    : { fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--fg)", margin: 0 };
  return React.createElement("div", { className: "page-header__title-row" },
    React.createElement("h1", { style: h1Style },
      title,
      badge && React.createElement("span", { className: "page-header__example-pill" }, badge),
    ),
  );
}

function PageHeader({
  title, subtitle, subtitleStyle, actions, tabs, activeTab, onTabChange,
  collapsible, introStorageKey, autoHideIntroMs, titleBadge,
}) {
  const hasIntro = !!(title || subtitle);
  const storageKey = introStorageKey || (collapsible && title ? `pageheader-intro:${title}` : null);

  const [introOpen, setIntroOpen] = React.useState(() => {
    if (!storageKey) return true;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) return stored === "1";
    } catch (_) { /* ignore */ }
    return true;
  });

  const setIntro = (open) => {
    setIntroOpen(open);
    if (storageKey) {
      try { localStorage.setItem(storageKey, open ? "1" : "0"); } catch (_) { /* ignore */ }
    }
  };

  React.useEffect(() => {
    if (!collapsible || !hasIntro || !autoHideIntroMs || autoHideIntroMs <= 0) return;
    const timer = setTimeout(() => setIntroOpen(false), autoHideIntroMs);
    return () => clearTimeout(timer);
  }, [collapsible, hasIntro, autoHideIntroMs]);

  const showIntro = hasIntro && (!collapsible || introOpen);
  const showHead = showIntro || actions;
  const introToggle = collapsible && hasIntro && React.createElement(IconButton, {
    icon: introOpen ? "chevron-up" : "chevron-down",
    label: introOpen ? "Hide page description" : "Show page description",
    size: 28,
    onClick: () => setIntro(!introOpen),
  });

  return React.createElement("div", {
    style: { display: "flex", flexDirection: "column", gap: showHead ? 14 : 0, marginBottom: 20 }
  },
    collapsible && hasIntro && !introOpen && React.createElement("div", {
      style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, minHeight: 28 }
    },
      title && React.createElement(PageHeaderTitle, { title, size: "lg", badge: titleBadge }),
      introToggle,
    ),
    showHead && React.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 } },
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start", maxWidth: "100%", flex: 1, minWidth: 0 } },
        showIntro && title && React.createElement(PageHeaderTitle, { title, size: "2xl", badge: titleBadge }),
        showIntro && subtitle && React.createElement("p", {
          style: {
            margin: 0,
            fontSize: "var(--text-md)",
            lineHeight: 1.5,
            color: "var(--fg-subtle)",
            ...subtitleStyle,
          },
        }, subtitle),
      ),
      React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexShrink: 0 } },
        actions,
        collapsible && showIntro && introToggle,
      ),
    ),
    tabs && React.createElement("div", {
      style: { display: "flex", gap: 0, borderBottom: "0.5px solid var(--border)", marginTop: (showHead || (collapsible && hasIntro && !introOpen)) ? 4 : 0 }
    }, tabs.map(t =>
      React.createElement("button", {
        key: t.value,
        onClick: () => onTabChange && onTabChange(t.value),
        style: {
          background: "transparent", border: 0, cursor: "pointer",
          padding: "10px 0", marginRight: 24,
          fontFamily: "var(--font-sans)", fontSize: "var(--text-base)",
          fontWeight: activeTab === t.value ? 500 : 400,
          color: activeTab === t.value ? "var(--fg)" : "var(--fg-subtle)",
          borderBottom: `2px solid ${activeTab === t.value ? "var(--accent)" : "transparent"}`,
          marginBottom: -1,
          transition: "color var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)",
        }
      }, t.label,
        t.count != null && React.createElement("span", {
          style: { marginLeft: 6, color: "var(--fg-faint)", fontVariantNumeric: "tabular-nums" }
        }, t.count)
      )
    )),
  );
}

Object.assign(window, { Sidebar, Topbar, NavItem, PageHeader });
