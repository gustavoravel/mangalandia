import React from 'react';
import { Star, Clock, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

const FeaturedManga = () => {
  const featuredMangas = [
    {
      id: 1,
      title: "Dragon's Destiny",
      chapters: 156,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=500&h=700&fit=crop",
      genre: "Ação",
      status: "Em andamento"
    },
    {
      id: 2,
      title: "Samurai Soul",
      chapters: 89,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=500&h=700&fit=crop",
      genre: "Aventura",
      status: "Em andamento"
    },
    {
      id: 3,
      title: "Mystic Academy",
      chapters: 245,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=500&h=700&fit=crop",
      genre: "Fantasia",
      status: "Completo"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-manga text-white mb-4">Mangás em Destaque</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Descubra as histórias mais populares da semana, escolhidas especialmente para você
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredMangas.map((manga) => (
          <div key={manga.id} className="manga-card group">
            <div className="relative h-[400px]">
              <img
                src={manga.image}
                alt={manga.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="manga-card-overlay p-6 flex flex-col justify-end">
                <h3 className="text-xl font-manga text-white mb-2">{manga.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-200 mb-4">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {manga.rating}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 text-gray-400 mr-1" />
                    {manga.chapters} caps
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    {manga.status}
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Ler Agora
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Ver Catálogo Completo
        </Button>
      </div>
    </section>
  );
};

export default FeaturedManga;