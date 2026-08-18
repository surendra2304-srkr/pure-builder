import { useState } from "react";

export function RoiCalculator() {
  const [visitors, setVisitors] = useState(4000);
  const [calls, setCalls] = useState(120);
  const [value, setValue] = useState(400);

  const chatLeads = Math.round(visitors * 0.032);
  const missedCalls = Math.round(calls * 0.28);
  const extraLeads = chatLeads + missedCalls;
  const pipeline = extraLeads * value;

  const money = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const rows: [string, number, number, number, (v: number) => void, string][] = [
    ["Monthly website visitors", visitors, 500, 50000, setVisitors, ""],
    ["Inbound calls / month", calls, 10, 2000, setCalls, ""],
    ["Average value of a lead", value, 50, 5000, setValue, "$"],
  ];

  return (
    <div className="card-tile grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        {rows.map(([label, v, min, max, set, prefix]) => (
          <label key={label} className="block">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="font-display text-lg font-semibold">
                {prefix}
                {v.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={min}
              value={v}
              onChange={(e) => set(Number(e.target.value))}
              className="range-line mt-3 w-full"
            />
          </label>
        ))}
      </div>

      <div className="rounded-2xl bg-foreground p-6 text-background">
        <div className="text-xs tracking-[0.14em] opacity-60">
          ESTIMATED MONTHLY LIFT
        </div>
        <div className="font-display mt-3 text-5xl font-semibold tracking-tight tabular-nums">
          {money(pipeline)}
        </div>
        <div className="mt-2 text-sm opacity-70">
          from {extraLeads} additional qualified leads
        </div>
        <dl className="mt-6 space-y-2 border-t border-background/20 pt-5 text-sm">
          <div className="flex justify-between">
            <dt className="opacity-70">Chat leads captured (3.2%)</dt>
            <dd className="tabular-nums">{chatLeads}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="opacity-70">Missed calls recovered (28%)</dt>
            <dd className="tabular-nums">{missedCalls}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="opacity-70">Cost of Growth plan</dt>
            <dd className="tabular-nums">$149</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
