
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  isAdmin: boolean;
  history: any[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string, isAdmin?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('1111-user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email: string, name: string, isAdmin: boolean = false) => {
    const newUser = { 
      name, 
      email, 
      isAdmin,
      history: isAdmin ? [] : [
        { id: '10293', date: '12/02/2024', total: 1890, status: 'Entregue' },
        { id: '10455', date: '28/02/2024', total: 3400, status: 'Processando' }
      ] 
    };
    setUser(newUser);
    localStorage.setItem('1111-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('1111-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
