const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({

    item: { type: String, required: true },
    
}, { timestamps: true });

const ListaCompra = mongoose.model('ListaCompra', listItemSchema);

module.exports = ListaCompra;