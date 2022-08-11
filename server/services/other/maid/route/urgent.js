const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');


router.get('/geturgentData', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT uw.urgent_id,
        IF(uw.team_id IS NOT NULL , 'งานกิจกรรมพิเศษ','งานในตารางเวร') AS type,
        IF(uw.team_id IS NOT NULL , l.location_name,lm.location_name) AS location_name,
        IF(uw.team_id IS NOT NULL , 
            CONCAT(se.event_date,'-', se.finished_date),
            CONCAT(md.time_start,'-', md.time_end)
        ) AS date_time,
        work_description
    FROM urgent_work AS uw
    LEFT JOIN team AS t ON t.team_id = uw.team_id
    LEFT JOIN spacial_event AS se ON se.spacial_id = t.spacial_event_id
    LEFT JOIN location AS l ON l.location_id = se.location_id
    LEFT JOIN maid_duty AS md ON md.maid_duty_id = uw.maid_duty_id
    LEFT JOIN maid_duty_assign AS mda ON mda.maid_duty_id = md.maid_duty_id
    LEFT JOIN location AS lm ON lm.location_id = mda.location_id
    WHERE uw.maid_instead_id = ${escape(req.query[`maid_instead_id`])} AND uw.status = 1

        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
router.post('/Updateurgent', async (req, res)=>{
    
    try {
        const {urgent_id} =req.body
        console.log(urgent_id);
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