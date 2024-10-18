**# Backend Project - Tienda de ropa**

Este proyecto implementa una tienda de ropa con un catálogo de productos y un panel de administración (dashboard) para gestionar los artículos. Es decir, eliminar, editar o agregar artículos. Los productos se almacenan en una base de datos, en este caso MongoDB Atlas, y la aplicación está construida usando Node.js, Express y Mongoose.

### Requisitos Previos:
-Node.js (v14 o superior)
-MongoDB Atlas (se necesita una cuenta y una conexión configurada)
-Una terminal o entorno de desarrollo como VS Code

### Dependencias:
express: Framework para crear el servidor.
mongoose: para manejar MongoDB.
dotenv: Carga variables de entorno desde un archivo .env.
swagger-ui-express: para documentar la API

## Estrcutura del proyecto (bash)
├── config/
│   └── db.js               # Configuración de la conexión con MongoDB
├── controllers/
│   ├── controllersAPI.js    # Controladores para la API
│   └── productControllers.js# Controladores para el proyecto con HTML
├── models/
│   └── Product.js           # Modelo de producto
├── routes/
│   ├── routesAPI.js         # Rutas para la API
│   └── productRoutes.js     # Rutas para el proyecto con HTML
├── .env                     # Variables de entorno
├── index.js                 # Archivo principal del servidor
└── package.json             # Configuración del proyecto y dependencias
└── docs/          
    └── basicInfo.js        # Información basica de la api y documentación con swagger
    └── components.js       # Componentes y esquemas de la API
    └── index.js            # Configuración y exportacion de la documentacion de la API con swagger  
    └── products.js         # Documentacion de los endpoints de la API con swaggger


### Instalación:
1- Clonar el repositorio en la máquina local:
-Fork y luego: git clone <url-del-repositorio> (bash)
2- Instalar las dependencias del proyecto:
-npm install express mongoose dotenv (bash)
3-Configurar las variables de entorno:
-Crera un archivo .env en la raíz del proyecto con la siguiente variable (se debe tener la URL de conexión a MongoDB Atlas):
MONGO_URL= <url_de_conexion_a_mongodb>
PORT=3000  # O el puerto que se prefieras usar
4-Inicia el servidor:
-npm start / node index.js

Ejemplo: La aplicación estaría disponible en http://localhost:3000 (si se ha usado este puerto).

## Modelo
Modelo de Producto:
```javascript
const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'], required: true },
    talla: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true },
    precio: { type: Number, required: true },
    imagen: { type: String },
}, { timestamps: true });
```

## Endpoints de la API

**GET /api/products**
Obtiene todos los productos del catálogo.
Ejemplo de respuesta:
[
  {
    "_id": "123456",
    "nombre": "Camisa de ejemplo",
    "descripcion": "Camisa de algodón",
    "categoria": "Camisetas",
    "talla": "M",
    "precio": 25,
    "imagen": "https://imagen.com/camisa.jpg"
  }
]

**GET /api/products/:productId**
Obtiene un producto por su ID.

Parámetros:
-productId: ID del producto.

Ejemplo de respuesta:
{
  "_id": "123456",
  "nombre": "Camisa",
  "descripcion": "Camisa de algodón",
  "categoria": "Camisetas",
  "talla": "M",
  "precio": 25,
  "imagen": "https://imagen.com/camisa.jpg"
}

**POST /api/dashboard**
Crea un nuevo producto.

Ejemplo body:
{
  "nombre": "Pantalón",
  "descripcion": "Pantalón vaquero",
  "categoria": "Pantalones",
  "talla": "L",
  "precio": 40,
  "imagen": "https://imagen.com/pantalon.jpg"
}

Ejemplo respuesta:
{
  "_id": "987654",
  "nombre": "Pantalón",
  "descripcion": "Pantalón vaquero",
  "categoria": "Pantalones",
  "talla": "L",
  "precio": 40,
  "imagen": "https://imagen.com/pantalon.jpg"
}

**PUT /api/dashboard/:productId**
Actualiza un producto por su ID.

Parámetros:
-productId: ID del producto.

Ejemplo body:
{
  "nombre": "Camiseta actualizada",
  "descripcion": "Nueva descripción",
  "categoria": "Camisetas",
  "talla": "XL",
  "precio": 35,
  "imagen": "https://imagen.com/camiseta-nueva.jpg"
}

