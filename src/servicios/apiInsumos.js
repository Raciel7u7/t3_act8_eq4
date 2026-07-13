const URL_BASE_INSUMOS = 'https://dummyjson.com/products';

async function manejarRespuesta(respuesta, mensajeError) {
  if (!respuesta.ok) {
    throw new Error(mensajeError);
  }
  return respuesta.json();
}

function alFallarConexion() {
  throw new Error('No se pudo conectar con el servidor de insumos medicos.');
}

export async function obtenerInsumos({
  limite,
  saltar,
  buscar,
  categoria,
}) {
  let url;

  const textoBusqueda = buscar?.trim();

  if (textoBusqueda) {
    url = `${URL_BASE_INSUMOS}/search?q=${encodeURIComponent(
      textoBusqueda,
    )}&limit=${limite}&skip=${saltar}`;
  } else if (categoria && categoria !== 'todas') {
    url = `${URL_BASE_INSUMOS}/category/${encodeURIComponent(
      categoria,
    )}?limit=${limite}&skip=${saltar}`;
  } else {
    url = `${URL_BASE_INSUMOS}?limit=${limite}&skip=${saltar}`;
  }

  let respuesta;
  try {
    respuesta = await fetch(url);
  } catch {
    alFallarConexion();
  }

  return manejarRespuesta(respuesta, 'No se pudieron cargar los insumos medicos.');
}

export async function obtenerCategorias() {
  let respuesta;
  try {
    respuesta = await fetch(`${URL_BASE_INSUMOS}/categories`);
  } catch {
    alFallarConexion();
  }

  const datos = await manejarRespuesta(
    respuesta,
    'No se pudieron cargar las categorias.',
  );

  if (Array.isArray(datos) && typeof datos[0] === 'string') {
    return datos;
  }
  return datos.map((categoriaApi) => categoriaApi.slug);
}


export async function crearInsumo(insumo) {
  const respuesta = await fetch(`${URL_BASE_INSUMOS}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(insumo),
  });
  return manejarRespuesta(respuesta, 'No se pudo crear el insumo.');
}

export async function actualizarInsumo(id, insumo) {
  const respuesta = await fetch(`${URL_BASE_INSUMOS}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(insumo),
  });
  return manejarRespuesta(respuesta, 'No se pudo actualizar el insumo.');
}

export async function eliminarInsumo(id) {
  const respuesta = await fetch(`${URL_BASE_INSUMOS}/${id}`, {
    method: 'DELETE',
  });
  return manejarRespuesta(respuesta, 'No se pudo eliminar el insumo.');
}
