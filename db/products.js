/* jshint esversion:6 */
const bodyParser = require('body-parser');
const prodArr = [];

function postProd( req, res ) {
  prodArr.push(req.body);
}

function getAll() {
  return prodArr;
}

module.exports = {
  postProd: postProd,
  getAll: getAll
};