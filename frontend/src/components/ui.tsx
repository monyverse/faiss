import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import clsx, { type ClassValue } from "clsx";
import { AlertTriangle, Check, ChevronDown, Lock, RotateCw, SearchX, X } from "lucide-react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

import { ApiError, errorMessage, type Severity } from "@/lib/api";

export const cx = (...values: ClassValue[]) => clsx(values);

// ---------------------------------------------------------------- buttons

type Variant = "primary" | "secondary" | "ghost" | "danger";
const VARIANTS: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-[oklch(0.57_0.2_21)] border-transparent",
  secondary: "bg-raised text-ink hover:bg-line border-line-strong/60",
  ghost: "bg-transparent text-ink-soft hover:bg-raised hover:text-ink border-transparent",
  danger: "bg-transparent text-sev-critical hover:bg-sev-critical/10 border-sev-critical/40",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  busy?: boolean;
  icon?: ReactNode;
}

/** 44px tall on touch layouts, tighter from the md breakpoint up. */
export function Button({ variant = "secondary", busy, icon, className, children, disabled, type, ...rest }: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      disabled={disabled || busy}
      className={cx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3.5 text-sm font-medium transition-colors md:min-h-9",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {busy ? <Spinner /> : icon}
      {children}
    </button>
  );
}

export function IconButton({ label, className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-raised hover:text-ink disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx("inline-block size-4 rounded-full border-2 border-current border-r-transparent [animation:faiss-spin_0.8s_linear_infinite]", className)}
    />
  );
}

// ---------------------------------------------------------------- surfaces

export function Card({ className, children, as: Tag = "div" }: { className?: string; children: ReactNode; as?: "div" | "section" | "article" | "li" }) {
  return <Tag className={cx("rounded-card border border-line bg-panel", className)}>{children}</Tag>;
}

export function SectionTitle({ children, hint, action }: { children: ReactNode; hint?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-tight text-ink">{children}</h2>
        {hint ? <p className="mt-0.5 text-sm text-ink-mute">{hint}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ title, lead, action }: { title: ReactNode; lead?: ReactNode; action?: ReactNode }) {
  return (
    <header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 md:mb-7">
      <div className="min-w-0">
        <h1 className="text-[1.6rem] font-semibold leading-tight tracking-tight text-ink md:text-[1.85rem]">{title}</h1>
        {lead ? <p className="mt-1.5 max-w-2xl text-sm text-ink-mute md:text-[0.9375rem]">{lead}</p> : null}
      </div>
      {action}
    </header>
  );
}

// ---------------------------------------------------------------- badges

export function Badge({ tone = "info", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium", TONES[tone], className)}>
      {children}
    </span>
  );
}

export type Tone = "critical" | "high" | "medium" | "low" | "info" | "ok" | "amber" | "rose";
const TONES: Record<Tone, string> = {
  critical: "tint-sev-critical",
  high: "tint-sev-high",
  medium: "tint-sev-medium",
  low: "tint-sev-low",
  info: "tint-sev-info",
  ok: "tint-ok",
  amber: "tint-amber",
  rose: "tint-rose",
};

const SEVERITY_LABEL: Record<Severity, string> = { critical: "Critical", high: "High", medium: "Medium", low: "Low", info: "Info" };
const SEVERITY_BARS: Record<Severity, number> = { critical: 4, high: 3, medium: 2, low: 1, info: 0 };

/** Severity is never colour alone: a label, plus bars that rise with severity. */
export function SeverityBadge({ severity, prefix }: { severity: Severity; prefix?: string }) {
  return (
    <Badge tone={severity}>
      <span aria-hidden className="flex items-end gap-px">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={cx("w-[3px] rounded-[1px] bg-current", n > SEVERITY_BARS[severity] && "opacity-25")} style={{ height: 3 + n * 2 }} />
        ))}
      </span>
      {prefix ? `${prefix} ` : ""}
      {SEVERITY_LABEL[severity]}
    </Badge>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-line bg-raised px-2 py-0.5 text-xs font-medium text-ink-soft", className)}>
      {children}
    </span>
  );
}

