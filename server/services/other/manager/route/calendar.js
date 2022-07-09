const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.post('/create_full_calendar', async (req, res)=>{
    const {title, start, end} = req.body
    try {
       console.log(req.body);
       const result = await db.query(`
       INSERT INTO test_calendar(calendar_title, date_start, date_end)
       VALUES(${escape(title)}, ${escape(start)}, ${escape(end)})
       `)
       if (result) {
        res.send('success')
       }
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/full_calendar', async (req, res)=>{
    
    try {
       const result = await db.query(`
            SELECT * FROM test_calendar
      `)
       if (result) {
        res.send(result)
       }
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

module.exports = router