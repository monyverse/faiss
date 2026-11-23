export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "")).toUpperCase() || "?";
}

/** The API sends some timestamps without a zone; they are UTC. */
export function parseDate(value: string): Date {
  return new Date(/[zZ]|[+-]\d\d:\d\d$/.test(value) ? value : `${value}Z`);
}

const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
const DATE_TIME = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const TIME = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export const formatDate = (value: string) => DATE.format(parseDate(value));
export const formatDateTime = (value: string) => DATE_TIME.format(parseDate(value));
export const formatTime = (value: string) => TIME.format(parseDate(value));

export function timeAgo(value: string, now = Date.now()): string {
  const seconds = Math.max(0, Math.round((now - parseDate(value).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return days < 30 ? `${days} d ago` : formatDate(value);
}

const NUMBER = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });
export const formatNumber = (value: number | null | undefined) => (value == null ? "—" : NUMBER.format(value));
export const formatUsd = (value: number) => `$${value.toFixed(2)}`;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export const titleCase = (value: string) => value.replace(/[_-]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
