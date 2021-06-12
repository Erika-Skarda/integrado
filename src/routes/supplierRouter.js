const supplierRouter = require('express').Router();

const supplierController = require('../controllers/supplierController');

supplierRouter.post('', supplierController.createOrUpdateSupplier);
supplierRouter.get('', supplierController.getSuppliers);

supplierRouter.get('/:id', supplierController.getSupplierById);

supplierRouter.delete('/:id', supplierController.deleteSupplier);

module.exports = supplierRouter;