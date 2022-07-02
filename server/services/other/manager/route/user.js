const router = require('express').Router();
const db = require('../../../../config/database');

router.get('/getUserData', async (req, res)=>{
    try {
        const result = await db.query(`SELECT * FROM manager WHERE ${req.user_data}`);
    
       if (result.length > 0) {
        res.status(200).send(result)
       }else{
        res.sendStatus(500)
       }
    } catch (error) {
        console.log(error);
    }
   
})

module.exports = router