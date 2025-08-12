import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthState } from '../../../shared/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // 로컬스토리지에서 사용자 정보 복원
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          loading: false,
        }));
      } catch (error) {
        localStorage.removeItem('user');
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // 실제 API 호출 대신 목업 로직
      if (email === 'test@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          email,
          name: '테스트 사용자',
          createdAt: new Date(),
        };

        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      } else {
        throw new Error('잘못된 이메일 또는 비밀번호입니다.');
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : '로그인에 실패했습니다.',
      }));
      throw error;
    }
  };

  const signup = async (name: string, email: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // 실제 API 호출 대신 목업 로직
      const user: User = {
        id: crypto.randomUUID(),
        email,
        name,
        createdAt: new Date(),
      };

      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};