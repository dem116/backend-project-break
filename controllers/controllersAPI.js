const Product = require("../models/Product");

const ProductController = {
    async showProducts(req, res) {
        try {
            const getProducts = await Product.find();
            res.status(200).send(getProducts);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem geting the products" });
        }
    },
    async showProductById(req, res) {
        try {
            const product = await Product.findById(req.params.productId);
            if (!product) return res.status(404).send({ message: "Product not found." });
            res.status(200).send(product);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem geting the product." });
        }
    },
    async createProduct(req, res) {
        try {
            const newProduct = await Product.create(req.body)
            res.status(201).json(newProduct)

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem trying to create the Product" });
        }
    },
    async updateProduct (req, res) {
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
                    imagen: req.body.imagen,
                }, 
                { new: true } 
            );
            res.json(updatedProduct); 
          } catch (err) {
            console.error("Could not update product: ", err)
          }
    },
    async deleteProduct(req, res) {
        try {
            const idProduct = req.params.productId
            const deleteProduct = await Product.findByIdAndDelete(idProduct)
            res.json({mensaje: "Product deleted", deleteProduct})
          } catch (err) {
            console.error("Could not delete the product: ", err)
          }
    }
}

module.exports = ProductController