const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getNotifyRepairPieChart', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT
                COUNT(*) AS count,
                nr.status,
                IF(status = 0,"รอหัวหน้าดำเนินการ", 
                    IF(status = 1, "อนุมัติ",
                        IF(status = 2,"กำลังดำเนินการซ่อม", 
                            IF(status= 3,"ดำเนินการเสร็จสิ้น", 
                                IF(status = -1,"ไม่อนุมัติ/ปฏิเสธ",
                                    IF(status = -2, "ไม่สามารถดำเนินการได้", "ไม่ต้องการดำเนินการ")
                                )
                            )	
                        )
                    )
                ) AS note
            FROM
                notify_repair AS nr
                INNER JOIN location AS l ON l.location_id = nr.location_id 
            WHERE
                l.manager_id = ${escape(req.query['user_id'])}
            GROUP BY
                status
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

router.get('/getNotifyRepairBarChart', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT
                    COUNT(*) AS count,
                    nr.status,
                    IF(status = 0,"รอหัวหน้าดำเนินการ", 
                            IF(status = 1, "อนุมัติ",
                                    IF(status = 2,"กำลังดำเนินการซ่อม", 
                                            IF(status= 3,"ดำเนินการเสร็จสิ้น", 
                                                    IF(status = -1,"ปฏิเสธ",
                                                        IF(status = -2, "ไม่สามารถดำเนินการได้", "ไม่ต้องการดำเนินการแล้ว")
                                                    )
                                            )	
                                    )
                            )
                    ) AS note,
                    notify_repair_date
            FROM
                    notify_repair AS nr
                    LEFT JOIN location AS l ON l.location_id = nr.location_id 
            WHERE
                    l.manager_id =  ${escape(req.query['user_id'])} AND MONTH(notify_repair_date) = ${escape(req.query['month_number'])} AND YEAR(notify_repair_date) = YEAR(CURRENT_DATE)
            GROUP BY
                    status
        `);
        
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})

module.exports = router