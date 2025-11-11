import React from 'react';

const ReservationDiscount = () => {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md shadow">
      <p className="font-bold">¡Beneficio por Reserva!</p>
      <p>
        Realiza tu reserva antes de las 21:00 hs y obtén un 
        <span className="font-bold"> 15% de descuento</span> al precio final de tu orden.
      </p>
      <p className="text-sm mt-1">
        (Nota: No aplica a productos en 'Promociones').
      </p>
    </div>
  );
};

export default ReservationDiscount;