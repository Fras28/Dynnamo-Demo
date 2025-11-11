import React, { useState, useEffect, useMemo } from 'react';

// Función helper para formatear segundos a HH:MM:SS
const getFormattedTimeLeft = (seconds) => {
  if (seconds < 0) seconds = 0;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const pad = (num) => num.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

// 1. Recibe 'arePromosActive' como prop
const PromotionTimer = ({ arePromosActive }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  // 2. Este useEffect recalculará el tiempo CADA VEZ que 'arePromosActive' cambie
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(now); // Copia de la fecha actual

      if (arePromosActive) {
        // --- CASO 1: Promos ACTIVAS (contar hasta las 8 PM) ---
        target.setHours(20, 0, 0, 0); // Target: 8:00 PM de hoy
      } else {
        // --- CASO 2: Promos INACTIVAS (contar hasta las 7 AM) ---
        target.setHours(7, 0, 0, 0); // Target: 7:00 AM

        // Si ya pasaron las 7 AM de hoy (ej. son las 10 PM),
        // el objetivo es mañana a las 7 AM.
        if (now.getHours() >= 7) {
          target.setDate(target.getDate() + 1); // Avanza al día siguiente
        }
      }

      const diff = target.getTime() - now.getTime();
      setTimeLeft(Math.floor(diff / 1000));
    };

    calculateTimeLeft(); // Calcula inmediatamente
    const intervalId = setInterval(calculateTimeLeft, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo

  }, [arePromosActive]); // <- Se re-ejecuta si 'arePromosActive' cambia

  // 3. Formateamos el tiempo restante
  const formattedTimeLeft = useMemo(() => {
    return getFormattedTimeLeft(timeLeft);
  }, [timeLeft]);

  // 4. Renderizado condicional: muestra un mensaje u otro
  return (
    <>
      {arePromosActive ? (
        // --- UI si están ACTIVAS ---
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
          <p className="font-bold">¡Atención Promociones!</p>
          <p>Se tomarán pedidos de promos hasta las 20:00 hs.</p>
          <p>Terminan en: <span className="font-mono text-lg">{formattedTimeLeft}</span></p>
        </div>
      ) : (
        // --- UI si están INACTIVAS ---
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
          <p className="font-bold">Promociones Finalizadas por hoy</p>
          <p>Volvemos a tomar pedidos de promos a las 7:00 AM.</p>
          <p>Próximas ofertas en: <span className="font-mono text-lg">{formattedTimeLeft}</span></p>
        </div>
      )}
    </>
  );
};

export default PromotionTimer;