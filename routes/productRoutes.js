const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); 
const ProductController = require("../controllers/productControllers");


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

router.get("/products", ProductController.showProducts) 


router.get("/dashboard", ProductController.showProducts);
 

router.get("/products/:productId", ProductController.showProductById)



router.get("/dashboard/:productId", ProductController.showProductById); //--> solo pediente el detalle en la ruta dashboard (no products->funcion)


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
router.delete("/dashboard/:productId/delete", ProductController.deleteProduct) //->>>pen porque no es get


module.exports = router;
