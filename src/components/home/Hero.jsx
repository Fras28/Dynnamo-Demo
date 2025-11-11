import React from 'react';
import { ArrowDown } from 'lucide-react';
// Importamos la ruta del video (ya estaba en tu archivo)
import Video from '../../assets/video/videohero.mp4'; 

const Hero = () => {
  // Ya no necesitamos heroImageUrl, la podemos quitar.

  return (
    <section 
      // Eliminamos el estilo de 'backgroundImage'
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden" 
    >
      
      {/* 1. Elemento de Video de Fondo */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline // Importante para la reproducción automática en móviles
        className="
          absolute inset-0 
          w-full h-full object-cover 
          z-0 // Aseguramos que el video esté en la capa más baja
        "
      >
        <source src={Video} type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>

      {/* 2. Overlay oscuro para mejorar el contraste del texto */}
      {/* El z-index del overlay debe ser mayor al del video (z-0), pero menor al del contenido (z-10) */}
      <div className="absolute inset-0 bg-black opacity-50 z-[1]"></div> 
      
      {/* 3. Contenido (Texto y Botón) */}
      <div className="relative z-10 text-center p-4"> 
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          El Sabor de la Verdadera Parrilla
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-md">
          Descubrí nuestras promos y hacé tu pedido online.
        </p>
        
        <a 
          href="#catalogo" 
          className="
            bg-red-700 text-white font-semibold py-3 px-8 
            rounded-full shadow-lg hover:bg-red-800
            transition duration-300 ease-in-out transform hover:scale-105
            inline-flex items-center space-x-2
          "
        >
          <span>Ver el Menú</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;