const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getLeaveTypeByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT * FROM leave_type WHERE manager_id = ${escape(req.query['manager_id'])}   
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})

router.get('/getLeaveTypeById', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT * FROM leave_type WHERE leave_type_id = ${escape(req.query['leave_type_id'])}   
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})

router.post('/insertLeaveType', async (req, res)=>{
    try {
        const {leave_type_name, manager_id} = req.body

        if (!(leave_type_name && manager_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }
        const result = await db.query(`
            INSERT INTO leave_type(leave_type_name, manager_id)
            VALUES(
                ${escape(leave_type_name)},
                ${escape(manager_id)}
            )
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})

router.post('/updateLeaveType', async (req, res)=>{
    try {
        const {leave_type_name, leave_type_id} = req.body

        if (!(leave_type_name && leave_type_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }
        const result = await db.query(`
            UPDATE leave_type
            SET
                leave_type_name = ${escape(leave_type_name)}
            WHERE
                leave_type_id = ${escape(leave_type_id)}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})

router.post('/deleteLeaveType', async (req, res)=>{
    try {
        const {leave_type_id} = req.body

        if (!(leave_type_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }
        const result = await db.query(`
            DELETE FROM leave_type WHERE leave_type_id = ${escape(leave_type_id)}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})

module.exports = router