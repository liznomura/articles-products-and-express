/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Products = require('../db/products.js');

let productObj = {
  products: Products.getAll()
};

function handleProdPost( req, res ) {
  Products.postProd(req, res);
}

router.get('/', ( req, res ) => {
  res.render('./products/index.hbs', productObj);
});

// router.get('/:id', ( req, res ) => {
//   res.render('./products/product.hbs', somedata);
// });

// router.get('/:id/edit', ( req, res ) => {
//   res.render('./products/edit.hbs', somedata);
// });

// router.get('/new', ( req, res ) => {
//   res.render('./products/new.hbs', somedata);
// });

router.post('/', handleProdPost);

// router.put('/:id', handleProdPut);

// router.delete('/:id', handleProdDelete);

module.exports = router;