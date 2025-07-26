export interface ISalaryEntry {
  id: string;
  user_id: string;
  level: string;
  position: string;
  tech_stack: string[];
  experience: string;
  gender: string;
  company: string;
  company_size: string;
  work_type: string;
  city: string;
  currency: string;
  salary_range: string;
  salary_min: number;
  salary_max?: number;
  raise_period: number;
  start_time: string;
  end_time?: string;
  raises?: IRaise[];
  created_at: string;
  updated_at: string;
}

export interface ICreateSalaryEntry {
  level: string;
  position: string;
  tech_stack: string[];
  experience: string;
  gender: string;
  company: string;
  company_size: string;
  work_type: string;
  city: string;
  currency: string;
  salary_min: number;
  salary_max?: number;
  raise_period: number;
  start_time: string;
  end_time?: string;
}

export interface IUpdateSalaryEntry {
  level?: string;
  position?: string;
  tech_stack?: string[];
  experience?: string;
  gender?: string;
  company?: string;
  company_size?: string;
  work_type?: string;
  city?: string;
  currency?: string;
  salary_min?: number;
  salary_max?: number;
  raise_period?: number;
  start_time?: string;
  end_time?: string;
}

export interface IRaise {
  id: string;
  raiseDate: string;
  newSalary: number;
  percentage: number;
  created_at: string;
}

export interface ICreateRaise {
  raiseDate: string;
  newSalary: number;
  percentage: number;
}
