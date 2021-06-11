const mongoose = require('mongoose');

const { Schema } = mongoose;

const supplierSchema = new Schema({
  name: {
    type: String,
    min: 5,
    required: 'This field is required'
  },
  cnpj: {
    type: String,
    //pattern: '[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}',
    required: 'This field is required', 
    unique: true
  },
//   products: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Product',
//     },
//   ],
// }, {
//   usePushEach: true,
});

module.exports = mongoose.model('Supplier', supplierSchema);