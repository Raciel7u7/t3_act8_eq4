import { useNavigate } from 'react-router-dom';
import { LogOut, UserRound, ChevronDown, Menu, PanelLeftClose, Bell, Search } from 'lucide-react';
import { useAutenticacion } from '../../contexto/ContextoAutenticacion';
import { ImagenConRespaldo } from '../comunes/ImagenConRespaldo';
import { MenuDesplegable } from '../comunes/MenuDesplegable';

export function BarraSuperior({ menuAbierto, onAlternarMenu }) {
  const { usuario, cerrarSesion } = useAutenticacion();
  const navegar = useNavigate();

  function manejarCierreSesion() {
    cerrarSesion();
    navegar('/acceso', { replace: true });
  }

  const nombreCompleto = usuario
    ? `${usuario.firstName ?? ''} ${usuario.lastName ?? ''}`.trim() ||
      usuario.username
    : '';

  return (
    <header className="flex h-20 shrink-0 items-center gap-3 bg-crema px-4 shadow-[0px_4px_5px_#e3d5c8] sm:px-6">
      <button
        type="button"
        onClick={onAlternarMenu}
        className="superficie-sm flex h-10 w-10 shrink-0 items-center justify-center text-texto-suave"
        aria-label={menuAbierto ? 'Ocultar menú lateral' : 'Mostrar menú lateral'}
      >
        {menuAbierto ? (
          <PanelLeftClose className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      <div className="campo-hundido hidden max-w-md flex-1 items-center gap-2 px-4 py-2.5 md:flex">
        <Search className="h-4 w-4 shrink-0 text-texto-suave" />
        <input
          type="text"
          placeholder="Buscar pacientes, citas..."
          className="w-full bg-transparent text-sm text-texto outline-none placeholder:text-texto-suave/60"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <button
          type="button"
          className="superficie-sm relative flex h-10 w-10 shrink-0 items-center justify-center text-texto-suave"
          aria-label="Notificaciones"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-peligro" />
        </button>

        <MenuDesplegable
          disparador={
            <div className="superficie-sm flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3">
              <ImagenConRespaldo
                src={usuario?.image}
                alt={`Foto de perfil de ${nombreCompleto}`}
                className="h-9 w-9 rounded-full object-cover"
                IconoRespaldo={UserRound}
                claseIconoRespaldo="h-5 w-5 text-verde"
              />
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-texto">{nombreCompleto}</p>
                <p className="text-xs text-texto-suave">@{usuario?.username}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-texto-suave" />
            </div>
          }
          opciones={[
            {
              etiqueta: 'Cerrar sesión',
              Icono: LogOut,
              onSeleccionar: manejarCierreSesion,
              peligro: true,
            },
          ]}
        />
      </div>
    </header>
  );
}
