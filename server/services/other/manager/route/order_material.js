
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

module.exports = router