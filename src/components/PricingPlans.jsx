import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/button';

const PricingPlans = () => {
  const plans = [
    {
      name: 'Básico',
      price: 'R$ 14,90',
      description: 'Perfeito para leitores casuais',
      features: [
        'Acesso a 100+ títulos selecionados',
        'Leitura em 1 dispositivo',
        'Novos capítulos semanalmente',
        'Sem anúncios'
      ]
    },
    {
      name: 'Plus',
      price: 'R$ 24,90',
      description: 'Nossa escolha mais popular',
      features: [
        'Acesso a todo o catálogo',
        'Leitura em até 3 dispositivos',
        'Capítulos exclusivos',
        'Downloads offline',
        'Sem anúncios',
        'Suporte prioritário'
      ],
      featured: true
    },
    {
      name: 'Premium',
      price: 'R$ 39,90',
      description: 'Para os verdadeiros fãs de mangá',
      features: [
        'Acesso a todo o catálogo',
        'Leitura em dispositivos ilimitados',
        'Capítulos exclusivos',
        'Downloads offline',
        'Sem anúncios',
        'Suporte VIP 24/7',
        'Acesso antecipado a novos títulos',
        'Conteúdo especial dos autores'
      ]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="plans">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-manga text-white mb-4">Escolha seu Plano</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Assine agora e tenha acesso ilimitado aos melhores mangás. Cancele quando quiser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl bg-secondary-dark p-8 shadow-xl ${
              plan.featured ? 'ring-2 ring-primary' : ''
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                  Mais Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-manga text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm">{plan.description}</p>
              <p className="mt-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">/mês</span>
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={plan.featured ? 'primary' : 'outline'}
              className="w-full"
            >
              Começar Agora
            </Button>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 mt-8 text-sm">
        Todos os planos incluem 7 dias de teste grátis. Cancele a qualquer momento.
      </p>
    </section>
  );
};

export default PricingPlans;