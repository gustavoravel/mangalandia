import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "Como funciona a assinatura?",
      answer: "Nossa assinatura permite acesso ilimitado ao catálogo de mangás. Você pode escolher entre diferentes planos mensais, cada um com benefícios específicos. Todos os planos incluem 7 dias de teste grátis."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento. O acesso continua disponível até o fim do período atual já pago."
    },
    {
      question: "Como faço para ler offline?",
      answer: "Assinantes dos planos Plus e Premium podem baixar capítulos para leitura offline através do nosso aplicativo móvel."
    },
    // Add more FAQs
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-manga text-white mb-6">Perguntas Frequentes</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-secondary-dark rounded-lg"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
              <span className="text-white font-medium">{faq.question}</span>
              <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 text-gray-300">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;