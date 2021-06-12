const productRouter = require('express').Router();

const productController = require('../controllers/productController');

productRouter.post('/:supplierCNPJ', productController.createOrUpdateProduct);

productRouter.get('/:id', productController.getProductById);

productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;