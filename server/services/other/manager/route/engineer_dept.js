const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getEngineerDeptByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT ed.*, location_name FROM engineer_department AS ed
            LEFT JOIN location AS l ON l.location_id = ed.location_id
            WHERE manager_id = ${escape(req.query['manager_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getEngineerDeptById', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT ed.*, location_name FROM engineer_department AS ed
            LEFT JOIN location AS l ON l.location_id = ed.location_id
            WHERE dept_id = ${escape(req.query['dept_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router