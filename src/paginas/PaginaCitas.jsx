import { Plus, Search, MoreVertical, ChevronDown } from 'lucide-react';

const CITAS_SIMULADAS = [
  { id: '#C001', paciente: 'María Fernanda L.', especialidad: 'Medicina General', fecha: 'Hoy, 09:30 AM', estado: 'espera' },
  { id: '#C002', paciente: 'Carlos R. Gómez', especialidad: 'Cardiología', fecha: 'Hoy, 10:15 AM', estado: 'consulta' },
  { id: '#C003', paciente: 'Ana Luisa Pérez', especialidad: 'Pediatría', fecha: 'Ayer, 04:00 PM', estado: 'completado' },
  { id: '#C004', paciente: 'Roberto C. Díaz', especialidad: 'Medicina General', fecha: 'Mañana, 08:00 AM', estado: 'espera' },
  { id: '#C005', paciente: 'Sofía Herrera V.', especialidad: 'Neurología', fecha: 'Hoy, 11:30 AM', estado: 'consulta' },
  { id: '#C006', paciente: 'Luis A. Ramírez', especialidad: 'Dermatología', fecha: 'Mañana, 09:00 AM', estado: 'espera' },
  { id: '#C007', paciente: 'Elena Martínez C.', especialidad: 'Cardiología', fecha: 'Mañana, 02:00 PM', estado: 'completado' },
  { id: '#C008', paciente: 'Jorge Aquino M.', especialidad: 'Pediatría', fecha: 'Hoy, 01:15 PM', estado: 'consulta' },
];

const ESTILOS_ESTADO = {
  espera: { texto: 'En Espera', clase: 'bg-advertencia-fondo text-advertencia' },
  consulta: { texto: 'En Consulta', clase: 'bg-exito-fondo text-exito' },
  completado: { texto: 'Completado', clase: 'bg-info-fondo text-info' },
};

export function PaginaCitas() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-texto">Control de Citas</h1>
          <p className="mt-1 text-sm text-texto-suave">
            Gestiona la agenda médica del día.
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

      <div className="superficie p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="campo-hundido flex flex-1 items-center gap-2 px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-texto-suave" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              className="w-full bg-transparent text-sm text-texto outline-none placeholder:text-texto-suave/60"
            />
          </div>
          <div className="campo-hundido flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-texto sm:w-40">
            Todas
            <ChevronDown className="h-4 w-4 text-texto-suave" />
          </div>
          <div className="campo-hundido flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-texto sm:w-40">
            Todos
            <ChevronDown className="h-4 w-4 text-texto-suave" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-wide text-texto-suave">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Paciente</th>
                <th className="px-4 py-3">Especialidad</th>
                <th className="px-4 py-3">Fecha y hora</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {CITAS_SIMULADAS.map((cita) => {
                const estado = ESTILOS_ESTADO[cita.estado];
                return (
                  <tr key={cita.id} className="border-t border-crema-oscuro">
                    <td className="px-4 py-4 text-texto-suave">{cita.id}</td>
                    <td className="px-4 py-4 font-semibold text-texto">{cita.paciente}</td>
                    <td className="px-4 py-4 text-texto-suave">{cita.especialidad}</td>
                    <td className="px-4 py-4 text-texto-suave">{cita.fecha}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${estado.clase}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {estado.texto}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        className="superficie-sm flex h-8 w-8 items-center justify-center text-texto-suave"
                        aria-label={`Acciones para ${cita.paciente}`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
