const express = require("express");
const router = express.Router();
const ListaCompra = require("../models/ListaCompra"); 
const controllers = require("../controllers/controllers");



router.get("/listacompra", controllers.showList)
//router.get("/products/:productId", controllersAPI.showProductById)

//router.get("/dashboard", controllersAPI.showProducts)
router.post("/createitem", controllers.createListItem)
//router.get("/dashboard/:productId", controllersAPI.showProductById)
//router.put("/dashboard/:productId", controllersAPI.updateProduct)
//router.delete("/dashboard/:productId/delete", controllersAPI.deleteProduct)

module.exports = router;