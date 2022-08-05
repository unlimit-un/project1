const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getleavepiechart', async (req, res)=>{
    
    try {
        const [{manager_id}] = await db.query(
           `SELECT l.manager_id FROM maid AS m
            LEFT JOIN location AS l ON m.location_id = l.location_id    
            WHERE m.maid_id = ${escape(req.query['user_id'])}`
        ); 

        const result = await db.query(
           ` SELECT lt.*, COUNT(l.maid_id) AS count FROM leave_type AS lt
            LEFT JOIN (SELECT * FROM  ${"`leave`"} WHERE maid_id =${escape(req.query['user_id'])} ) AS l ON l.leave_type_id = lt.leave_type_id
            WHERE manager_id = ${escape(manager_id)}
            GROUP BY lt.leave_type_id`
        );
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getleaveData', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT leave_id, title,leave_type_name,description,date_start,date_end,status,
            IF(status= 0 ,"waiting",
            IF(status = 1,"accept","deny")
            ) AS note
        FROM ${"`leave`"}  AS l
        INNER JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
        WHERE 
            maid_id= ${escape(req.query[`user_id`])}

        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
router.get('/getleaveDataByid', async (req, res)=>{
    
    try {
        const result = await db.query (`
        SELECT leave_id, title,leave_type_name,description,date_start,date_end,l.status, l.time_reg,
            IF(l.status= 0 ,"รอดำเนินการ",
            IF(l.status = 1,"อนุมัติ","ปฏิเสธ")
        ) AS note,
                CONCAT_WS(" ",m.maid_name,m.maid_surname) AS Name
        FROM ${"`leave`"}  AS l
        INNER JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
                INNER JOIN maid AS m ON m.maid_id = l.maid_id
        WHERE 
            leave_id = ${escape(req.query[`leave_id`])}

        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
router.get('/getLeaveType', async (req, res)=>{
    
    try {
        const result = await db.query (`
        SELECT lt.* FROM leave_type AS lt
        LEFT JOIN manager AS m ON m.manager_id = lt.manager_id
        LEFT JOIN location AS lo ON lo.manager_id = m.manager_id
        LEFT JOIN maid AS ma ON ma.location_id = lo.location_id
        WHERE ma.maid_id = ${escape(req.query[`maid_id`])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})
router.post('/insertLeave', async (req, res)=>{
    
    try {
        const {title,leave_type,date_start,date_end,description, user_id} = req.body;
        if (!(title && leave_type && date_start && date_end && description && user_id)) {
            res.status(400).send('data is required!')
            return false;
        }
        const result = await db.query (`
        INSERT INTO ${"`leave`"}(leave_type_id,maid_id,title,description,date_start,date_end)
        VALUES(${escape(leave_type)},${escape(user_id)},${escape(title)},${escape(description)},${escape(date_start)},${escape(date_end)})
        `);

        const  [{manager_id}] = await db.query(`
        SELECT l.manager_id FROM maid AS m
        LEFT JOIN location AS l ON m.location_id = l.location_id
        `);

        const {insertId} = result

         await db.query (`
        INSERT INTO notify(manager_id,maid_id,leave_id,status_maid)
        VALUES(${escape(manager_id)},${escape(user_id)},${escape(insertId)},1)
        `);

        console.log(insertId);
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
  
   
})
router.post('/delectLeave', async (req, res)=>{
    
    try {
        const {leave_id} = req.body;
        if (!leave_id) {
            res.status(400).send('data is required!')
            return false;
        }
        const result = await db.query (`
        DELETE FROM ${"`leave`"} WHERE leave_id = (${escape(leave_id)})
         
        `);
     
       
        res.status(200).send(result)
      
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router