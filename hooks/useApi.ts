import { useState, useEffect } from 'react';
import { constantsService } from '@/services/constants';
import { 
  getGeneralAnalytics, 
  getCareerAnalytics, 
  getAvailablePositions, 
  getAvailableLevels 
} from '@/services/analytics';
import { salaryService } from '@/services/salary';
import { authService } from '@/services/auth';
import { Analytics, CareerAnalytics, AnalyticsFilters } from '@/types/IAnalytics';
import { ISalaryEntry } from '@/types/ISalary';

export function useApi<T>(
  apiCall: () => Promise<[string | null, T | null]>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [err, result] = await apiCall();
      if (err) {
        setError(err);
      } else {
        setData(result);
      }
    } catch (e) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, error, loading, refetch: fetchData };
}

export const usePositions = () => useApi(() => constantsService.getPositions());
export const useLevels = () => useApi(() => constantsService.getLevels());
export const useTechStacks = () => useApi(() => constantsService.getTechStacks());
export const useExperiences = () => useApi(() => constantsService.getExperiences());
export const useCompanies = () => useApi(() => constantsService.getCompanies());
export const useCompanySizes = () => useApi(() => constantsService.getCompanySizes());
export const useWorkTypes = () => useApi(() => constantsService.getWorkTypes());
export const useCities = () => useApi(() => constantsService.getCities());
export const useCurrencies = () => useApi(() => constantsService.getCurrencies());

export const useAnalytics = (filters?: AnalyticsFilters) => 
  useApi(() => getGeneralAnalytics(filters), [filters]);

export const useCareerAnalytics = () => 
  useApi(() => getCareerAnalytics());

export const useAvailablePositions = () => 
  useApi(() => getAvailablePositions());

export const useAvailableLevels = () => 
  useApi(() => getAvailableLevels());

export const useSalaryEntries = () => 
  useApi(() => salaryService.getEntries());

export const useSalaryEntry = (id: string) => 
  useApi(() => salaryService.getEntry(id), [id]);

export const useCurrentUser = () => 
  useApi(() => authService.getCurrentUser() as Promise<[string | null, any]>);

export function useMutation<TParams, TResult>(
  mutationFn: (params: TParams) => Promise<[string | null, TResult | null]>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (params: TParams): Promise<TResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const [err, result] = await mutationFn(params);
      if (err) {
        setError(err);
        return null;
      }
      return result;
    } catch (e) {
      setError('An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

export const useCreateSalaryEntry = () => 
  useMutation(salaryService.createEntry);

export const useUpdateSalaryEntry = () => 
  useMutation(({ id, data }: { id: string; data: any }) => 
    salaryService.updateEntry(id, data));

export const useDeleteSalaryEntry = () => 
  useMutation((id: string) => salaryService.deleteEntry(id));

export const useAddRaise = () => 
  useMutation(({ entryId, data }: { entryId: string; data: any }) => 
    salaryService.addRaise(entryId, data));
