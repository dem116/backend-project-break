const express = require("express")
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { dbConnection } = require("./config/db")
const router = require("./routes/productRoutes")
const routerApi = require("./routes/routesAPI")
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs');




app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routerApi);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/", router);



dbConnection()


app.listen(PORT, () => console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`))