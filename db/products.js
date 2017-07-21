/* jshint esversion:6 */
const productArr = [];

function postProduct(obj) {
  productArr.push(obj);
}

function getAll() {
  return productArr;
}

function getIds() {
  return productArr.map( product => {
    return product.id;
  });
}

function putProduct(index, obj) {
  productArr[index] = obj;
}

function deleteProduct(index) {
  productArr.splice(index, 1);
  console.log(productArr);
}

module.exports = {
  postProduct: postProduct,
  getAll: getAll,
  getIds: getIds,
  putProduct: putProduct,
  deleteProduct: deleteProduct
};