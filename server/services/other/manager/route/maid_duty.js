const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getMaidDutyByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT md.*, CONCAT_WS(' ',m.maid_name,m.maid_surname) maid_name, dw.date_week_full_name_th FROM maid_duty AS md
            LEFT JOIN date_week AS dw ON dw.date_week_id = md.date_week_id
            LEFT JOIN maid AS m ON m.maid_id = md.maid_id
            LEFT JOIN location AS l ON l.location_id = m.location_id
            WHERE l.manager_id = ${escape(req.query['manager_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getMaidDutyById', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT md.*, CONCAT_WS(' ',m.maid_name,m.maid_surname) maid_name, dw.date_week_full_name_th FROM maid_duty AS md
            LEFT JOIN date_week AS dw ON dw.date_week_id = md.date_week_id
            LEFT JOIN maid AS m ON m.maid_id = md.maid_id
            LEFT JOIN location AS l ON l.location_id = m.location_id
            WHERE md.maid_duty_id = ${escape(req.query['maid_duty_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/insertMaidDuty', async (req, res)=>{
    try{

        const {maid_id, date_week_id, time_start, time_end} = req.body

        if (!(maid_id && date_week_id && time_start && time_end)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }
        
        const result = await db.query(`
            INSERT INTO maid_duty(maid_id, date_week_id, time_start, time_end)
            VALUES(
                ${escape(maid_id)},
                ${escape(date_week_id)},
                ${escape(time_start)},
                ${escape(time_end)}
            )
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/updateMaidDuty', async (req, res)=>{
    try{

        const {maid_id, date_week_id, time_start, time_end, maid_duty_id} = req.body

        if (!(maid_id && date_week_id && time_start && time_end && maid_duty_id)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }
        
        const result = await db.query(`
            UPDATE maid_duty 
            SET 
                maid_id = ${escape(maid_id)},
                date_week_id = ${escape(date_week_id)},
                time_start = ${escape(time_start)},
                time_end = ${escape(time_end)}
            WHERE 
                maid_duty_id = ${escape(maid_duty_id)}
        `);

        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/deleteMaidDuty', async (req, res)=>{
    try{

        const {maid_duty_id} = req.body

        if (!(maid_duty_id)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }
        
        const result = await db.query(`
            DELETE FROM maid_duty WHERE maid_duty_id = ${escape(maid_duty_id)}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router