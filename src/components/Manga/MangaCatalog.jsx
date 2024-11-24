import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const MangaCatalog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const mangas = [
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

  const genres = ['Todos', 'Ação', 'Aventura', 'Fantasia', 'Romance', 'Comédia'];

  const handleReadNow = (mangaId) => {
    navigate(`/manga/${mangaId}`);
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-manga text-white mb-4 md:mb-0">Catálogo de Mangás</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar mangás..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 bg-secondary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre.toLowerCase()}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mangas.map((manga) => (
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
                      <BookOpen className="w-4 h-4 text-gray-400 mr-1" />
                      {manga.chapters} caps
                    </span>
                    <span className="text-gray-400">{manga.genre}</span>
                  </div>
                  <Button
                    variant="primary"
                    className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleReadNow(manga.id)}
                  >
                    Ler Agora
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MangaCatalog;