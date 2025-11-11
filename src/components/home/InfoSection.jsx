import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react'; // Importamos iconos

const InfoSection = () => {
  return (
    // Damos a esta sección el ID "ubicacion" por si el Header lo necesita
    <section id="ubicacion" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          
          {/* Columna 1: Ubicación */}
          <div className="p-6">
            <MapPin size={48} className="text-red-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Nuestra Ubicación</h3>
            <p className="text-gray-700">
              Dirección Falsa 123<br />
              Bahía Blanca, Buenos Aires
            </p>
            <a 
              href="https://maps.google.com" // Link de Google Maps (placeholder)
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-red-700 font-semibold hover:underline mt-2 inline-block"
            >
              Ver en el mapa
            </a>
          </div>
          
          {/* Columna 2: Horarios */}
          <div className="p-6">
            <Clock size={48} className="text-red-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Horarios</h3>
            <p className="text-gray-700">
              <strong>Martes a Domingo</strong><br />
              20:00 hs - 00:00 hs
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Lunes cerrado.
            </p>
          </div>

          {/* Columna 3: Pedidos */}
          <div className="p-6">
            <Phone size={48} className="text-red-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Hacé tu Pedido</h3>
            <p className="text-gray-700">
              Llamanos o enviá un WhatsApp al<br />
              <strong>(0291) 455-XXXX</strong>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;