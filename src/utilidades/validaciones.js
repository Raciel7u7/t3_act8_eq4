export function validarFormularioAcceso({ usuario, contrasena }) {
  const errores = {};

  if (!usuario || !usuario.trim()) {
    errores.usuario = 'El usuario es obligatorio.';
  }

  if (!contrasena || !contrasena.trim()) {
    errores.contrasena = 'La contrasena es obligatoria.';
  } else if (contrasena.length < 4) {
    errores.contrasena = 'La contrasena debe tener al menos 4 caracteres.';
  }

  return errores;
}

export function validarFormularioInsumo({ nombre, categoria, precio, existencias }) {
  const errores = {};

  if (!nombre || !nombre.trim()) {
    errores.nombre = 'El nombre del insumo es obligatorio.';
  }

  if (!categoria || !categoria.trim()) {
    errores.categoria = 'La categoria es obligatoria.';
  }

  if (precio === '' || precio === null || Number.isNaN(Number(precio))) {
    errores.precio = 'Captura un precio valido.';
  } else if (Number(precio) < 0) {
    errores.precio = 'El precio no puede ser negativo.';
  }

  if (
    existencias === '' ||
    existencias === null ||
    Number.isNaN(Number(existencias))
  ) {
    errores.existencias = 'Captura la cantidad en existencia.';
  } else if (Number(existencias) < 0) {
    errores.existencias = 'Las existencias no pueden ser negativas.';
  }

  return errores;
}

export function tieneErrores(errores) {
  return Object.keys(errores).length > 0;
}
