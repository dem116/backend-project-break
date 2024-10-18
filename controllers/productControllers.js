const Product = require("../models/Product")

const ProductController = {
    async showProducts(req, res) {
            try {
              const categoria = req.query.categoria; 
              let query = {}; 
          
              
              if (categoria) {
                query = { categoria: categoria };
              }
          
              const products = await Product.find(query); 
              const isDashboard = req.path.includes("dashboard"); 
          
              let html = `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${isDashboard ? "Dashboard - Products" : "Products"}</title>
                    <link rel="stylesheet" href="/style.css">
                </head>
                <body>
                    <h1>${isDashboard ? "Dashboard - Products" : "Products"}</h1>
                    <ul class="product-list">
                        ${products.map(product => `
                            <li class="product-item">
                                <h2>${product.nombre}</h2>
                                <img src="${product.imagen || ''}" alt="${product.nombre}"  width="200">
                                <p>Precio: ${product.precio} €</p>
                                <a href="${isDashboard ? `/dashboard/${product._id}` : `/products/${product._id}`}">Ver detalle</a>
                            </li>
                        `).join('')}
                    </ul>
                    ${isDashboard ? '<a href="/dashboard/new">Agregar un nuevo artículo</a>' : ''}
                </body>
                </html>
              `;

        const paginaTodo = getNavBar(isDashboard) + html

          res.send(paginaTodo);

        } catch (error) {
          res.status(500).send("Error loading products");
        }        
      },      
  async showProductById(req, res) {
        try {
          const product = await Product.findById(req.params.productId);
          if (!product) return res.status(404).send({ message: "Product not found." });
    
          const isDashboard = req.path.includes("dashboard");
      
          let html = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${product.nombre}</title>
                <link rel="stylesheet" href="/style2.css">
            </head>
            <body>
              <div>
                <h1>${product.nombre}</h1>
                <img src="${product.imagen}" alt="${product.nombre}"  width="200"/>
                <p>${product.descripcion}</p>
                <p>Talla: ${product.talla}</p>
                <p>Precio: ${product.precio} €</p>
                <p>Categoría: ${product.categoria}</p>
      
                ${isDashboard ? `
                  <button onclick="location.href='/dashboard/${product._id}/edit'">Editar producto</button><br>
                  <button onclick="deleteProduct('${product._id}')">Eliminar producto</button>
                   <p id="error-message" style="color: red;"></p>
                ` : ''}
              </div>
                <script>
                  async function deleteProduct(productId) {
                    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                      return;
                    }
      
                    try {
                      const response = await fetch(\`/dashboard/\${productId}/delete\`, {
                        method: 'DELETE',
                      });
      
                      if (response.ok) {
                        window.location.href = '/dashboard'; 
                      } else {
                        const errorMessage = await response.text();
                      }
                    } catch (error) {
                      console.error('Error al eliminar el producto:', error);
                    }
                  }
                </script>
            </body>
            </html>
          `;
          const paginaTodo = getNavBar(isDashboard) + html

          res.send(paginaTodo);

        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem getting the product." });
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

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
        console.error("Could not update product: ", err);
        res.status(500).json({ message: "Error updating product" });
    }
},

  async createProduct(req, res) {
    try {
      const newProduct = await Product.create(req.body);
      res.redirect(`/dashboard/${newProduct._id}`);

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem trying to create the Product" });
    }
  },

  async deleteProduct(req, res) {
    try {
      const idProduct = req.params.productId;
      const deleteProduct = await Product.findByIdAndDelete(idProduct);
      if (!deleteProduct) return res.status(404).send({ message: "Product not found." });
      res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      console.error("Could not delete the product: ", err);
      res.status(500).send({ message: "There was a problem deleting the product." });
    }
  }
};

const getNavBar = (isDashboard) => {
        const baseRoute = isDashboard ? '/dashboard' : '/products';
        
        let htmlNavBar = `
        <nav>
          <a href="${baseRoute}?categoria=Camisetas">Camisetas</a>
          <a href="${baseRoute}?categoria=Pantalones">Pantalones</a>
          <a href="${baseRoute}?categoria=Zapatos">Zapatos</a>
          <a href="${baseRoute}?categoria=Accesorios">Accesorios</a>
        </nav>
        `;
        return htmlNavBar;
      };
      
const showNewProduct = (req, res) => {
    let newProductHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Create a Product</title>
      </head>
      <body>
        <h1>Create a New Product</h1>
        <form action="/dashboard/" method="POST"> 
          <label for="nombre">Introduce el nombre del artículo</label>
          <input type="text" id="nombre" name="nombre" required/>
          <br>
          <label for="descripcion">Introduce la descripción del artículo</label>
          <input type="text" id="descripcion" name="descripcion" required/>
          <br>
          <label for="categoria">Introduce la categoría del artículo</label>
          <input type="text" id="categoria" name="categoria" required/>
          <br>
          <label for="talla">Introduce la talla del artículo</label>
          <input type="text" id="talla" name="talla" required/>
          <br>
          <label for="precio">Introduce el precio del artículo</label>
          <input type="number" id="precio" name="precio" required/>
          <br>
          <label for="imagen">Introduce la dirección de la imagen del artículo</label>
          <input type="text" id="imagen" name="imagen" required/>
          <br>
          <button type="submit">Crear artículo</button>
        </form>
      </body>
      </html>
    `;
    res.send(newProductHtml);
  };

  const showEditProduct = (req, res) => { 

    let editProductHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Update Product</title>
    </head>
    <body>
      <h1>Actualizar Product</h1>
      <form id="editProductForm"> 
        <label for="nombre">Introduce el nombre del artículo</label>
        <input type="text" id="nombre" name="nombre" required/>
        <br>
        <label for="descripcion">Introduce la descripción del artículo</label>
        <input type="text" id="descripcion" name="descripcion" required/>
        <br>
        <label for="categoria">Introduce la categoría del artículo</label>
        <input type="text" id="categoria" name="categoria" required/>
        <br>
        <label for="talla">Introduce la talla del artículo</label>
        <input type="text" id="talla" name="talla" required/>
        <br>
        <label for="precio">Introduce el precio del artículo</label>
        <input type="number" id="precio" name="precio" required/>
        <br>
        <label for="imagen">Introduce la dirección de la imagen del artículo</label>
        <input type="text" id="imagen" name="imagen" required/>
        <br>
        <button type="button" onclick="updateProduct('${req.params.productId}')">Actualizar artículo</button>
      </form>

      <script>
        async function updateProduct(productId) {
            const form = document.getElementById('editProductForm');
            const formData = new FormData(form);
            
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            console.log('Form data being sent:', data); 

            try {
                const response = await fetch(\`/dashboard/\${productId}\`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                const result = await response.json();
                console.log('Producto actualizado:', result);
                window.location.href = \`/dashboard/\${productId}\`;

                } else {
                    const errorMessage = await response.text();
                    document.getElementById('error-message').textContent = 'Error updating product: ' + errorMessage;
                }
            } catch (error) {
                console.error('Error sending PUT request:', error);
                document.getElementById('error-message').textContent = 'An error occurred: ' + error.message;
            }
        }
      </script>
    </body>
    </html>
  `;
  res.send(editProductHtml);
};


module.exports = {
  ...ProductController,  
  showNewProduct,
  showEditProduct        
};
