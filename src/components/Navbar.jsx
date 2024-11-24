import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogin = () => {
    navigate('/catalog');
  };

  return (
    <nav className="bg-secondary-darker/95 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-manga text-2xl text-white">MangáFlix</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/catalog" className="text-gray-300 hover:text-white px-3 py-2">
                Catálogo
              </Link>
              <Link to="/plans" className="text-gray-300 hover:text-white px-3 py-2">
                Planos
              </Link>
              <Button variant="primary" size="sm" onClick={handleLogin}>
                Entrar
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/catalog"
              className="text-gray-300 hover:text-white block px-3 py-2"
            >
              Catálogo
            </Link>
            <Link
              to="/plans"
              className="text-gray-300 hover:text-white block px-3 py-2"
            >
              Planos
            </Link>
            <div className="px-3 py-2">
              <Button variant="primary" className="w-full" onClick={handleLogin}>
                Entrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;