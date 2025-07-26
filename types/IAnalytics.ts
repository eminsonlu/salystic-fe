export interface AnalyticsFilters {
  currency?: string;
  position?: string;
  level?: string;
}

export interface Analytics {
  totalEntries: number;
  averageSalary: number;
  averageSalaryByPosition: Record<string, number>;
  minSalaryByPosition: Record<string, number>;
  maxSalaryByPosition: Record<string, number>;
  averageSalaryByLevel: Record<string, number>;
  minSalaryByLevel: Record<string, number>;
  maxSalaryByLevel: Record<string, number>;
  averageSalaryByTech: Record<string, number>;
  minSalaryByTech: Record<string, number>;
  maxSalaryByTech: Record<string, number>;
  averageSalaryByExperience: Record<string, number>;
  minSalaryByExperience: Record<string, number>;
  maxSalaryByExperience: Record<string, number>;
  averageSalaryByCompany: Record<string, number>;
  minSalaryByCompany: Record<string, number>;
  maxSalaryByCompany: Record<string, number>;
  averageSalaryByCity: Record<string, number>;
  minSalaryByCity: Record<string, number>;
  maxSalaryByCity: Record<string, number>;
  averageSalaryByCompanySize: Record<string, number>;
  minSalaryByCompanySize: Record<string, number>;
  maxSalaryByCompanySize: Record<string, number>;
  averageSalaryByWorkType: Record<string, number>;
  minSalaryByWorkType: Record<string, number>;
  maxSalaryByWorkType: Record<string, number>;
  averageSalaryByCurrency: Record<string, number>;
  minSalaryByCurrency: Record<string, number>;
  maxSalaryByCurrency: Record<string, number>;
  topPayingPositions: ChartDataPoint[];
  topPayingTechs: ChartDataPoint[];
  salaryRanges: ChartDataPoint[];
  lastUpdated: string;
}

export interface CareerAnalytics {
  jobChanges: JobChangeAnalytics;
  raises: RaiseAnalytics;
}

export interface JobChangeAnalytics {
  averageSalaryIncrease: number;
  percentageWithIncrease: number;
}

export interface RaiseAnalytics {
  averagePerYear: number;
  averagePercentage: number;
  medianTimeBetweenRaises: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  count?: number;
}

export interface JobSalaryData {
  job: string;
  titles: Array<{
    title: string;
    salary: number;
  }>;
}
