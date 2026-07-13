import { useEffect, useState } from 'react';
import { obtenerCategorias } from '../servicios/apiInsumos';

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    async function cargarCategorias() {
      try {
        const datos = await obtenerCategorias();
        if (!cancelado) {
          setCategorias(datos);
        }
      } catch {
        if (!cancelado) {
          setCategorias([]);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarCategorias();

    return () => {
      cancelado = true;
    };
  }, []);

  return { categorias, cargando };
}
