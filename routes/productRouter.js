const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

/**
* @swagger
* /product/getAll:
*   get:
*       summary:
*       description: Use to get products
*       responses:
*           200:
*               description: Success
*           404:
*               description: 404 Not Found
*/
router.get('/getAll', async function(req, res){
    res.json(await productController.getProducts());
});

/**
* @swagger
* /product/saveDetails:
*   post:
*       summary:
*       description: Use to insert products
*       responses:
*           200:
*               description: Inserted
*           404:
*               description: 404 Not Found
*/
router.post('/saveDetails', async function(req, res){
    await productController.insertProducts(req.body);
    res.json({
        message:"success",
        product: req.body
    });
});

/**
* @swagger
* /product/:id:
*   put:
*       summary:
*       description: Use to update products
*       responses:
*           200:
*               description: Updated
*           404:
*               description: 404 Not Found
*/
router.put('/:id', async function(req, res){
    res.json(await productController.updateProducts(req.params.id, req.body) );
 });

/**
* @swagger
* /product/:id:
*   delete:
*       summary:
*       description: Use to delete products
*       responses:
*           200:
*               description: Deleted
*           404:
*               description: 404 Not Found
*/
router.delete('/:id', async function(req, res){
    res.json(await productController.deleteProducts(req.params.id))
});

module.exports = router;