import React, { useState, useMemo } from 'react';
// Importamos los nuevos hooks del contexto
import { useCart } from '../../context/CartContext'; 
import { ShoppingCart, X } from 'lucide-react'; 

const CartSummary = () => {
  const [showSummary, setShowSummary] = useState(false);
  
  // Obtenemos todos los estados y setters, incluidos los nuevos
  const { 
    items, removeItem, totalPrice, itemCount,
    serviceType, setServiceType,
    pickupTime, setPickupTime,
    deliveryAddress, setDeliveryAddress
  } = useCart();

  // Número de WhatsApp (debe incluir el código de país)
  const WHATSAPP_NUMBER = "5492915729501"; 

  // Función para manejar el cambio en la dirección de envío
  const handleAddressChange = (field, value) => {
    setDeliveryAddress(prev => ({ ...prev, [field]: value }));
  };

  // useMemo para calcular el link de WhatsApp
  const whatsappLink = useMemo(() => {
    let message = "¡Hola El Brasero! Quisiera hacer el siguiente pedido:\n\n";
    
    // 1. Detalles del Carrito
    items.forEach(item => {
      message += `* (x${item.quantity}) ${item.name}\n`;
    });
    
    message += `\n*Total (aprox): $${totalPrice}*\n`;

    // 2. Detalles del Servicio
    message += "\n--- Detalles de Entrega ---\n";
    message += `Servicio: ${serviceType === 'retiro' ? 'Retiro en Local' : 'Delivery (Envío)'}\n`;
    
    if (serviceType === 'retiro') {
      message += `Hora de Retiro: ${pickupTime || 'Pendiente de definir'}\n`;
    } else {
      // Detalles de Delivery
      message += "Dirección de Envío:\n";
      message += `  - Calle y Nro: ${deliveryAddress.calle} ${deliveryAddress.numero}\n`;
      if (deliveryAddress.pisoDepto) {
        message += `  - Piso/Depto: ${deliveryAddress.pisoDepto}\n`;
      }
      if (deliveryAddress.notas) {
        message += `  - Notas: ${deliveryAddress.notas}\n`;
      }
    }
    
    message += "\nPor favor, confirmar mi pedido.";

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [items, totalPrice, serviceType, pickupTime, deliveryAddress]);

  if (itemCount === 0 && !showSummary) {
    return null; 
  }

  return (
    <>
      {/* Botón flotante del carrito (sin cambios) */}
      <div className="fixed bottom-4 right-4 z-40">
        <button 
          onClick={() => setShowSummary(true)} 
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all relative"
        >
          <ShoppingCart size={24} />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        </button>
      </div>

      {/* Modal/Resumen del Pedido */}
      {showSummary && (
        <div 
          onClick={() => setShowSummary(false)} 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-2xl font-bold mb-4">Resumen de tu Pedido</h2>
            
            {/* Lista de Items (sin cambios) */}
            <div className="max-h-64 overflow-y-auto mb-4 divide-y">
              {/* ... Items Mapping ... (código anterior) */}
              {items.length > 0 ? (
                items.map(item => (
                  <div key={item.id} className="py-2 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.name} (x{item.quantity})</p>
                      {item.price && (
                        <p className="text-sm text-gray-600">${item.price}</p>
                      )}
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                      <X size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Tu carrito está vacío.</p>
              )}
            </div>

            {items.length > 0 && (
              <>
                {/* 1. Selector de Servicio */}
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <p className="font-bold mb-2">¿Cómo deseas recibir tu pedido?</p>
                  <div className="flex justify-around gap-2">
                    <button
                      onClick={() => setServiceType('retiro')}
                      className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                        serviceType === 'retiro' ? 'bg-red-700 text-white' : 'bg-white text-gray-700 border hover:bg-red-100'
                      }`}
                    >
                      Retiro en Local
                    </button>
                    <button
                      onClick={() => setServiceType('delivery')}
                      className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                        serviceType === 'delivery' ? 'bg-red-700 text-white' : 'bg-white text-gray-700 border hover:bg-red-100'
                      }`}
                    >
                      Delivery
                    </button>
                  </div>
                </div>

                {/* 2. Campo Condicional: Hora de Retiro */}
                {serviceType === 'retiro' && (
                  <div className="mb-4">
                    <label htmlFor="pickupTime" className="block text-sm font-semibold mb-1">
                      Hora de Retiro:
                    </label>
                    <input
                      type="time"
                      id="pickupTime"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                )}

                {/* 3. Campo Condicional: Dirección de Delivery */}
                {serviceType === 'delivery' && (
                  <div className="mb-4 p-3 border rounded-lg bg-red-50">
                    <p className="font-bold mb-2 text-red-800">Dirección de Delivery:</p>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Calle/Av."
                        value={deliveryAddress.calle}
                        onChange={(e) => handleAddressChange('calle', e.target.value)}
                        className="col-span-2 p-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Nro."
                        value={deliveryAddress.numero}
                        onChange={(e) => handleAddressChange('numero', e.target.value)}
                        className="col-span-1 p-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Piso / Departamento (opcional)"
                      value={deliveryAddress.pisoDepto}
                      onChange={(e) => handleAddressChange('pisoDepto', e.target.value)}
                      className="w-full p-2 mb-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <textarea
                      placeholder="Notas adicionales (color de casa, entre calles, etc.)"
                      value={deliveryAddress.notas}
                      onChange={(e) => handleAddressChange('notas', e.target.value)}
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    ></textarea>
                  </div>
                )}
                
                <p className="text-lg font-bold text-right mb-4">
                  Total (aprox): ${totalPrice}
                </p>

                {/* Botón de WhatsApp (sin cambios en estilo) */}
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-full flex items-center justify-center py-3 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                >
                  {/* Icono de WhatsApp (SVG en línea) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.56-3.806-1.56-5.816C.184 6.643 5.407 1.42 12.028 1.42c6.62 0 11.842 5.223 11.842 11.843 0 6.62-5.223 11.843-11.843 11.843-1.944 0-3.793-.455-5.443-1.28L.057 24zM6.92 6.603c-.66 0-1.196.536-1.196 1.196 0 .66.536 1.196 1.196 1.196.66 0 1.196-.536 1.196-1.196 0-.66-.536-1.196-1.196-1.196zm7.258 10.39c-1.135 0-2.057-.922-2.057-2.057 0-1.135.922-2.057 2.057-2.057s2.057.922 2.057 2.057c0 1.135-.922 2.057-2.057 2.057zm4.336-4.336c-.66 0-1.196.536-1.196 1.196 0 .66.536 1.196 1.196 1.196.66 0 1.196-.536 1.196-1.196 0-.66-.536-1.196-1.196-1.196z"></path></svg>
                  <span className="ml-2">Finalizar Pedido por WhatsApp</span>
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartSummary;