'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  analyticsService,
  getGeneralAnalytics,
  getCareerAnalytics,
  getAvailablePositions,
  getAvailableLevels,
} from '@/services/analytics';
import {
  Analytics,
  CareerAnalytics,
  AnalyticsFilters,
} from '@/types/IAnalytics';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/Select';
import {
  TrendingUp,
  Users,
  ArrowUpRight,
  Calendar,
  DollarSign,
  Building,
  MapPin,
  Code,
  Briefcase,
} from 'lucide-react';
import { AnimatedNumber } from '@/components/shared/AnimatedNumber';
import { ChartSkeleton } from './ChartSkeleton';
import { CustomTooltip } from './CustomTooltip';

const PALETTE = {
  primary: '#475569',
  primaryLight: '#64748b',
  accent: '#3b82f6',
  accentLight: '#60a5fa',
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: '#059669',
  warning: '#d97706',
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#64748b',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
  },
};


const formatTimePeriod = (months: number): string => {
  if (months === 0) return 'No data';
  if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} year${years === 1 ? '' : 's'}`;
  }

  return `${years} year${years === 1 ? '' : 's'} ${remainingMonths} month${
    remainingMonths === 1 ? '' : 's'
  }`;
};

interface AnalyticsProps {
  onFilterChange?: (filters: AnalyticsFilters) => void;
}

export default function AnalyticsSection({ onFilterChange }: AnalyticsProps) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [careerAnalytics, setCareerAnalytics] =
    useState<CareerAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [availablePositions, setAvailablePositions] = useState<string[]>([]);
  const [availableLevels, setAvailableLevels] = useState<string[]>([]);

  const [filters, setFilters] = useState<AnalyticsFilters>({
    currency: 'TRY',
  });

  const loadFilterOptions = async () => {
    try {
      const [positionsError, positionsData] = await getAvailablePositions();
      const [levelsError, levelsData] = await getAvailableLevels();

      if (!positionsError && positionsData) {
        setAvailablePositions(positionsData);
      }

      if (!levelsError && levelsData) {
        setAvailableLevels(levelsData);
      }
    } catch (err) {
      console.error('Failed to load filter options:', err);
    }
  };

  const loadData = useCallback(async (isFilterChange = false) => {
    try {
      if (isFilterChange && analytics) {
        setIsUpdating(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const [generalError, generalData] = await getGeneralAnalytics(filters);
      const [careerError, careerData] = await getCareerAnalytics();

      if (generalError) {
        setError(generalError);
        return;
      }

      if (careerError) {
        setError(careerError);
        return;
      }

      setAnalytics(generalData);
      setCareerAnalytics(careerData);
    } catch (err) {
      setError('Failed to load analytics');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
      setIsUpdating(false);
    }
  }, [filters, analytics]);

  useEffect(() => {
    if (analytics) {
      loadData(true);
    } else {
      loadData(false);
    }
  }, [filters]);

  useEffect(() => {
    loadData(false);
  }, []);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const handleFilterChange = (
    key: keyof AnalyticsFilters,
    value: string | undefined
  ) => {
    const newFilters = {
      ...filters,
      [key]: value === 'all' ? undefined : value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Failed to Load Analytics
          </h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => loadData(false)}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const levelData = Object.entries(analytics.averageSalaryByLevel)
    .map(([name, salary]) => ({ name, value: Math.round(salary) }))
    .sort((a, b) => b.value - a.value);
  const experienceData = Object.entries(analytics.averageSalaryByExperience)
    .map(([name, salary]) => ({ name, value: Math.round(salary) }))
    .sort((a, b) => b.value - a.value);
  const companyData = Object.entries(analytics.averageSalaryByCompany)
    .map(([name, salary]) => ({ name, value: Math.round(salary) }))
    .sort((a, b) => b.value - a.value);
  const cityData = Object.entries(analytics.averageSalaryByCity)
    .map(([name, salary]) => ({ name, value: Math.round(salary) }))
    .sort((a, b) => b.value - a.value);

  const topPositions = analytics.topPayingPositions;
  const topTechs = analytics.topPayingTechs;
  const salaryRanges = analytics.salaryRanges;

  return (
    <section
      className="min-h-screen"
      style={{ backgroundColor: PALETTE.background.secondary }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-12 h-12 mb-4"
            style={{ backgroundColor: PALETTE.accent, color: 'white' }}
          >
            <TrendingUp className="h-6 w-6" />
          </div>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: PALETTE.text.primary }}
          >
            Salary Analytics & Market Insights
          </h1>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: PALETTE.text.secondary }}
          >
            Comprehensive salary data analysis across industries, roles, and
            career levels for data-driven professional decisions.
          </p>
        </div>

        <div
          className="mb-8 p-6 border"
          style={{
            backgroundColor: PALETTE.background.primary,
            borderColor: PALETTE.neutral[200],
          }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: PALETTE.text.primary }}
          >
            Filter Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: PALETTE.text.secondary }}
              >
                Currency
              </label>
              <Select
                value={filters.currency}
                onValueChange={(value) => handleFilterChange('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TRY">Turkish Lira (₺)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: PALETTE.text.secondary }}
              >
                Position
              </label>
              <Select
                value={filters.position || 'all'}
                onValueChange={(value) => handleFilterChange('position', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {availablePositions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: PALETTE.text.secondary }}
              >
                Level
              </label>
              <Select
                value={filters.level || 'all'}
                onValueChange={(value) => handleFilterChange('level', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {availableLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <div
            className="p-6 border"
            style={{
              backgroundColor: PALETTE.background.primary,
              borderColor: PALETTE.neutral[200],
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Average Salary
                </p>
                <AnimatedNumber
                  value={analytics.averageSalary}
                  formatter={(value) => analyticsService.formatCurrency(value, filters.currency)}
                  className="text-3xl font-bold"
                  style={{ color: PALETTE.accent }}
                  duration={isUpdating ? 250 : 500}
                />
              </div>
            </div>
          </div>

          <div
            className="p-6 border"
            style={{
              backgroundColor: PALETTE.background.primary,
              borderColor: PALETTE.neutral[200],
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Total Entries
                </p>
                <AnimatedNumber
                  value={analytics.totalEntries}
                  className="text-3xl font-bold"
                  style={{ color: PALETTE.text.primary }}
                  duration={isUpdating ? 250 : 500}
                />
              </div>
            </div>
          </div>

          <div
            className="p-6 border"
            style={{
              backgroundColor: PALETTE.background.primary,
              borderColor: PALETTE.neutral[200],
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Job Change Boost
                </p>
                <div
                  className="text-3xl font-bold flex items-center"
                  style={{ color: PALETTE.success }}
                >
                  +
                  <AnimatedNumber
                    value={careerAnalytics?.jobChanges.averageSalaryIncrease || 0}
                    formatter={(value) => value.toFixed(1)}
                    duration={isUpdating ? 250 : 500}
                  />
                  %
                  <ArrowUpRight className="h-5 w-5 ml-1" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="p-6 border"
            style={{
              backgroundColor: PALETTE.background.primary,
              borderColor: PALETTE.neutral[200],
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Raises Per Year
                </p>
                <AnimatedNumber
                  value={careerAnalytics?.raises.averagePerYear || 0}
                  formatter={(value) => value.toFixed(1)}
                  className="text-3xl font-bold"
                  style={{ color: PALETTE.text.primary }}
                  duration={isUpdating ? 250 : 500}
                />
              </div>
            </div>
          </div>

          <div
            className="p-6 border"
            style={{
              backgroundColor: PALETTE.background.primary,
              borderColor: PALETTE.neutral[200],
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Avg Raise
                </p>
                <div
                  className="text-3xl font-bold"
                  style={{ color: PALETTE.success }}
                >
                  +
                  <AnimatedNumber
                    value={careerAnalytics?.raises.averagePercentage || 0}
                    formatter={(value) => value.toFixed(1)}
                    duration={isUpdating ? 250 : 500}
                  />
                  %
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="border"
              style={{
                backgroundColor: PALETTE.background.primary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <div
                className="p-6 border-b"
                style={{
                  backgroundColor: PALETTE.background.tertiary,
                  borderColor: PALETTE.neutral[200],
                }}
              >
                <h3
                  className="text-lg font-semibold flex items-center"
                  style={{ color: PALETTE.text.primary }}
                >
                  <Briefcase
                    className="h-5 w-5 mr-3"
                    style={{ color: PALETTE.primary }}
                  />
                  Top Paying Positions
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Highest paying roles in the market
                </p>
              </div>
              <div className="p-6">
                {isUpdating ? (
                  <ChartSkeleton height={400} type="bar" />
                ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={topPositions}
                    margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                  >
                    <CartesianGrid
                      strokeDasharray="1 1"
                      stroke={PALETTE.neutral[200]}
                      strokeWidth={1}
                    />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                      interval={0}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        analyticsService.formatCurrency(value, filters.currency)
                      }
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          analytics={analytics}
                          currency={filters.currency}
                        />
                      }
                    />
                    <Bar
                      dataKey="value"
                      fill={PALETTE.primary}
                      radius={[0, 0, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                )}
              </div>
            </div>

            <div
              className="border"
              style={{
                backgroundColor: PALETTE.background.primary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <div
                className="p-6 border-b"
                style={{
                  backgroundColor: PALETTE.background.tertiary,
                  borderColor: PALETTE.neutral[200],
                }}
              >
                <h3
                  className="text-lg font-semibold flex items-center"
                  style={{ color: PALETTE.text.primary }}
                >
                  <Code
                    className="h-5 w-5 mr-3"
                    style={{ color: PALETTE.primary }}
                  />
                  Top Paying Technologies
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Most valuable tech skills in the market
                </p>
              </div>
              <div className="p-6">
                {isUpdating ? (
                  <ChartSkeleton height={400} type="line" />
                ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={topTechs}
                    margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                  >
                    <CartesianGrid
                      strokeDasharray="1 1"
                      stroke={PALETTE.neutral[200]}
                      strokeWidth={1}
                    />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                      interval={0}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        analyticsService.formatCurrency(value, filters.currency)
                      }
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          analytics={analytics}
                          currency={filters.currency}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={PALETTE.accent}
                      strokeWidth={2}
                      dot={{ fill: PALETTE.accent, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: PALETTE.accent }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="border"
              style={{
                backgroundColor: PALETTE.background.primary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <div
                className="p-6 border-b"
                style={{
                  backgroundColor: PALETTE.background.tertiary,
                  borderColor: PALETTE.neutral[200],
                }}
              >
                <h3
                  className="text-lg font-semibold flex items-center"
                  style={{ color: PALETTE.text.primary }}
                >
                  <TrendingUp
                    className="h-5 w-5 mr-3"
                    style={{ color: PALETTE.primary }}
                  />
                  Salary by Experience Level
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Distribution across career levels
                </p>
              </div>
              <div className="p-6">
                {isUpdating ? (
                  <ChartSkeleton height={400} type="line" />
                ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={levelData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid
                      strokeDasharray="1 1"
                      stroke={PALETTE.neutral[200]}
                      strokeWidth={1}
                    />
                    <XAxis
                      dataKey="name"
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        analyticsService.formatCurrency(value, filters.currency)
                      }
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          analytics={analytics}
                          currency={filters.currency}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={PALETTE.primary}
                      strokeWidth={2}
                      dot={{ fill: PALETTE.primary, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: PALETTE.primary }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                )}
              </div>
            </div>

            <div
              className="border"
              style={{
                backgroundColor: PALETTE.background.primary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <div
                className="p-6 border-b"
                style={{
                  backgroundColor: PALETTE.background.tertiary,
                  borderColor: PALETTE.neutral[200],
                }}
              >
                <h3
                  className="text-lg font-semibold flex items-center"
                  style={{ color: PALETTE.text.primary }}
                >
                  <DollarSign
                    className="h-5 w-5 mr-3"
                    style={{ color: PALETTE.primary }}
                  />
                  Salary Range Distribution
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  How salaries are distributed across ranges
                </p>
              </div>
              <div className="p-6">
                {isUpdating ? (
                  <ChartSkeleton height={400} type="bar" />
                ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={salaryRanges}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid
                      strokeDasharray="1 1"
                      stroke={PALETTE.neutral[200]}
                      strokeWidth={1}
                    />
                    <XAxis
                      dataKey="name"
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                    />
                    <Tooltip
                      formatter={(value: number) => [value, 'Entries']}
                      contentStyle={{
                        backgroundColor: PALETTE.background.primary,
                        border: `1px solid ${PALETTE.neutral[200]}`,
                        borderRadius: '0px',
                        boxShadow: 'none',
                        fontSize: '12px',
                        fontWeight: '400',
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill={PALETTE.accent}
                      radius={[0, 0, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                )}
              </div>
            </div>

            <div
              className="border"
              style={{
                backgroundColor: PALETTE.background.primary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <div
                className="p-6 border-b"
                style={{
                  backgroundColor: PALETTE.background.tertiary,
                  borderColor: PALETTE.neutral[200],
                }}
              >
                <h3
                  className="text-lg font-semibold flex items-center"
                  style={{ color: PALETTE.text.primary }}
                >
                  <Users
                    className="h-5 w-5 mr-3"
                    style={{ color: PALETTE.primary }}
                  />
                  Salary by Experience
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Compensation growth with experience
                </p>
              </div>
              <div className="p-6">
                {isUpdating ? (
                  <ChartSkeleton height={400} type="bar" />
                ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={experienceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                  >
                    <CartesianGrid
                      strokeDasharray="1 1"
                      stroke={PALETTE.neutral[200]}
                      strokeWidth={1}
                    />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                      interval={0}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        analyticsService.formatCurrency(value, filters.currency)
                      }
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          analytics={analytics}
                          currency={filters.currency}
                        />
                      }
                    />
                    <Bar
                      dataKey="value"
                      fill={PALETTE.primary}
                      radius={[0, 0, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                )}
              </div>
            </div>

            <div
              className="border"
              style={{
                backgroundColor: PALETTE.background.primary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <div
                className="p-6 border-b"
                style={{
                  backgroundColor: PALETTE.background.tertiary,
                  borderColor: PALETTE.neutral[200],
                }}
              >
                <h3
                  className="text-lg font-semibold flex items-center"
                  style={{ color: PALETTE.text.primary }}
                >
                  <Building
                    className="h-5 w-5 mr-3"
                    style={{ color: PALETTE.primary }}
                  />
                  Salary by Company Size
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  How company scale affects compensation
                </p>
              </div>
              <div className="p-6">
                {isUpdating ? (
                  <ChartSkeleton height={400} type="line" />
                ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={Object.entries(analytics.averageSalaryByCompanySize)
                      .map(([name, salary]) => ({
                        name,
                        value: Math.round(salary),
                      }))
                      .sort((a, b) => b.value - a.value)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid
                      strokeDasharray="1 1"
                      stroke={PALETTE.neutral[200]}
                      strokeWidth={1}
                    />
                    <XAxis
                      dataKey="name"
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        analyticsService.formatCurrency(value, filters.currency)
                      }
                      fontSize={11}
                      stroke={PALETTE.text.secondary}
                      fontWeight="400"
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          analytics={analytics}
                          currency={filters.currency}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={PALETTE.accent}
                      strokeWidth={2}
                      dot={{ fill: PALETTE.accent, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: PALETTE.accent }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div
            className="border"
            style={{
              backgroundColor: PALETTE.background.primary,
              borderColor: PALETTE.neutral[200],
            }}
          >
            <div
              className="p-6 border-b"
              style={{
                backgroundColor: PALETTE.background.tertiary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <h3
                className="text-lg font-semibold flex items-center"
                style={{ color: PALETTE.text.primary }}
              >
                <Briefcase
                  className="h-5 w-5 mr-3"
                  style={{ color: PALETTE.primary }}
                />
                Top Work Types
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: PALETTE.text.secondary }}
              >
                Remote vs office compensation
              </p>
            </div>
            <div className="p-6">
              {isUpdating ? (
                <ChartSkeleton height={300} type="list" />
              ) : (
              <div className="space-y-3">
                {Object.entries(analytics.averageSalaryByWorkType)
                  .map(([name, salary]) => ({
                    name,
                    value: Math.round(salary),
                  }))
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 6)
                  .map((workType, index) => {
                    const minSalary =
                      analytics.minSalaryByWorkType?.[workType.name] || 0;
                    const maxSalary =
                      analytics.maxSalaryByWorkType?.[workType.name] || 0;

                    return (
                      <div
                        key={workType.name}
                        className="flex justify-between items-center p-3 border"
                        style={{
                          backgroundColor:
                            index % 2 === 0
                              ? PALETTE.background.secondary
                              : PALETTE.background.primary,
                          borderColor: PALETTE.neutral[200],
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-6 h-6 text-white text-xs font-semibold flex items-center justify-center"
                            style={{ backgroundColor: PALETTE.neutral[400] }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p
                              className="font-medium"
                              style={{ color: PALETTE.text.primary }}
                            >
                              {workType.name}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: PALETTE.text.muted }}
                            >
                              Range:{' '}
                              {analyticsService.formatCurrency(
                                minSalary,
                                filters.currency
                              )}{' '}
                              -{' '}
                              {analyticsService.formatCurrency(
                                maxSalary,
                                filters.currency
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-lg font-semibold"
                            style={{ color: PALETTE.accent }}
                          >
                            {analyticsService.formatCurrency(
                              workType.value,
                              filters.currency
                            )}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: PALETTE.text.secondary }}
                          >
                            Average
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              )}
            </div>
          </div>

          <div
            className="border"
            style={{
              backgroundColor: PALETTE.background.primary,
              borderColor: PALETTE.neutral[200],
            }}
          >
            <div
              className="p-6 border-b"
              style={{
                backgroundColor: PALETTE.background.tertiary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <h3
                className="text-lg font-semibold flex items-center"
                style={{ color: PALETTE.text.primary }}
              >
                <Building
                  className="h-5 w-5 mr-3"
                  style={{ color: PALETTE.primary }}
                />
                Top Paying Companies
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: PALETTE.text.secondary }}
              >
                Industry-leading employers
              </p>
            </div>
            <div className="p-6">
              {isUpdating ? (
                <ChartSkeleton height={300} type="list" />
              ) : (
              <div className="space-y-3">
                {companyData.slice(0, 8).map((company, index) => {
                  const minSalary =
                    analytics.minSalaryByCompany?.[company.name] || 0;
                  const maxSalary =
                    analytics.maxSalaryByCompany?.[company.name] || 0;

                  return (
                    <div
                      key={company.name}
                      className="flex justify-between items-center p-3 border"
                      style={{
                        backgroundColor:
                          index % 2 === 0
                            ? PALETTE.background.secondary
                            : PALETTE.background.primary,
                        borderColor: PALETTE.neutral[200],
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-6 h-6 text-white text-xs font-semibold flex items-center justify-center"
                          style={{ backgroundColor: PALETTE.neutral[400] }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p
                            className="font-medium"
                            style={{ color: PALETTE.text.primary }}
                          >
                            {company.name}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: PALETTE.text.muted }}
                          >
                            Range:{' '}
                            {analyticsService.formatCurrency(
                              minSalary,
                              filters.currency
                            )}{' '}
                            -{' '}
                            {analyticsService.formatCurrency(
                              maxSalary,
                              filters.currency
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-lg font-semibold"
                          style={{ color: PALETTE.accent }}
                        >
                          {analyticsService.formatCurrency(
                            company.value,
                            filters.currency
                          )}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: PALETTE.text.secondary }}
                        >
                          Average
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}
            </div>
          </div>

          <div
            className="border"
            style={{
              backgroundColor: PALETTE.background.primary,
              borderColor: PALETTE.neutral[200],
            }}
          >
            <div
              className="p-6 border-b"
              style={{
                backgroundColor: PALETTE.background.tertiary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <h3
                className="text-lg font-semibold flex items-center"
                style={{ color: PALETTE.text.primary }}
              >
                <MapPin
                  className="h-5 w-5 mr-3"
                  style={{ color: PALETTE.primary }}
                />
                Top Paying Cities
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: PALETTE.text.secondary }}
              >
                Geographic salary hotspots
              </p>
            </div>
            <div className="p-6">
              {isUpdating ? (
                <ChartSkeleton height={300} type="list" />
              ) : (
              <div className="space-y-3">
                {cityData.slice(0, 8).map((city, index) => {
                  const minSalary = analytics.minSalaryByCity?.[city.name] || 0;
                  const maxSalary = analytics.maxSalaryByCity?.[city.name] || 0;

                  return (
                    <div
                      key={city.name}
                      className="flex justify-between items-center p-3 border"
                      style={{
                        backgroundColor:
                          index % 2 === 0
                            ? PALETTE.background.secondary
                            : PALETTE.background.primary,
                        borderColor: PALETTE.neutral[200],
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-6 h-6 text-white text-xs font-semibold flex items-center justify-center"
                          style={{ backgroundColor: PALETTE.neutral[400] }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p
                            className="font-medium"
                            style={{ color: PALETTE.text.primary }}
                          >
                            {city.name}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: PALETTE.text.muted }}
                          >
                            Range:{' '}
                            {analyticsService.formatCurrency(
                              minSalary,
                              filters.currency
                            )}{' '}
                            -{' '}
                            {analyticsService.formatCurrency(
                              maxSalary,
                              filters.currency
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-lg font-semibold"
                          style={{ color: PALETTE.accent }}
                        >
                          {analyticsService.formatCurrency(
                            city.value,
                            filters.currency
                          )}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: PALETTE.text.secondary }}
                        >
                          Average
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}
            </div>
          </div>
        </div>

        {careerAnalytics && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="border"
              style={{
                backgroundColor: PALETTE.background.primary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <div
                className="p-6 border-b"
                style={{
                  backgroundColor: PALETTE.background.tertiary,
                  borderColor: PALETTE.neutral[200],
                }}
              >
                <h3
                  className="text-lg font-semibold flex items-center"
                  style={{ color: PALETTE.text.primary }}
                >
                  <TrendingUp
                    className="h-5 w-5 mr-3"
                    style={{ color: PALETTE.primary }}
                  />
                  Job Change Insights
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Career transition benefits
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div
                    className="p-4 border"
                    style={{
                      backgroundColor: PALETTE.background.secondary,
                      borderColor: PALETTE.neutral[200],
                    }}
                  >
                    <div
                      className="text-sm font-medium mb-2"
                      style={{ color: PALETTE.text.secondary }}
                    >
                      Average Salary Boost
                    </div>
                    <div
                      className="text-3xl font-bold flex items-center"
                      style={{ color: PALETTE.success }}
                    >
                      +
                      <AnimatedNumber
                        value={careerAnalytics.jobChanges.averageSalaryIncrease}
                        formatter={(value) => value.toFixed(1)}
                        duration={isUpdating ? 250 : 500}
                      />
                      %
                      <ArrowUpRight className="h-6 w-6 ml-2" />
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: PALETTE.text.muted }}
                    >
                      When changing jobs
                    </div>
                  </div>
                  <div
                    className="p-4 border"
                    style={{
                      backgroundColor: PALETTE.background.secondary,
                      borderColor: PALETTE.neutral[200],
                    }}
                  >
                    <div
                      className="text-sm font-medium mb-2"
                      style={{ color: PALETTE.text.secondary }}
                    >
                      Success Rate
                    </div>
                    <div
                      className="text-3xl font-bold"
                      style={{ color: PALETTE.accent }}
                    >
                      <AnimatedNumber
                        value={careerAnalytics.jobChanges.percentageWithIncrease}
                        formatter={(value) => value.toFixed(1)}
                        duration={isUpdating ? 250 : 500}
                      />
                      %
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: PALETTE.text.muted }}
                    >
                      Get salary increases
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="border"
              style={{
                backgroundColor: PALETTE.background.primary,
                borderColor: PALETTE.neutral[200],
              }}
            >
              <div
                className="p-6 border-b"
                style={{
                  backgroundColor: PALETTE.background.tertiary,
                  borderColor: PALETTE.neutral[200],
                }}
              >
                <h3
                  className="text-lg font-semibold flex items-center"
                  style={{ color: PALETTE.text.primary }}
                >
                  <Calendar
                    className="h-5 w-5 mr-3"
                    style={{ color: PALETTE.primary }}
                  />
                  Raise Patterns
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: PALETTE.text.secondary }}
                >
                  Promotion and raise trends
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div
                    className="p-4 border"
                    style={{
                      backgroundColor: PALETTE.background.secondary,
                      borderColor: PALETTE.neutral[200],
                    }}
                  >
                    <div
                      className="text-sm font-medium mb-2"
                      style={{ color: PALETTE.text.secondary }}
                    >
                      Raises Per Year
                    </div>
                    <AnimatedNumber
                      value={careerAnalytics.raises.averagePerYear}
                      formatter={(value) => value.toFixed(1)}
                      className="text-3xl font-bold"
                      style={{ color: PALETTE.text.primary }}
                      duration={isUpdating ? 250 : 500}
                    />
                  </div>
                  <div
                    className="p-4 border"
                    style={{
                      backgroundColor: PALETTE.background.secondary,
                      borderColor: PALETTE.neutral[200],
                    }}
                  >
                    <div
                      className="text-sm font-medium mb-2"
                      style={{ color: PALETTE.text.secondary }}
                    >
                      Average Raise
                    </div>
                    <div
                      className="text-3xl font-bold"
                      style={{ color: PALETTE.success }}
                    >
                      +<AnimatedNumber
                        value={careerAnalytics.raises.averagePercentage}
                        formatter={(value) => value.toFixed(1)}
                        duration={isUpdating ? 250 : 500}
                      />%
                    </div>
                  </div>
                  <div
                    className="p-4 border"
                    style={{
                      backgroundColor: PALETTE.background.secondary,
                      borderColor: PALETTE.neutral[200],
                    }}
                  >
                    <div
                      className="text-sm font-medium mb-2"
                      style={{ color: PALETTE.text.secondary }}
                    >
                      Time Between Raises
                    </div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: PALETTE.text.primary }}
                    >
                      {formatTimePeriod(
                        careerAnalytics.raises.medianTimeBetweenRaises
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
