// types.ts
export interface User {
    uid: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    createdAt: string;
    lastLogin: string;
    role: 'user' | 'admin'; // Add more roles as needed
    // Add any additional fields you need
    photoURL?: string;
    emailVerified?: boolean;
  }
  
  export interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    signInWithPhone: (phone: string) => Promise<void>;
    verifyOtp: (otp: string) => Promise<void>;
    signOut: () => Promise<void>;
  }
  
  export interface FirebaseError extends Error {
    code: string;
    message: string;
    name: string;
  }