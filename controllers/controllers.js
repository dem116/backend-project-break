const ListaCompra = require("../models/ListaCompra");

const AllController = {
    async showList(req, res) {
        try {
            const getList = await ListaCompra.find();
            res.status(200).send(getList);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem geting the list" });
        }
    },
    async createListItem(req, res) {
        try {
            const newItem = await ListaCompra.create(req.body)
            res.status(201).json(newItem)

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem trying to create the list" });
        }
    },
    
    async deleteListItem(req, res) {
        try {
            const idItem = req.params.ListaCompraId
            const deleteItem = await ListaCompra.findByIdAndDelete(idItem)
            res.json({mensaje: "Item deleted", deleteProduct})
          } catch (err) {
            console.error("Could not delete the Item: ", err)
          }
    }
}

module.exports = AllController