import { useEffect, useRef, useState } from 'react';

export function MenuDesplegable({ disparador, opciones }) {
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef(null);

  useEffect(() => {
    function manejarClicAfuera(evento) {
      if (contenedorRef.current && !contenedorRef.current.contains(evento.target)) {
        setAbierto(false);
      }
    }
    document.addEventListener('mousedown', manejarClicAfuera);
    return () => document.removeEventListener('mousedown', manejarClicAfuera);
  }, []);

  return (
    <div className="relative" ref={contenedorRef}>
      <button type="button" onClick={() => setAbierto((valor) => !valor)}>
        {disparador}
      </button>

      {abierto && (
        <div className="superficie-sm absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden py-2">
          {opciones.map(({ etiqueta, Icono, onSeleccionar, peligro }) => (
            <button
              key={etiqueta}
              type="button"
              onClick={() => {
                setAbierto(false);
                onSeleccionar();
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-crema-oscuro ${
                peligro ? 'text-peligro' : 'text-texto-suave'
              }`}
            >
              {Icono && <Icono size={16} />}
              {etiqueta}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
