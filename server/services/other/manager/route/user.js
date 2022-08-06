const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getUserData', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT manager_id, manager_name, manager_surname, manager_tel, manager_email, manager_img 
            FROM manager
            WHERE manager_id = ${escape(req.query['user_id'])}
        `);
        res.sendFile(`/${result[0]['manager_img']}`, {root: 'public'})
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getImageOfUser', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT manager_img 
            FROM manager
            WHERE manager_id = ${escape(req.query['user_id'])}
        `);
        res.status(200).sendFile(`/${result[0]['manager_img']}`, {root: 'public'})
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router