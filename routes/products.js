/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const Products = require('../db/products.js');

let productObj = {
  products: Products.getAll()
};

function handleProdPost( req, res ) {
  let obj;
  let id = 0;

  if(!req.body.name || !req.body.price || !req.body.inventory) {
    res.send('Please enter name, price, and inventory values');
  } else {
    id++;
    req.body.id = id;
    req.body.price = parseInt(req.body.price);
    req.body.inventory = parseInt(req.body.inventory);
    obj = req.body;

    Products.postProduct(obj);
    res.end();
  }
}

function handleProdPut( req, res ) {

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