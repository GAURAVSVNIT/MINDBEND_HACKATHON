export interface Location {
    lat: number;
    lng: number;
    address?: string;
  }
  
  export interface CrimeReport {
    id?: string;
    reporterId: string;
    type: 'theft' | 'assault' | 'vandalism' | 'burglary' | 'other';
    description: string;
    location: Location;
    photoUrl?: string;
    timestamp?: Date;
    status?: 'reported' | 'investigating' | 'resolved';
  }