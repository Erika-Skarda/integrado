
require('./database/database');

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');


// const supplierController = require('./controllers/supplierController');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const supplierRouter = require('./routes/supplierRouter');
// const postRouter = require('./Views/posts');

app.use('/supplier', supplierRouter);
// app.use('/api', postRouter);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  if(server) {
    console.log(`Server is running in http://localhost:${PORT}`)
  } else {
    console.log(`Failure`)
  }
})
// app.use('/supplier', supplierController);