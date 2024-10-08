const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); 



//POST /dashboard: Crea un nuevo producto CHEK 
router.post("/dashboard", async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
        //res.status(201).send(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to create the Product" });
    }
});

//GET /products: CHEK PERO Cada producto tendrá un enlace a su página de detalle.PEN --->front
router.get("/products", async (req, res) => {
    try {
        const getProducts = await Product.find();
        res.status(200).send(getProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem geting the products" });
    }
});

//GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. 
router.get("/dashboard", async (req, res) => {
    try {
        const getProducts = await Product.find();
        res.status(200).send(getProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem geting the products" });
    }
});

//GET /products/:productId: Devuelve el detalle de un producto CHEK
router.get("/products/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).send({ message: "Product not found." });
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem geting the product." });
    }
});

//GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).send({ message: "Product not found." });
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem geting the product." });
    }
});

//PUT /dashboard/:productId: Actualiza un producto.
router.put("/dashboard/:productId", async (req, res) => {
    try {
        const idProduct = req.params.productId;
        const updatedProduct = await Product.findByIdAndUpdate(
            idProduct, 
            {
                nombre: req.body.nombre,         
                descripcion: req.body.descripcion,
                categoria: req.body.categoria,
                talla: req.body.talla,
                precio: req.body.precio,
            }, 
            { new: true } 
        );
        res.json(updatedProduct); 
      } catch (err) {
        console.error("Could not update product: ", err)
      }
});

//DELETE /dashboard/:productId/delete: Elimina un producto.
router.delete("/dashboard/:productId/delete", async (req, res) => {
try {
    const idProduct = req.params.productId
    const deleteProduct = await Product.findByIdAndDelete(idProduct)
    res.json({mensaje: "Product deleted", deleteProduct})
  } catch (err) {
    console.error("Could not delete the product: ", err)
  }
});

module.exports = router;
