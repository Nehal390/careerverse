import { platformStats } from "@/lib/careers-data";
import { Counter } from "@/components/landing/counter";

export function Stats() {
  return (
    <section className="border-y border-border bg-surface/40 py-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {platformStats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-3xl font-semibold text-gradient sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
