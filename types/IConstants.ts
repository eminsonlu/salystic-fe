export interface IJob {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ITitle {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ISector {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ICountry {
  id: string;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface ICurrency {
  id: string;
  name: string;
  code: string;
  symbol: string;
  created_at: string;
  updated_at: string;
}

export type Position = string;
export type Level = string;
export type TechStack = string;
export type Experience = string;
export type Company = string;
export type CompanySize = string;
export type WorkType = string;
export type City = string;
export type Currency = string;

export type Positions = Position[];
export type Levels = Level[];
export type TechStacks = TechStack[];
export type Experiences = Experience[];
export type Companies = Company[];
export type CompanySizes = CompanySize[];
export type WorkTypes = WorkType[];
export type Cities = City[];
export type Currencies = Currency[];

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  database?: {
    connected: boolean;
  };
}
