const mongoose = require('mongoose');

const { Schema } = mongoose;

const productModel = new Schema({
  name: {
    type: String,
    unique: true,
    min: 3,
    required: 'This field is required'
  },
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
  },
  supplierCNPJ: {
    type: String,
    ref: 'Supplier',
  }
});


module.exports = mongoose.model('Product', productModel);