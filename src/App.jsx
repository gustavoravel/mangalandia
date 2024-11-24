import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedManga from './components/FeaturedManga';
import PricingPlans from './components/PricingPlans';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Chat from './components/Support/Chat';
import MangaCatalog from './components/Manga/MangaCatalog';
import MangaReader from './components/Manga/MangaReader';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-b from-secondary-darker to-secondary-dark">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                <FeaturedManga />
                <PricingPlans />
              </main>
            } />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/catalog" element={<MangaCatalog />} />
            <Route path="/manga/:id" element={<MangaReader />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
          <Chat />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;