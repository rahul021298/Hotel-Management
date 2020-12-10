const express = require('express');
const router = express.Router();
const roomController = require("../controllers/roomController");

router.get('/', async function(req, res){
    res.json(await roomController.getRooms());
});

router.post('/saveDetails', async function(req, res){
    await roomController.insertRooms(req.body);
    res.json({
        message:"success",
        room: req.body
    });
});

router.put('/:id', async function(req, res){
    res.json(await roomController.updateRooms(req.params.id, req.body) );
 });

router.delete('/:id', async function(req, res){
    res.json(await roomController.deleteRooms(req.params.id))
});

router.get('/bookedRooms', async function(req, res){
    res.json(await roomController.getBookedRooms());
});

router.get('/availableRooms', async function(req, res){
    res.json(await roomController.getAvailableRooms());
});

router.get('/availableRoomsByType', async function(req, res){
    res.json(await roomController.getAvailableRoomsByType("Deluxe"));
});

// router.get('/availableRoomsByDate', async function(req, res){
//     res.json(await roomController.getAvailableRoomsByDate("2020-12-25","2021-01-02"));
// });

module.exports = router;