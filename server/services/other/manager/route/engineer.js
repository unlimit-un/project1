const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');
const bcrypt = require('bcryptjs');
const { uploadFile } = require('../../upload');

router.get('/getCountEngineerByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT COUNT(*) AS count FROM engineer AS en
            INNER JOIN location AS l ON l.location_id = en.location_id
            WHERE l.manager_id = ${escape(req.query['manager_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getEngineerByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT * FROM engineer 
            INNER JOIN location AS l ON l.location_id = engineer.location_id
            INNER JOIN engineer_department AS ed ON ed.dept_id = engineer.dept_id
            WHERE manager_id = ${escape(req.query['manager_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getEngineerByDeptId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT * FROM engineer 
            INNER JOIN location AS l ON l.location_id = engineer.location_id
            INNER JOIN engineer_department AS ed ON ed.dept_id = engineer.dept_id
            WHERE ed.dept_id = ${escape(req.query['dept_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getTotalEngineerByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT COUNT(*) AS count FROM engineer 
            INNER JOIN location AS l ON l.location_id = engineer.location_id
            INNER JOIN engineer_department AS ed ON ed.dept_id = engineer.dept_id
            WHERE manager_id = ${escape(req.query['manager_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/insertEngineer', uploadFile ,async (req, res)=>{
    try {

        const {email, emp_code, location_id, name, password, surname, tel, username, manager_id, engineer_dept} = req.body

        if (!(email && emp_code && location_id && name && password && surname && tel && username && manager_id && engineer_dept)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        const checkUsername = await db.query(`
            SELECT * FROM engineer AS m
            LEFT JOIN location AS l ON l.location_id = m.location_id
            WHERE l.manager_id = ${escape(manager_id)} AND (m.engineer_username = ${escape(username)} OR m.engineer_code = ${escape(emp_code)}) AND m.status = 1
        `);
        
        if (checkUsername.length > 0){
            res.status(400).send('รหัสพนักงาน หรือ ชื่อผู้ใช้งาน นี้ถูกใช้งานแล้ว');
            return false;
        } 

        const bcryptPassword = await bcrypt.hash(password, 10);

        const result = await db.query(`
            INSERT INTO engineer(engineer_code, engineer_img, engineer_username, engineer_password, engineer_name, engineer_surname, engineer_email, dept_id, location_id, engineer_tel) 
            VALUES (
                ${escape(emp_code)}, 
                ${escape(req.file.filename)}, 
                ${escape(username)}, 
                ${escape(bcryptPassword)}, 
                ${escape(name)}, 
                ${escape(surname)}, 
                ${escape(email)}, 
                ${escape(engineer_dept)}, 
                ${escape(location_id)}, 
                ${escape(tel)}
            );
        
        `);
        console.log(result);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = router