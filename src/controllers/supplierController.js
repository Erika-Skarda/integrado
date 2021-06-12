const _ = require('lodash');

const Pattern = require('../utils/pattern');
const createError = require("http-errors");
const SupplierModel = require('../models/supplier.model');

exports.createOrUpdateSupplier = async function (req, res) {
  
  let supplier = new SupplierModel();
  supplier.name = req.body.name;
  supplier.cnpj = await Pattern.validateCNPJ(req.body.cnpj);

  console.log(supplier.cnpj )
  if(!req.body.id) {
    await supplier.save((supplier) => {
      try {
        res.status(201).send({ message: `Supplier ${supplier.name} saved successfully ✨` });
      } catch(err) {
        throw createError(400, err.message);
      }
    });
  } else {
    if(req.body.cnpj) {
      await SupplierModel.findByIdAndUpdate({ _id: req.body.id }, 
        { cnpj: Pattern.validateCNPJ(req.body.cnpj) },
        { new: true },
        (err, doc) => {
          if(!err) {  
            res.status(201).send({ message: `Supplier CNPJ updated to 🎉 ${req.body.cnpj} 🎉 successfully` });
          } else {
            console.log('Error during updateCNPJ: ' + err);
          }
        }
      );
    } else if(req.body.name) {
      await SupplierModel.findByIdAndUpdate({ _id: req.body.id }, 
        { name: req.body.name },
        { new: true },
        (err, doc) => {
          if(!err) {  
            res.status(201).send({ message: `Supplier name updated to ${req.body.name} successfully ✨` });
          } else {
            console.log('Error during updateName ' + err);
          }
        }
      );
    }
  }
};

exports.getSupplierById = async function (req, res) {
  const { id } = req.params;
  let response = await SupplierModel.findById(id) 
    try {
      res.status(200).send({ Supplier: response})
    } catch(err) {
      throw createError(400, err.message );
    }
};

exports.deleteSupplier = async function (req, res) {
  await SupplierModel.deleteOne({ _id: req.params.id }) 
    try {
      res.status(201).send({ message: `Supplier has been removed successfully 🎈` });
    } catch(err) {
      throw createError(400, err.message );
    }
};

