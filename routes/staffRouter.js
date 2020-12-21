const express = require('express');
const router = express.Router();
const staffController = require("../controllers/staffController");

/**
* @swagger
* /staff/getAll:
*   get:
*       summary:
*       description: Use to get staff
*       responses:
*           200:
*               description: Success
*           404:
*               description: 404 Not Found
*/
router.get('/getAll', async function(req, res){
    res.json(await staffController.getStaff());
});

/**
* @swagger
* /staff/saveDetails:
*   post:
*       summary:
*       description: Use to insert staff
*       responses:
*           200:
*               description: Inserted
*           404:
*               description: 404 Not Found
*/
router.post('/saveDetails', async function(req, res){
    await staffController.insertStaff(req.body);
    res.json({
        message:"success",
        user: req.body
    });
});

/**
* @swagger
* /staff/:id:
*   put:
*       summary:
*       description: Use to update staff
*       responses:
*           200:
*               description: Updated
*           404:
*               description: 404 Not Found
*/
router.put('/:id', async function(req, res){
    res.json(await staffController.updateStaff(req.params.id, req.body) );
});

/**
* @swagger
* /staff/:id:
*   delete:
*       summary:
*       description: Use to delete staff
*       responses:
*           200:
*               description: Deleted
*           404:
*               description: 404 Not Found
*/
router.delete('/:id', async function(req, res){
    res.json(await staffController.deleteStaff(req.params.id));
});

module.exports = router;