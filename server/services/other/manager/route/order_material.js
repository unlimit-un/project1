
const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getOrderMaterialTableDashboard', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT m.material_name, unit_price, quantity, om.unit_price * quantity AS total_price, om.order_date FROM order_material AS om
            LEFT JOIN material AS m ON m.material_id = om.material_id
            WHERE m.manager_id = ${escape(req.query['manager_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getOrderMaterialByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT om.*,
                ma.material_name,
                IF(om.engineer_id IS NOT NULL, CONCAT(e.engineer_code, "-", e.engineer_name), CONCAT(m.maid_code, "-", m.maid_name)) AS requester
            FROM order_material AS om
            LEFT JOIN material AS ma ON ma.material_id = om.material_id
            LEFT JOIN engineer AS e ON e.engineer_id = om.engineer_id
            LEFT JOIN maid AS m ON m.maid_id = om.maid_id
            WHERE ma.manager_id = ${escape(req.query['manager_id'])}
            ORDER BY status
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getTotalOrderMaterialByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
        SELECT COUNT(om.order_id) AS count
        FROM order_material AS om
        LEFT JOIN material AS ma ON ma.material_id = om.material_id
        LEFT JOIN engineer AS e ON e.engineer_id = om.engineer_id
        LEFT JOIN maid AS m ON m.maid_id = om.maid_id
        WHERE ma.manager_id = ${escape(req.query['manager_id'])}
            ORDER BY om.status
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})


router.get('/getTotalOrderMaterialByManagerIdGroupByType', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT 
                COUNT(om.order_id) AS count, 
                IF(om.status >= 0, "positive","negative") AS type
            FROM order_material AS om
            LEFT JOIN material AS ma ON ma.material_id = om.material_id
            LEFT JOIN engineer AS e ON e.engineer_id = om.engineer_id
            LEFT JOIN maid AS m ON m.maid_id = om.maid_id
            WHERE ma.manager_id = ${escape(req.query['manager_id'])}
            GROUP BY type
            ORDER BY type
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router