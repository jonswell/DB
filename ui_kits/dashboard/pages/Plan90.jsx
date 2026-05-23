/* global React, Card, CardHeader, PageHeader,
   leadershipBuckets, orgRolePhases, healthCategories,
   stack, automationDomains, accents */

// ---------------------------------------------------------------------------
// 90 Day Plan — question as header, answer as subheader, supporting cards below
// ---------------------------------------------------------------------------

const plan90Sections = [
  {
    id: "inventory",
    phase: "Phase 01",
    range: "Days 1–14",
    navTitle: "Priorities",
    topics: [
      {
        q: "What are the first three priorities for the first 90 days?",
        a: "In order to support the CEO, it is paramount that the CoS has integrated with the team and gained a 360° perspective of the business. The first 90 days should be a ramp from integration to execution.",
        blocks: [
          {
            type: "priorities",
            items: [
              {
                n: 1,
                title: "Discovery & Definition",
                body:
                  "Develop a comprehensive understanding of the organization across every dimension that affects execution, through the people and processes that exist today, and define the gaps for bringing strategy into execution. Identify team strengths, weaknesses, and opportunities for infrastructural improvement. Build depth of knowledge in how all aspects of the product and business align with the people and processes today.",
                subitems: [
                  "KPIs, metrics, key initiatives, platform architecture, integrations, and customer dynamics",
                  "Hands-on project work with teams to build trust and understanding of problems before jumping in with solutions",
                  "Actionable improvements for operational bottlenecks, process quality, data hygiene, project management, and meeting effectiveness",
                  "Validate performance levers that can unlock organizational capability, efficiency, and automation",
                ],
              },
              {
                n: 2,
                title: "Operational Cadence",
                body:
                  "Implement and facilitate best practices for team collaboration, communication, and decision-making.",
                subitems: [
                  "Calibrate meeting efficiency and project calendar around priority initiatives",
                  "Adjust meeting schedules and check-ins to drive project milestones and department goals",
                  "Ladder daily, weekly, and monthly tasks and meeting schedules to KPIs",
                  "Leverage cross-functional project management frameworks to bring the whole team into the same rhythm",
                ],
              },
              {
                n: 3,
                title: "Foundation for Accountability",
                body:
                  "Clarity of ownership, acknowledgement of success, and consistent communication of expectations enforce social workplace norms that create a culture of accountability.",
                subitems: [
                  "Creating a visible, laddered structure for cascading goals from company level through department to daily work — everyone knows how they impact company goals and feels responsible to the team, not just leadership",
                  "Establishing clear decision rights and ownership for every project and department function",
                  "Building channels to celebrate wins and reinforce a culture of accountability",
                  "Making KPIs the primary topic of conversation across the organization",
                  "Calibrating performance mechanics with team leads and metric-led management in areas that are not keeping pace",
                  "Implementing time-saving automations, workflow improvements, and a layer of visibility across the company where it can eliminate communication gaps or data silos",
                ],
              },
            ],
          },
        ],
      },
      {
        q: "Why that sequence?",
        blocks: [
          {
            type: "priorities",
            numbered: true,
            items: [
              {
                n: 1,
                title: "Discovery & Definition",
                body:
                  "Understanding current company and business dynamics is critical to lead and get buy-in from the team and executive leadership. Aligning an execution strategy with Ryan and Ari first will allow the CoS to work directly with the team and free up Ryan from day-to-day management.",
              },
              {
                n: 2,
                title: "Operational Cadence",
                body:
                  "With an understanding of the team's capacity, capabilities, and workload, the CoS will have the knowledge to streamline the workforce around priorities and provide the right level of hands-on support to transition to an accelerated pace.",
              },
              {
                n: 3,
                title: "Foundation for Accountability",
                body:
                  "Systems infrastructure can be implemented more seamlessly around a team that has clear ownership structure around goals and deadlines. Systems will complement this through visibility first. This will also give leadership better insight into human-reliant workflows and areas for agentic automation.",
              },
            ],
          },
        ],
      },
      {
        q: "What must stabilize before anything else is optimized?",
        a: "Clarity, decision velocity, and reliable execution towards KPIs. Aligning platform tools is paramount to stabilize. And as the pace accelerates, it will elevate and prioritize technical solutions to be implemented. The team must also be able to operate without relying on Ryan's operational skillset or tribal knowledge to make decisions and get things done.",
        blocks: [
          {
            type: "bullets",
            label: "Immediate focus area to address",
            flat: true,
            circle: true,
            items: [
              "Multiple initiatives active with inconsistent visibility",
              "Ownership unclear when projects stall",
              "Heavy manual coordination in Slack",
              "Critical knowledge lives in people, not systems",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "rhythm",
    phase: "Phase 02",
    range: "Days 7–21",
    navTitle: "Operating rhythm",
    topics: [
      {
        q: "How do initiatives move from decision → execution → completion?",
        a: "Set standards for ownership in each department function, department KPIs, project objectives, and company-wide initiatives, reinforced in practice through project management software: assignments, task tracking, dependencies, meeting structure, and scheduling. Projects should have formal kick-offs with key stakeholders only after meeting with the CoS to align objectives and outcomes with priorities and team bandwidth. Staged milestones should be set for completing key deliverables so the execution pipeline does not bottleneck. This is also a key element to drive accountability in practice.",
      },
      {
        q: "What rhythms and systems come first?",
        a: "Weekly syncs across leadership, departments, and core functions. Paired with systems work to align ClickUp, Slack, sales and marketing platforms, ERP, and the knowledge base around KPIs and goals.",
        blocks: [
          {
            type: "split",
            label: "Rhythm & systems",
            flat: true,
            cols: [
              {
                title: "Operating rhythm",
                items: [
                  "Weekly leadership team sync",
                  "Weekly department leads sync",
                  "Sales and marketing funnel weekly",
                  "Weekly production sync",
                  "Project-based check-in schedule",
                  "Bi-weekly finance / HR sync",
                ],
              },
              {
                title: "Systems",
                items: [
                  {
                    title: "ClickUp + Slack",
                    detail: "Optimize sync between ClickUp, Slack, and meeting schedule around KPIs and goals",
                  },
                  {
                    title: "Sales & marketing",
                    detail: "Review sales and marketing processes and platform utilization",
                  },
                  {
                    title: "ERP",
                    detail: "Review ERP and production forecasting",
                  },
                  {
                    title: "Knowledge base",
                    detail: "Knowledge base / data lake (department and company)",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        q: "How do you handle leaders who miss commitments?",
        paragraphs: [
          "Diagnose missed commitments on the first miss with the team lead and individual. Log conversations and action plans. Discuss hurdles and priorities to ensure the employee knows the expectations and has the right information to do the job.",
          "Continued misses should be evaluated in a more serious manner. A conversation about the responsibilities of the role may be in order depending on the reason for the miss. Weekly check-ins should be set against a target commitment date.",
          "If the target commitment date is missed, a PIP should be set with the aid of the HR manager and signed off by the CEO. The CEO may meet with the employee based on the nature of the missed commitments.",
          "At this point it is an up-or-out decision for the employee. The company can manage next steps based on performance.",
          "This approach does not take every scenario into account but creates multiple documented touchpoints with escalating cause and effect for under performers.",
        ],
      },
    ],
  },
  {
    id: "knowledge",
    phase: "Phase 03",
    range: "Days 14–60",
    navTitle: "Knowledge & visibility",
    topics: [
      {
        q: "Which tribal knowledge puts the business at greatest risk?",
        a: "Regulatory and compliance: This is a landscape that is moving quickly, with many agencies and protocols to consider. Starting over would be a big headache for the business and would likely rely on expensive outside consulting if that tribal knowledge was lost. This dovetails into every production-floor process that touches the product.",
      },
      {
        q: "What should leadership see in real time?",
        a: "Four internal health lenses plus external events in the regulatory landscape.",
        blocks: [
          { type: "healthGrid", label: "Core health lenses" },
        ],
      },
      {
        q: "How do KPIs connect to the operating roadmap?",
        paragraphs: [
          "All KPIs should originate from and contribute to company goals. Company goals are achieved through milestones and project completion. Those are achieved by hitting the defined KPIs.",
          "All KPIs should be plotted by the department or project team and tie directly to projects in Asana or ClickUp. Projects should tie to a major initiative, milestone, or subset of KPIs.",
          "KPIs also connect to the day-to-day operations of teams across marketing, sales, support, and supply chain. Any KPI can be boiled down to the daily metrics needed to hit quarterly KPIs.",
          "These all tie to the operating budget: how we track to forecast, where we need to increase spend, or where spend has increased without improvement to our KPIs. Performance against KPIs should inform quarterly strategy and planning decisions.",
        ],
      },
    ],
  },
  {
    id: "systems",
    phase: "Phase 04",
    range: "Days 60–90",
    navTitle: "Systems & leverage",
    topics: [
      {
        q: "What Should Be Automated First",
        a: "Focus on workflows that are high-volume, repetitive, and low-risk:",
        blocks: [
          {
            type: "table",
            label: "Automation opportunities",
            flat: true,
            rows: [
              {
                label: "Order communications",
                value:
                  "Confirmation emails, shipping notifications, reorder reminders, and status updates are nearly fully automatable",
              },
              {
                label: "Internal reporting",
                value: "Real-time dashboards replace manual data aggregation entirely",
              },
              {
                label: "Supplier communication",
                value: "PO monitoring, overdue delivery flags, and follow-up sequences can be automated",
              },
              {
                label: "Compliance documentation",
                value:
                  "COA summaries, certificate expiration tracking, compliance first drafts, and regulatory change alerts can be automated",
              },
            ],
          },
        ],
      },
      {
        q: "What Must Remain Human",
        a: "Anything touching product integrity, wholesale partner trust, or regulatory standing must remain human-led with system support — not system-led with human oversight.",
        blocks: [
          {
            type: "bullets",
            flat: true,
            circle: true,
            items: [
              "Quality control decisions on raw botanical material",
              "Key wholesale account relationships with meaningful revenue concentration",
              "Regulatory strategy in a scrutinized category",
              "All hiring, performance, and culture decisions",
              "Brand direction and product strategy",
            ],
          },
          {
            type: "bullets",
            label: "Where AI Realistically Solves Bottlenecks",
            flat: true,
            items: [
              "Near-term genuine value comes from knowledge retrieval, operational pattern detection, first-draft generation for high-volume documents, and meeting intelligence. AI can capture decisions and action items accurately without manual effort, eliminating rework and communication delays.",
            ],
          },
        ],
      },
      {
        q: "What is the operating intelligence stack?",
        blocks: [{ type: "stackPath", label: "Operating intelligence stack" }],
      },
      {
        q: "Give examples of AI-enabled workflows, automations, dashboards, agents, or operational systems you would explore implementing.",
        blocks: [
          {
            type: "priorities",
            items: [
              {
                n: 1,
                title: "Internal Knowledge Agent",
                body:
                  "Build a searchable, AI-queryable knowledge base indexed against documented processes, compliance requirements, supplier standards, product specifications, and SOPs. Any team member can ask a natural language question and receive a sourced, accurate answer instead of interrupting a colleague. This is the first priority because it multiplies the effectiveness of existing documentation and frees leadership from answering routine questions.",
              },
              {
                n: 2,
                title: "Wholesale Account Health Monitoring",
                body:
                  "Use sales data, order frequency, and account history to surface early churn signals and trigger automated human follow-up workflows. This enables proactive relationship management before customers slip away.",
              },
              {
                n: 3,
                title: "Compliance Monitoring and Documentation Assistant",
                body:
                  "Track regulatory developments relevant to kava and kratom, summarize changes in plain language, and draft required documentation for human review. This is risk management infrastructure, not a convenience feature.",
              },
              {
                n: 4,
                title: "Operational Anomaly Detection",
                body:
                  "Monitor batch yields, raw material quality metrics, supplier lead times, and inventory levels against historical baselines. Surface deviations before they become crises.",
              },
            ],
          },
          { type: "stackLayer", label: "Dashboard modules", layer: "dashboard", flat: true },
        ],
      },
      {
        q: "What is the operating intelligence architecture — and where does automation apply?",
        blocks: [
          { type: "architecture", label: "Architecture" },
        ],
      },
      {
        q: "Where do you believe AI creates the greatest leverage operationally?",
        a: "AI creates greatest operational leverage in integrations, systems administration, workflow automation, data intelligence, prototyping, and elimination of busywork. The common thread: AI excels where volume is high, the task is repetitive, and the stakes of a single error are low.",
        blocks: [],
      },
      {
        q: "Where do you think companies misuse AI operationally?",
        a: "Summaries without data, chatbots on broken workflows, and automation before ownership exists.",
        blocks: [
          {
            type: "accentCards",
            label: "Anti-patterns",
            cards: [
              { title: "No data layer", accent: "orange", lines: ["Strategy theater", "Untrusted summaries"] },
              { title: "Broken workflow", accent: "orange", lines: ["Chatbot on chaos", "Vanity dashboards"] },
              { title: "Wrong sequence", accent: "neutral", lines: ["Automate before ownership", "No single owner"] },
            ],
          },
          {
            type: "priorities",
            items: [
              {
                n: 1,
                title: "Automating Unclean Processes",
                body:
                  "Deploying AI before underlying data is clean and processes are documented amplifies garbage. Garbage in moves faster with AI. Always establish process clarity and data quality first.",
              },
              {
                n: 2,
                title: "Cost Cutting Instead of Capability Expansion",
                body:
                  "Treat AI deployment as capability expansion, not headcount reduction. Hollowing out human functions before AI systems are reliable enough to replace them creates risk and destroys morale.",
              },
            ],
          },
        ],
        footer:
          "The right approach: AI handles scaling and repetition; humans focus on judgment, exceptions, and relationships.",
      },
      {
        q: "What should Ryan and Ari stop doing because of this role?",
        a: "Initiative tracking, cross-functional coordination, status loops, operational admin, and routine approvals within documented thresholds. They keep strategy, capital, partnerships, brand, senior talent, and external regulatory matters.",
        blocks: [
          {
            type: "buckets",
            label: "Leadership leverage model",
            lead: "Ryan's highest-value work is direction, capital, partnerships, and culture — not operational coordination.",
            buckets: leadershipBuckets,
          },
        ],
      },
      {
        q: "How does the role evolve as the company matures?",
        paragraphs: [
          "The business has a strong footing to reach steady state growth in the current regulatory environment and can be set up to absorb additional wins if positive direction as well as be set up for self balanced business. The outcome for the company hinges on the regulatory landscape but is currently positioned to execute against multiple scenarios.",
          "The role will transition from optimizing the team, workflows and process into scaling systems to grow the business with less resources.",
          "Operationally the business harness that is created will give the optionality for net-new value creation and/or a copy+paste to expansion strategy in the same market or across different industries.",
        ],
        blocks: [
          {
            type: "phases",
            label: "Role evolution",
            phases: orgRolePhases,
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Systems-derived visuals (from Automation.jsx / AutomationData.jsx)
// ---------------------------------------------------------------------------
const STACK_PATH_IDS = ["sources", "etl", "store", "dashboard", "ai"];

function Plan90StackPath({ label }) {
  return (
    <Plan90Card label={label}>
      <div className="qa-stack-path">
        {STACK_PATH_IDS.map((id) => {
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
    </Plan90Card>
  );
}

function Plan90StackLayerCards({ label, layerId, flat }) {
  const layer = stack.find((l) => l.id === layerId);
  if (!layer?.cards) return null;
  const cols = layer.cards.length >= 6 ? 3 : layer.cards.length >= 5 ? 3 : layer.cards.length <= 2 ? 2 : 3;
  const tiles = (
    <div className={`plan90-tiles plan90-tiles--${cols}`}>
      {layer.cards.map((c, i) => (
        <div
          key={i}
          className="plan90-tile plan90-tile--stack"
          style={{ "--plan90-stack-accent": accents[c.accent] || accents.neutral }}
        >
          <div className="plan90-tile__title">{c.title}</div>
          {c.lines && (
            <ul className="plan90-bullets plan90-bullets--compact">
              {c.lines.map((line, j) => <li key={j}>{line}</li>)}
            </ul>
          )}
          {(c.cadence || c.source) && (
            <p className="plan90-tile__meta">
              {[c.cadence, c.source].filter(Boolean).join(" · ")}
            </p>
          )}
          {c.meta && !c.cadence && <p className="plan90-tile__meta">{c.meta}</p>}
        </div>
      ))}
    </div>
  );

  if (flat) {
    return (
      <div className="plan90-support-block">
        {label && <div className="plan90-support-block__label">{label}</div>}
        {layer.note && <p className="plan90-support-block__note">{layer.note}</p>}
        {tiles}
      </div>
    );
  }

  return (
    <Plan90Card label={label} note={layer.note}>
      {tiles}
    </Plan90Card>
  );
}

function Plan90HealthGrid({ label }) {
  return (
    <div className="plan90-support-block">
      {label && <div className="plan90-support-block__label">{label}</div>}
      <div className="plan90-health-grid">
        {healthCategories.map((h, i) => (
          <div key={h.id} className="plan90-health-cell">
            <div className="plan90-health-cell__head">
              <span className="plan90-bucket__dot" style={{ background: accents[h.accent] }} />
              <span className="plan90-health-cell__index">{String(i + 1).padStart(2, "0")}</span>
              <span className="plan90-health-cell__title">{h.title}</span>
            </div>
            <span className="plan90-health-cell__cadence">{h.cadence}</span>
            <ul className="plan90-bullets plan90-bullets--compact">
              {h.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Plan90Alerts({ label }) {
  const store = stack.find((l) => l.id === "store");
  const rules = store?.threeCol?.find((c) => c.rules)?.rules || [];
  return (
    <Plan90Card label={label} note="Rule-based now → ML anomaly detection later">
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
    </Plan90Card>
  );
}

function Plan90Architecture({ label }) {
  const Diagram = window.SystemsStackDiagram;
  if (!Diagram) return null;
  return (
    <div className="plan90-support-block plan90-support-block--reference">
      {label && <div className="plan90-support-block__label">{label}</div>}
      <Diagram dense />
    </div>
  );
}

function Plan90Domains({ label }) {
  const Domains = window.SystemsAutomationDomains;
  if (!Domains) return null;
  return (
    <div className="plan90-support-block plan90-support-block--reference">
      {label && <div className="plan90-support-block__label">{label}</div>}
      <Domains dense />
    </div>
  );
}

function Plan90AccentCards({ label, cards }) {
  const cols = cards.length <= 2 ? 2 : 3;
  return (
    <Plan90Card label={label}>
      <div className={`plan90-tiles plan90-tiles--${cols}`}>
        {cards.map((c, i) => (
          <div
            key={i}
            className="plan90-tile plan90-tile--stack"
            style={{ "--plan90-stack-accent": accents[c.accent] || accents.neutral }}
          >
            <div className="plan90-tile__title">{c.title}</div>
            <ul className="plan90-bullets plan90-bullets--compact">
              {c.lines.map((line, j) => <li key={j}>{line}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Plan90Card>
  );
}

// ---------------------------------------------------------------------------
// Card shell — supporting content only
// ---------------------------------------------------------------------------
function Plan90Card({ label, note, lead, children }) {
  return (
    <Card className="plan90-card" padding={20}>
      <header className="plan90-card__head">
        <h3 className="plan90-card__label">{label}</h3>
        {lead && <p className="plan90-card__lead">{lead}</p>}
        {note && <p className="plan90-card__note">{note}</p>}
      </header>
      <div className="plan90-card__body">{children}</div>
    </Card>
  );
}

function PlanBlock({ block }) {
  if (block.type === "stackPath") {
    return <Plan90StackPath label={block.label} />;
  }

  if (block.type === "architecture") {
    return <Plan90Architecture label={block.label} />;
  }

  if (block.type === "domains") {
    return <Plan90Domains label={block.label} />;
  }

  if (block.type === "stackLayer") {
    return (
      <Plan90StackLayerCards
        label={block.label}
        layerId={block.layer}
        flat={block.flat}
      />
    );
  }

  if (block.type === "healthGrid") {
    return <Plan90HealthGrid label={block.label} />;
  }

  if (block.type === "alerts") {
    return <Plan90Alerts label={block.label} />;
  }

  if (block.type === "accentCards") {
    return <Plan90AccentCards label={block.label} cards={block.cards} />;
  }

  if (block.type === "priorities") {
    return (
      <div className="plan90-support-block">
        <ul className={`plan90-big-list${block.numbered ? " plan90-big-list--numbered" : ""}`}>
          {block.items.map((p) => (
            <li key={p.n} className="plan90-big-list__item">
              <p className="plan90-big-list__title">{p.title}</p>
              {p.body && <p className="plan90-big-list__body">{p.body}</p>}
              {p.subitems?.length > 0 && (
                <ul className="plan90-big-list__subitems plan90-bullets plan90-bullets--circle">
                  {p.subitems.map((text, i) => <li key={i}>{text}</li>)}
                </ul>
              )}
              {!p.body && (
                <>
                  {p.summary && <p className="plan90-big-list__summary">{p.summary}</p>}
                  {p.rows?.length > 0 && (
                    <ul className="plan90-big-list__details">
                      {p.rows.map((row, i) => (
                        <li key={i}>
                          <span className="plan90-big-list__detail-label">{row.label}</span>
                          <span className="plan90-big-list__detail-value">{row.value}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === "bullets") {
    const list = (
      <ul className={`plan90-bullets${block.circle ? " plan90-bullets--circle" : ""}${block.dash ? " plan90-bullets--dash" : ""}`}>
        {block.items.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    );
    if (block.flat) {
      return (
        <div className="plan90-support-block">
          {block.label && <div className="plan90-support-block__label">{block.label}</div>}
          {list}
        </div>
      );
    }
    return <Plan90Card label={block.label}>{list}</Plan90Card>;
  }

  if (block.type === "table") {
    const table = (
      <div className={`plan90-table${block.flat ? " plan90-table--tight" : ""}`}>
        {block.rows.map((row, i) => (
          <div key={i} className={`plan90-table__row${row.alert ? " plan90-table__row--alert" : ""}`}>
            <div className="plan90-table__label">{row.label}</div>
            <div className="plan90-table__value">{row.value}</div>
          </div>
        ))}
      </div>
    );
    if (block.flat) {
      return (
        <div className="plan90-support-block">
          {block.label && <div className="plan90-support-block__label">{block.label}</div>}
          {block.note && <p className="plan90-support-block__note">{block.note}</p>}
          {table}
        </div>
      );
    }
    return (
      <Plan90Card label={block.label} note={block.note}>
        {table}
      </Plan90Card>
    );
  }

  if (block.type === "tiles") {
    const cols = block.tiles.length === 4 ? 4 : block.tiles.length <= 2 ? 2 : 3;
    return (
      <Plan90Card label={block.label}>
        <div className={`plan90-tiles plan90-tiles--${cols}`}>
          {block.tiles.map((t, i) => (
            <div key={i} className="plan90-tile">
              <div className="plan90-tile__title">{t.title}</div>
              {t.body && <p className="plan90-tile__body">{t.body}</p>}
            </div>
          ))}
        </div>
      </Plan90Card>
    );
  }

  if (block.type === "split") {
    const split = (
      <div className={`plan90-split${block.flat ? " plan90-split--tight" : ""}`}>
        {block.cols.map((col, i) => {
          const simpleItems = col.items?.length > 0 && col.items.every((item) => typeof item === "string");
          return (
            <div key={i} className="plan90-split__col">
              <div className="plan90-split__title">{col.title}</div>
              {col.items?.length > 0 ? (
                <ul className={`plan90-split__items${simpleItems ? " plan90-split__items--simple plan90-bullets plan90-bullets--circle" : ""}`}>
                  {col.items.map((item, j) => (
                    <li key={j}>
                      {typeof item === "string" ? (
                        item
                      ) : (
                        <>
                          <span className="plan90-split__item-title">{item.title}</span>
                          {item.detail && <span className="plan90-split__item-detail">{item.detail}</span>}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="plan90-table plan90-table--inline">
                  {col.rows.map((row, j) => (
                    <div key={j} className="plan90-table__row">
                      <div className="plan90-table__label">{row.label}</div>
                      <div className="plan90-table__value">{row.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
    if (block.flat) {
      return (
        <div className="plan90-support-block">
          {block.label && <div className="plan90-support-block__label">{block.label}</div>}
          {split}
        </div>
      );
    }
    return <Plan90Card label={block.label}>{split}</Plan90Card>;
  }

  if (block.type === "groups") {
    return (
      <Plan90Card label={block.label}>
        <div className="plan90-groups">
          {block.groups.map((g, i) => (
            <div key={i} className="plan90-group">
              <div className="plan90-group__head">
                <span className="plan90-group__title">{g.title}</span>
                {g.meta && <span className="plan90-group__meta">{g.meta}</span>}
              </div>
              {g.rows.map((row, j) => (
                <div key={j} className="plan90-table__row">
                  <div className="plan90-table__label">{row.label}</div>
                  <div className="plan90-table__value">{row.value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Plan90Card>
    );
  }

  if (block.type === "buckets") {
    return (
      <Plan90Card label={block.label} lead={block.lead}>
        <div className="plan90-buckets">
          {block.buckets.map((b, i) => (
            <div key={i} className="plan90-bucket">
              <div className="plan90-bucket__title">
                <span className="plan90-bucket__dot" style={{ background: b.dotColor }} />
                {b.title}
              </div>
              <ul className="plan90-bullets plan90-bullets--compact">
                {b.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Plan90Card>
    );
  }

  if (block.type === "phases") {
    const cols = block.phases.length <= 2 ? 2 : 3;
    return (
      <Plan90Card label={block.label}>
        <div className={`plan90-tiles plan90-tiles--${cols}`}>
          {block.phases.map((p, i) => (
            <div key={i} className="plan90-tile plan90-tile--phase">
              <span className="plan90-tile__accent" style={{ background: p.accentColor }} />
              <div className="plan90-tile__phase" style={{ color: p.accentColor }}>{p.phase}</div>
              <p className="plan90-tile__body">{p.desc}</p>
              <ul className="plan90-bullets plan90-bullets--compact">
                {p.focus.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Plan90Card>
    );
  }

  if (block.type === "matrix") {
    return (
      <Plan90Card label={block.label}>
        <div className="plan90-matrix">
          {block.rows.map((row, i) => (
            <div key={i} className="plan90-matrix__row">
              <div className="plan90-matrix__area">{row.area}</div>
              <div className="plan90-matrix__cell">
                <span className="plan90-matrix__sub">Why it matters</span>
                <p>{row.why}</p>
              </div>
              <div className="plan90-matrix__cell">
                <span className="plan90-matrix__sub">Approach</span>
                <p>{row.approach}</p>
              </div>
            </div>
          ))}
        </div>
      </Plan90Card>
    );
  }

  if (block.type === "prose") {
    return (
      <Plan90Card label={block.label}>
        {block.paragraphs.map((p, i) => (
          <p key={i} className="plan90-topic__a">{p}</p>
        ))}
      </Plan90Card>
    );
  }

  return null;
}

function Plan90Tasks({ items }) {
  return (
    <div className="plan90-support-block plan90-support-block--tasks">
      <div className="plan90-support-block__label">Tasks</div>
      <ul className="plan90-task-list">
        {items.map((m, i) => (
          <li key={i} className="plan90-task">
            <p className="plan90-task__title">{m.title}</p>
            {m.desc && <p className="plan90-task__desc">{m.desc}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Question unit — header = question, subheader = answer, cards below
// ---------------------------------------------------------------------------
function Plan90Topic({ topic, isLast, topicId }) {
  return (
    <article id={topicId} className={`plan90-topic${isLast ? " plan90-topic--last" : ""}`}>
      <header className="plan90-topic__head">
        <h2 className="plan90-topic__q">{topic.q}</h2>
        {topic.paragraphs?.length > 0
          ? topic.paragraphs.map((p, i) => <p key={i} className="plan90-topic__a">{p}</p>)
          : topic.a && <p className="plan90-topic__a">{topic.a}</p>}
      </header>
      {topic.blocks && topic.blocks.length > 0 && (
        <div className="plan90-topic__support">
          {topic.blocks.map((block, i) => (
            <PlanBlock key={`${block.label}-${i}`} block={block} />
          ))}
        </div>
      )}
      {topic.footer && <p className="plan90-topic__a">{topic.footer}</p>}
    </article>
  );
}

function Plan90Section({ section, isLast, registerRef }) {
  return (
    <section
      ref={registerRef}
      data-section-id={section.id}
      className="plan90-section"
    >
      <div className="plan90-section__rail">
        <div className="plan90-section__spine" />
        <div className="plan90-section__marker" />
      </div>
      <div className="plan90-section__content" style={{ paddingBottom: isLast ? 0 : undefined }}>
        <div className="plan90-section__topics">
          {section.topics.map((topic, i) => (
            <Plan90Topic
              key={topic.q}
              topicId={`plan90-${section.id}-q${i}`}
              topic={topic}
              isLast={i === section.topics.length - 1 && !section.milestones?.length}
            />
          ))}
        </div>
        {section.milestones?.length > 0 && (
          <div className="plan90-section__milestones">
            <Plan90Tasks items={section.milestones} />
          </div>
        )}
      </div>
    </section>
  );
}

function Plan90Outline({ sections, activeId, expandedId, onPhaseClick, onQuestionJump }) {
  return (
    <Card padding={18} className="plan90-outline">
      <CardHeader eyebrow="Sections" />
      <ol className="plan90-outline__list">
        <div className="plan90-outline__spine" />
        {sections.map((sec) => {
          const active = sec.id === activeId;
          const expanded = sec.id === expandedId;
          return (
            <li key={sec.id}>
              <button
                type="button"
                className={`plan90-outline__btn${active ? " plan90-outline__btn--active" : ""}`}
                onClick={() => onPhaseClick(sec.id)}
                aria-expanded={expanded}
              >
                <span className="plan90-outline__dot" />
                <span className="plan90-outline__name">{sec.navTitle}</span>
              </button>
              {expanded && sec.topics?.length > 0 && (
                <ul className="plan90-outline__questions">
                  {sec.topics.map((topic, i) => (
                    <li key={topic.q}>
                      <button
                        type="button"
                        className="plan90-outline__question-btn"
                        onClick={() => onQuestionJump(sec.id, i)}
                      >
                        {topic.q}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

function Plan90() {
  const sectionRefs = React.useRef({});
  const [activeId, setActiveId] = React.useState(plan90Sections[0].id);
  const [expandedId, setExpandedId] = React.useState(null);

  React.useEffect(() => {
    const scroller = document.querySelector("main");
    if (!scroller) return;
    const onScroll = () => {
      const anchor = scroller.getBoundingClientRect().top + 140;
      let current = plan90Sections[0].id;
      for (const sec of plan90Sections) {
        const el = sectionRefs.current[sec.id];
        if (el && el.getBoundingClientRect().top <= anchor) current = sec.id;
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const scrollMainTo = (el, offset = 24) => {
    const scroller = document.querySelector("main");
    if (!scroller || !el) return;
    const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - offset;
    scroller.scrollTo({ top, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    scrollMainTo(sectionRefs.current[id]);
  };

  const handlePhaseClick = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
    scrollToSection(id);
  };

  const scrollToQuestion = (sectionId, topicIndex) => {
    const el = document.getElementById(`plan90-${sectionId}-q${topicIndex}`);
    scrollMainTo(el, 20);
  };

  return (
    <div className="plan90-page">
      <PageHeader title="90 Day Assessment" />
      <div className="plan90-layout">
        <div className="plan90-main">
          {plan90Sections.map((sec, i) => (
            <Plan90Section
              key={sec.id}
              section={sec}
              isLast={i === plan90Sections.length - 1}
              registerRef={(el) => { sectionRefs.current[sec.id] = el; }}
            />
          ))}
        </div>
        <aside className="plan90-aside">
          <div className="plan90-aside__stack">
            <Plan90Outline
              sections={plan90Sections}
              activeId={activeId}
              expandedId={expandedId}
              onPhaseClick={handlePhaseClick}
              onQuestionJump={scrollToQuestion}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { Plan90 });
