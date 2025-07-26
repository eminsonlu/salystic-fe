export { authService } from './auth';
export { salaryService } from './salary';
export { constantsService } from './constants';
export { 
  analyticsService,
  getGeneralAnalytics,
  getCareerAnalytics,
  getAvailablePositions,
  getAvailableLevels
} from './analytics';
export type { 
  ApiResponse
} from './api';
export { 
  handleApiResponse,
  API_ERRORS 
} from './api';

import axios from './baseService';

export const healthService = {
  async checkHealth(): Promise<[string | null, any | null]> {
    try {
      const response = await axios.get('/health');
      return [null, response.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Health check failed';
      return [errorMessage, null];
    }
  },

  async checkApiHealth(): Promise<[string | null, any | null]> {
    try {
      const response = await axios.get('/api/v1/health');
      return [null, response.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'API health check failed';
      return [errorMessage, null];
    }
  }
};

export const apiService = {
  auth: {
    getLinkedInAuthUrl: () => axios.get('/auth/linkedin'),
    handleLinkedInCallback: (code: string, state: string) => 
      axios.get(`/auth/linkedin/callback?code=${code}&state=${state}`),
    getCurrentUser: () => axios.get('/auth/me'),
    logout: () => axios.post('/auth/logout')
  },

  health: {
    check: () => axios.get('/health'),
    checkApi: () => axios.get('/api/v1/health')
  },

  entries: {
    create: (data: any) => axios.post('/api/v1/entries', data),
    getAll: () => axios.get('/api/v1/entries'),
    getById: (id: string) => axios.get(`/api/v1/entries/${id}`),
    update: (id: string, data: any) => axios.put(`/api/v1/entries/${id}`, data),
    delete: (id: string) => axios.delete(`/api/v1/entries/${id}`),
    addRaise: (id: string, data: any) => axios.post(`/api/v1/entries/${id}/raises`, data),
    getRaises: (id: string) => axios.get(`/api/v1/entries/${id}/raises`)
  },

  constants: {
    positions: () => axios.get('/api/v1/constants/positions'),
    levels: () => axios.get('/api/v1/constants/levels'),
    techStacks: () => axios.get('/api/v1/constants/tech-stacks'),
    experiences: () => axios.get('/api/v1/constants/experiences'),
    companies: () => axios.get('/api/v1/constants/companies'),
    companySizes: () => axios.get('/api/v1/constants/company-sizes'),
    workTypes: () => axios.get('/api/v1/constants/work-types'),
    cities: () => axios.get('/api/v1/constants/cities'),
    currencies: () => axios.get('/api/v1/constants/currencies')
  },

  analytics: {
    general: (params?: { currency?: string; position?: string; level?: string }) => {
      const query = new URLSearchParams(params as Record<string, string>).toString();
      return axios.get(`/api/v1/analytics${query ? `?${query}` : ''}`);
    },
    career: () => axios.get('/api/v1/analytics/career'),
    positions: () => axios.get('/api/v1/analytics/positions'),
    levels: () => axios.get('/api/v1/analytics/levels')
  }
};
