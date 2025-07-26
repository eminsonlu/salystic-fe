import axios from './baseService';

export const constantsService = {
  async getPositions(): Promise<[string | null, string[] | null]> {
    try {
      const response = await axios.get('/api/v1/constants/positions');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get positions';
      return [errorMessage, null];
    }
  },

  async getLevels(): Promise<[string | null, string[] | null]> {
    try {
      const response = await axios.get('/api/v1/constants/levels');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get levels';
      return [errorMessage, null];
    }
  },

  async getTechStacks(): Promise<[string | null, string[] | null]> {
    try {
      const response = await axios.get('/api/v1/constants/tech-stacks');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get tech stacks';
      return [errorMessage, null];
    }
  },

  async getExperiences(): Promise<[string | null, string[] | null]> {
    try {
      const response = await axios.get('/api/v1/constants/experiences');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get experiences';
      return [errorMessage, null];
    }
  },

  async getCompanies(): Promise<[string | null, string[] | null]> {
    try {
      const response = await axios.get('/api/v1/constants/companies');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get companies';
      return [errorMessage, null];
    }
  },

  async getCompanySizes(): Promise<[string | null, string[] | null]> {
    try {
      const response = await axios.get('/api/v1/constants/company-sizes');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get company sizes';
      return [errorMessage, null];
    }
  },

  async getWorkTypes(): Promise<[string | null, string[] | null]> {
    try {
      const response = await axios.get('/api/v1/constants/work-types');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get work types';
      return [errorMessage, null];
    }
  },

  async getCities(): Promise<[string | null, string[] | null]> {
    try {
      const response = await axios.get('/api/v1/constants/cities');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get cities';
      return [errorMessage, null];
    }
  },

  async getCurrencies(): Promise<[string | null, string[] | null]> {
    try {
      const response = await axios.get('/api/v1/constants/currencies');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get currencies';
      return [errorMessage, null];
    }
  }
};
