const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getUserData', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT manager_id, manager_name, manager_surname, manager_tel, manager_email, manager_img 
            FROM manager
            WHERE manager_id = ${escape(req.query['user_id'])}
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