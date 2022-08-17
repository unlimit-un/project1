const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getWorkData', async (req, res)=>{
    try {
        const [{dept_id}] = await db.query(`SELECT * FROM engineer WHERE engineer_id = ${escape(req.query['engineer_id'])}`)
        const result = await db.query(`
        SELECT nr.* ,l.location_name,r.room_name FROM notify_repair AS nr
        LEFT JOIN location AS l ON l.location_id = nr.location_id
        LEFT JOIN room AS r ON r.room_id = nr.room_id
        WHERE engineer_dept_id  = ${escape(dept_id)} AND status = 1
        
        `);
            res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
router.post('/updateNotifyRepairToProcessing', async (req, res)=>{
    try {
        const { notify_repair_id,define_date_by_engineer,engineer_id } = req.body
        if (!(notify_repair_id && define_date_by_engineer&&engineer_id)) {
            res.status(400).send('data is required!')
            return false;
        }
        const result = await db.query(`
        UPDATE notify_repair SET status = 3 , define_date_by_engineer = ${escape(define_date_by_engineer)},
        engineer_id = ${escape(engineer_id)}
            WHERE notify_repair_id =${escape(notify_repair_id)}
        `);

        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
module.exports = router