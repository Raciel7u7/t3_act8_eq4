import { UserRound } from 'lucide-react';

const PACIENTES_SIMULADOS = [
  { id: 1, nombre: 'María Fernanda López', edad: 34, telefono: '951 123 4567' },
  { id: 2, nombre: 'José Luis Martínez', edad: 52, telefono: '951 234 5678' },
  { id: 3, nombre: 'Guadalupe Hernández', edad: 8, telefono: '951 345 6789' },
  { id: 4, nombre: 'Ricardo Sánchez', edad: 61, telefono: '951 456 7890' },
];

export function PaginaPacientes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-texto">Pacientes</h1>
        <p className="mt-1 text-sm text-texto-suave">
          Directorio de pacientes
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PACIENTES_SIMULADOS.map((paciente) => (
          <div key={paciente.id} className="superficie flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-salvia">
              <UserRound className="h-5 w-5 text-texto" />
            </div>
            <div>
              <p className="font-semibold text-texto">{paciente.nombre}</p>
              <p className="text-sm text-texto-suave">
                {paciente.edad} años &middot; {paciente.telefono}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
