// frontend/src/context/AuthContext.tsx
import { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  ReactNode 
} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CHECK_AUTH } from '../graphql/queries/checkAuth';
import { LOGOUT_MUTATION } from '../graphql/mutations/logout';

// Definice typů pro kontext
interface AuthState {
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
}

// Vytvoření kontextu s výchozí hodnotou null
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Stav přihlášení
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // GraphQL query pro kontrolu přihlášení
  const { loading } = useQuery(CHECK_AUTH, {
    onCompleted: (data) => {
      setIsAuthenticated(data.auth.checkAuth);
    },
    onError: () => {
      setIsAuthenticated(false);
    }
  });

  // Mutace pro odhlášení
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  // Funkce pro přihlášení
  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  // Funkce pro odhlášení
  const logout = useCallback(async () => {
    try {
      await logoutMutation();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // I v případě chyby odhlásíme uživatele lokálně
      setIsAuthenticated(false);
    }
  }, [logoutMutation]);

  // Během načítání můžeme zobrazit loading stav
  if (loading) {
    return null; // nebo nějaký loading komponent
  }

  // Poskytnutí kontextu potomkům
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pro použití auth kontextu
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}