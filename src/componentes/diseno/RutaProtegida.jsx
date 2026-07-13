import { Navigate } from "react-router-dom";
import { useAutenticacion } from "../../contexto/ContextoAutenticacion";

export function RutaProtegida({ children }) {
  const { estaAutenticado } = useAutenticacion();

  if (!estaAutenticado) {
    return <Navigate to="/acceso" replace />;
  }

  return children;
}
