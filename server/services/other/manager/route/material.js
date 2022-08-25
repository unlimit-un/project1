const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getMaterialByManagerId', async(req, res)=>{
    try{

        const result = await db.query(`
            SELECT mt.*, 
                IF(m.maid_id IS NOT NULL, CONCAT(m.maid_code, "-", m.maid_name),
                    IF(en.engineer_id IS NOT NULL,CONCAT(en.engineer_code, "-", en.engineer_name), manager_name)
                ) AS importer_name,
                IF(m.maid_id IS NOT NULL, "แม่บ้าน",
                    IF(en.engineer_id IS NOT NULL, "ช่างซ่อม", "หัวหน้างาน")
                ) AS importer_role
            FROM material AS mt
            LEFT JOIN maid AS m ON m.maid_id = mt.maid_import_id
            LEFT JOIN manager AS ma ON ma.manager_id = mt.manager_id
            LEFT JOIN engineer AS en ON en.engineer_id = mt.engineer_import_id
            WHERE mt.manager_id = ${escape(req.query['manager_id'])}
        `);
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getMaterialById', async(req, res)=>{
    try{

        const result = await db.query(`
            SELECT * FROM material
            WHERE material_id = ${escape(req.query['material_id'])}
        `);
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.post('/insertMaterial', async(req, res)=>{
    try{

        const {material_code, material_name, material_quantity, import_date, manager_id} = req.body

        if (!(material_code && material_name && material_quantity && import_date && manager_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }

        const result = await db.query(`
            INSERT INTO material(material_code, material_name, material_quantity, import_date, manager_id) 
            VALUES (
                ${escape(material_code)},
                ${escape(material_name)}, 
                ${escape(material_quantity)}, 
                ${escape(import_date)}, 
                ${escape(manager_id)} 
            );
        `);
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        if (error.sqlMessage.includes('Duplicate entry ')) {
            res.status(500).send(error.sqlMessage.substr(0, 25))
            return false
        }
        res.sendStatus(500)
    }
})

router.post('/deleteMaterial', async(req, res)=>{
    try{

        const {material_id} = req.body

        if (!(material_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }

        const result = await db.query(`
            DELETE FROM material WHERE material_id = ${escape(material_id)}
        `);
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        if (error.sqlMessage.includes('Duplicate entry ')) {
            res.status(500).send(error.sqlMessage.substr(0, 25))
            return false
        }
        res.sendStatus(500)
    }
})

router.post('/updateMaterial', async(req, res)=>{
    try{

        const {material_code, material_name, material_quantity, import_date, material_using, type, material_id, manager_id} = req.body

        if (!(material_code && material_name && material_quantity && import_date && material_using && type && material_id && manager_id)) {
            res.status(400).send('ข้อมูลไม่ครบ')
        }

        let sql = '';

        if (type === 'maid') {
            const { maid_import_id } = req.body
            sql = `
                UPDATE 
                    material 
                SET 
                    material_code = ${escape(material_code)}, 
                    material_name = ${escape(material_name)}, 
                    material_quantity = ${escape(material_quantity)}, 
                    material_using = ${escape(material_using)}, 
                    import_date = ${escape(import_date)}, 
                    manager_id = ${escape(manager_id)},
                    maid_import_id = ${escape(maid_import_id)},
                    engineer_import_id = NULL
                WHERE 
                    material_id = ${escape(material_id)};
            `
        }else if(type === 'engineer'){
            const { engineer_import_id } = req.body
            sql = `
                UPDATE 
                    material 
                SET 
                    material_code = ${escape(material_code)}, 
                    material_name = ${escape(material_name)}, 
                    material_quantity = ${escape(material_quantity)}, 
                    material_using = ${escape(material_using)}, 
                    import_date = ${escape(import_date)}, 
                    manager_id = ${escape(manager_id)},
                    maid_import_id = NULL,
                    engineer_import_id = ${escape(engineer_import_id)} 
                WHERE 
                    material_id = ${escape(material_id)};
            `
        }else{
            //manager
            sql = `
                UPDATE 
                    material 
                SET 
                    material_code = ${escape(material_code)}, 
                    material_name = ${escape(material_name)}, 
                    material_quantity = ${escape(material_quantity)}, 
                    material_using = ${escape(material_using)}, 
                    import_date = ${escape(import_date)}, 
                    manager_id = ${escape(manager_id)},
                    maid_import_id = NULL,
                    engineer_import_id = NULL
                WHERE 
                    material_id = ${escape(material_id)};
            `
        }
        const result = await db.query(sql);
        
        res.status(200).send(result)
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