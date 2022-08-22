const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');


router.get('/getworktData', async (req, res)=>{
    
    try {
        console.log('getworktData');
        const data = await db.query(`
        SELECT
            mda.maid_duty_assign_code,
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
            INNER JOIN maid_duty_assign AS mda ON mda.maid_duty_id = md.maid_duty_id
            INNER JOIN manager AS m ON m.manager_id = mda.manager_id_assign
            INNER JOIN date_week AS dw ON dw.date_week_id = md.date_week_id
            INNER JOIN room AS r ON r.room_id = mda.room_id
            INNER JOIN location AS l ON l.location_id = mda.location_id 
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
router.get('/getworktDataComplete', async (req, res)=>{
    
    try {
        // console.log('getworktData');
        const result = await db.query(`
        SELECT 
            mda.maid_duty_assign_code, mda.work_description, l.location_name, r.room_name, dw.date_week_full_name_th, md.time_start, md.time_end, mdc.note, mdc.finished_date,
            IF(mdc.status = 0,"waiting",
                IF(mdc.status = 1,"success", "fail")
            ) AS status,
            mdc.deny_description
        FROM maid_duty_check AS mdc
        LEFT JOIN maid_duty_assign AS mda ON  mdc.maid_duty_assign_id = mda.maid_duty_assign_id
        LEFT JOIN maid_duty AS md ON mda.maid_duty_id = md.maid_duty_id
        LEFT JOIN location AS l ON l.location_id = mda.location_id
        LEFT JOIN room AS r ON r.location_id = l.location_id
        LEFT JOIN date_week AS dw ON md.date_week_id = dw.date_week_id
        WHERE md.maid_id = ${escape(req.query[`maid_id`])} 
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
router.get('/getWorkByMaidId', async (req, res)=>{
    
    try {
        
        const result = await db.query(`
        SELECT 
            m.maid_code, 
            CONCAT_WS(' ',maid_name,maid_surname) AS maid_name,
            dw.date_week_full_name_th,
            time_start,
            time_end,
            dw.date_week_id,
            location_name,
            room_name,
            mda.*
        FROM maid_duty_assign AS mda
        LEFT JOIN maid_duty AS md ON md.maid_duty_id = mda.maid_duty_id
        LEFT JOIN maid AS m ON m.maid_id = md.maid_id
        LEFT JOIN location AS l ON l.location_id = mda.location_id
        LEFT JOIN room AS r ON r.room_id = mda.room_id
        LEFT JOIN date_week AS dw ON dw.date_week_id = md.date_week_id
        WHERE md.maid_id = ${escape(req.query[`maid_id`])}  ORDER BY dw.date_week_id
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
router.get('/getworkCurrentDate', async (req, res)=>{
    
    try {
        
        const result = await db.query(`
    SELECT
        mda.maid_duty_assign_code,
        dw.date_week_name_shot_eng,
        l.location_name,
        r.room_name,
        mda.work_description,
        md.time_start,
        md.time_end 
    FROM
        maid_duty_assign AS mda
        INNER JOIN maid_duty AS md ON md.maid_duty_id = mda.maid_duty_id
        INNER JOIN location AS l ON l.location_id = mda.location_id
        INNER JOIN room AS r ON r.room_id = mda.room_id
        INNER JOIN date_week AS dw ON dw.date_week_id = md.date_week_id 
    WHERE
        dw.date_week_id = ${escape(new Date().getDay())} AND maid_id = ${escape(req.query[`maid_id`])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
router.post('/insertMaidDutyCheck', async (req, res)=>{
    
    try {
        const {maid_duty_assign_id} = req.body;
        if (!(maid_duty_assign_id)) {
            res.status(400).send('data is required!')
            return false;
        }
        const result = await db.query (`
        INSERT INTO maid_duty_check (maid_duty_assign_id) 
        VALUES (${escape(maid_duty_assign_id)})
        `);
        const [{note}] = await db.query(
            `SELECT IF(md.time_end >= CONCAT(HOUR(mdc.finished_date),':',MINUTE(mdc.finished_date)),'ทันเวลา','ล่าช้า') AS note
            FROM maid_duty AS md
            LEFT JOIN maid_duty_assign AS mda ON mda.maid_duty_id = md.maid_duty_id
            LEFT JOIN maid_duty_check AS mdc ON mdc.maid_duty_assign_id = mda.maid_duty_assign_id
            WHERE mdc.maid_duty_check_id= ${escape(result.insertId)};
        `)
        await db.query(`
            UPDATE maid_duty_check 
            SET note = ${escape(note)}
            WHERE maid_duty_check_id = ${escape(result.insertId)}
        `)
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
module.exports = router