const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/geteventData', async (req, res)=>{
    
    try {
        const result = await db.query(`
    SELECT
            se.title,
            se.description,
            se.event_date,
            se.finished_date,
            l.location_name,
            r.room_name,
            t.team_name,
            m.material_name,
            tma.material_count 
    FROM
        spacial_event AS se
        LEFT JOIN team AS t ON t.spacial_event_id = se.spacial_id
        LEFT JOIN team_member AS tm ON tm.team_id = t.team_id
        LEFT JOIN team_material AS tma ON tma.team_id = t.team_id
        LEFT JOIN material AS m ON m.material_id = tma.material_id
        LEFT JOIN location AS l ON l.location_id = se.location_id
        LEFT JOIN room AS r ON r.room_id = se.room_id 
    WHERE
        tm.engineer_id = ${escape(req.query[`engineer_id`])} AND se.status = 0
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
router.get('/geteventDataStatus', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT
	se.title,
	se.description,
	se.event_date,
	se.finished_date,
	l.location_name,
	r.room_name,
	t.team_name,
	m.material_name,
	tma.material_count 
FROM
	spacial_event AS se
	LEFT JOIN team AS t ON t.spacial_event_id = se.spacial_id
	LEFT JOIN team_member AS tm ON tm.team_id = t.team_id
	LEFT JOIN team_material AS tma ON tma.team_id = t.team_id
	LEFT JOIN material AS m ON m.material_id = tma.material_id
	LEFT JOIN location AS l ON l.location_id = se.location_id
	LEFT JOIN room AS r ON r.room_id = se.room_id 
WHERE
	tm.engineer_id = ${escape(req.query[`tm.engineer_id`])} AND se.status = 1
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
module.exports = router