/** A small generated tile: initials or a country code on a tinted square. No photographs. */
export function Tile({ text, tone = "maroon", size = "md" }: { text: string; tone?: "maroon" | "amber" | "plain"; size?: "sm" | "md" | "lg" }) {
  return (
    <span
      aria-hidden
      className={cx(
        "tnum inline-flex shrink-0 items-center justify-center rounded-lg font-semibold tracking-wide",
        size === "sm" ? "size-7 text-[0.65rem]" : size === "lg" ? "size-12 text-sm" : "size-9 text-xs",
        tone === "maroon" && "bg-maroon text-white",
        tone === "amber" && "border border-amber/40 bg-amber/15 text-amber",
        tone === "plain" && "border border-line bg-raised text-ink-soft",
      )}
    >
      {text}
    </span>
  );
}

// ---------------------------------------------------------------- states

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx("rounded-md bg-raised [animation:faiss-pulse_1.6s_ease-in-out_infinite]", className)} />;
}

export function LoadingCards({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div role="status" aria-label="Loading" className={cx("space-y-3", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Card key={i} className="p-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="mt-3 h-3 w-4/5" />
          <Skeleton className="mt-2 h-3 w-3/5" />
        </Card>
      ))}
    </div>
  );
}

export function EmptyState({ title, children, icon, action }: { title: string; children?: ReactNode; icon?: ReactNode; action?: ReactNode }) {
  return (
    <Card className="flex flex-col items-center px-5 py-10 text-center">
      <span className="mb-3 inline-flex size-11 items-center justify-center rounded-full border border-line bg-raised text-ink-mute">
        {icon ?? <SearchX className="size-5" />}
      </span>
      <p className="font-medium text-ink">{title}</p>
      {children ? <div className="mt-1 max-w-md text-sm text-ink-mute">{children}</div> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </Card>
  );
}

/**
 * How a failed request is shown. A 403 is the platform working as designed (the person may see
 * the deal but not this area), so it is stated plainly in the API's own words, not as a crash.
 */
export function ErrorState({ error, onRetry, what }: { error: unknown; onRetry?: () => void; what?: string }) {
  const api = error instanceof ApiError ? error : null;
  if (api?.restricted) {
    return (
      <Card className="flex gap-3 border-amber/35 bg-amber/[0.06] p-4" as="section">
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-amber/40 text-amber">
          <Lock className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="font-medium text-ink">Restricted</p>
          <p className="mt-0.5 text-sm text-ink-soft">{api.detail}</p>
        </div>
      </Card>
    );
  }
  if (api?.notFound) {
    return (
      <EmptyState title={what ? `${what} not found` : "Not found"}>
        {api.detail} It may not exist, or it may be on a deal you are not a member of.
      </EmptyState>
    );
  }
  return (
    <Card className="flex gap-3 border-sev-critical/35 p-4" as="section">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-sev-critical/40 text-sev-critical">
        <AlertTriangle className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-ink">{what ? `${what} could not be loaded` : "This could not be loaded"}</p>
        <p className="mt-0.5 text-sm text-ink-soft">{errorMessage(error)}</p>
        {onRetry ? (
          <Button className="mt-3" onClick={onRetry} icon={<RotateCw className="size-4" />}>
            Try again
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

/** An inline message under a form or action. */
export function Notice({ tone = "info", children, className }: { tone?: "info" | "ok" | "error" | "warn"; children: ReactNode; className?: string }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cx(
        "rounded-lg border px-3 py-2 text-sm",
        tone === "info" && "border-line bg-raised text-ink-soft",
        tone === "ok" && "tint-ok",
        tone === "error" && "tint-sev-critical",
        tone === "warn" && "tint-amber",
        className,
      )}
    >
      {children}
    </p>
  );
}

// ---------------------------------------------------------------- form controls

const CONTROL =
  "w-full rounded-lg border border-line-strong/70 bg-canvas/60 px-3 text-ink placeholder:text-ink-mute/80 transition-colors hover:border-line-strong focus:border-amber focus:outline-none disabled:opacity-50";

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(CONTROL, "min-h-11 md:min-h-9", className)} {...rest} />;
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(CONTROL, "min-h-24 py-2.5 leading-relaxed", className)} {...rest} />;
}

