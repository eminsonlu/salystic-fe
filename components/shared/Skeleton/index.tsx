interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`} style={style} />
  );
}

export function ChartSkeleton({ height = "350px" }: { height?: string }) {
  return (
    <div className="space-y-4" style={{ height }}>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="grid grid-cols-8 gap-2 h-48 items-end">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-full"
            style={{ height: `${Math.random() * 80 + 20}%` }}
          />
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-16" />
        ))}
      </div>
    </div>
  );
}

export function PieChartSkeleton({ height = "350px" }: { height?: string }) {
  return (
    <div className="flex items-center justify-center" style={{ height }}>
      <div className="relative">
        <div className="w-48 h-48 rounded-full border-8 border-slate-200 animate-pulse" />
        <div className="absolute inset-8 rounded-full border-4 border-slate-100 animate-pulse" />
        <div className="absolute inset-16 flex items-center justify-center">
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg animate-pulse">
      <div className="flex items-center space-x-2 mb-4">
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="h-5 w-32" />
      </div>
      <ChartSkeleton />
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg animate-pulse">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-5 w-20" />
    </div>
  );
}