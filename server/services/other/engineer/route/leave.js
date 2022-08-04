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
            WHERE engineer_id = ${escape(req.query['user_id'])}
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

router.get('/getLeaveDataById', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT leave_id, title, leave_type_name, description, date_start, date_end, l.status, l.time_reg,
                IF(l.status= 0, "รอดำเนินการ", 
                        IF(l.status= 1, "อนุมัติ", "ปฏิเสธ")
                ) AS note,
                CONCAT_WS(" ",en.engineer_name,en.engineer_surname) AS en_name
            FROM ${"`leave`"} AS l
            INNER JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
            INNER JOIN engineer AS en ON en.engineer_id = l.engineer_id
            WHERE leave_id = ${escape(req.query['leave_id'])}
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

router.get('/getLeaveType', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT lt.* FROM leave_type AS lt
            LEFT JOIN manager AS m ON m.manager_id = lt.manager_id
            LEFT JOIN location AS lo ON lo.manager_id = m.manager_id
            LEFT JOIN engineer AS e ON e.location_id = lo.location_id
            WHERE e.engineer_id = ${escape(req.query['engineer_id'])}
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

router.post('/insertLeave', async (req, res)=>{
    try {
        const {title, leave_type, date_start, date_end, description, user_id} = req.body
        if (!(title && leave_type && date_start && date_end && description && user_id)) {
            res.status(400).send('data is required!')
            return false;
        }

        const result = await db.query(`
            INSERT INTO ${"`leave`"}(leave_type_id, engineer_id, title, description, date_start, date_end)
            VALUES(${escape(leave_type)}, ${escape(user_id)}, ${escape(title)}, ${escape(description)}, ${escape(date_start)}, ${escape(date_end)})
        `);

        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = router