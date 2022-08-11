const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');


router.get('/getworktData', async (req, res)=>{
    
    try {
        console.log('getworktData');
        const data = await db.query(`
        SELECT
            md.maid_duty_id,
            mda.maid_duty_assign_id,
            mda.work_description,
            l.location_name,
            dw.date_week_full_name_th,
            md.time_start,
            md.time_end,
            r.room_name
        FROM
            maid_duty AS md
            LEFT JOIN maid_duty_assign AS mda ON mda.maid_duty_id = md.maid_duty_id
            LEFT JOIN manager AS m ON m.manager_id = mda.manager_id_assign
            LEFT JOIN date_week AS dw ON dw.date_week_id = md.date_week_id
            LEFT JOIN room AS r ON r.room_id = mda.room_id
            LEFT JOIN location AS l ON l.location_id = mda.location_id 
        WHERE
            maid_id = ${escape(req.query[`maid_id`])} 
            AND WEEKDAY(CURRENT_DATE)+1 = md.date_week_id
        `);

        let result = [];
        for (let i = 0; i < data.length; i++) {
            const ele = data[i];
            const check = await db.query(`
                SELECT * 
                FROM maid_duty_check
                WHERE 
                    maid_duty_assign_id = ${ele['maid_duty_assign_id']}
                    AND DATE_FORMAT(finished_date,'%Y-%m-%d') = CURRENT_DATE
            `)
            if (check.length === 0) {
                result.push(ele)
            }
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
module.exports = router