const express = require("express")
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { dbConnection } = require("./config/db")
const router = require("./routes/productRoutes")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

dbConnection()


app.listen(PORT, () => console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`))