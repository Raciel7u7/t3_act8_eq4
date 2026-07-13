import { createContext, useContext, useEffect, useState } from 'react';
import { iniciarSesionSolicitud } from '../servicios/apiAutenticacion';

const ContextoAutenticacion = createContext(undefined);

const LLAVE_ALMACENAMIENTO = 'saludoax_sesion_usuario';

export function ProveedorAutenticacion({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const sesionGuardada = localStorage.getItem(LLAVE_ALMACENAMIENTO);
    if (sesionGuardada) {
      try {
        setUsuario(JSON.parse(sesionGuardada));
      } catch {
        localStorage.removeItem(LLAVE_ALMACENAMIENTO);
      }
    }
  }, []);

  async function iniciarSesion(nombreUsuario, contrasena) {
    setCargando(true);
    try {
      const usuarioAutenticado = await iniciarSesionSolicitud(
        nombreUsuario,
        contrasena,
      );
      setUsuario(usuarioAutenticado);
      localStorage.setItem(
        LLAVE_ALMACENAMIENTO,
        JSON.stringify(usuarioAutenticado),
      );
    } finally {
      setCargando(false);
    }
  }

  function cerrarSesion() {
    setUsuario(null);
    localStorage.removeItem(LLAVE_ALMACENAMIENTO);
  }

  const valor = {
    usuario,
    estaAutenticado: Boolean(usuario),
    cargando,
    iniciarSesion,
    cerrarSesion,
  };

  return (
    <ContextoAutenticacion.Provider value={valor}>
      {children}
    </ContextoAutenticacion.Provider>
  );
}

export function useAutenticacion() {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error(
      'useAutenticacion debe usarse dentro de un <ProveedorAutenticacion>',
    );
  }
  return contexto;
}
