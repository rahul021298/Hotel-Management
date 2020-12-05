const Staff = require('../models/staff');

module.exports.getStaff = async function(){
    const staffs = await Staff.find();
    return staffs;
}

module.exports.insertStaff = async function(data){
    await Staff.create(data);    
}

module.exports.updateStaff = async function(id, data){
    const updatedStaff = await Staff.findByIdAndUpdate(id, data);
    return updatedStaff;
}

module.exports.deleteStaff = async function(id){
    const deletedStaff = await Staff.findByIdAndRemove(id);
    return deletedStaff;
}