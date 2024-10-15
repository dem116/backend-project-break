const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'], required: true},
    talla: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true},
    precio: { type: Number, required: true },
    imagen: { type: String }, 
    
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;