const COLUMNS = ["Key Service", "Absa owned?", "Preferred vendors"];

const PLACEHOLDER = "To be confirmed with functional owner";

export function PartnerSupportTable() {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="bg-surface text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
          <tr>
            {COLUMNS.map((col) => (
              <th key={col} className="px-4 py-3 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border align-top">
            {COLUMNS.map((col) => (
              <td key={col} className="px-4 py-4 text-muted-foreground">
                {PLACEHOLDER}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
