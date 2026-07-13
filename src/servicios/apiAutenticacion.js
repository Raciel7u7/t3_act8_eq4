const URL_BASE_AUTENTICACION = 'https://dummyjson.com/auth';

export async function iniciarSesionSolicitud(usuario, contrasena) {
  let respuesta;

  try {
    respuesta = await fetch(`${URL_BASE_AUTENTICACION}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usuario,
        password: contrasena,
        expiresInMins: 60,
      }),
    });
  } catch (errorDeRed) {
    throw new Error(
      'No se pudo conectar con el servidor. Revisa tu conexion a internet.',
    );
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const mensajeInvalido =
      datos?.message === 'Invalid credentials' ||
      respuesta.status === 400 ||
      respuesta.status === 401;

    throw new Error(
      mensajeInvalido
        ? 'Usuario o contrasena incorrectos.'
        : datos?.message || 'Ocurrio un error al iniciar sesion.',
    );
  }

  return datos;
}
