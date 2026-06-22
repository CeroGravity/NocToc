export default function Loading() {
  return (
    <div className="min-h-screen bg-surface-base pt-24">
      <div className="h-[56vw] max-h-[85vh] min-h-[460px] w-full animate-pulse bg-surface-raised" />
      <div className="mt-6 space-y-6 px-4 md:px-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-surface-raised" />
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, j) => (
                <div
                  key={j}
                  className="h-28 min-w-[200px] animate-pulse rounded-md bg-surface-raised md:h-36 md:min-w-[260px]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
