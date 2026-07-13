import { Loader2 } from 'lucide-react';

export function Cargando({ mensaje = 'Cargando...' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-texto-suave">
      <Loader2 className="h-5 w-5 animate-spin text-verde" />
      <span>{mensaje}</span>
    </div>
  );
}
