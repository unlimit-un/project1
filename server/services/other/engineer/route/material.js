const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getMaterialeData', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT om.order_id, m.material_code, m.material_name, om.quantity, om.unit_price, om.quantity*om.unit_price AS total_price, om.order_date, om.status, 
                IF(status= 0, "waiting", 
                        IF(status= 1, "accept", "deny")
                ) AS note
            FROM order_material AS om
            LEFT JOIN material AS m ON om.material_id = m.material_id
            WHERE om.engineer_id=${escape(req.query['engineer_id'])}
        `);
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getMaterialOfUser', async (req, res)=>{
    try {

        const [{manager_id}] = await db.query(`
            SELECT l.manager_id FROM engineer AS en
            LEFT JOIN location AS l ON en.location_id = l.location_id    
            WHERE en.engineer_id = ${escape(req.query['engineer_id'])}
        `); 

        const result = await db.query(`
            SELECT material_id, material_name, material_code FROM material
            WHERE manager_id = ${escape(manager_id)}
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
            res.status(400).send('data is required!')
        }

        const [{material_id}] = await db.query(`
            SELECT * FROM order_material WHERE order_id = ${escape(order_material_id)}
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

router.post('/insertOrderMaterial', async (req, res)=>{
    try {
        const {typeInsert, materialInsert, countInsert, engineer_id, unitPriceInsert} = req.body

        console.log({typeInsert, materialInsert, countInsert, engineer_id, unitPriceInsert});

        if (!(typeInsert && materialInsert && countInsert && engineer_id && unitPriceInsert)) {
            res.status(400).send('data is required!')
        }

        const date = new Date();
        //check if material is in stock?
        if (typeInsert === '1') {
            //data is in stock (insert normal)
            const result = await db.query(`
                INSERT INTO order_material(material_id, engineer_id, quantity, unit_price, is_stock, order_date)
                VALUES(
                    ${escape(materialInsert)}, 
                    ${escape(engineer_id)}, 
                    ${escape(countInsert)}, 
                    ${escape(unitPriceInsert)},
                    ${escape(typeInsert)},
                    ${escape(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)}
                )
            `);
            res.status(200).send(result)
        }else{
            const [{manager_id}] = await db.query(`
                SELECT l.manager_id FROM engineer AS en
                LEFT JOIN location AS l ON en.location_id = l.location_id    
                WHERE en.engineer_id = ${escape(engineer_id)}
            `);

            const {insertId} = await db.query(`
                INSERT INTO material(material_name, manager_id, engineer_import_id)
                VALUES(
                    ${escape(materialInsert)},
                    ${escape(manager_id)},
                    ${escape(engineer_id)}
                )
            `)

            const result = await db.query(`
                INSERT INTO order_material(material_id, engineer_id, quantity, unit_price, is_stock, order_date)
                VALUES(
                    ${escape(insertId)}, 
                    ${escape(engineer_id)}, 
                    ${escape(countInsert)}, 
                    ${escape(unitPriceInsert)},
                    ${escape(typeInsert)},
                    ${escape(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)}
                )
            `);
            res.status(200).send(result)
        }
        
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = router