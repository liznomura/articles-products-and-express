/* jshint esversion:6 */
const productArr = [];

function postProduct(obj) {
  productArr.push(obj);
}

function getAll() {
  return productArr;
}

// function putProd( req, res ) {
//   const mapProdArr = prodArr.map( product => { return product.id; });

//   const indexProd = mapProdArr.indexOf(req.id);

//   if(indexProd >= 0) {
//     prodArr
//   }
// }

module.exports = {
  postProduct: postProduct,
  getAll: getAll
};