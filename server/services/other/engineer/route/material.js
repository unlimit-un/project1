const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getMatterialData', async (req, res)=>{
    try {
        const result = await db.query(`
        SELECT material_id, material_name, material_quantity, import_date 
        FROM material = ${escape(req.query['material_id'])}
        `);
        
        if (result.length > 0) {
            res.status(200).send(result)
        }else{
            res.sendStatus(500)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})