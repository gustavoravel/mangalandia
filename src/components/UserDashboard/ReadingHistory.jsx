import React from 'react';
import { Clock, BookOpen } from 'lucide-react';

const ReadingHistory = () => {
  const history = [
    {
      id: 1,
      title: "Dragon's Destiny",
      chapter: 156,
      lastRead: "2024-03-10T10:30:00",
      progress: 80,
      coverUrl: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=200&h=300&fit=crop"
    },
    // Add more history items
  ];

  return (
    <div className="bg-secondary-dark rounded-lg p-6">
      <h3 className="text-xl font-manga text-white mb-4">Histórico de Leitura</h3>
      
      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
            <img
              src={item.coverUrl}
              alt={item.title}
              className="w-16 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="text-white font-medium">{item.title}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Capítulo {item.chapter}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(item.lastRead).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-2 w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingHistory;