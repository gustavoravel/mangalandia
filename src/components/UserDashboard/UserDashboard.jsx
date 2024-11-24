import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import SubscriptionManager from './SubscriptionManager';
import ReadingHistory from './ReadingHistory';

const UserDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-manga text-white">Olá, {user.name}!</h1>
          <p className="text-gray-400">Bem-vindo(a) de volta ao seu painel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SubscriptionManager />
          <ReadingHistory />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;