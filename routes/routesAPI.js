const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); 
const controllersAPI = require("../controllers/controllersAPI");



router.get("/products", controllersAPI.showProducts)
router.get("/products/:productId", controllersAPI.showProductById)

router.get("/dashboard", controllersAPI.showProducts)
router.post("/dashboard", controllersAPI.createProduct)
router.get("/dashboard/:productId", controllersAPI.showProductById)
router.put("/dashboard/:productId", controllersAPI.updateProduct)
router.delete("/dashboard/:productId/delete", controllersAPI.deleteProduct)

module.exports = router;