<div align="center">
<img alt="Tecnológico Nacional de México" width="70" align="left" src="https://github.com/user-attachments/assets/429fd047-6f4d-48e1-a275-24a86adaf4af" />

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Instituto_Tecnologico_de_Oaxaca_-_original.svg/1280px-Instituto_Tecnologico_de_Oaxaca_-_original.svg.png" alt="Instituto Tecnologico de Oaxaca" width="70" align="right"><br>

# Instituto Tecnológico de Oaxaca

###  Sistema Login con tablas CRUD - Consumo de APIs de Terceros con DummyJson

Cruz Bautista Mauricio Raciel
Chavez Hernandez Luis Eduardo
Ingeniería en Sistemas Computacionales  
Programación Web, Verano 2026 

</div>

## Descripción del proyecto

Mini sistema construido en React que simula un inicio de sesión real y una
tabla de datos (inventario de insumos medicos) con filtros, paginacion y
acciones CRUD.

PARA INICIAR LA PRUEBA DEL PROYECTO COMO ADMINISTRADOR LAS CREDENCIALES SON
usuario: emilys
contrasena emilyspass

## Integrantes del equipo

- Cruz Bautista Mauricio Raciel
- Chavez Hernandez Luis Eduardo

## APIs utilizadas

- **Autenticacion:** [DummyJSON Auth](https://dummyjson.com/docs/auth) &mdash; `POST /auth/login`.
  Usuario de prueba (ver mas cuentas en <https://dummyjson.com/users>):
  `emilys` / `emilyspass`.
- **Datos de la tabla (insumos medicos):** [DummyJSON Products](https://dummyjson.com/docs/products).
  Se eligio esta API porque expone en un solo lugar busqueda por texto,
  filtro por categoria, paginacion (`limit`/`skip`) y endpoints
  simulados de escritura (`add` / `PUT` / `DELETE`). Dentro del sistema, los "productos" se presentan
  como el inventario de insumos medicos de la clinica.

## Link al proyecto desplegado

http://68.155.154.235/t3_act8_eq4/

## Como correr el proyecto en local

```bash
npm install
npm run dev
```

## Estructura del proyecto

```
src/
├── componentes/
│   ├── comunes/                     # Cargando, MensajeError, ImagenConRespaldo, DialogoConfirmacion
│   ├── diseno/                      # BarraLateral, BarraSuperior, RutaProtegida, DisenoPrincipal
│   └── insumos/                     # TablaInsumos, FiltrosInsumos, Paginacion, ModalFormularioInsumo
│
├── contexto/
│   └── ContextoAutenticacion.jsx    # Estado de sesion (login/logout/persistencia)
│
├── hooks/
│   ├── useInsumos.js                # Carga y estado local de insumos (para reflejar el CRUD)
│   └── useCategorias.js
│
├── paginas/
│   ├── PaginaInicioSesion.jsx
│   ├── PaginaInicio.jsx
│   ├── PaginaCitas.jsx              # Vista simulada de navegacion
│   ├── PaginaPacientes.jsx          # Vista simulada de navegacion
│   └── PaginaInsumos.jsx            # Tabla con filtros, paginacion y CRUD
│
├── servicios/
│   ├── apiAutenticacion.js          # Llamadas a la API de autenticacion
│   └── apiInsumos.js                # Llamadas a la API de insumos (CRUD)
│
├── utilidades/
│   ├── constantes.js
│   └── validaciones.js
│
├── App.jsx                          # Rutas de la aplicacion (React Router)
└── principal.jsx                    # Punto de entrada
```

