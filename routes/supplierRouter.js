const express = require('express');
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.get('/', async function(req, res){
    res.json(await supplierController.getUsers());
});

router.post('/saveDetails', async function(req, res){
    await supplierController.insertSuppliers(req.body);
    res.json({
        message:"success",
        user: req.body
    });
});

router.put('/:id', async function(req, res){
    res.json(await supplierController.updateSuppliers(req.params.id, req.body) );
 });

router.delete('/:id', async function(req, res){
    res.json(await supplierController.deleteSuppliers(req.params.id))
});

module.exports = router;