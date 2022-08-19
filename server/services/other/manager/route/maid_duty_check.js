const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getMaidDutyCheckWaitingByManagerId', async (req, res)=>{
    try{
        
        const result = await db.query(`
            SELECT 
                m.maid_code, 
                CONCAT_WS(' ',maid_name,maid_surname) AS maid_name,
                dw.date_week_full_name_th,
                CONCAT_WS('-',md.time_start,md.time_end) AS time_duty,
                location_name,
                room_name,
                mdc.finished_date,
                mdc.status,
                mdc.maid_duty_check_id,
                mdc.note,
                mda.*
            FROM maid_duty_assign AS mda
            LEFT JOIN maid_duty AS md ON md.maid_duty_id = mda.maid_duty_id
            LEFT JOIN maid AS m ON m.maid_id = md.maid_id
            LEFT JOIN location AS l ON l.location_id = mda.location_id
            LEFT JOIN room AS r ON r.room_id = mda.room_id
            LEFT JOIN date_week AS dw ON dw.date_week_id = md.date_week_id
            LEFT JOIN maid_duty_check AS mdc ON mdc.maid_duty_assign_id = mda.maid_duty_assign_id
            WHERE mda.manager_id_assign = ${escape(req.query['manager_id'])} AND mdc.status = 0 
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getMaidDutyCheckSuccessByManagerId', async (req, res)=>{
    try{
        
        const result = await db.query(`
            SELECT 
                m.maid_code, 
                CONCAT_WS(' ',maid_name,maid_surname) AS maid_name,
                dw.date_week_full_name_th,
                CONCAT_WS('-',md.time_start,md.time_end) AS time_duty,
                location_name,
                room_name,
                mdc.finished_date,
                mdc.status,
                mdc.deny_description,
                mdc.maid_duty_check_id,
                mdc.note,
                mda.*
            FROM maid_duty_assign AS mda
            LEFT JOIN maid_duty AS md ON md.maid_duty_id = mda.maid_duty_id
            LEFT JOIN maid AS m ON m.maid_id = md.maid_id
            LEFT JOIN location AS l ON l.location_id = mda.location_id
            LEFT JOIN room AS r ON r.room_id = mda.room_id
            LEFT JOIN date_week AS dw ON dw.date_week_id = md.date_week_id
            LEFT JOIN maid_duty_check AS mdc ON mdc.maid_duty_assign_id = mda.maid_duty_assign_id
            WHERE mda.manager_id_assign = ${escape(req.query['manager_id'])} AND mdc.status = 1 OR mdc.status = -1
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/updateMaidDutyCheckToDeny', async (req, res)=>{
    try{
        
        const {deny_description, maid_duty_check_id} = req.body

        if (!(deny_description && maid_duty_check_id)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        const date = new Date();
        const current_timestamp = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        const result = await db.query(`
            UPDATE maid_duty_check
            SET 
                status = -1,
                check_date = ${escape(current_timestamp)},
                deny_description = ${escape(deny_description)}
            WHERE 
                maid_duty_check_id = ${escape(maid_duty_check_id)};
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/updateMaidDutyCheckToSuccess', async (req, res)=>{
    try{
        
        const {maid_duty_check_id} = req.body

        if (!(maid_duty_check_id)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }
        const date = new Date();
        const current_timestamp = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        const result = await db.query(`
            UPDATE maid_duty_check
            SET 
                status = 1,
                check_date = ${escape(current_timestamp)}
            WHERE 
                maid_duty_check_id = ${escape(maid_duty_check_id)};
        `);

        
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router