Ejemplo respuesta:
{
  "_id": "123456",
  "nombre": "Camiseta actualizada",
  "descripcion": "Nueva descripción",
  "categoria": "Camisetas",
  "talla": "XL",
  "precio": 35,
  "imagen": "https://imagen.com/camiseta-nueva.jpg"
}


**DELETE /api/dashboard/:productId/delete**
Elimina un producto por su ID.

Parámetros:
-productId: ID del producto.

Ejemplo respuesta:
{
  "message": "Product deleted"
}


## Rutas y endpoints con HTML

**GET /dashboard**
Muestra todos los productos disponibles en una página HTML. Esta página permite visualizar la lista completa de productos con boton para agregar un nuevo artículo.
Respuesta: Devuelve una página HTML con una lista de productos, donde cada producto incluye un botón para ver detalles (dentro de los dettales contiene boton de editar y eliminar).

**GET /dashboard/new**
Muestra un formulario para crear un nuevo producto.
Respuesta: Devuelve una página HTML con un formulario que incluye los campos:
Nombre
Descripción
Categoría (Camisetas, Pantalones, Zapatos, Accesorios)
Talla (XS, S, M, L, XL)
Precio
URL de la imagen

**POST /dashboard/new**
Crea un nuevo producto desde el formulario, recibiendo datos como body. 
Redirección: Luego de que el producto se ha creado, redirige nuevamente al dashboard (/dashboard).

**GET /dashboard/:productId**
Muestra los detalles de un producto específico en una página HTML, con opciones para editar o eliminar el producto.
Parámetros:
-productId: ID del producto.
Respuesta: Devuelve una página HTML con la información del producto seleccionado y los botones para editar o eliminar.

**GET /dashboard/:productId/edit**
Muestra un formulario para editar un producto existente.
Parámetros:
-productId: ID del producto.
Respuesta: Devuelve una página HTML con un formulario pre-rellenado con los datos del producto existente. Los campos incluyen:
Nombre
Descripción
Categoría
Talla
Precio
URL de la imagen

**POST /dashboard/:productId/edit**
Actualiza un producto existente basado en los datos enviados desde el formulario.

Parámetros:
-productId: ID del producto.

Ejemplo body: Los datos actualizados ingresados en el formulario:
{
  "nombre": "Camiseta actualizada",
  "descripcion": "Nueva descripción",
  "categoria": "Camisetas",
  "talla": "XL",
  "precio": 35,
  "imagen": "https://imagen.com/camiseta-nueva.jpg"
}

Redirección: Una vez que el producto se ha actualizado, redirige nuevamente al dashboard (/dashboard).

**POST /dashboard/:productId/delete**
Elimina un producto existente.

Parámetros:
-productId: ID del producto.
Redirección: Una vez que el producto ha sido eliminado, redirige al dashboard (/dashboard).


## Como funciona

*Panel de Administración (Dashboard)*
Es la página de administrador.
GET /dashboard: Muestra todos los productos en formato HTML con la opción de agregar un productos.
Agregar producto: Accede a /dashboard/new para agregar un nuevo producto usando un formulario.
Editar producto: En la página de detalles de un producto (/dashboard/:productId), se puede editar el producto haciendo clic en el botón "Editar".
Eliminar producto: También se puede eliminar desde la misma página de detalles con un botón dedicado.

*Panel de productos (/products)*
Es la página que ve el usuario con el catálogo de productos.
Al hacer click en "ver detalles" puede ver los detalles del producto (/products/:productId)


*Función getNavBar*
La función getNavBar genera una barra de navegación (HTML <nav>) para las distintas categorías de productos, esta presente en la pagina de catologo completo tanto en Dashboard como Products. Su comportamiento varía según si se encuentra en el modo "dashboard" o en la vista pública de productos.

-Explicación
Parámetro isDashboard: Este parámetro es un booleano que indica si la ruta es para el administrador (dashboard) o para la vista pública.

Si isDashboard es true, los enlaces en la barra de navegación apuntan a rutas bajo /dashboard.
Si isDashboard es false, los enlaces apuntan a las rutas públicas bajo /products.
Rutas generadas: En ambos casos (dashboard o público), la barra de navegación incluye enlaces para las siguientes categorías:
"Camisetas"
"Pantalones"
"Zapatos"
"Accesorios"
Estos enlaces filtran los productos por la categoría seleccionada.