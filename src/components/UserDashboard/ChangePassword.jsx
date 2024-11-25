import React, { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { changePassword } from '../../lib/auth';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('As novas senhas não coincidem');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    const { error } = await changePassword(formData.currentPassword, formData.newPassword);
    
    if (error) {
      setError('Erro ao alterar senha. Verifique sua senha atual.');
    } else {
      setSuccess(true);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-secondary-dark rounded-lg p-6">
      <h3 className="text-xl font-manga text-white mb-4">Alterar Senha</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">Senha alterada com sucesso!</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300">Senha Atual</label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 bg-secondary border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Nova Senha</label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 bg-secondary border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Confirmar Nova Senha</label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 bg-secondary border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Alterando...' : 'Alterar Senha'}
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;