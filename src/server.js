
require('./database/database');

const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const supplierRouter = require('./routes/supplierRouter');
const productRouter = require('./routes/productRouter');

app.use('/supplier', supplierRouter);
app.use('/product', productRouter);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  if(server) {
    console.log(`Server is running in http://localhost:${PORT}`)
  } else {
    console.log(`Failure`)
  }
})
