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

module.exports = router