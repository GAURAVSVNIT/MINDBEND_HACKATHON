export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Report {
    id: string;
    title: string;
    description?: string;
    latitude: number;
    longitude: number;
    intensity: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user?: {
      name: string;
      email: string;
    };
  }
  
  export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface ReportFormData {
    title: string;
    description: string;
    latitude: string | number;
    longitude: string | number;
    intensity: number;
    category: string;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }
  
  export interface JwtPayload {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }
  