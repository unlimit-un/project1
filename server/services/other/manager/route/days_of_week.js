const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getDaysOfWeek', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT * FROM date_week
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router