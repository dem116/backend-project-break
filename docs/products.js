module.exports = {
    paths: {
      "/products": {
        get: {
          tags: {
            Product: "Loads the poroducts",
          },
          description: "Gets the products catalog",
          operationId: "showProducts",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          responses: {
            500: {
              description: "Error loading products",
            },
          },
        }
      },
      "/products/{productId}:": {
        get: {
          tags: {
            Product: "Loads a product by its ID",
          },
          description: "Gets the product details",
          operationId: "showProductsById",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          responses: {
            500: {
              description: "There was a problem getting the product.",
            },
          },
        }
      },
      "/dashboard": {
        get: {
          tags: {
            Product: "Loads the poroducts",
          },
          description: "Gets the products catalog with admin view",
          operationId: "showProducts",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          responses: {
            500: {
              description: "Error loading products",
            },
          },
        }
      },
      "/dashboard": {
      post: {
        tags: {
          Product: "Creates a Product",
        },
        description: "Create Product",
        operationId: "createProduct",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Product created successfully",
          },
          500: {
            description: "There was a problem trying to create the Product",
          },
          }
        }
    },
    "/dashboard/{productId}:": {
        get: {
          tags: {
            Product: "Loads a product by its ID",
          },
          description: "Gets the product details",
          operationId: "showProductsById",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          responses: {
            500: {
              description: "There was a problem getting the product.",
            },
          },
        }
      },
      "/dashboard/{productId}": {
      put: {
        tags: {
          Product: "Updates a product",
        },
        description: "Update product",
        operationId: "updateProduct",
        parameters: [
          {
            name: "productId",
            in: "path",
            schema: {
              $ref: "#/components/schemas/productId",
            },
            description: "Id of the product to be updated",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Product" },
            },
          },
        },
        responses: {
          200: { description: "Product updated successfully" },
          500: { description: "Error updating product" },
        },
      },
    },
    "/dashboard/{productId}/delete": {
        delete: {
          tags: {
            Product: "Deletes a product",
          },
          description: "Delete product",
          operationId: "deleteteProduct",
          parameters: [
            {
              name: "productId",
              in: "path",
              schema: {
                $ref: "#/components/schemas/productId",
              },
              description: "Id of the product to be deleted",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          responses: {
            200: { description: "Product deleted successfully" },
            500: { description: "Error deleting product" },
          },
        },
      }
    },
   };
