
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
            ORDER BY om.status
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getOrderMaterialByManagerIdStatusWaiting', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT om.*,
                ma.material_name,
                IF(om.engineer_id IS NOT NULL, CONCAT(e.engineer_code, "-", e.engineer_name), CONCAT(m.maid_code, "-", m.maid_name)) AS requester
            FROM order_material AS om
            LEFT JOIN material AS ma ON ma.material_id = om.material_id
            LEFT JOIN engineer AS e ON e.engineer_id = om.engineer_id
            LEFT JOIN maid AS m ON m.maid_id = om.maid_id
            WHERE ma.manager_id = ${escape(req.query['manager_id'])} AND om.status = 0
            ORDER BY om.status
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getOrderMaterialByManagerIdStatusConsidered', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT om.*,
                ma.material_name,
                IF(om.engineer_id IS NOT NULL, CONCAT(e.engineer_code, "-", e.engineer_name), CONCAT(m.maid_code, "-", m.maid_name)) AS requester
            FROM order_material AS om
            LEFT JOIN material AS ma ON ma.material_id = om.material_id
            LEFT JOIN engineer AS e ON e.engineer_id = om.engineer_id
            LEFT JOIN maid AS m ON m.maid_id = om.maid_id
            WHERE ma.manager_id = ${escape(req.query['manager_id'])} AND om.status <> 0
            ORDER BY om.status
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
                IF(om.status > 0, "positive",
                    IF(om.status < 0, "negative", "bal")
                ) AS type
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

router.post('/updateOrderMaterialToConsidered', async (req, res)=>{
    try {

        const {order_id, status, is_stock} = req.body
        console.log({order_id, status, is_stock});
        //true conditions
        if (!(order_id && status && is_stock)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        if (status <= -2 || status >= 2) {
            res.status(400).send('ข้อมูลไม่ถูกต้อง');
            return false;
        }

        let sql = '';
        if (status === 1) {
            const {order_code} = req.body
            if (!(order_code)){
                res.status(400).send('ข้อมูลไม่ครบ order_code');
                return false;
            }

            if(+is_stock === 0){
                const {material_code} = req.body
                if (!(material_code)){
                    res.status(400).send('ข้อมูลไม่ครบ material_code');
                    return false;
                }
                const date = new Date ();
                const current_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
                const [{material_id}] = await db.query(`SELECT material_id FROM order_material WHERE order_id = ${escape(order_id)}`)
                await db.query(`
                    UPDATE
                        material
                    SET
                        import_date = ${escape(current_date)},
                        material_code = ${escape(material_code)}
                    WHERE
                        material_id = ${escape(material_id)}
                `);
            } 
            
            sql = ` UPDATE order_material
            SET 
                status = ${escape(status)},
                order_code = ${escape(order_code)}
            WHERE
                order_id = ${escape(order_id)}
                `

            
        }else if(status === -1 || status === 0){
            sql = ` UPDATE order_material
            SET 
                status = ${escape(status)}
            WHERE
                order_id = ${escape(order_id)}
                `
        }else {
            res.sendStatus(500)
        }
        const result = await db.query(sql);

        res.status(200).send(result)
        // res.sendStatus(200)
    } catch (error) {
        console.log(error);
        if (error.sqlMessage.includes('Duplicate entry ')) {
            res.status(500).send(error.sqlMessage.substr(0, 25))
            return false
        }
        res.sendStatus(500)
    }
})

module.exports = router