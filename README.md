**# Backend Project - Tienda de ropa**

Este proyecto implementa una aplicacion para crear un menu semana con sus tres comidas y la lista de la compra. La aplicación está construida usando Node.js, Express, Mongoose, Axios y React, además de Firebase para auntenticación de usuarios.

### Requisitos Previos:
-Node.js (v14 o superior)
-MongoDB Atlas (se necesita una cuenta y una conexión configurada)
-Firebase (se necesita una cuenta y una proyecto configurada)
-Una terminal o entorno de desarrollo como VS Code

### Dependencias:
express: Framework para crear el servidor.
mongoose: para manejar MongoDB.
dotenv: Carga variables de entorno desde un archivo .env.


## Estrcutura del proyecto (bash)
├── config/
│   └── db.js               # Configuración de la conexión con MongoDB
├── controllers/
│   ├── controllersAPI.js    # Controladores
├── models/
│   └──                      # Modelos
├── routes/
│   ├──                      # Rutas para la API
├── .env                     # Variables de entorno
├── index.js                 # Archivo principal del servidor
└── package.json             # Configuración del proyecto y dependencias



### Instalación:
1- Clonar el repositorio en la máquina local:
-Fork y luego: git clone <url-del-repositorio> (bash)
2- Instalar las dependencias del proyecto:
-npm install express mongoose dotenv (bash)
3-Configurar las variables de entorno:
-Crera un archivo .env en la raíz del proyecto con la siguiente variable (se debe tener la URL de conexión a MongoDB Atlas):
MONGO_URL= <url_de_conexion_a_mongodb>
PORT=3000  # O el puerto que se prefiera usar
4-Inicia el servidor:
-npm start / node index.js

Ejemplo: La aplicación estaría disponible en http://localhost:3000 (si se ha usado este puerto).

## Modelo
Modelo de la lista de la compra:
```javascript
const listatSchema = new mongoose.Schema({

    item: { type: String, required: true },
    description: { type: String },
    
}, { timestamps: true });

const ListaCompra = mongoose.model('ListaCompra', listatSchema);

module.exports = ListaCompra;
```

## Endpoints de la API



## Como funciona

