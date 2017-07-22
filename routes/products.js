/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const Products = require('../db/products.js');

let id = 1;

function findProduct(id) {
  if(typeof id === 'number') {
    return Products.getAll().find( product => {
      return parseInt(product.id) === id;
    });
  }
}

function handleProdPost( req, res ) {
  let obj;

  req.body.price = parseInt(req.body.price);
  req.body.inventory = parseInt(req.body.inventory);

  if(req.body.name && typeof req.body.price === 'number' && typeof req.body.inventory === 'number') {
    if(!req.body.id){
    req.body.id = id;
    id++;
    }
    obj = req.body;
    Products.postProduct(obj);
    res.redirect('/products');
  } else {
    res.redirect('/products/new');
  }
}

function handleProdPut( req, res ) {
  let index = Products.getAll().findIndex( product => {
    return parseInt(product.id) === parseInt(req.params.id);
  });

  if(index >= 0) {
    let obj = req.body;
    Products.putProduct(index, obj);
    res.redirect(`/products/${req.params.id}`);
  } else {
    res.redirect(`/products/${req.params.id}/edit`);
  }
}

function handleProdDelete( req, res ) {
  let index = Products.getAll().findIndex( product => {
    return parseInt(product.id) === parseInt(req.params.id);
  });

  if(index >= 0) {
    Products.deleteProduct(index);
    res.redirect('/products');
  } else {
    res.redirect(`/products/${req.params.id}`);
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
  res.render('./products/product', findProduct(parseInt(req.params.id)));
});

router.get('/:id/edit', ( req, res ) => {
  res.render('./products/edit', findProduct(parseInt(req.params.id)));
});

router.post('/', handleProdPost);

router.put('/:id', handleProdPut);

router.delete('/:id', handleProdDelete);

module.exports = router;