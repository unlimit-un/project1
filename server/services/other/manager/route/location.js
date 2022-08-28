const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getLocationByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT * FROM location WHERE manager_id = ${escape(req.query['manager_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getLocationById', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT * FROM location WHERE location_id = ${escape(req.query['location_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getLocationByMaidId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT * FROM location 
            LEFT JOIN maid AS m ON m.location_id = location.location_id
            WHERE m.maid_id = ${escape(req.query['maid_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/insertLocation', async (req, res)=>{
    try {
        const {location_name, manager_id} = req.body

        if (!(location_name && manager_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }
        
        const result = await db.query(`
            INSERT INTO location(location_name, manager_id)
            VALUES (
                ${escape(location_name)},
                ${escape(manager_id)}
            )
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/deleteLocation', async (req, res)=>{
    try {
        const {location_id} = req.body

        if (!(location_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }
        
        const result = await db.query(`
            DELETE FROM location WHERE location_id = ${escape(location_id)}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/updateLocation', async (req, res)=>{
    try {
        const {location_name, location_id} = req.body

        if (!(location_name && location_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }
        
        const result = await db.query(`
            UPDATE
                location 
            SET
                location_name = ${escape(location_name)}
            WHERE
                location_id = ${escape(location_id)}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router