export default function CareersLoading() {
  return (
    <div className="pt-36 md:pt-44">
      <div className="container pb-8 text-center">
        <div className="skeleton mx-auto h-3 w-24" />
        <div className="skeleton mx-auto mt-4 h-9 w-96 max-w-full" />
        <div className="skeleton mx-auto mt-4 h-4 w-full max-w-xl" />
      </div>
      <div className="container pb-24">
        <div className="skeleton mx-auto h-14 max-w-2xl rounded-2xl" />
        <div className="mt-8 grid gap-8 md:grid-cols-[240px_1fr]">
          <div className="hidden space-y-3 md:block">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-8 w-full" />
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-6">
                <div className="skeleton h-4 w-20" />
                <div className="skeleton mt-4 h-5 w-32" />
                <div className="skeleton mt-3 h-3 w-full" />
                <div className="skeleton mt-1.5 h-3 w-2/3" />
                <div className="mt-6 flex items-center justify-between">
                  <div className="skeleton h-6 w-24" />
                  <div className="skeleton h-6 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
