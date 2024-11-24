import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '../ui/button';

const MangaManager = () => {
  const [mangas, setMangas] = useState([
    {
      id: 1,
      title: "Dragon's Destiny",
      chapters: 156,
      status: "ongoing",
      lastUpdated: "2024-03-10",
      coverUrl: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=200&h=300&fit=crop"
    },
    // Add more manga items
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-manga text-white">Gerenciar Mangás</h2>
        <Button variant="primary">
          <PlusCircle className="h-5 w-5 mr-2" />
          Adicionar Novo
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar mangás..."
          className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-4">
        {mangas.map((manga) => (
          <div key={manga.id} className="flex items-center space-x-4 bg-secondary-dark p-4 rounded-lg">
            <img
              src={manga.coverUrl}
              alt={manga.title}
              className="w-16 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-white font-medium">{manga.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                <span>{manga.chapters} capítulos</span>
                <span>Última atualização: {manga.lastUpdated}</span>
                <span className="capitalize">{manga.status}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaManager;