const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getUserData', async (req, res)=>{
    console.log(req.query['user_id']);
    try {
        const result = await db.query(`
        SELECT engineer_id, engineer_name, engineer_surname, engineer_img,  
        engineer_tel, ed.dept_name FROM engineer  
        AS en INNER JOIN engineer_department AS ed ON en.dept_id = ed.dept_id
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

module.exports = router