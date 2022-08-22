const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getSpacialEventByMaidId', async (req, res)=>{
    
    try {
        const result = await db.query(` 
            SELECT se.*,
            l.location_name,
            r.room_name,
            t.team_name
            FROM spacial_event AS se
            INNER JOIN team AS t ON t.spacial_event_id = se.spacial_id
            INNER JOIN team_member AS tm ON tm.team_id = t.team_id
            INNER JOIN location AS l ON l.location_id = se.location_id
            INNER JOIN room AS r ON r.room_id = l.location_id
            WHERE tm.maid_id = ${escape(req.query[`maid_id`])} 
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
module.exports = router
