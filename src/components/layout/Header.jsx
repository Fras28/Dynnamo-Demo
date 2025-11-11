import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Importamos iconos de lucide
import logo from '../../assets/img/logobrasero.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Clase personalizada para el contorno (text-stroke)
  const textStrokeClass = "text-white [text-shadow:_1px_1px_0_rgb(0_0_0),_-1px_1px_0_rgb(0_0_0),_1px_-1px_0_rgb(0_0_0),_-1px_-1px_0_rgb(0_0_0)]";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo "El Brasero" */}
        <div>
          <a href="/" className="text-2xl font-bold flex items-center gap-2">
           <img src={logo} alt="ElBrasero" className="w-14" /> 
           {/* Se aplica la nueva clase para el texto */}
           <span className={`text-2xl font-bold ${textStrokeClass}`}>
             El Brasero
           </span>
          </a>
        </div>

        {/* Navegación de Escritorio */}
        <div className="hidden md:flex space-x-6">
          <a href="#catalogo" className="text-gray-700 hover:text-red-700">Catálogo</a>
          <a href="#promociones" className="text-gray-700 hover:text-red-700">Promociones</a>
          <a href="#ubicacion" className="text-gray-700 hover:text-red-700">Ubicación</a>
        </div>

        {/* Botón de Menú Móvil */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} // <-- Evento onClick
            className="text-gray-800"
          >
            {/* Renderizado condicional */}
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menú Desplegable Móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <a href="#catalogo" className="block p-4 text-gray-700 hover:bg-gray-100">Catálogo</a>
          <a href="#promociones" className="block p-4 text-gray-700 hover:bg-gray-100">Promociones</a>
          <a href="#ubicacion" className="block p-4 text-gray-700 hover:bg-gray-100">Ubicación</a>
        </div>
      )}
    </header>
  );
};

export default Header;