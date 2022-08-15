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

module.exports = router