const User = require('./../models/user');

module.exports.getUsers = async function(){
    const users = await User.find();
    return users;
}

module.exports.insertUsers = async function(data){
    await User.create(data);    
}

module.exports.updateUsers = async function(id, data){
    const updatedUser = await User.findByIdAndUpdate(id, data);
    return updatedUser;
}

module.exports.deleteUsers = async function(id){
    const deletedUser = await User.findByIdAndRemove(id);
    return deletedUser;
}