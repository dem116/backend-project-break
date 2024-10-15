const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); 
const { showNewProduct, showProducts, showProductById, createProduct, deleteProduct, showEditProduct, updateProduct } = require('../controllers/productControllers');

router.get("/products", showProducts);
router.get("/products/:productId", showProductById)

router.get("/dashboard", showProducts);
router.get("/dashboard/new", showNewProduct);
router.post("/dashboard", createProduct);
router.get("/dashboard/:productId", showProductById); 
router.get("/dashboard/:productId/edit", showEditProduct)
router.put("/dashboard/:productId", updateProduct)
router.delete("/dashboard/:productId/delete", deleteProduct) 



module.exports = router;
