import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { validarFormularioInsumo, tieneErrores } from '../../utilidades/validaciones';

const VALORES_VACIOS = {
  nombre: '',
  descripcion: '',
  categoria: '',
  marca: '',
  precio: '',
  existencias: '',
  imagen: '',
};

function insumoAFormulario(insumo) {
  if (!insumo) return VALORES_VACIOS;
  return {
    nombre: insumo.title ?? '',
    descripcion: insumo.description ?? '',
    categoria: insumo.category ?? '',
    marca: insumo.brand ?? '',
    precio: insumo.price ?? '',
    existencias: insumo.stock ?? '',
    imagen: insumo.thumbnail ?? '',
  };
}

export function ModalFormularioInsumo({
  abierto,
  insumoEditando,
  categorias,
  guardando,
  onGuardar,
  onCancelar,
}) {
  const [valores, setValores] = useState(VALORES_VACIOS);
  const [errores, setErrores] = useState({});

  const estaEditando = Boolean(insumoEditando);

  useEffect(() => {
    if (abierto) {
      setValores(insumoAFormulario(insumoEditando));
      setErrores({});
    }
  }, [abierto, insumoEditando]);

  if (!abierto) return null;

  function actualizarCampo(campo, valor) {
    setValores((valoresActuales) => ({ ...valoresActuales, [campo]: valor }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const erroresEncontrados = validarFormularioInsumo(valores);
    setErrores(erroresEncontrados);
    if (tieneErrores(erroresEncontrados)) return;

    onGuardar({
      title: valores.nombre.trim(),
      description: valores.descripcion.trim(),
      category: valores.categoria.trim(),
      brand: valores.marca.trim(),
      price: Number(valores.precio),
      stock: Number(valores.existencias),
      thumbnail: valores.imagen.trim() || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-texto/40 px-4">
      <div className="superficie max-h-[90vh] w-full max-w-lg overflow-y-auto">
        <div className="flex items-center justify-between border-b border-crema-oscuro px-6 py-4">
          <h2 className="text-lg font-bold text-texto">
            {estaEditando ? 'Editar insumo medico' : 'Agregar insumo medico'}
          </h2>
          <button
            type="button"
            onClick={onCancelar}
            className="text-texto-suave hover:text-texto"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-texto-suave">
              Nombre del insumo
            </label>
            <input
              type="text"
              value={valores.nombre}
              onChange={(evento) => actualizarCampo('nombre', evento.target.value)}
              className="campo-hundido w-full px-3 py-2.5 text-sm text-texto outline-none"
              placeholder="Ej. Jeringa desechable 5ml"
            />
            {errores.nombre && (
              <p className="mt-1 text-xs text-peligro">{errores.nombre}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-texto-suave">
                Categoria
              </label>
              <input
                type="text"
                list="lista-categorias-existentes"
                value={valores.categoria}
                onChange={(evento) =>
                  actualizarCampo('categoria', evento.target.value)
                }
                className="campo-hundido w-full px-3 py-2.5 text-sm text-texto outline-none"
                placeholder="Ej. equipo-medico"
              />
              <datalist id="lista-categorias-existentes">
                {categorias.map((categoriaDisponible) => (
                  <option key={categoriaDisponible} value={categoriaDisponible} />
                ))}
              </datalist>
              {errores.categoria && (
                <p className="mt-1 text-xs text-peligro">{errores.categoria}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-texto-suave">
                Marca / proveedor
              </label>
              <input
                type="text"
                value={valores.marca}
                onChange={(evento) => actualizarCampo('marca', evento.target.value)}
                className="campo-hundido w-full px-3 py-2.5 text-sm text-texto outline-none"
                placeholder="Opcional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-texto-suave">
                Precio (MXN)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={valores.precio}
                onChange={(evento) => actualizarCampo('precio', evento.target.value)}
                className="campo-hundido w-full px-3 py-2.5 text-sm text-texto outline-none"
              />
              {errores.precio && (
                <p className="mt-1 text-xs text-peligro">{errores.precio}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-texto-suave">
                Existencias
              </label>
              <input
                type="number"
                min="0"
                value={valores.existencias}
                onChange={(evento) =>
                  actualizarCampo('existencias', evento.target.value)
                }
                className="campo-hundido w-full px-3 py-2.5 text-sm text-texto outline-none"
              />
              {errores.existencias && (
                <p className="mt-1 text-xs text-peligro">{errores.existencias}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-texto-suave">
              Descripcion
            </label>
            <textarea
              value={valores.descripcion}
              onChange={(evento) =>
                actualizarCampo('descripcion', evento.target.value)
              }
              rows={3}
              className="campo-hundido w-full px-3 py-2.5 text-sm text-texto outline-none"
              placeholder="Opcional"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-texto-suave">
              URL de imagen
            </label>
            <input
              type="text"
              value={valores.imagen}
              onChange={(evento) => actualizarCampo('imagen', evento.target.value)}
              className="campo-hundido w-full px-3 py-2.5 text-sm text-texto outline-none"
              placeholder="Opcional, ej. https://..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancelar}
              className="boton-secundario px-4 py-2 text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className="boton-primario px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
