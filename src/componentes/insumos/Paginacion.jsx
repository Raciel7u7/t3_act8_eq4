import { ChevronLeft, ChevronRight } from "lucide-react";
import { OPCIONES_POR_PAGINA } from "../../utilidades/constantes";

export function Paginacion({
  pagina,
  totalPaginas,
  porPagina,
  total,
  onCambiarPagina,
  onCambiarPorPagina,
}) {
  const inicioRango = total === 0 ? 0 : (pagina - 1) * porPagina + 1;
  const finRango = Math.min(pagina * porPagina, total);

  return (
    <div className="flex flex-col gap-3 border-t border-crema-oscuro px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2 text-sm text-texto-suave">
        <span>
          Mostrando {inicioRango}-{finRango} de {total} insumos
        </span>
        <label className="flex items-center gap-2">
          Por página
          <select
            value={porPagina}
            onChange={(evento) =>
              onCambiarPorPagina(Number(evento.target.value))
            }
            className="campo-hundido px-2.5 py-1.5 text-sm text-texto outline-none"
          >
            {OPCIONES_POR_PAGINA.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onCambiarPagina(pagina - 1)}
          disabled={pagina <= 1}
          className="boton-secundario flex items-center gap-1 px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </button>

        <span className="px-2 text-sm text-texto-suave">
          Página {pagina} de {Math.max(totalPaginas, 1)}
        </span>

        <button
          type="button"
          onClick={() => onCambiarPagina(pagina + 1)}
          disabled={pagina >= totalPaginas}
          className="boton-secundario flex items-center gap-1 px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
