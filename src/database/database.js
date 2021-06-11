const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/IntegradoDB', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
},
  err => {
    if(!err) {
      console.log('Connection succeeded!');
    } else {
      console.log('Error in connection: ' + err)
    }
  }
)
require('../models/supplier.model');