const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getrepairData', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT nr.description,l.location_id,r.room_id,nr.notify_repair_date,status,
            IF(status= 0 ,"waiting",
            IF(status = 1,"accept","deny")
                ) AS note
        FROM 
        notify_repair AS nr
        LEFT JOIN location AS l ON nr.location_id = l.location_id
        LEFT JOIN room AS r ON l.location_id = r.location_id
        WHERE nr.maid_id  = ${escape(req.query[`maid_id`])}
        `);
      
       
        res.status(200).send(result)
      

    } catch (error) {
        console.log(error); 
        res.sendStatus(500)
    }
   
})
router.get('/getrepairDatalocation', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT * FROM location
        WHERE manager_id =  (
            SELECT manager_id FROM maid AS m
            LEFT JOIN location AS l ON l.location_id = m.location_id
            WHERE maid_id = ${escape(req.query[`maid_id`])}
        ) 
        `);
      
       
        res.status(200).send(result)
      

    } catch (error) {
        console.log(error); 
        res.sendStatus(500)
    }
   
})
module.exports = router