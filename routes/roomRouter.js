const express = require('express');
const router = express.Router();
const roomController = require("../controllers/roomController");

/**
* @swagger
* /room/getAll:
*   get:
*       summary:
*       description: Use to get rooms
*       responses:
*           200:
*               description: Success
*           404:
*               description: 404 Not Found
*/
router.get('/getAll', async function(req, res){
    res.json(await roomController.getRooms());
});

/**
* @swagger
* /room/saveDetails:
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
    await roomController.insertRooms(req.body);
    res.json({
        message:"success",
        room: req.body
    });
});

/**
* @swagger
* /room/:id:
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
    res.json(await roomController.updateRooms(req.params.id, req.body) );
 });

 /**
* @swagger
* /room/:id:
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
    res.json(await roomController.deleteRooms(req.params.id))
});

/**
* @swagger
* /room/bookedRooms:
*   get:
*       summary:
*       description: Use to get booked rooms
*       responses:
*           200:
*               description: Success
*           404:
*               description: 404 Not Found
*/
router.get('/bookedRooms', async function(req, res){
    res.json(await roomController.getBookedRooms());
});

/**
* @swagger
* /room/availableRooms:
*   get:
*       summary:
*       description: Use to get available rooms
*       responses:
*           200:
*               description: Success
*           404:
*               description: 404 Not Found
*/
router.get('/availableRooms', async function(req, res){
    res.json(await roomController.getAvailableRooms());
});

/**
* @swagger
* /room/availableRoomsByType:
*   get:
*       summary:
*       description: Use to get available rooms by type
*       responses:
*           200:
*               description: Success
*           404:
*               description: 404 Not Found
*/
router.get('/availableRoomsByType', async function(req, res){
    res.json(await roomController.getAvailableRoomsByType("Deluxe"));
});

module.exports = router;