export function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="border border-emerald/10 bg-white px-4 py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold text-emerald">
        {value}
      </p>
    </div>
  );
}
