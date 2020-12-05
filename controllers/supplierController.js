const Supplier = require('../models/user');

module.exports.getSuppliers = async function(){
    const suppliers = await Supplier.find();
    return suppliers;
}

module.exports.insertSuppliers = async function(data){
    await Supplier.create(data);    
}

module.exports.updateSuppliers = async function(id, data){
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, data);
    return updatedSupplier;
}

module.exports.deleteSuppliers = async function(id){
    const deletedSupplier = await Supplier.findByIdAndRemove(id);
    return deletedSupplier;
}