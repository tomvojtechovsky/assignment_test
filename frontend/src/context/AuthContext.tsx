// AuthContext.tsx
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    token: null
  });

  const login = useCallback((token: string) => {
    setState({ isAuthenticated: true, token });
  }, []);

  const logout = useCallback(() => {
    setState({ isAuthenticated: false, token: null });
  }, []);

  const value = { ...state, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth musí být použit uvnitř AuthProvider');
  }
  return context;
}