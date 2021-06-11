const mongoose = require('mongoose');

const { Schema } = mongoose;

const productModel = new Schema({
  name: {
    type: String,
    min: 3,
    required: 'This field is required'
  },
  cnpj: {
    type: Schema.Types.ObjectId,
    ref: 'Suppliers',
  }
});


module.exports = mongoose.model('Product', productModel);