// AuthContext.ts
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: Error | null;
}

interface AuthContextType extends AuthState {
  loginWithRedirect: (options?: any) => Promise<void>;
  logout: (options?: any) => void;
  handleRedirectCallback: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth0 = useAuth0();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null
  });

  useEffect(() => {
    if (!auth0.isLoading) {
      setAuthState({
        isAuthenticated: auth0.isAuthenticated,
        isLoading: false,
        user: auth0.user,
        error: auth0.error
      });
    }
  }, [auth0.isLoading, auth0.isAuthenticated, auth0.user, auth0.error]);

  const contextValue: AuthContextType = {
    ...authState,
    loginWithRedirect: auth0.loginWithRedirect,
    logout: auth0.logout,
    handleRedirectCallback: auth0.handleRedirectCallback
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};