const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    categoria: {type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],required: true,},
    talla: {type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true},
    precio: {type: Number, required: true}
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;