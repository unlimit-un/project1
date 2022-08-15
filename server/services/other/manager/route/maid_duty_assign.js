const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getMaidDutyAssignByManagerId', async (req, res)=>{
    try{
        
        const result = await db.query(`
        SELECT 
            m.maid_code, 
            CONCAT_WS(' ',maid_name,maid_surname) AS maid_name,
            dw.date_week_full_name_th,
            CONCAT_WS('-',md.time_start,md.time_end) AS time_duty,
            location_name,
            room_name,
            mda.*
        FROM maid_duty_assign AS mda
        LEFT JOIN maid_duty AS md ON md.maid_duty_id = mda.maid_duty_id
        LEFT JOIN maid AS m ON m.maid_id = md.maid_id
        LEFT JOIN location AS l ON l.location_id = mda.location_id
        LEFT JOIN room AS r ON r.room_id = mda.room_id
        LEFT JOIN date_week AS dw ON dw.date_week_id = md.date_week_id
        WHERE mda.manager_id_assign = ${escape(req.query['manager_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getMaidDutyAssignById', async (req, res)=>{
    try{
        
        const result = await db.query(`
            SELECT mda.* , maid_id FROM maid_duty_assign  AS mda
            LEFT JOIN maid_duty AS ad ON ad.maid_duty_id = mda.maid_duty_id
            WHERE mda.maid_duty_assign_id = ${escape(req.query['maid_duty_assign_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})



router.post('/insertMaidDutyAssign', async (req, res)=>{
    try{

        const {maid_duty_id, location_id, room_id, work_description, manager_id_assign} = req.body

        if (!(maid_duty_id && location_id && room_id && work_description && manager_id_assign)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }
        
        const result = await db.query(`
            INSERT INTO maid_duty_assign(maid_duty_id, location_id, room_id, work_description, manager_id_assign)
            VALUES(
                ${escape(maid_duty_id)}, 
                ${escape(location_id)}, 
                ${escape(room_id)}, 
                ${escape(work_description)}, 
                ${escape(manager_id_assign)}
            )
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/updateMaidDutyAssgin', async (req, res)=>{
    try{

        const {maid_duty_assign_id, location_id, maid_duty_id, room_id, work_description} = req.body

        if (!(maid_duty_assign_id && location_id && maid_duty_id && room_id && work_description)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }
        
        const result = await db.query(`
            UPDATE maid_duty_assign
            SET
                location_id=${escape(location_id)},
                maid_duty_id=${escape(maid_duty_id)},
                room_id=${escape(room_id)},
                work_description=${escape(work_description)}
            WHERE
                maid_duty_assign_id = ${escape(maid_duty_assign_id)}
        `);

        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/deleteMaidDutyAssign', async (req, res)=>{
    try{

        const {maid_duty_assign_id} = req.body

        if (!(maid_duty_assign_id)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }
        
        const result = await db.query(`
            DELETE FROM maid_duty_assign WHERE maid_duty_assign_id = ${escape(maid_duty_assign_id)}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router