import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, PublicRoute, AdminRoute } from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NewsletterPage from './pages/NewsletterPage';
import MyBookingsPage from './pages/MyBookingPage';
import ProfilePage from './pages/MyProfile';
import CheckoutPage from './pages/PagePaiment';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/event/:id" element={<EventDetailPage />} />
              <Route path="/newsletter" element={<NewsletterPage />} />
              
              {/* Routes d'authentification (seulement si non connecté) */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                } 
              />
              
              {/* Routes protégées (nécessitent connexion) */}
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-bookings" 
                element={
                  <ProtectedRoute>
                    <MyBookingsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Routes admin (nécessitent rôle admin) */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;