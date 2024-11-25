import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { resetPassword } from '../../lib/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const { error } = await resetPassword(email);
    
    if (error) {
      setError('Erro ao enviar email de recuperação. Verifique o endereço informado.');
    } else {
      setSuccess(true);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-secondary-dark p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl font-manga text-white">Recuperar Senha</h2>
          <p className="mt-2 text-gray-400">
            Digite seu email para receber instruções de recuperação
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">
                Email enviado! Verifique sua caixa de entrada.
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 bg-secondary border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="seu@email.com"
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
            {loading ? 'Enviando...' : 'Enviar Email'}
          </Button>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-primary hover:text-primary-dark"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;