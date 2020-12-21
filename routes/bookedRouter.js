const express = require('express');
const router = express.Router();
const bookedController = require("../controllers/bookedController");

/**
* @swagger
* /booked/getAll:
*   get:
*       summary:
*       description: Use to get booked rooms
*       responses:
*           200:
*               description: Success
*           404:
*               description: 404 Not Found
*/
router.get('/getAll', async function(req, res){
    res.json(await bookedController.getBookedRooms());
});

/**
* @swagger
* /booked/current:
*   get:
*       summary:
*       description: Use to get currently booked rooms
*       responses:
*           200:
*               description: Success
*           404:
*               description: 404 Not Found
*/
router.get('/current', async function(req, res){
    res.json(await bookedController.getCurrentBookedRooms());
});

/**
* @swagger
* /booked/saveDetails:
*   post:
*       summary:
*       description: Use to insert rooms
*       responses:
*           200:
*               description: Inserted
*           404:
*               description: 404 Not Found
*/
router.post('/saveDetails', async function(req, res){
    await bookedController.insertBookedRooms(req.body);
    res.json({
        message:"success",
        room: req.body
    });
});

/**
* @swagger
* /booked/:id:
*   put:
*       summary:
*       description: Use to update rooms
*       responses:
*           200:
*               description: Updated
*           404:
*               description: 404 Not Found
*/
router.put('/:id', async function(req, res){
    res.json(await bookedController.updateBookedRooms(req.params.id, req.body) );
});

/**
* @swagger
* /booked/:id:
*   delete:
*       summary:
*       description: Use to delete rooms
*       responses:
*           200:
*               description: Deleted
*           404:
*               description: 404 Not Found
*/
router.delete('/:id', async function(req, res){
    res.json(await bookedController.deleteBookedRooms(req.params.id))
});

module.exports = router;