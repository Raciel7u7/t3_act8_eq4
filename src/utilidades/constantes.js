export const NOMBRE_CLINICA = 'SaludOax';

/** Opciones del selector "registros por pagina" de la tabla de insumos. */
export const OPCIONES_POR_PAGINA = [10, 20, 40, 50];

export const POR_PAGINA_PREDETERMINADO = 10;

// -----------------------------------------------------------------------
// Rutas de imagenes en /public. No se importan como modulo de JS a
// proposito: al vivir en /public, si el archivo todavia no existe la
// aplicacion sigue compilando sin problema y el <img> simplemente cae en
// su respaldo (ver componente ImagenConRespaldo). En cuanto se coloque un
// archivo con este mismo nombre dentro de public/imagenes, se mostrara
// automaticamente.
// -----------------------------------------------------------------------
export const RUTA_LOGO_CLINICA = 'imagenes/logo-clinica.png';
export const RUTA_ILUSTRACION_ACCESO = 'imagenes/ilustracion-acceso.png';

/** Credenciales de prueba validas segun https://dummyjson.com/users */
export const USUARIOS_DEMOSTRACION = [
  { usuario: 'emilys', contrasena: 'emilyspass' },
  { usuario: 'michaelw', contrasena: 'michaelwpass' },
  { usuario: 'sophiab', contrasena: 'sophiabpass' },
  { usuario: 'jamesd', contrasena: 'jamesdpass' },
  { usuario: 'emmaj', contrasena: 'emmajpass' },
  { usuario: 'oliviaw', contrasena: 'oliviawpass' },
  { usuario: 'alexanderj', contrasena: 'alexanderjpass' },
  { usuario: 'avat', contrasena: 'avatpass' },
  { usuario: 'ethanm', contrasena: 'ethanmpass' },
  { usuario: 'isabellad', contrasena: 'isabelladpass' },
  { usuario: 'liamg', contrasena: 'liamgpass' },
  { usuario: 'miar', contrasena: 'miarpass' },
  { usuario: 'noahh', contrasena: 'noahhpass' },
  { usuario: 'charlottem', contrasena: 'charlottempass' },
  { usuario: 'williamg', contrasena: 'williamgpass' },
  { usuario: 'averyp', contrasena: 'averyppass' },
  { usuario: 'evelyns', contrasena: 'evelynspass' },
  { usuario: 'logant', contrasena: 'logantpass' },
  { usuario: 'abigailr', contrasena: 'abigailrpass' },
  { usuario: 'jacksone', contrasena: 'jacksonepass' },
];

export const USUARIO_DEMOSTRACION = USUARIOS_DEMOSTRACION[0];
