const express = require('express');
const router = express.Router();
const supplierController = require("../controllers/supplierController");

/**
* @swagger
* /supplier/getAll:
*   get:
*       summary:
*       description: Use to get suppliers
*       responses:
*           200:
*               description: Success
*           404:
*               description: 404 Not Found
*/
router.get('/getAll', async function(req, res){
    res.json(await supplierController.getSuppliers());
});

/**
* @swagger
* /supplier/saveDetails:
*   post:
*       summary:
*       description: Use to insert supplier
*       responses:
*           200:
*               description: Inserted
*           404:
*               description: 404 Not Found
*/
router.post('/saveDetails', async function(req, res){
    await supplierController.insertSuppliers(req.body);
    res.json({
        message:"success",
        supplier: req.body
    });
});

/**
* @swagger
* /supplier/:id:
*   put:
*       summary:
*       description: Use to update suppliers
*       responses:
*           200:
*               description: Updated
*           404:
*               description: 404 Not Found
*/
router.put('/:id', async function(req, res){
    res.json(await supplierController.updateSuppliers(req.params.id, req.body) );
 });

 /**
* @swagger
* /supplier/:id:
*   delete:
*       summary:
*       description: Use to delete suppliers
*       responses:
*           200:
*               description: Deleted
*           404:
*               description: 404 Not Found
*/
router.delete('/:id', async function(req, res){
    res.json(await supplierController.deleteSuppliers(req.params.id))
});

module.exports = router;