import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Boxes,
  Stethoscope,
} from 'lucide-react';
import { ImagenConRespaldo } from '../comunes/ImagenConRespaldo';
import { NOMBRE_CLINICA, RUTA_LOGO_CLINICA } from '../../utilidades/constantes';

const OPCIONES_NAVEGACION = [
  { ruta: '/inicio', etiqueta: 'Inicio', Icono: LayoutDashboard },
  { ruta: '/citas', etiqueta: 'Citas médicas', Icono: CalendarDays },
  { ruta: '/pacientes', etiqueta: 'Pacientes', Icono: Users },
  { ruta: '/insumos', etiqueta: 'Insumos médicos', Icono: Boxes },
];

export function BarraLateral({ abierto }) {
  return (
    <aside
      className={`sombra-lateral h-full shrink-0 overflow-hidden bg-crema transition-[width] duration-300 ease-in-out ${
        abierto ? 'w-64' : 'w-0'
      }`}
    >
      <div className="flex h-full w-64 flex-col">
        <div className="flex items-center gap-3 px-5 py-6">
          <ImagenConRespaldo
            src={RUTA_LOGO_CLINICA}
            alt={`Logotipo de ${NOMBRE_CLINICA}`}
            className="superficie-sm h-11 w-12 shrink-0 rounded-full object-cover"
            IconoRespaldo={Stethoscope} 
            claseIconoRespaldo="h-5 w-5 text-verde"
          />
          <div>
            <p className="text-sm font-bold leading-tight text-texto">
              {NOMBRE_CLINICA}
            </p>
            <p className="text-xs text-verde">Bienvenido</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {OPCIONES_NAVEGACION.map(({ ruta, etiqueta, Icono }) => (
            <NavLink
              key={ruta}
              to={ruta}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'nav-activo font-semibold'
                    : 'text-texto-suave hover:bg-crema-oscuro'
                }`
              }
            >
              <Icono className="h-4 w-4" />
              {etiqueta}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 text-xs text-texto-suave/70">
          Actividad 8 &middot; {}
        </div>
      </div>
    </aside>
  );
}
