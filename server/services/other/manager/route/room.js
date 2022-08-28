const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getRoomByManagerId', async(req, res)=>{
    try{

        const result = await db.query(`
            SELECT * FROM room AS r 
            LEFT JOIN location AS l ON r.location_id = l.location_id
            WHERE l.manager_id = ${escape(req.query['manager_id'])}
        `);
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getRoomByLocationId', async(req, res)=>{
    try{

        const result = await db.query(`
            SELECT * FROM room
            WHERE location_id = ${escape(req.query['location_id'])}
        `);
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getRoomById', async(req, res)=>{
    try{

        const result = await db.query(`
            SELECT * FROM room
            WHERE room_id = ${escape(req.query['room_id'])}
        `);
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.post('/insertRoom', async (req, res)=>{
    try {
        const {room_name, location_id} = req.body

        if (!(room_name && location_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }
        
        const result = await db.query(`
            INSERT INTO room(room_name, location_id)
            VALUES (
                ${escape(room_name)},
                ${escape(location_id)}
            )
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/deleteRoom', async (req, res)=>{
    try {
        const {room_id} = req.body

        if (!(room_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }
        
        const result = await db.query(`
            DELETE FROM room WHERE room_id = ${escape(room_id)}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/updateRoom', async (req, res)=>{
    try {
        const {room_name, room_id} = req.body

        if (!(room_name && room_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }
        
        const result = await db.query(`
            UPDATE
                room 
            SET
                room_name = ${escape(room_name)}
            WHERE
                room_id = ${escape(room_id)}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router