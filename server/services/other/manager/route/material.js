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

module.exports = router