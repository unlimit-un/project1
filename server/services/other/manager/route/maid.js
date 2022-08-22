const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');
const { uploadFile } = require('../../upload');
const bcrypt = require('bcryptjs')

router.get('/getCountMaidByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT COUNT(*) AS count FROM maid AS m
            INNER JOIN location AS l ON l.location_id = m.location_id
            WHERE l.manager_id = ${escape(req.query['manager_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getMaidByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT * FROM maid 
            INNER JOIN location AS l ON l.location_id = maid.location_id
            WHERE manager_id = ${escape(req.query['manager_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getTotalMaidByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT COUNT(*) AS count FROM maid 
            INNER JOIN location AS l ON l.location_id = maid.location_id
            WHERE manager_id = ${escape(req.query['manager_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})


 
router.post('/insertMaid', uploadFile ,async (req, res)=>{
    try {

        const {email, emp_code, location_id, name, password, surname, tel, username, manager_id} = req.body

        if (!(email && emp_code && location_id && name && password && surname && tel && username && manager_id)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        const checkUsername = await db.query(`
            SELECT * FROM maid AS m
            LEFT JOIN location AS l ON l.location_id = m.location_id
            WHERE l.manager_id = ${escape(manager_id)} AND (m.maid_username = ${escape(username)} OR m.maid_code = ${escape(emp_code)})
        `);
        
        if (checkUsername.length > 0){
            res.status(400).send('รหัสพนักงาน หรือ ชื่อผู้ใช้งาน นี้ถูกใช้ไปแล้ว');
            return false;
        } 

        const bcryptPassword = await bcrypt.hash(password, 10);

        const result = await db.query(`
            INSERT INTO maid(maid_code, maid_email, maid_img, maid_username, maid_password, maid_name, maid_surname, maid_tel, location_id) 
            VALUES (
                ${escape(emp_code)}, 
                ${escape(email)}, 
                ${escape(req.file.filename)}, 
                ${escape(username)}, 
                ${escape(bcryptPassword)}, 
                ${escape(name)}, 
                ${escape(surname)}, 
                ${escape(tel)}, 
                ${escape(location_id)}
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