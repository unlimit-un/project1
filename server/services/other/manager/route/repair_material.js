const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getNotifyRepairMaterialByRepairId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT nrm.*, m.material_code, m.material_name FROM notify_repair_material AS nrm
            LEFT JOIN notify_repair AS nr ON nr.notify_repair_id = nrm.notify_repair_id
            LEFT JOIN material AS m ON m.material_id = nrm.material_id
            WHERE
            nrm.notify_repair_id = ${escape(req.query['notify_repair_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.post('/insertNotifyRepairMaterial', async (req, res)=>{
    try {
        const {notify_repair_id, material_id, material_count} = req.body

        if (!(notify_repair_id && material_id && material_count)) {
            res.status(400).send('data is required!')
        }

        const result = await db.query(`
            INSERT INTO notify_repair_material (notify_repair_id, material_id, material_count)
            VALUES(
                ${escape(notify_repair_id)},
                ${escape(material_id)},
                ${escape(material_count)}
            )
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.post('/deleteNotifyRepairMaterial', async (req, res)=>{
    try {
        const {notify_repair_id, material_id} = req.body

        if (!(notify_repair_id && material_id)) {
            res.status(400).send('data is required!')
        }

        const result = await db.query(`
            DELETE FROM notify_repair_material WHERE material_id= ${escape(material_id)} AND notify_repair_id = ${escape(notify_repair_id)}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = router