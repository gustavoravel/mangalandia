import React from 'react';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const SubscriptionManager = () => {
  const subscription = {
    plan: 'Plus',
    status: 'active',
    nextBilling: new Date(2024, 3, 15),
    paymentMethod: '**** **** **** 4242',
  };

  return (
    <div className="bg-secondary-dark rounded-lg p-6">
      <h3 className="text-xl font-manga text-white mb-4">Sua Assinatura</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <CreditCard className="text-primary h-5 w-5" />
            <div>
              <p className="text-white">Método de Pagamento</p>
              <p className="text-sm text-gray-400">{subscription.paymentMethod}</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Atualizar</Button>
        </div>

        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Calendar className="text-primary h-5 w-5" />
            <div>
              <p className="text-white">Próxima Cobrança</p>
              <p className="text-sm text-gray-400">
                {format(subscription.nextBilling, "d 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
            Ativo
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <Button variant="outline" className="w-full">
            Mudar Plano
          </Button>
          <Button variant="primary" className="w-full bg-red-600 hover:bg-red-700">
            Cancelar Assinatura
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-400 mt-4">
          <AlertCircle className="h-4 w-4" />
          <p>O cancelamento será efetivo ao fim do período atual</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;