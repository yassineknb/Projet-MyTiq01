import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configuration Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // ← IMPORTANT pour les cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    // TEMPORAIRE: Pour tester le dashboard admin
    // Décommente cette ligne pour tester en tant qu'admin
    //setUser({ id: 1, name: 'Admin Test', email: 'admin@mytix.com', role: 'admin' });
    
    setLoading(false);
  }, []);

  // Inscription
  const register = async (name, email, password, passwordConfirmation) => {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l\'inscription' 
      };
    }
  };

  // Connexion
  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Email ou mot de passe incorrect' 
      };
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  // Vérifier si l'utilisateur est admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        register, 
        login, 
        logout, 
        isAdmin, 
        isAuthenticated,
        api // Exporter l'instance axios configurée
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};