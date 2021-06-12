const _ = require('lodash');

const Pattern = require('../utils/pattern');
const ProductModel = require('../models/product.model');
const SupplierModel = require('../models/supplier.model');
const createError = require("http-errors");

exports.createOrUpdateProduct = async function (req, res) {
  const supplierCNPJ = await Pattern.validateCNPJ(req.params.supplierCNPJ);
  const productObject = await req.body;
  const newProduct = new ProductModel(productObject);
  
  if(!req.body.id) {
    await SupplierModel.findOne({ cnpj: supplierCNPJ }, async (err, foundSupplier) => {
      if(!foundSupplier) {
        throw createError(404, err.message );
      };

      await foundSupplier.products.push(newProduct);
      newProduct.supplierId = foundSupplier.id;
      newProduct.supplierCNPJ = foundSupplier.cnpj;

      await newProduct.save((err, savedProduct) => {
        if(err) {
          throw createError(400, err.message);
        }
        // return res.json(savedProduct);
      });

      await foundSupplier.save((err, savedSupplier) => {
        if(err) {
          throw createError(400, err.message);
        }
        // return res.json(savedSupplier);    
      });
      res.status(201).send({ message: `Product ${newProduct.name} saved successfully 🌟` });
    }) 
  } else {
    if(req.body.cnpj) {
      await ProductModel.findByIdAndUpdate({ _id: req.body.id }, 
        { supplierCNPJ: Pattern.validateCNPJ(req.body.cnpj) },
        { new: true },
        (err, doc) => {
          if(!err) {  
            res.status(201).send({ message: `Supplier CNPJ updated to ${req.body.cnpj} successfully ✨` });
          } else {
            console.log('Error during updateRecord: ' + err);
          }
        });
    } else if(req.body.name) {
      await ProductModel.findByIdAndUpdate({ _id: req.body.id }, 
        { name: req.body.name },
        { new: true },
        (err, doc) => {
          if(!err) {  
            res.status(201).send({ message: `Product name updated to ${req.body.name} successfully 🎉` });
          } else {
            console.log('Error during updateRecord: ' + err);
          }
        }
      );
    }
  }
};

exports.getProductById = async function (req, res) {
  const { id } = req.params;
  let response = await ProductModel.findById(id) 
    try {
      res.status(200).send({ Product: response })
    } catch(err) {
      throw createError(400, err.message );
    }
};

exports.deleteProduct = async function (req, res) {
  await ProductModel.deleteOne({ _id: req.params.id }) 
    try {
      res.status(201).send({ message: `Supplier has been removed successfully 🎈` });
    } catch(err) {
      throw createError(400, err.message );
    }
};
