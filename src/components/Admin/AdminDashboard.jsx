import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Settings } from 'lucide-react';
import MangaManager from './MangaManager';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-secondary-dark">
        <div className="p-4">
          <h2 className="text-xl font-manga text-white mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <Link
              to="/admin"
              className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-secondary"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/manga"
              className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-secondary"
            >
              <BookOpen className="h-5 w-5" />
              <span>Mangás</span>
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-secondary"
            >
              <Users className="h-5 w-5" />
              <span>Usuários</span>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded hover:bg-secondary"
            >
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="manga" element={<MangaManager />} />
          <Route path="users" element={<UsersList />} />
          <Route path="settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

const AdminOverview = () => (
  <div className="p-6">
    <h2 className="text-2xl font-manga text-white mb-6">Visão Geral</h2>
    {/* Add overview stats and charts here */}
  </div>
);

const UsersList = () => (
  <div className="p-6">
    <h2 className="text-2xl font-manga text-white mb-6">Usuários</h2>
    {/* Add user management interface here */}
  </div>
);

const AdminSettings = () => (
  <div className="p-6">
    <h2 className="text-2xl font-manga text-white mb-6">Configurações</h2>
    {/* Add settings interface here */}
  </div>
);

export default AdminDashboard;