const Product = require("../models/Product");

module.exports = {
    components:{
        schemas:{
               Product:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:"Product identification number",
                        example:"62b01064b002477la17866e2b2c4"
                    },
                    name:{
                        type:'string',
                        description:"name of the pruduct",
                        example:"Camiseta marca cocreta"
                    },
                    descripcion:{
                        type:'string',
                        description:"field to describe the product",
                        example:"Camiseta estampada de colores"
                    },
                    categoria:{
                        type:'string',
                        description:"The category for the product",
                        example:"Zapatos"
                    },
                    talla:{
                        type:'string',
                        description:"The size of the product",
                        example:"M"
                    },
                    precio:{
                        type:'number',
                        description:"The price of the product",
                        example:"10"
                    },
                    imagen:{
                        type:'string',
                        description:"URL of the image of the product",
                        example:"www.imagen-ejemplo.com"
                    },
                }
            }
        }
    }
}
