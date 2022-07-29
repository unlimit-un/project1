const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getLeaveData', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT leave_id, title, leave_type_name, description, date_start, date_end, status,
                IF(status= 0, "waiting", 
                    IF(status= 1, "accept", "deny")
                ) AS note
            FROM ${"`leave`"} AS l
            INNER JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
            WHERE engineer_id = ${req.query['user_id']}
        `);
        if (result.length > 0) {
            res.status(200).send(result)
        }else{
            res.sendStatus(500)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router