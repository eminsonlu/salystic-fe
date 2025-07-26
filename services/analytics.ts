import axios from './baseService';
import { Analytics, CareerAnalytics, AnalyticsFilters, ChartDataPoint } from '@/types/IAnalytics';

export const getGeneralAnalytics = (filters?: AnalyticsFilters): Promise<[string | null, Analytics | null]> => {
  const params = new URLSearchParams();

  if (filters?.currency) params.append('currency', filters.currency);
  if (filters?.position) params.append('position', filters.position);
  if (filters?.level) params.append('level', filters.level);

  const queryString = params.toString();
  const url = queryString ? `/api/v1/analytics?${queryString}` : '/api/v1/analytics';

  return axios
    .get(url)
    .then((res) => [null, res.data.data] as [string | null, Analytics | null])
    .catch((error) => [error?.response?.data?.error || 'Failed to get analytics', null] as [string | null, Analytics | null]);
};

export const getAvailablePositions = (): Promise<[string | null, string[] | null]> => {
  return axios
    .get('/api/v1/constants/positions')
    .then((res) => [null, res.data.data] as [string | null, string[] | null])
    .catch((error) => [error?.response?.data?.error || 'Failed to get positions', null] as [string | null, string[] | null]);
};

export const getAvailableLevels = (): Promise<[string | null, string[] | null]> => {
  return axios
    .get('/api/v1/constants/levels')
    .then((res) => [null, res.data.data] as [string | null, string[] | null])
    .catch((error) => [error?.response?.data?.error || 'Failed to get levels', null] as [string | null, string[] | null]);
};

export const getCareerAnalytics = (): Promise<[string | null, CareerAnalytics | null]> => {
  return axios
    .get('/api/v1/analytics/career')
    .then((res) => [null, res.data.data] as [string | null, CareerAnalytics | null])
    .catch((error) => [error?.response?.data?.error || 'Failed to get career analytics', null] as [string | null, CareerAnalytics | null]);
};


export const formatCurrency = (amount: number, currency: string = 'TRY'): string => {
  const locale = currency === 'TRY' ? 'tr-TR' : 'en-US';
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const getSalaryTrend = (): ChartDataPoint[] => {
  const currentYear = new Date().getFullYear();
  return [
    { name: `${currentYear - 2}`, value: 95000 },
    { name: `${currentYear - 1}`, value: 102000 },
    { name: `${currentYear}`, value: 108000 },
  ];
};

export const analyticsService = {
  getGeneralAnalytics,
  getCareerAnalytics,
  getAvailablePositions,
  getAvailableLevels,
  formatCurrency,
  calculatePercentageChange,
  getSalaryTrend
};
