import { AlertTriangle, X } from 'lucide-react';

export function DialogoConfirmacion({
  abierto,
  titulo,
  mensaje,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  variante = 'peligro',
  onConfirmar,
  onCancelar,
}) {
  if (!abierto) return null;

  const esPeligro = variante === 'peligro';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-texto/40 px-4">
      <div className="superficie w-full max-w-sm p-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              esPeligro ? 'bg-peligro-fondo text-peligro' : 'bg-salvia text-texto'
            }`}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>
          <button
            type="button"
            onClick={onCancelar}
            className="text-texto-suave hover:text-texto"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h2 className="mt-4 text-lg font-bold text-texto">{titulo}</h2>
        <p className="mt-2 text-sm text-texto-suave">{mensaje}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="boton-secundario px-4 py-2 text-sm font-medium"
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
              esPeligro
                ? 'bg-peligro hover:bg-peligro/90'
                : 'boton-primario'
            }`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
