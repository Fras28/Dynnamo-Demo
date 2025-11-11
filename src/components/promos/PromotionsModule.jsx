import React, { useMemo } from 'react';
import ProductCard from '../products/ProductCard';
import PromotionTimer from './PromotionTimer';

// 1. Recibe solo 'allProducts' y 'arePromosActive'
const PromotionsModule = ({ allProducts, arePromosActive }) => {

  const promoProducts = useMemo(() => {
    return allProducts.filter(p => p.category === 'Promociones');
  }, [allProducts]);

  return (
    <section id="promociones" className="bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Promociones del Día
        </h2>
        
        {/* 2. El Timer ahora solo necesita saber si está activo o no */}
        <div className="max-w-3xl mx-auto">
          <PromotionTimer arePromosActive={arePromosActive} />
        </div>

        {promoProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {promoProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                arePromosActive={arePromosActive}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-12">
            Hoy no hay promociones especiales disponibles.
          </p>
        )}
      </div>
    </section>
  );
};

export default PromotionsModule;