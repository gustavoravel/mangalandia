import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: 'Bem-vindo ao suporte! Como podemos ajudar?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    }]);
    setNewMessage('');

    // Simulate support response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'support',
        content: 'Obrigado por sua mensagem! Um de nossos atendentes responderá em breve.',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 bg-secondary-dark rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-white font-medium">Suporte ao Cliente</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : message.type === 'system'
                      ? 'bg-gray-600 text-white'
                      : 'bg-secondary text-white'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-secondary rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" variant="primary">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chat;