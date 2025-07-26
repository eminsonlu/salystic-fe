interface ChartSkeletonProps {
  height?: number;
  type?: 'bar' | 'line' | 'list';
}

const PALETTE = {
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
  },
  neutral: {
    200: '#e2e8f0',
    300: '#cbd5e1',
  },
};

export const ChartSkeleton = ({ height = 400, type = 'bar' }: ChartSkeletonProps) => {
  if (type === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border animate-pulse"
            style={{
              backgroundColor: PALETTE.background.secondary,
              borderColor: PALETTE.neutral[200],
            }}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-6 h-6"
                style={{ backgroundColor: PALETTE.neutral[300] }}
              />
              <div className="space-y-1">
                <div
                  className="h-4 w-24"
                  style={{ backgroundColor: PALETTE.neutral[300] }}
                />
                <div
                  className="h-3 w-16"
                  style={{ backgroundColor: PALETTE.neutral[200] }}
                />
              </div>
            </div>
            <div className="text-right space-y-1">
              <div
                className="h-5 w-20"
                style={{ backgroundColor: PALETTE.neutral[300] }}
              />
              <div
                className="h-3 w-12"
                style={{ backgroundColor: PALETTE.neutral[200] }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div 
      className="animate-pulse" 
      style={{ height, width: '100%', position: 'relative' }}
    >
      <div 
        className="absolute bottom-0 left-0 right-0 flex items-end justify-around"
        style={{ height: '80%' }}
      >
        {Array.from({ length: type === 'line' ? 1 : 8 }).map((_, index) => {
          if (type === 'line') {
            return (
              <svg key="line" width="100%" height="100%" className="absolute inset-0">
                <path
                  d={`M 0,${height * 0.7} Q ${height * 0.25},${height * 0.3} ${height * 0.5},${height * 0.5} T 100%,${height * 0.2}`}
                  stroke={PALETTE.neutral[300]}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;8"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
                {Array.from({ length: 6 }).map((_, dotIndex) => (
                  <circle
                    key={dotIndex}
                    cx={`${(dotIndex / 5) * 100}%`}
                    cy={`${30 + Math.random() * 40}%`}
                    r="3"
                    fill={PALETTE.neutral[300]}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;1;0.3"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${dotIndex * 0.2}s`}
                    />
                  </circle>
                ))}
              </svg>
            );
          }
          
          const barHeight = Math.random() * 60 + 20;
          return (
            <div
              key={index}
              className="w-8"
              style={{
                height: `${barHeight}%`,
                backgroundColor: PALETTE.neutral[300],
                marginRight: index < 7 ? '8px' : '0',
              }}
            />
          );
        })}
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 flex justify-around"
        style={{ height: '15%' }}
      >
        {Array.from({ length: type === 'line' ? 6 : 8 }).map((_, index) => (
          <div
            key={index}
            className="h-3 w-12"
            style={{ backgroundColor: PALETTE.neutral[200] }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChartSkeleton;