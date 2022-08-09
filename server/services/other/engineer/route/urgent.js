const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');


router.get('/geturgentData', async (req, res)=>{
    try {
        const result = await db.query(` 
        SELECT IF (uw.team_id IS NOT NULL , 'งานกิจกรรมพิเศษ','งานในตารางเวร') AS type,
            l.location_name,urgent_id,
            CONCAT(se.event_date,'-', se.finished_date) AS date_time
        FROM urgent_work AS uw
        LEFT JOIN team AS t ON t.team_id = uw.team_id
        LEFT JOIN spacial_event AS se ON se.spacial_id = t.spacial_event_id
        LEFT JOIN location AS l ON l.location_id = se.location_id
        WHERE uw.engineer_instead_id = ${escape(req.query['engineer_instead_id'])} AND uw.status = 1 
        `);
            res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.post('/updateurgentById', async (req, res)=>{
    try {
        const { urgent_id } = req.body
        if (!urgent_id) {
            res.status(400).send('data is required!')
            return false;
        }

        const result = await db.query(`
            UPDATE urgent_work SET status = 0 WHERE urgent_id = ${escape(urgent_id)}
        `);

        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = router