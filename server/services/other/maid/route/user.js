const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getUserData', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT maid_id, maid_name, maid_surname, maid_tel, maid_img FROM maid 
        WHERE maid_id = ${escape(req.query[`user_id`])}
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