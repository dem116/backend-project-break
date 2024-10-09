const Product = require("../models/Product")

const ProductController = {
  async showProducts (req, res) { //--> PENDIENTE EN QUE SE VA A PRODCUTS RUTA PARA EL DETALLE, MODIFICAR DEPENDIENDO DEL PATH
    try {
        const products = await Product.find();
        let html = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Products</title>
            </head>
            <body>
                <h1>Products</h1>
                <ul>
                    ${products.map(product => `
                        <li>
                            <a href="/products/${product._id}">${product.nombre}</a><br>
                            <p>Precio: ${product.precio}</p>
                        </li>
                    `).join('')}
                </ul>
            </body>
            </html>
        `;
        res.send(html);
    } catch (error) {
        res.status(500).send("Error loading products");
    }
  },
   async showProductById (req, res) {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).send({ message: "Product not found." });
        let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Products</title>
        </head>
        <body>
            <h1>Product ${product.nombre}</h1>
            <p>
            ${product.descripcion}
            Precio: ${product.precio}
            </p>
        </body>
        </html>
    `;
    res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem geting the product." });
    }
  },

  async deleteProduct (req, res) { //---->pendiente can not get
    try {
        const idProduct = req.params.productId
        const deleteProduct = await Product.findByIdAndDelete(idProduct)
        let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Products</title>
        </head>
        <body>
           <p>Producto eliminado: ${deleteProduct}</p>
        </body>
        </html>
    `;
    res.send(html);
    res.redirect('/dashboard');

      } catch (err) {
        console.error("Could not delete the product: ", err)
      }
}
};

const showNewProduct = (req, res) => {
    let newProducthtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crate a product</title>
    </head>
    <body>
      <form> 
        <label for="nombre">Introduce el nombre del artículo</label>
        <input type="text" id="nombre"/>
        <label for="descripcion">Introduce la descripción del artículo</label>
        <input type="text" id="descripcion"/>
        <label for="categoria">Introduce la categoría del artículor</label>
        <input type="text" id="categoria"/>
        <label for="talla">Introduce la talla del artículor</label>
        <input type="text" id="talla" />
        <label for="precio">Introduce el precio del artículor</label>
        <input type="number" id="precio" />
        <button class="boton" onclick="CREATE()"> Crear artículo </button>   
      </form>
    </body>
    </html>
    `
    res.render('newProduct');  // Renderizar la vista con el formulario de un nuevo producto
};



module.exports = ProductController;