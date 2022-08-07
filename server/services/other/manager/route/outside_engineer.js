const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');
const { uploadFile } = require('../../upload');

router.post('/insertOutSideEngineer', uploadFile, async (req, res)=>{
    try {

        const {name, surname, tel, manager_id, engineer_dept, description} = req.body

        if (!(name && surname && tel && manager_id && engineer_dept && description)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        const result = await db.query(`
            INSERT INTO outside_engineer(dept_id, outside_engineer_name, outside_engineer_img, outside_engineer_description, outside_engineer_tel, manager_id) 
            VALUES (
                ${escape(engineer_dept)}, 
                ${escape(name)}, 
                ${escape(req.file.filename)}, 
                ${escape(description)}, 
                ${escape(tel)}, 
                ${escape(manager_id)}
            );
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router