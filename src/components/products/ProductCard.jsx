import React from 'react';
import { useCart } from '../../context/CartContext'; // <-- Importamos el Hook del Carrito

const ProductCard = ({ product, arePromosActive }) => {
  // Obtenemos la función 'addItem' desde el Contexto
  const { addItem } = useCart();

  // Lógica simple, ya no es un 'computed'
  const isPromo = product.category === 'Promociones';

  const handleAddToCart = () => {
    if (isPromo && !arePromosActive) return; // Doble chequeo
    
    addItem(product);
    console.log(`Añadido: ${product.name}`);
  };
  
  // Clases dinámicas con template literals de JS
  const cardClasses = `
    bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl
    ${isPromo && !arePromosActive ? 'opacity-50 pointer-events-none' : ''}
  `;

  return (
    <div className={cardClasses}>
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm my-2">{product.description}</p>

        {/* Renderizado Condicional de React
          (Si isPromo es true, renderiza el <div>)
        */}
        {isPromo && (
          <div className="my-2">
            <span className="text-2xl font-extrabold text-green-600">
              ${product.price}
            </span>
          </div>
        )}
        {/* Si no es promo, no se muestra precio */}

        {/* Botón de Añadir */}
        <button 
          onClick={handleAddToCart}
          className="w-full mt-4 py-2 px-4 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors"
          disabled={isPromo && !arePromosActive}
        >
          {/* Lógica condicional con operador ternario */}
          {(isPromo && !arePromosActive)
            ? 'Promoción Finalizada'
            : 'Agregar al Pedido'
          }
        </button>
      </div>
    </div>
  );
};

export default ProductCard;