const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getNotifyRepairPieChart', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT IFNULL(SUM(count),0) AS count, "positive" AS note FROM (
                SELECT
                    COUNT(*) AS count
                FROM
                    notify_repair AS nr
                    INNER JOIN location AS l ON l.location_id = nr.location_id 
                WHERE
                    l.manager_id = ${escape(req.query['user_id'])} AND status > 0
                GROUP BY status 
            ) AS positive
            UNION ALL 
            SELECT IFNULL(SUM(count),0), "negative" FROM(
                SELECT
                    COUNT(*) AS count
                FROM
                    notify_repair AS nr
                    INNER JOIN location AS l ON l.location_id = nr.location_id 
                WHERE
                    l.manager_id = ${escape(req.query['user_id'])} AND status < 0
                GROUP BY status 
            ) AS negative
            UNION ALL
            SELECT IFNULL(IFNULL(SUM(count),0),0), "bal" FROM(
                SELECT
                    COUNT(*) AS count
                FROM
                    notify_repair AS nr
                    INNER JOIN location AS l ON l.location_id = nr.location_id 
                WHERE
                    l.manager_id = ${escape(req.query['user_id'])} AND status = 0
                GROUP BY status 
            ) AS bal
        
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

router.get('/getTotalNotifyRepairByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT IFNULL(COUNT(nr.notify_repair_id), 0) AS count_notify FROM notify_repair AS nr
            INNER JOIN location AS l ON nr.location_id = l.location_id
            WHERE l.manager_id = ${escape(req.query['manager_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getNotifyRepairAndMaterialByNotifyRepairId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT
                IF(nr.maid_id IS NOT NULL, m.maid_code, nr.outsider_name) AS reporter,
                l.location_name,
                r.room_name,
                nr.notify_repair_code,
                nr.description,
                nr.notify_repair_date,
                nr.status,
                ma.material_code,
                ma.material_name,
                nrm.material_count,
                IF(nr.status = 0,"รอหัวหน้าดำเนินการ", 
                    IF(nr.status = 1, "อนุมัติ",
                        IF(nr.status = 2,"กำลังดำเนินการซ่อม", 
                            IF(nr.status= 3,"ดำเนินการเสร็จสิ้น", 
                                IF(nr.status = -1,"ปฏิเสธ",
                                    IF(nr.status = -2, "ไม่สามารถดำเนินการได้", "ไม่ต้องการดำเนินการแล้ว")
                                )
                            )	
                        )
                    )
                ) AS note,
                IFNULL(dept.dept_name,"ไม่พบข้อมูล") AS dept_name,
                IFNULL(e.engineer_name,"ไม่พบข้อมูล") AS engineer_name,
                IFNULL(nr.define_date_by_engineer,"ไม่พบข้อมูล") AS define_date_by_engineer,
                IFNULL(nr.finished_date,"ไม่พบข้อมูล") AS finished_date,
                IFNULL(nr.unable_message,"ไม่พบข้อมูล") AS unable_message,
                IFNULL(nr.time_reg,"ไม่พบข้อมูล") AS time_reg,
                IFNULL(nr.update_at,"ไม่พบข้อมูล") AS update_at,
                nr.notify_repair_id
            FROM notify_repair AS nr
            LEFT JOIN notify_repair_material AS nrm ON nr.notify_repair_id = nrm.notify_repair_id
            LEFT JOIN material AS ma ON nrm.material_id = ma.material_id
            LEFT JOIN location AS l ON nr.location_id = l.location_id
            LEFT JOIN room AS r ON nr.room_id = r.room_id
            LEFT JOIN maid AS m ON m.maid_id = nr.maid_id
            LEFT JOIN engineer_department AS dept ON dept.dept_id = nr.engineer_dept_id
            LEFT JOIN engineer AS e ON e.engineer_id = nr.engineer_id
            WHERE nr.notify_repair_id = ${escape(req.query['notify_repair_id'])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getTotalNotifyRepairByManagerIdAndStatus', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT IFNULL(COUNT(nr.notify_repair_id), 0) AS count_notify FROM notify_repair AS nr
            INNER JOIN location AS l ON nr.location_id = l.location_id
            WHERE l.manager_id = ${escape(req.query['manager_id'])} AND nr.status=${req.query['status']}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getNotifyRepairByManagerIdStatusWaiting', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT 
                IF(nr.maid_id IS NOT NULL, m.maid_code, nr.outsider_name) AS reporter,
                l.location_name,
                r.room_name,
                IF(nr.status = 0,"รอหัวหน้าดำเนินการ", 
                        IF(nr.status = 1, "อนุมัติ",
                                IF(nr.status = 2,"กำลังดำเนินการซ่อม", 
                                        IF(nr.status= 3,"ดำเนินการเสร็จสิ้น", 
                                                IF(nr.status = -1,"ปฏิเสธ",
                                                    IF(nr.status = -2, "ไม่สามารถดำเนินการได้", "ไม่ต้องการดำเนินการแล้ว")
                                                )
                                        )	
                                )
                        )
                ) AS note,
                nr.*
            FROM notify_repair AS nr
            LEFT JOIN location AS l ON nr.location_id = l.location_id
            LEFT JOIN maid AS m ON m.maid_id = nr.maid_id
            LEFT JOIN room AS r ON r.room_id = nr.room_id
            WHERE l.manager_id = ${escape(req.query['manager_id'])} AND nr.status = 0
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})


router.get('/getNotifyRepairByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT 
                IF(nr.maid_id IS NOT NULL, m.maid_code, nr.outsider_name) AS reporter,
                l.location_name,
                r.room_name,
                nr.*
            FROM notify_repair AS nr
            LEFT JOIN location AS l ON nr.location_id = l.location_id
            LEFT JOIN maid AS m ON m.maid_id = nr.maid_id
            LEFT JOIN room AS r ON r.room_id = nr.room_id
            WHERE l.manager_id = ${escape(req.query['manager_id'])}
            ORDER BY nr.update_at DESC
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.post('/updateNotifyRepairToAccept', async (req, res)=>{
    try {

        const {material_list, notify_repair_id, notify_repair_code, engineer_dept_id} = req.body
        console.log({material_list, notify_repair_id, notify_repair_code, engineer_dept_id});
        //false conditions
        if (!(material_list.length !== 0 && notify_repair_id && notify_repair_code && engineer_dept_id)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        const result = await db.query(`
            UPDATE notify_repair
            SET 
                status = 1,
                engineer_dept_id = ${escape(engineer_dept_id)},
                notify_repair_code = ${escape(notify_repair_code)}
            WHERE
                notify_repair_id = ${escape(notify_repair_id)}
        `);

        if (result) {
            material_list.forEach(async item=>{
                await db.query(`
                    INSERT INTO notify_repair_material(notify_repair_id, material_id, material_count) 
                    VALUES (
                        ${escape(notify_repair_id)}, 
                        ${escape(item['material_id'])}, 
                        ${escape(item['material_count'])}
                    );
                `);
            })
        }

        res.status(200).send(result)
        // res.sendStatus(200)
    } catch (error) {
        console.log(error);
        if (error.sqlMessage.includes('Duplicate entry ')) {
            res.status(500).send(error.sqlMessage.substr(0, 25))
            return false
        }
        res.sendStatus(500)
    }
})

router.post('/updateNotifyRepairToDeny', async (req, res)=>{
    try {

        const {notify_repair_id} = req.body
        //true conditions
        if (!(notify_repair_id)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        const result = await db.query(`
            UPDATE notify_repair
            SET 
                status = -1
            WHERE
                notify_repair_id = ${escape(notify_repair_id)}
        `);

        res.status(200).send(result)
        // res.sendStatus(200)
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