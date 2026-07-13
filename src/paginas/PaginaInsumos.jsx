import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useInsumos } from '../hooks/useInsumos';
import { useCategorias } from '../hooks/useCategorias';
import { FiltrosInsumos } from '../componentes/insumos/FiltrosInsumos';
import { TablaInsumos } from '../componentes/insumos/TablaInsumos';
import { Paginacion } from '../componentes/insumos/Paginacion';
import { ModalFormularioInsumo } from '../componentes/insumos/ModalFormularioInsumo';
import { DialogoConfirmacion } from '../componentes/comunes/DialogoConfirmacion';
import { Cargando } from '../componentes/comunes/Cargando';
import { MensajeError } from '../componentes/comunes/MensajeError';
import {
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo,
} from '../servicios/apiInsumos';
import { POR_PAGINA_PREDETERMINADO } from '../utilidades/constantes';

export function PaginaInsumos() {
  const [parametrosUrl, setParametrosUrl] = useSearchParams();

  const pagina = Number(parametrosUrl.get('pagina')) || 1;
  const porPagina =
    Number(parametrosUrl.get('limite')) || POR_PAGINA_PREDETERMINADO;
  const categoria = parametrosUrl.get('categoria') || 'todas';
  const buscarUrl = parametrosUrl.get('buscar') || '';

  const [textoBusqueda, setTextoBusqueda] = useState(buscarUrl);

  useEffect(() => {
    setTextoBusqueda(buscarUrl);
  }, [buscarUrl]);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      actualizarParametros({ buscar: textoBusqueda || null, pagina: 1 });
    }, 400);
    return () => clearTimeout(temporizador);
  }, [textoBusqueda]);

  const { categorias } = useCategorias();
  const {
    insumos,
    total,
    cargando,
    error,
    agregarInsumoLocal,
    actualizarInsumoLocal,
    eliminarInsumoLocal,
  } = useInsumos({ pagina, porPagina, buscar: buscarUrl, categoria });

  const totalPaginas = useMemo(
    () => Math.max(1, Math.ceil(total / porPagina)),
    [total, porPagina],
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  const [insumoEditando, setInsumoEditando] = useState(null);
  const [guardandoInsumo, setGuardandoInsumo] = useState(false);
  const [errorAccion, setErrorAccion] = useState('');

  const [confirmacionEdicion, setConfirmacionEdicion] = useState({
    abierto: false,
    insumo: null,
  });
  const [confirmacionEliminacion, setConfirmacionEliminacion] = useState({
    abierto: false,
    insumo: null,
  });

  function actualizarParametros(cambios) {
    const nuevosParametros = new URLSearchParams(parametrosUrl);

    Object.entries(cambios).forEach(([llave, valor]) => {
      if (valor === null || valor === '' || valor === undefined) {
        nuevosParametros.delete(llave);
      } else {
        nuevosParametros.set(llave, String(valor));
      }
    });

    setParametrosUrl(nuevosParametros);
  }

  function manejarCambioCategoria(nuevaCategoria) {
    actualizarParametros({
      categoria: nuevaCategoria === 'todas' ? null : nuevaCategoria,
      pagina: 1,
    });
  }

  function manejarCambioPorPagina(nuevoValor) {
    actualizarParametros({ limite: nuevoValor, pagina: 1 });
  }

  function manejarCambioPagina(nuevaPagina) {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    actualizarParametros({ pagina: nuevaPagina });
  }

  function abrirModalAgregar() {
    setErrorAccion('');
    setInsumoEditando(null);
    setModalAbierto(true);
  }

  function pedirConfirmacionEdicion(insumo) {
    setConfirmacionEdicion({ abierto: true, insumo });
  }

  function confirmarEdicion() {
    setInsumoEditando(confirmacionEdicion.insumo);
    setConfirmacionEdicion({ abierto: false, insumo: null });
    setErrorAccion('');
    setModalAbierto(true);
  }

  function pedirConfirmacionEliminacion(insumo) {
    setConfirmacionEliminacion({ abierto: true, insumo });
  }

  async function confirmarEliminacion() {
    const insumo = confirmacionEliminacion.insumo;
    setConfirmacionEliminacion({ abierto: false, insumo: null });
    if (!insumo) return;

    try {
      await eliminarInsumo(insumo.id);
      eliminarInsumoLocal(insumo.id);
    } catch (error) {
      setErrorAccion(error.message);
    }
  }

  async function guardarInsumo(datosFormulario) {
    setGuardandoInsumo(true);
    setErrorAccion('');

    try {
      if (insumoEditando) {
        await actualizarInsumo(insumoEditando.id, datosFormulario);
        actualizarInsumoLocal(insumoEditando.id, datosFormulario);
      } else {
        const insumoCreado = await crearInsumo(datosFormulario);
        agregarInsumoLocal({
          ...insumoCreado,
          id: insumoCreado.id || Date.now(),
        });
      }
      setModalAbierto(false);
      setInsumoEditando(null);
    } catch (error) {
      setErrorAccion(error.message);
    } finally {
      setGuardandoInsumo(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-texto">Insumos médicos</h1>
          <p className="mt-1 text-sm text-texto-suave">
            Inventario de insumos de la clínica.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirModalAgregar}
          className="boton-primario flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold"
        >
          <Plus className="h-4 w-4" />
          Agregar insumo
        </button>
      </div>

      <div className="superficie p-5">
        <FiltrosInsumos
          buscar={textoBusqueda}
          categoria={categoria}
          categorias={categorias}
          onCambiarBuscar={setTextoBusqueda}
          onCambiarCategoria={manejarCambioCategoria}
        />
      </div>

      {errorAccion && <MensajeError mensaje={errorAccion} />}

      <div className="superficie overflow-hidden">
        {cargando ? (
          <Cargando mensaje="Cargando insumos médicos..." />
        ) : error ? (
          <div className="p-6">
            <MensajeError mensaje={error} />
          </div>
        ) : (
          <>
            <TablaInsumos
              insumos={insumos}
              onEditar={pedirConfirmacionEdicion}
              onEliminar={pedirConfirmacionEliminacion}
            />
            <Paginacion
              pagina={pagina}
              totalPaginas={totalPaginas}
              porPagina={porPagina}
              total={total}
              onCambiarPagina={manejarCambioPagina}
              onCambiarPorPagina={manejarCambioPorPagina}
            />
          </>
        )}
      </div>

      <ModalFormularioInsumo
        abierto={modalAbierto}
        insumoEditando={insumoEditando}
        categorias={categorias}
        guardando={guardandoInsumo}
        onGuardar={guardarInsumo}
        onCancelar={() => {
          setModalAbierto(false);
          setInsumoEditando(null);
        }}
      />

      <DialogoConfirmacion
        abierto={confirmacionEdicion.abierto}
        variante="informativa"
        titulo="Editar insumo"
        mensaje={`¿Deseas editar "${confirmacionEdicion.insumo?.title ?? ''}"?`}
        textoConfirmar="Si, editar"
        onConfirmar={confirmarEdicion}
        onCancelar={() => setConfirmacionEdicion({ abierto: false, insumo: null })}
      />

      <DialogoConfirmacion
        abierto={confirmacionEliminacion.abierto}
        variante="peligro"
        titulo="Eliminar insumo"
        mensaje={`¿Seguro que quieres eliminar "${
          confirmacionEliminacion.insumo?.title ?? ''
        }"? Esta accion no se puede deshacer.`}
        textoConfirmar="Si, eliminar"
        onConfirmar={confirmarEliminacion}
        onCancelar={() =>
          setConfirmacionEliminacion({ abierto: false, insumo: null })
        }
      />
    </div>
  );
}
