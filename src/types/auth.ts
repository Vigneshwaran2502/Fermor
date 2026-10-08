export interface UserProfile {
  name: string;
  role: string;
  email: string;
  avatar: string;
  netWorthINR: number;
  healthScore: number;
  healthStatus: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loginDemoUser: () => void;
  loginWithEmail: (email: string) => void;
  logout: () => void;
}
