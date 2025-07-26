import { analyticsService } from '@/services/analytics';
import { Analytics } from '@/types/IAnalytics';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    name?: string;
    payload?: {
      name?: string;
      value?: number;
    };
  }>;
  label?: string;
  analytics?: Analytics;
  currency?: string;
}

const PALETTE = {
  background: {
    primary: '#ffffff',
  },
  neutral: {
    200: '#e2e8f0',
  },
  accent: '#3b82f6',
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#64748b',
  },
};

export const CustomTooltip = ({
  active,
  payload,
  label,
  analytics,
  currency,
}: CustomTooltipProps) => {
  if (active && payload && payload.length && analytics) {
    const data = payload[0];
    const avgSalary = data.value;

    const itemName = label || data.name || data.payload?.name;

    if (!itemName) return null;

    let minSalary = 0;
    let maxSalary = 0;

    if (analytics.minSalaryByPosition?.[itemName] !== undefined) {
      minSalary = analytics.minSalaryByPosition[itemName];
      maxSalary = analytics.maxSalaryByPosition[itemName];
    } else if (analytics.minSalaryByTech?.[itemName] !== undefined) {
      minSalary = analytics.minSalaryByTech[itemName];
      maxSalary = analytics.maxSalaryByTech[itemName];
    } else if (analytics.minSalaryByLevel?.[itemName] !== undefined) {
      minSalary = analytics.minSalaryByLevel[itemName];
      maxSalary = analytics.maxSalaryByLevel[itemName];
    } else if (analytics.minSalaryByExperience?.[itemName] !== undefined) {
      minSalary = analytics.minSalaryByExperience[itemName];
      maxSalary = analytics.maxSalaryByExperience[itemName];
    } else if (analytics.minSalaryByCompany?.[itemName] !== undefined) {
      minSalary = analytics.minSalaryByCompany[itemName];
      maxSalary = analytics.maxSalaryByCompany[itemName];
    } else if (analytics.minSalaryByCity?.[itemName] !== undefined) {
      minSalary = analytics.minSalaryByCity[itemName];
      maxSalary = analytics.maxSalaryByCity[itemName];
    } else if (analytics.minSalaryByCompanySize?.[itemName] !== undefined) {
      minSalary = analytics.minSalaryByCompanySize[itemName];
      maxSalary = analytics.maxSalaryByCompanySize[itemName];
    } else if (analytics.minSalaryByWorkType?.[itemName] !== undefined) {
      minSalary = analytics.minSalaryByWorkType[itemName];
      maxSalary = analytics.maxSalaryByWorkType[itemName];
    }

    return (
      <div
        className="p-3 border"
        style={{
          backgroundColor: PALETTE.background.primary,
          borderColor: PALETTE.neutral[200],
        }}
      >
        <p
          className="font-semibold mb-2"
          style={{ color: PALETTE.text.primary }}
        >
          {itemName}
        </p>
        <div className="space-y-1">
          <p className="text-sm">
            <span style={{ color: PALETTE.text.secondary }}>Average:</span>
            <span
              className="ml-2 font-semibold"
              style={{ color: PALETTE.accent }}
            >
              {analyticsService.formatCurrency(avgSalary, currency)}
            </span>
          </p>
          {minSalary > 0 && (
            <p className="text-sm">
              <span style={{ color: PALETTE.text.secondary }}>Min:</span>
              <span
                className="ml-2 font-medium"
                style={{ color: PALETTE.text.muted }}
              >
                {analyticsService.formatCurrency(minSalary, currency)}
              </span>
            </p>
          )}
          {maxSalary > 0 && (
            <p className="text-sm">
              <span style={{ color: PALETTE.text.secondary }}>Max:</span>
              <span
                className="ml-2 font-medium"
                style={{ color: PALETTE.text.muted }}
              >
                {analyticsService.formatCurrency(maxSalary, currency)}
              </span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;