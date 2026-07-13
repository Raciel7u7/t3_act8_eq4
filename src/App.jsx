import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorAutenticacion } from './contexto/ContextoAutenticacion';
import { RutaProtegida } from './componentes/diseno/RutaProtegida';
import { DisenoPrincipal } from './componentes/diseno/DisenoPrincipal';
import { PaginaInicioSesion } from './paginas/PaginaInicioSesion';
import { PaginaInicio } from './paginas/PaginaInicio';
import { PaginaCitas } from './paginas/PaginaCitas';
import { PaginaPacientes } from './paginas/PaginaPacientes';
import { PaginaInsumos } from './paginas/PaginaInsumos';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ProveedorAutenticacion>
        <Routes>
          <Route path="/acceso" element={<PaginaInicioSesion />} />

          <Route
            element={
              <RutaProtegida>
                <DisenoPrincipal />
              </RutaProtegida>
            }
          >
            <Route path="/inicio" element={<PaginaInicio />} />
            <Route path="/citas" element={<PaginaCitas />} />
            <Route path="/pacientes" element={<PaginaPacientes />} />
            <Route path="/insumos" element={<PaginaInsumos />} />
          </Route>

          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </ProveedorAutenticacion>
    </BrowserRouter>
  );
}
