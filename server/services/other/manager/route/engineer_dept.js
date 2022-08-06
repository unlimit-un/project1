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

router.post('/insertEngineerDept', async (req, res)=>{
    try {
        const { dept_code, dept_name, location_id } = req.body
        console.log({ dept_code, dept_name, location_id });
        if (!(dept_code && dept_name && location_id)) {
            res.status(400).send('data is required!')
        }

        const result = await db.query(`
            INSERT INTO engineer_department(dept_code, dept_name, location_id)
            VALUES(${escape(dept_code)}, ${escape(dept_name)}, ${escape(location_id)})
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/editEngineerDept', async (req, res)=>{
    try {
        const { dept_code, dept_name, location_id, dept_id } = req.body
        console.log({ dept_code, dept_name, location_id, dept_id });
        if (!(dept_code && dept_name && location_id && dept_id)) {
            res.status(400).send('data is required!')
        }

        const result = await db.query(`
            UPDATE 
                engineer_department 
            SET 
                dept_code = ${escape(dept_code)}, 
                dept_name = ${escape(dept_name)}, 
                location_id = ${escape(location_id)}
            WHERE 
                dept_id = ${escape(dept_id)};
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/deleteEngineerDept', async (req, res)=>{
    try {
        const { dept_id } = req.body
        console.log({ dept_id });
        if (!(dept_id)) {
            res.status(400).send('data is required!')
        }

        const result = await db.query(`
            DELETE FROM engineer_department WHERE dept_id = ${escape(dept_id)}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router