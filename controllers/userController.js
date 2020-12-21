const User = require('./../models/user');

module.exports.getUsers = async function(){
    return (await User.find());
}

module.exports.insertUsers = async function(data){
    await User.create(data);    
}

module.exports.updateUsers = async function(id, data){
    return (await User.findByIdAndUpdate(id, data));
}

module.exports.deleteUsers = async function(id){
    return (await User.findByIdAndRemove(id)); 
}

module.exports.getUserById = async function(id){
    return(await User.findById(id));
}