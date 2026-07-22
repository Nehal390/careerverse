export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="skeleton h-7 w-56" />
        <div className="skeleton mt-2 h-4 w-40" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-5">
            <div className="skeleton h-3 w-20" />
            <div className="skeleton mt-3 h-7 w-16" />
            <div className="skeleton mt-3 h-1.5 w-full" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="skeleton h-4 w-40" />
          <div className="skeleton mt-4 h-32 w-full" />
        </div>
        <div className="card p-6">
          <div className="skeleton h-4 w-32" />
          <div className="skeleton mt-4 h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
