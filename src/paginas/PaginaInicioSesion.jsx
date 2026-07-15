import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Stethoscope, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAutenticacion } from '../contexto/ContextoAutenticacion';
import { MensajeError } from '../componentes/comunes/MensajeError';
import { validarFormularioAcceso, tieneErrores } from '../utilidades/validaciones';
import { NOMBRE_CLINICA, RUTA_ILUSTRACION_ACCESO } from '../utilidades/constantes';
export function PaginaInicioSesion() {
  const { estaAutenticado, cargando, iniciarSesion } = useAutenticacion();
  const navegar = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [erroresCampos, setErroresCampos] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  if (estaAutenticado) {
    return <Navigate to="/inicio" replace />;
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setErrorGeneral('');

    const erroresEncontrados = validarFormularioAcceso({ usuario, contrasena });
    setErroresCampos(erroresEncontrados);
    if (tieneErrores(erroresEncontrados)) return;

    try {
      await iniciarSesion(usuario.trim(), contrasena);
      navegar('/inicio', { replace: true });
    } catch (error) {
      setErrorGeneral(error.message);
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col items-center justify-center gap-6 bg-salvia p-10 lg:flex">
        <div  className="superficie flex h-32 w-32 items-center justify-center rounded-full !shadow-[-8px_-8px_16px_rgba(255,255,200,0.5),8px_8px_16px_rgba(0,0,0,.4)]">
          <img src={RUTA_ILUSTRACION_ACCESO} ></img>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{NOMBRE_CLINICA}</p>
          <p className="mt-1 text-sm text-white/85">Sistema de Gestión Clínica</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-crema px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 text-verde lg:hidden">
            <Stethoscope className="h-6 w-6" />
            <span className="text-lg font-bold">{NOMBRE_CLINICA}</span>
          </div>

          <h1 className="text-2xl font-bold text-texto">Bienvenido de nuevo</h1>
          <p className="mt-1 text-sm text-texto-suave">
            Por favor, ingresa tus credenciales.
          </p>

          <form onSubmit={manejarEnvio} className="mt-6 space-y-4" noValidate>
            <div>
              <label className="mb-1 block text-sm font-medium text-texto-suave">
                Usuario
              </label>
              <div className="campo-hundido flex items-center gap-3 px-4 py-3">
                <Mail className="h-4 w-4 shrink-0 text-texto-suave" />
                <input
                  type="text"
                  autoComplete="username"
                  value={usuario}
                  onChange={(evento) => setUsuario(evento.target.value)}
                  className="w-full bg-transparent text-sm text-texto outline-none placeholder:text-texto-suave/60"
                  placeholder="Ej. emilys"
                />
              </div>
              {erroresCampos.usuario && (
                <p className="mt-1 text-xs text-peligro">{erroresCampos.usuario}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-texto-suave">
                Contraseña
              </label>
              <div className="campo-hundido flex items-center gap-3 px-4 py-3">
                <Lock className="h-4 w-4 shrink-0 text-texto-suave" />
                <input
                  type={mostrarContrasena ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={contrasena}
                  onChange={(evento) => setContrasena(evento.target.value)}
                  className="w-full bg-transparent text-sm text-texto outline-none placeholder:text-texto-suave/60"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setMostrarContrasena((valor) => !valor)}
                  className="shrink-0 text-texto-suave hover:text-texto"
                  aria-label={
                    mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  {mostrarContrasena ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {erroresCampos.contrasena && (
                <p className="mt-1 text-xs text-peligro">{erroresCampos.contrasena}</p>
              )}
            </div>

            <MensajeError mensaje={errorGeneral} />

            <button
              type="submit"
              disabled={cargando}
              className="boton-primario flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cargando ? 'Ingresando...' : 'Entrar al Sistema'}
              {!cargando && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
