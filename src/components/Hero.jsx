import React from 'react';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-manga text-5xl font-medium tracking-tight text-white sm:text-7xl">
          Sua{' '}
          <span className="relative whitespace-nowrap text-primary">
            <span className="relative">biblioteca de mangás</span>
          </span>{' '}
          online
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
          Acesse centenas de mangás exclusivos por uma assinatura mensal. 
          Leia quando e onde quiser, com atualizações semanais e conteúdo exclusivo.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button size="lg" className="group">
            Começar agora
            <Sparkles className="ml-2 h-4 w-4 group-hover:animate-pulse" />
          </Button>
          <Button size="lg" variant="outline">
            Ver planos
          </Button>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="relative rounded-xl bg-secondary/30 backdrop-blur-sm p-6 pt-8">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                Destaques da semana
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <img
                  key={i}
                  src={`https://source.unsplash.com/random/200x300?manga&sig=${i}`}
                  alt={`Manga cover ${i}`}
                  className="w-24 h-36 object-cover rounded-md hover:scale-105 transition-transform cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;