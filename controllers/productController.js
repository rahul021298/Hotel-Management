const Product = require('../models/product');

module.exports.getProducts = async function(){
    const products = await Product.find();
    return products;
}

module.exports.insertProducts = async function(data){
    await Product.create(data);    
}

module.exports.updateProducts = async function(id, data){
    const updatedProduct = await Product.findByIdAndUpdate(id, data);
    return updatedProduct;
}

module.exports.deleteProducts = async function(id){
    const deletedProduct = await Product.findByIdAndRemove(id);
    return deletedProduct;
}