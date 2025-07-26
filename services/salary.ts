import axios from './baseService';
import { ISalaryEntry, ICreateSalaryEntry, IUpdateSalaryEntry, IRaise, ICreateRaise } from '@/types/ISalary';

export const salaryService = {
  async createEntry(data: ICreateSalaryEntry): Promise<[string | null, ISalaryEntry | null]> {
    try {
      const requestData = {
        level: data.level,
        position: data.position,
        tech_stack: data.tech_stack,
        experience: data.experience,
        gender: data.gender,
        company: data.company,
        company_size: data.company_size,
        work_type: data.work_type,
        city: data.city,
        currency: data.currency,
        salary_min: data.salary_min,
        salary_max: data.salary_max,
        raise_period: data.raise_period,
        start_time: data.start_time,
        end_time: data.end_time,
      };

      const response = await axios.post('/api/v1/entries', requestData);
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to create salary entry';
      return [errorMessage, null];
    }
  },

  async getEntries(): Promise<[string | null, ISalaryEntry[] | null]> {
    try {
      const response = await axios.get('/api/v1/entries');
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get salary entries';
      return [errorMessage, null];
    }
  },

  async getEntry(id: string): Promise<[string | null, ISalaryEntry | null]> {
    try {
      const response = await axios.get(`/api/v1/entries/${id}`);
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get salary entry';
      return [errorMessage, null];
    }
  },

  async updateEntry(id: string, data: IUpdateSalaryEntry): Promise<[string | null, ISalaryEntry | null]> {
    try {
      const requestData: any = {};
      if (data.level !== undefined) requestData.level = data.level;
      if (data.position !== undefined) requestData.position = data.position;
      if (data.tech_stack !== undefined) requestData.tech_stack = data.tech_stack;
      if (data.experience !== undefined) requestData.experience = data.experience;
      if (data.gender !== undefined) requestData.gender = data.gender;
      if (data.company !== undefined) requestData.company = data.company;
      if (data.company_size !== undefined) requestData.company_size = data.company_size;
      if (data.work_type !== undefined) requestData.work_type = data.work_type;
      if (data.city !== undefined) requestData.city = data.city;
      if (data.currency !== undefined) requestData.currency = data.currency;
      if (data.salary_min !== undefined) requestData.salary_min = data.salary_min;
      if (data.salary_max !== undefined) requestData.salary_max = data.salary_max;
      if (data.raise_period !== undefined) requestData.raise_period = data.raise_period;
      if (data.start_time !== undefined) requestData.start_time = data.start_time;
      if (data.end_time !== undefined) requestData.end_time = data.end_time;

      const response = await axios.put(`/api/v1/entries/${id}`, requestData);
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update salary entry';
      return [errorMessage, null];
    }
  },

  async deleteEntry(id: string): Promise<[string | null, boolean]> {
    try {
      await axios.delete(`/api/v1/entries/${id}`);
      return [null, true];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to delete salary entry';
      return [errorMessage, false];
    }
  },

  async addRaise(entryId: string, data: ICreateRaise): Promise<[string | null, boolean]> {
    try {
      await axios.post(`/api/v1/entries/${entryId}/raises`, data);
      return [null, true];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to add raise';
      return [errorMessage, false];
    }
  },

  async getRaises(entryId: string): Promise<[string | null, IRaise[] | null]> {
    try {
      const response = await axios.get(`/api/v1/entries/${entryId}/raises`);
      return [null, response.data.data];
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get raises';
      return [errorMessage, null];
    }
  }
};