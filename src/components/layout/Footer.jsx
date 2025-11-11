import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna 1: Logo y Misión */}
          <div>
            <a href="/" className="text-2xl font-bold text-red-700 mb-2 block">
              El Brasero
            </a>
            <p className="text-sm">
              La mejor parrilla de Bahía Blanca, ahora online.
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#catalogo" className="hover:text-white">Catálogo</a></li>
              <li><a href="#promociones" className="hover:text-white">Promociones</a></li>
              <li><a href="#ubicacion" className="hover:text-white">Ubicación</a></li>
            </ul>
          </div>

          {/* Columna 3: Redes y Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Contacto</h4>
            <p className="text-sm mb-4">
              Dirección Falsa 123, Bahía Blanca<br />
              (0291) 455-XXXX
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm border-t border-gray-800 pt-8 mt-8">
          © {new Date().getFullYear()} El Brasero. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;