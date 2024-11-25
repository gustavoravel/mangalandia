import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { logoutUser } from '../../lib/auth';
import MangaManager from './MangaManager';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await logoutUser();
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary-darker">
      {/* Sidebar */}
      <div className="w-64 bg-secondary-dark border-r border-gray-700">
        <div className="h-full flex flex-col">
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
          <div className="mt-auto p-4 border-t border-gray-700">
            <Button
              variant="outline"
              className="w-full justify-start text-gray-300 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="h-16 bg-secondary-dark border-b border-gray-700 flex items-center px-6">
          <h1 className="text-xl text-white">Painel Administrativo</h1>
        </div>

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total de Mangás"
        value="42"
        icon={<BookOpen className="h-8 w-8 text-primary" />}
      />
      <StatCard
        title="Usuários Ativos"
        value="1,234"
        icon={<Users className="h-8 w-8 text-primary" />}
      />
      <StatCard
        title="Assinaturas"
        value="987"
        icon={<LayoutDashboard className="h-8 w-8 text-primary" />}
      />
    </div>
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-secondary-dark p-6 rounded-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

const UsersList = () => (
  <div className="p-6">
    <h2 className="text-2xl font-manga text-white mb-6">Usuários</h2>
    <div className="bg-secondary-dark rounded-lg p-6">
      <p className="text-gray-400">Lista de usuários em desenvolvimento...</p>
    </div>
  </div>
);

const AdminSettings = () => (
  <div className="p-6">
    <h2 className="text-2xl font-manga text-white mb-6">Configurações</h2>
    <div className="bg-secondary-dark rounded-lg p-6">
      <p className="text-gray-400">Configurações em desenvolvimento...</p>
    </div>
  </div>
);

export default AdminDashboard;