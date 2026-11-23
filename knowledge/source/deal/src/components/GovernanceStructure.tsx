import { MousePointerClick } from "lucide-react";

const LEGEND = [
  {
    label: "Joint transaction-level governance",
    className: "border-maroon/25 bg-blush text-maroon",
  },
  {
    label: "Absa transaction-level governance",
    className: "border-maroon bg-maroon text-maroon-foreground",
  },
  { label: "Joint execution governance", className: "border-amber/45 bg-amber/15 text-foreground" },
  {
    label: "Counterparty governance",
    className: "border-border bg-secondary/70 text-muted-foreground",
  },
  { label: "Absa function-level governance", className: "border-amber bg-amber text-foreground" },
];

/** Tailwind token classes per governance tone, applied to SVG shapes. */
const TONES = {
  joint: { box: "fill-blush stroke-maroon/30", text: "text-maroon" },
  absa: { box: "fill-maroon stroke-maroon", text: "text-maroon-foreground" },
  execution: { box: "fill-amber/20 stroke-amber/60", text: "text-foreground" },
  counterparty: { box: "fill-secondary stroke-border", text: "text-muted-foreground" },
  function: { box: "fill-amber stroke-amber", text: "text-foreground" },
} as const;

type Tone = keyof typeof TONES;

function Node({
  x,
  y,
  w,
  h,
  tone,
  lines,
  forumId,
  active,
  onSelect,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone: Tone;
  lines: string[];
  forumId?: string | undefined;
  active?: boolean | undefined;
  onSelect?: ((id: string) => void) | undefined;
}) {
  const t = TONES[tone];
  const cx = x + w / 2;
  const startY = y + h / 2 - ((lines.length - 1) * 17) / 2 + 5;
  const clickable = Boolean(forumId && onSelect);
  return (
    <g
      className={clickable ? "cursor-pointer" : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-pressed={clickable ? Boolean(active) : undefined}
      onClick={clickable ? () => onSelect!(forumId!) : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect!(forumId!);
              }
            }
          : undefined
      }
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className={`${t.box} ${clickable ? "transition-opacity hover:opacity-85" : ""}`}
        strokeWidth={active ? 3 : 1.5}
      />
      {active ? (
        <rect
          x={x - 4}
          y={y - 4}
          width={w + 8}
          height={h + 8}
          rx={11}
          className="fill-none stroke-maroon"
          strokeWidth={1.5}
        />
      ) : null}
      <text
        x={cx}
        textAnchor="middle"
        className={`pointer-events-none fill-current text-[13px] font-semibold ${t.text}`}
      >
        {lines.map((line, i) => (
          <tspan key={line} x={cx} y={startY + i * 17}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

const LINK = "stroke-maroon/40";

export function GovernanceStructure({
  activeForumId,
  onSelectForum,
}: {
  activeForumId?: string | undefined;
  onSelectForum?: ((id: string) => void) | undefined;
} = {}) {
  const nodeProps = (id: string) => ({
    forumId: id,
    active: activeForumId === id,
    onSelect: onSelectForum,
  });
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-panel lg:p-8">
      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {LEGEND.map((item) => (
          <span
            key={item.label}
            className={`rounded-md border px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${item.className}`}
          >
            {item.label}
          </span>
        ))}
      </div>

      <div className="mt-6 w-full overflow-x-auto">
        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="Governance structure: joint, Absa and counterparty forums and how they connect"
          className="h-auto w-full min-w-[620px]"
        >
          <defs>
            <marker
              id="gov-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-maroon/50" />
            </marker>
          </defs>

          {/* --- Connections (drawn under the nodes) --- */}
          <g
            fill="none"
            strokeWidth={1.5}
            markerStart="url(#gov-arrow)"
            markerEnd="url(#gov-arrow)"
            className={LINK}
          >
            {/* Absa + Counterparty steering committees feed the Joint Steering Committee */}
            <path d="M 390 76 L 390 104" />
            <path d="M 270 130 L 270 104 L 510 104 L 510 130" markerStart="none" markerEnd="none" />

            {/* Counterparty Steering Committee <-> Joint PMO Working Group */}
            <path d="M 470 194 L 470 250" />

            {/* Absa Steering Committee <-> Internal PMO Working Group */}
            <path d="M 230 194 L 230 372 L 280 372" />

            {/* Joint PMO <-> Internal PMO */}
            <path d="M 390 306 L 390 340" />

            {/* Internal PMO <-> Absa Transaction Working Group */}
            <path d="M 390 404 L 390 450" />

            {/* Absa Transaction Working Group <-> Workstream-level discussions */}
            <path d="M 390 506 L 390 530" />

            {/* Counterparty governance structure -> Counterparty Steering Committee */}
            <path d="M 660 162 L 620 162" markerStart="none" />

            {/* Counterparty governance structure -> Workstream-level discussions */}
            <path d="M 660 558 L 620 558" markerStart="none" />
          </g>

          {/* --- Nodes --- */}
          <Node
            x={280}
            y={20}
            w={220}
            h={56}
            tone="joint"
            lines={["Joint Steering Committee"]}
            {...nodeProps("joint-steerco")}
          />
          <Node
            x={160}
            y={130}
            w={220}
            h={64}
            tone="absa"
            lines={["Absa Steering", "Committee"]}
            {...nodeProps("internal-steerco")}
          />
          <Node
            x={400}
            y={130}
            w={220}
            h={64}
            tone="counterparty"
            lines={["Counterparty Steering", "Committee"]}
          />
          <Node
            x={280}
            y={250}
            w={220}
            h={56}
            tone="execution"
            lines={["Joint PMO Working Group"]}
            {...nodeProps("joint-pmo")}
          />
          <Node
            x={280}
            y={340}
            w={220}
            h={64}
            tone="absa"
            lines={["Internal PMO Working", "Group"]}
            {...nodeProps("internal-pmo")}
          />
          <Node
            x={160}
            y={450}
            w={460}
            h={56}
            tone="function"
            lines={["Absa Transaction Working Group"]}
            {...nodeProps("transaction-working-group")}
          />
          <Node
            x={160}
            y={530}
            w={460}
            h={56}
            tone="counterparty"
            lines={["Workstream-level discussions"]}
            {...nodeProps("workstream-sessions")}
          />

          {/* Exec reporting */}
          <Node x={680} y={20} w={180} h={56} tone="counterparty" lines={["Exec reporting"]} />

          {/* Counterparty governance structure (separate) */}
          <g>
            <rect
              x={660}
              y={130}
              width={230}
              height={456}
              rx={8}
              className="fill-surface stroke-border"
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
            <text
              x={775}
              textAnchor="middle"
              className="fill-current text-[13px] font-semibold text-foreground"
            >
              <tspan x={775} y={215}>
                Counterparty
              </tspan>
              <tspan x={775} y={232}>
                Governance Structure
              </tspan>
            </text>
            <text
              x={775}
              textAnchor="middle"
              className="fill-current text-[11px] italic text-muted-foreground"
            >
              <tspan x={775} y={252}>
                (Separate and not directly
              </tspan>
              <tspan x={775} y={267}>
                relevant to Absa)
              </tspan>
            </text>
            <text
              x={775}
              textAnchor="middle"
              className="fill-current text-[12px] font-semibold text-foreground"
            >
              <tspan x={775} y={302}>
                Counterparty governance
              </tspan>
              <tspan x={775} y={318}>
                must:
              </tspan>
            </text>
            <text
              x={690}
              className="fill-current text-[11.5px] leading-none text-muted-foreground"
            >
              <tspan x={690} y={352}>
                •
              </tspan>
              <tspan x={704} y={352}>
                Enable minimum weekly
              </tspan>
              <tspan x={704} y={368}>
                workstream-level joint
              </tspan>
              <tspan x={704} y={384}>
                meetings
              </tspan>
              <tspan x={690} y={410}>
                •
              </tspan>
              <tspan x={704} y={410}>
                Enable pre-socialisation of
              </tspan>
              <tspan x={704} y={426}>
                Joint SteerCo items
              </tspan>
              <tspan x={690} y={452}>
                •
              </tspan>
              <tspan x={704} y={452}>
                Enable clear visibility of
              </tspan>
              <tspan x={704} y={468}>
                joint issues arising from the
              </tspan>
              <tspan x={704} y={484}>
                Counterparty
              </tspan>
            </text>
          </g>
        </svg>
      </div>

      <aside className="mt-6 rounded-md border-l-2 border-maroon/50 bg-blush/40 px-4 py-3">
        <p className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-maroon px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-maroon-foreground">
            N.B.
          </span>
          <span className="text-xs font-semibold text-maroon">
            Governance application across deal types
          </span>
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          The focus and content of these forums will differ across acquisitions and divestments, but
          their purpose and mandate remain consistent. Governance should be repeatable, familiar and
          align with counterparty structures. On divestments, while Absa may have less ability to
          drive buyer execution, it should continue to track the delivery plan, obligations, risks
          and issues closely.
        </p>
      </aside>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-border bg-muted/40 px-4 py-2.5">
        <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <MousePointerClick className="h-4 w-4 text-maroon" aria-hidden="true" />
          How to navigate the governance structure
        </span>
        <span className="text-xs text-muted-foreground">
          Click on any coloured governance forum in the structure above to explore its purpose,
          participants, cadence and Terms of Reference.
        </span>
        <span className="ml-auto whitespace-nowrap text-xs font-medium text-maroon">
          Click a forum to explore &rarr;
        </span>
      </div>
    </div>
  );
}
