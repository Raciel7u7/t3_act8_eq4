import { Search } from 'lucide-react';

export function FiltrosInsumos({
  buscar,
  categoria,
  categorias,
  onCambiarBuscar,
  onCambiarCategoria,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="campo-hundido flex flex-1 items-center gap-2 px-4 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-texto-suave" />
        <input
          type="text"
          value={buscar}
          onChange={(evento) => onCambiarBuscar(evento.target.value)}
          placeholder="Buscar insumo por nombre..."
          className="w-full bg-transparent text-sm text-texto outline-none placeholder:text-texto-suave/60"
        />
      </div>

      <select
        value={categoria}
        onChange={(evento) => onCambiarCategoria(evento.target.value)}
        className="campo-hundido px-4 py-2.5 text-sm capitalize text-texto outline-none sm:w-56"
      >
        <option value="todas">Todas las categorías</option>
        {categorias.map((categoriaDisponible) => (
          <option
            key={categoriaDisponible}
            value={categoriaDisponible}
            className="capitalize"
          >
            {categoriaDisponible}
          </option>
        ))}
      </select>
    </div>
  );
}
