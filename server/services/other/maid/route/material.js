const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getmaterialData', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT
	m.material_code,
	m.material_name,
	om.quantity,
	om.unit_price,
	om.quantity * om.unit_price AS total_price,
	om.order_date,
	om.STATUS ,
     IF(status= 0 ,"waiting",
        IF(status = 1,"accept","deny")
            ) AS note
FROM
	order_material AS om
	LEFT JOIN material AS m ON om.material_id = m.material_id 
WHERE
	om.maid_id = ${escape(req.query[`maid_id`])}
        `);
      
       
        res.status(200).send(result)
      

    } catch (error) {
        console.log(error); 
        res.sendStatus(500)
    }
   
})
router.get('/getmaterialofUser', async (req, res)=>{
    
    try {
        const  [{manager_id}] = await db.query(`
        SELECT l.manager_id FROM maid AS m
        LEFT JOIN location AS l ON m.location_id = l.location_id
        WHERE m.maid_id=${escape(req.query[`maid_id`])}
        `);
        
        const result = await db.query(`
        SELECT
	m.material_id,
	m.material_name,
	m.material_code 
FROM
	material AS m 
WHERE
	manager_id = ${escape(manager_id)}
        `);
      
       
        res.status(200).send(result)
      

    } catch (error) {
        console.log(error); 
        res.sendStatus(500)
    }
   
})
module.exports = router