const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getrepairData', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT nr.notify_repair_id,
        nr.description,l.location_id,r.room_id,nr.notify_repair_date,status,
        IF(status = 0,"waiting", 
            IF(status = 1, "accept",
                IF(status = 2,"process", 
                    IF(status= 3,"success", 
                        IF(status = -1,"deny",
                            IF(status = -2, "unable", "needless")
                     )
                )
            )
    )
) AS note
    FROM 
    notify_repair AS nr
    LEFT JOIN location AS l ON nr.location_id = l.location_id
    LEFT JOIN room AS r ON l.location_id = r.location_id
    WHERE nr.maid_id  = ${escape(req.query[`maid_id`])} AND nr.status <> -3
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
router.get('/getroomBylocationId', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT * FROM room WHERE location_id = ${escape(req.query[`location_id`])}
        `);
        res.status(200).send(result)
      

    } catch (error) {
        console.log(error); 
        res.sendStatus(500)
    }
   
})
router.post('/insertRepair', async (req, res)=>{
    
    try {
        const {location_id,room_id,description,maid_id} = req.body;
        
        if (!(location_id && room_id && description && maid_id)) {
            res.status(400).send('data is required!')
            return false;
        }
        const date = new Date();
        const result = await db.query (`
        INSERT INTO notify_repair(maid_id,location_id,room_id,description,notify_repair_date) 
        VALUES (${escape(maid_id)},
        ${escape(location_id)},${escape(room_id)},
        ${escape(description)},
        ${escape(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)})
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
router.post('/UpdateRepair', async (req, res)=>{
    
    try {
        const {notify_repair_id} = req.body
        console.log(notify_repair_id);
        const result = await db.query(`
        UPDATE notify_repair 
        SET  status = -3 WHERE notify_repair_id =  ${escape(notify_repair_id)} 
        `);
        res.status(200).send(result)
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
module.exports = router