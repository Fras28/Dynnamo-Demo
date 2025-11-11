import React from 'react';


/**
 * Componente para filtrar productos por categoría, mostrando un icono.
 * Recibe el array de categorías con el nombre y la URL del ícono.
 * * @param {Array<{name: string, iconUrl: string}>} categories - Lista de categorías con su URL de icono.
 * @param {string} selectedCategory - El nombre de la categoría actualmente seleccionada.
 * @param {function} onFilter - Función a llamar al seleccionar una nueva categoría.
 */
const CategoryFilter = ({ categories, selectedCategory, onFilter }) => {
  return (
    // Contenedor principal modificado para scroll horizontal:
    <div className="
      flex flex-row overflow-x-auto 
      justify-start md:justify-center 
      gap-3 md:gap-4 p-4 
      bg-white rounded-xl shadow-lg border border-gray-100
      // Clases para ocultar la barra de desplazamiento en navegadores
      scrollbar-hide // Si usas un plugin o configuración de Tailwind que lo soporte
      // Fallback para ocultar la barra en navegadores específicos (p.ej., Firefox)
      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]
    ">
      
      {/* Mapea (itera) sobre el array de categorías para crear un botón por cada una */}
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onFilter(category.name)}
          className={`
            // Eliminamos 'flex-wrap' y aseguramos que los ítems no se encojan (flex-shrink-0)
            flex-shrink-0
            p-3 md:p-4 rounded-xl transition duration-300 ease-in-out 
            flex flex-col items-center justify-center space-y-1 md:space-y-2
            min-w-[80px] md:min-w-[100px] text-center
            
            ${selectedCategory === category.name
              ? 'bg-red-700 text-white shadow-xl transform scale-105' // Estilo activo
              : 'bg-gray-50 text-gray-700 hover:bg-gray-200 shadow-md border border-gray-200' // Estilo inactivo
            }
          `}
        >
          {/* 🖼️ Elemento clave: Muestra la imagen (icono) */}
          <img
            src={category.iconUrl}
            alt={category.name}
            className={`
              w-8 h-8 md:w-10 md:h-10 object-contain 
              ${selectedCategory === category.name ? 'filter brightness-150' : ''} 
            `}
            loading="lazy"
          />
          
          {/* 🏷️ Muestra el nombre de la categoría */}
          <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;