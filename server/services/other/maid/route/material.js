const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getmaterialData', async (req, res)=>{
    
    try {
        const result = await db.query(`
        SELECT
        om.order_id,
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

router.get('/getmaterialDataById', async (req, res)=>{
    
    try {
        const result = await db.query(`
                SELECT
            om.*,
            m.material_code,
            m.material_name,
            om.quantity * om.unit_price AS total_price,
            STATUS,
        IF
            ( STATUS = 0, "waiting", IF ( STATUS = 1, "accept", "deny" ) ) AS note 
        FROM
            order_material AS om
            LEFT JOIN material AS m ON om.material_id = m.material_id 
        WHERE
            om.order_id = ${escape(req.query[`order_id`])}
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

router.post('/deleteOrderMaterial', async (req, res)=>{
    
    try {
        const {order_material_id} = req.body

        console.log({order_material_id});
        
        if (!(order_material_id)) {
            req.status(400).send('data is required!')
             
        }  

        const [{material_id}] = await db.query(`
            SELECT * FROM order_material WHERE  order_id = ${escape(order_material_id)}        
        `)
        const result = await db.query(`
            DELETE FROM material WHERE material_id = ${escape(material_id)}    
        `); 

        res.status(200).send(result)
    } catch (error) {
        console.log(error); 
        res.sendStatus(500)
    }
})

router.post('/InsertOrderMaterial', async (req, res)=>{
    
    try {
        const {typeInsert,materialInsert,countInsert,maid_id,unitPriceInsert} = req.body
        console.log({typeInsert,materialInsert,countInsert,maid_id,unitPriceInsert});
        if (!(typeInsert && materialInsert && countInsert && maid_id && unitPriceInsert)) {
            res.status(400).send('data is required! ') 
        }

        const date = new Date();
        if (typeInsert === '1') {
            const result = await db.query(`INSERT INTO order_material(material_id,maid_id,quantity,unit_price,is_stock,order_date)
            VALUES(${escape(materialInsert)},
            ${escape(maid_id)},
            ${escape(countInsert)},
            ${escape(unitPriceInsert)},
            ${escape(typeInsert)},
            ${escape(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)}
            )
             `); 
             res.status(200).send(result)
        }else{
            const  [{manager_id}] = await db.query(`
            SELECT l.manager_id FROM maid AS m
            LEFT JOIN location AS l ON m.location_id = l.location_id
            `);
    
            const {insertId} = await db.query(`
                INSERT INTO material(material_name, manager_id, maid_import_id)
                VALUES(
                    ${escape(materialInsert)},
                    ${escape(manager_id)},
                    ${escape(maid_id)}
                )
            `)

            const result = await db.query(`INSERT INTO order_material(material_id,maid_id,quantity,unit_price,is_stock,order_date)
            VALUES(${escape(insertId)},
            ${escape(maid_id)},
            ${escape(countInsert)},
            ${escape(unitPriceInsert)},
            ${escape(typeInsert)},
            ${escape(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)}
            )
             `);
            res.status(200).send(result) 
        }
        
           
        res.status(200)
    } catch (error) {
        console.log(error); 
        res.sendStatus(500)
    }
})
module.exports = router