export function Field({ label, hint, children, className }: { label: ReactNode; hint?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={cx("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs text-ink-mute">{hint}</span> : null}
    </label>
  );
}

export interface Option {
  value: string;
  label: string;
}

const NONE = "__none__";

/** Radix Select with the product's styling. An empty value is allowed (shown as the placeholder option). */
export function Select({ value, onChange, options, placeholder, label, className }: {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  /** Label of the "no choice" option; omit to require a choice. */
  placeholder?: string;
  label: string;
  className?: string;
}) {
  return (
    <SelectPrimitive.Root value={value === "" ? NONE : value} onValueChange={(next) => onChange(next === NONE ? "" : next)}>
      <SelectPrimitive.Trigger
        aria-label={label}
        className={cx(CONTROL, "flex min-h-11 items-center justify-between gap-2 text-left text-sm md:min-h-9 [&>span]:truncate", className)}
      >
        <SelectPrimitive.Value placeholder={placeholder ?? label} />
        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 text-ink-mute" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-[70] max-h-[min(22rem,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border border-line-strong bg-raised shadow-pop"
        >
          <SelectPrimitive.Viewport className="p-1">
            {placeholder !== undefined ? <SelectItem value={NONE} label={placeholder} /> : null}
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} label={option.label} />
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

function SelectItem({ value, label }: Option) {
  return (
    <SelectPrimitive.Item
      value={value}
      className="relative flex min-h-11 cursor-default select-none items-center rounded-lg py-2 pl-8 pr-3 text-sm text-ink-soft outline-none data-[highlighted]:bg-line data-[highlighted]:text-ink data-[state=checked]:text-ink md:min-h-9"
    >
      <SelectPrimitive.ItemIndicator className="absolute left-2.5">
        <Check className="size-4 text-amber" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

// ---------------------------------------------------------------- dialog

/** A modal: centred on desktop, a bottom sheet on phones. */
export function Dialog({ open, onOpenChange, title, description, children, wide }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[oklch(0.08_0.02_355/0.72)]" />
        <DialogPrimitive.Content
          className={cx(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-2xl border border-line-strong bg-panel shadow-pop [animation:faiss-rise_0.18s_ease-out]",
            "md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[86dvh] md:w-[calc(100vw-3rem)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:[animation:none]",
            wide ? "md:max-w-3xl" : "md:max-w-xl",
          )}
        >
          <div className="flex items-start justify-between gap-3 border-b border-line px-5 pb-3 pt-4">
            <div className="min-w-0">
              <DialogPrimitive.Title className="text-lg font-semibold tracking-tight text-ink">{title}</DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="mt-0.5 text-sm text-ink-mute">{description}</DialogPrimitive.Description>
              ) : (
                <DialogPrimitive.Description className="sr-only">{title}</DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close asChild>
              <IconButton label="Close" className="-mr-2 -mt-1.5">
                <X className="size-5" />
              </IconButton>
            </DialogPrimitive.Close>
          </div>
          <div className="overflow-y-auto overscroll-contain px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// ---------------------------------------------------------------- definition rows

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-mute">{label}</p>
      <p className="tnum mt-1 truncate text-lg font-semibold text-ink">{value}</p>
      {sub ? <p className="mt-0.5 text-xs text-ink-mute">{sub}</p> : null}
    </div>
  );
}
