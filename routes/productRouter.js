const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/', async function(req, res){
    res.json(await productController.getProducts());
});

router.post('/saveDetails', async function(req, res){
    await productController.insertProducts(req.body);
    res.json({
        message:"success",
        user: req.body
    });
});

router.put('/:id', async function(req, res){
    res.json(await productController.updateProducts(req.params.id, req.body) );
 });

router.delete('/:id', async function(req, res){
    res.json(await productController.deleteProducts(req.params.id))
});

module.exports = router;