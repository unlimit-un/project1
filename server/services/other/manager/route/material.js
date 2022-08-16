const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getMaterialByManagerId', async(req, res)=>{
    try{

        const result = await db.query(`
            SELECT * FROM material
            WHERE manager_id = ${escape(req.query['manager_id'])}
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