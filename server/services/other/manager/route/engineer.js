const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getCountEngineerByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT COUNT(*) AS count FROM engineer AS en
            INNER JOIN location AS l ON l.location_id = en.location_id
            WHERE l.manager_id = ${escape(req.query['manager_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router