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

module.exports = router