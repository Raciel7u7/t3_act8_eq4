import { useEffect, useState } from 'react';
import { obtenerInsumos } from '../servicios/apiInsumos';

export function useInsumos({ pagina, porPagina, buscar, categoria }) {
  const [insumos, setInsumos] = useState([]);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelado = false;

    async function cargarInsumos() {
      setCargando(true);
      setError('');
      try {
        const saltar = (pagina - 1) * porPagina;
        const respuesta = await obtenerInsumos({
          limite: porPagina,
          saltar,
          buscar,
          categoria,
        });

        if (!cancelado) {
          setInsumos(respuesta.products ?? []);
          setTotal(respuesta.total ?? 0);
        }
      } catch (errorSolicitud) {
        if (!cancelado) {
          setError(errorSolicitud.message);
          setInsumos([]);
          setTotal(0);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarInsumos();

    return () => {
      cancelado = true;
    };
  }, [pagina, porPagina, buscar, categoria]);

  function agregarInsumoLocal(insumoNuevo) {
    setInsumos((listaActual) => [insumoNuevo, ...listaActual]);
    setTotal((totalActual) => totalActual + 1);
  }

  function actualizarInsumoLocal(id, cambios) {
    setInsumos((listaActual) =>
      listaActual.map((insumo) =>
        insumo.id === id ? { ...insumo, ...cambios } : insumo,
      ),
    );
  }

  function eliminarInsumoLocal(id) {
    setInsumos((listaActual) => listaActual.filter((insumo) => insumo.id !== id));
    setTotal((totalActual) => Math.max(0, totalActual - 1));
  }

  return {
    insumos,
    total,
    cargando,
    error,
    agregarInsumoLocal,
    actualizarInsumoLocal,
    eliminarInsumoLocal,
  };
}
