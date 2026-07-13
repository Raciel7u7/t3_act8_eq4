import { CalendarDays, Users, Boxes, Plus } from 'lucide-react';
import { useAutenticacion } from '../contexto/ContextoAutenticacion';

const TARJETAS_RESUMEN = [
  { titulo: 'Citas de hoy', valor: '8', Icono: CalendarDays },
  { titulo: 'Pacientes activos', valor: '124', Icono: Users },
  { titulo: 'Insumos con poco stock', valor: '5', Icono: Boxes },
];

export function PaginaInicio() {
  const { usuario } = useAutenticacion();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-texto">
            Hola, {usuario?.firstName ?? usuario?.username}
          </h1>
          <p className="mt-1 text-sm text-texto-suave">
            Este es el resumen general de la clínica el día de hoy.
          </p>
        </div>

        <button
          type="button"
          className="boton-primario flex items-center justify-center gap-2 self-start px-4 py-2.5 text-sm font-semibold"
        >
          <Plus className="h-4 w-4" />
          Nueva Cita
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {TARJETAS_RESUMEN.map(({ titulo, valor, Icono }) => (
          <div key={titulo} className="superficie flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-salvia">
              <Icono className="h-5 w-5 text-texto" />
            </div>
            <div>
              <p className="text-2xl font-bold text-texto">{valor}</p>
              <p className="text-sm text-texto-suave">{titulo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
