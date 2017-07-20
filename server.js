/* jshint esversion:6 */
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const productRouter = require('./routes/products.js');
const PORT = process.env.PORT || 9000;

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/products', productRouter);

const server = app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});