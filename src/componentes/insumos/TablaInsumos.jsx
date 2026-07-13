import { Pencil, Trash2, PackageSearch } from 'lucide-react';
import { ImagenConRespaldo } from '../comunes/ImagenConRespaldo';

const FORMATEADOR_MONEDA = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

export function TablaInsumos({ insumos, onEditar, onEliminar }) {
  if (insumos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-texto-suave">
        <PackageSearch className="h-10 w-10" />
        <p className="text-sm">
          No se encontraron insumos con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs font-semibold uppercase tracking-wide text-texto-suave">
            <th className="px-6 py-4">Insumo</th>
            <th className="px-6 py-4">Categoría</th>
            <th className="px-6 py-4">Marca</th>
            <th className="px-6 py-4">Precio</th>
            <th className="px-6 py-4">Existencias</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map((insumo) => (
            <tr key={insumo.id} className="border-t border-crema-oscuro">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <ImagenConRespaldo
                    src={insumo.thumbnail}
                    alt={insumo.title}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                    claseIconoRespaldo="h-5 w-5 text-texto-suave"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-texto">
                      {insumo.title}
                    </p>
                    <p className="truncate text-xs text-texto-suave">
                      {insumo.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 capitalize text-texto-suave">
                {insumo.category}
              </td>
              <td className="px-6 py-4 text-texto-suave">
                {insumo.brand || 'Sin marca'}
              </td>
              <td className="px-6 py-4 text-texto-suave">
                {FORMATEADOR_MONEDA.format(Number(insumo.price ?? 0))}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    Number(insumo.stock) > 0
                      ? 'bg-exito-fondo text-exito'
                      : 'bg-peligro-fondo text-peligro'
                  }`}
                >
                  {insumo.stock} unidades
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEditar(insumo)}
                    className="superficie-sm flex h-8 w-8 items-center justify-center text-texto-suave hover:text-verde"
                    aria-label={`Editar ${insumo.title}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEliminar(insumo)}
                    className="superficie-sm flex h-8 w-8 items-center justify-center text-texto-suave hover:text-peligro"
                    aria-label={`Eliminar ${insumo.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
