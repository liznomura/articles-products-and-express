/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const Products = require('../db/products.js');

let id = 1;
let getProduct;

function getOne(id) {
  if(typeof id === 'number') {
    getProduct = Products.getAll().filter( product => {
      return product.id === id;
    });
  } else {
    res.send('Please enter a valid id');
  }
}

function handleProdPost( req, res ) {
  let obj;

  req.body.price = parseInt(req.body.price);
  req.body.inventory = parseInt(req.body.inventory);

  if(req.body.name && typeof req.body.price === 'number' && typeof req.body.inventory === 'number') {
    req.body.id = id;
    id++;
    obj = req.body;
    Products.postProduct(obj);
    res.redirect('/products');
  } else {
    res.redirect('/products/new');
  }
}

function handleProdPut( req, res ) {
  const idArr = Products.getIds();
  const index = idArr.indexOf(parseInt(req.body.id));
  const obj = req.body;
  if(index >= 0) {
    Products.putProduct(index, obj);
    res.end();
  } else {
    res.send('Please enter valid id, name, price, and inventory');
  }
}

function handleProdDelete( req, res ) {
  const idArr = Products.getIds();
  const index = idArr.indexOf(parseInt(req.body.id));
  const obj = req.body;
  if(index >= 0) {
    Products.deleteProduct(index);
    res.end();
  } else {
    res.send('Please enter a valid id to delete');
  }
}

let productsObj = {
  products: Products.getAll()
};

router.get('/', ( req, res ) => {
  res.render('./products/index', productsObj);
});

router.get('/new', ( req, res ) => {
  res.render('./products/new');
});

router.get('/:id', ( req, res ) => {
  getOne(parseInt(req.params.id));
  res.render('./products/product', getProduct.pop());
});

router.get('/:id/edit', ( req, res ) => {
  getOne(parseInt(req.params.id));
  res.render('./products/edit', getProduct.pop());
});

router.post('/', handleProdPost);

router.put('/:id', handleProdPut);

router.delete('/:id', handleProdDelete);

module.exports = router;