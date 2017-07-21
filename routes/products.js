/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const Products = require('../db/products.js');

let id = 1;

function findProduct(id) {
  if(typeof id === 'number') {
    return Products.getAll().find( product => {
      return product.id == id;
    });
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
  const idArr = Products.getIds(); // 1
  const index = idArr.indexOf(parseInt(req.body.id)); // 0
  const obj = req.body; // object with id, name, price, inventory
  if(index >= 0) { // this runs
    Products.putProduct(index, obj);
    res.redirect(`/products/${req.params.id}`);
  } else {
    res.redirect(`/${req.params.id}/edit`);
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
  res.render('./products/product', findProduct(parseInt(req.params.id)));
});

router.get('/:id/edit', ( req, res ) => {

  res.render('./products/edit', findProduct(parseInt(req.params.id)));
});

router.post('/', handleProdPost);

router.put('/:id', handleProdPut);

router.delete('/:id', handleProdDelete);

module.exports = router;