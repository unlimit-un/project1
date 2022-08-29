const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getLeaveBarChart', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT COUNT(l.maid_id) AS count_maid, COUNT(l.engineer_id) AS count_en  FROM ${"`leave`"} AS l
            LEFT JOIN maid AS m ON m.maid_id = l.maid_id
            LEFT JOIN engineer AS e ON e.engineer_id = l.engineer_id
            LEFT JOIN location ON m.location_id = location.location_id OR e.location_id = location.location_id
            LEFT JOIN manager AS ma ON ma.manager_id = location.manager_id
            WHERE ma.manager_id = ${escape(req.query['manager_id'])} AND MONTH(l.time_reg) = ${escape(req.query['month_number'])} AND YEAR(l.time_reg) = YEAR(CURRENT_DATE)
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})

router.get('/getLeaveRoleMaidBarChart', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT lt.leave_type_id, lt.leave_type_name, IFNULL(leave_count.count_maid,0) AS count_maid FROM leave_type AS lt
            LEFT JOIN (
                SELECT COUNT(l.maid_id) AS count_maid, leave_type_id  FROM ${"`leave`"} AS l
                LEFT JOIN maid AS m ON m.maid_id = l.maid_id
                LEFT JOIN engineer AS e ON e.engineer_id = l.engineer_id
                LEFT JOIN location ON m.location_id = location.location_id OR e.location_id = location.location_id
                LEFT JOIN manager AS ma ON ma.manager_id = location.manager_id
                WHERE ma.manager_id = ${escape(req.query['manager_id'])} AND MONTH(l.time_reg) = ${escape(req.query['month_number'])} AND YEAR(l.time_reg) = YEAR(CURRENT_DATE)
                GROUP BY  leave_type_id
            ) AS leave_count ON lt.leave_type_id = leave_count.leave_type_id
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})

router.get('/getLeaveRoleEngineerBarChart', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT lt.leave_type_id, lt.leave_type_name, IFNULL(leave_count.count_en,0) AS count_en FROM leave_type AS lt
            LEFT JOIN (
                SELECT COUNT(l.engineer_id) AS count_en, leave_type_id  FROM ${"`leave`"} AS l
                LEFT JOIN maid AS m ON m.maid_id = l.maid_id
                LEFT JOIN engineer AS e ON e.engineer_id = l.engineer_id
                LEFT JOIN location ON m.location_id = location.location_id OR e.location_id = location.location_id
                LEFT JOIN manager AS ma ON ma.manager_id = location.manager_id
                WHERE ma.manager_id = ${escape(req.query['manager_id'])} AND MONTH(l.time_reg) = ${escape(req.query['month_number'])} AND YEAR(l.time_reg) = YEAR(CURRENT_DATE)
                GROUP BY  leave_type_id
            ) AS leave_count ON lt.leave_type_id = leave_count.leave_type_id
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

})

router.get('/getLeaveByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT l.*, 
                IF(l.engineer_id IS NOT NULL, CONCAT(e.engineer_code, "-", e.engineer_name), CONCAT(m.maid_code, "-", m.maid_name)) AS requester,
                lt.leave_type_name
            FROM ${"`leave`"} AS l
            LEFT JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
            LEFT JOIN maid AS m ON m.maid_id = l.maid_id
            LEFT JOIN engineer AS e ON e.engineer_id = l.engineer_id
            LEFT JOIN location AS lo ON lo.location_id = e.location_id OR lo.location_id = m.location_id
            WHERE lo.manager_id =${escape(req.query["manager_id"])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getLeaveById', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT l.*, 
                IF(l.engineer_id IS NOT NULL, CONCAT(e.engineer_code, "-", e.engineer_name), CONCAT(m.maid_code, "-", m.maid_name)) AS requester,
                lt.leave_type_name,
			IF(l.status = 0, "รอดำเนินการ",
				IF(l.status = 1, "อนุมัติ", "ไม่อนุมัติ")
			) AS note
            FROM ${"`leave`"} AS l
            LEFT JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
            LEFT JOIN maid AS m ON m.maid_id = l.maid_id
            LEFT JOIN engineer AS e ON e.engineer_id = l.engineer_id
            WHERE l.leave_id =${escape(req.query["leave_id"])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getLeaveByManagerIdStatusWaiting', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT l.*, 
                IF(l.engineer_id IS NOT NULL, CONCAT(e.engineer_code, "-", e.engineer_name), CONCAT(m.maid_code, "-", m.maid_name)) AS requester,
                lt.leave_type_name
            FROM ${"`leave`"} AS l
            LEFT JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
            LEFT JOIN maid AS m ON m.maid_id = l.maid_id
            LEFT JOIN engineer AS e ON e.engineer_id = l.engineer_id
            LEFT JOIN location AS lo ON lo.location_id = e.location_id OR lo.location_id = m.location_id
            WHERE lo.manager_id =${escape(req.query["manager_id"])} AND l.status = 0
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getLeaveByManagerIdStatusConsidered', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT l.*, 
                IF(l.engineer_id IS NOT NULL, CONCAT(e.engineer_code, "-", e.engineer_name), CONCAT(m.maid_code, "-", m.maid_name)) AS requester,
                lt.leave_type_name
            FROM ${"`leave`"} AS l
            LEFT JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
            LEFT JOIN maid AS m ON m.maid_id = l.maid_id
            LEFT JOIN engineer AS e ON e.engineer_id = l.engineer_id
            LEFT JOIN location AS lo ON lo.location_id = e.location_id OR lo.location_id = m.location_id
            WHERE lo.manager_id =${escape(req.query["manager_id"])} AND l.status <> 0
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getTotalLeaveByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT 
                COUNT(l.leave_id) AS count
            FROM ${"`leave`"} AS l
            LEFT JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
            LEFT JOIN maid AS m ON m.maid_id = l.maid_id
            LEFT JOIN engineer AS e ON e.engineer_id = l.engineer_id
            LEFT JOIN location AS lo ON lo.location_id = e.location_id OR lo.location_id = m.location_id
            WHERE lo.manager_id = ${escape(req.query["manager_id"])}
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/getTotalLeaveByManagerIdGroupByType', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT 
                COUNT(l.leave_id) AS count,
                IF(l.status > 0, "positive",
                    IF(l.status < 0, "negative", "bal")
                ) AS type
            FROM ${"`leave`"} AS l
            LEFT JOIN leave_type AS lt ON lt.leave_type_id = l.leave_type_id
            LEFT JOIN maid AS m ON m.maid_id = l.maid_id
            LEFT JOIN engineer AS e ON e.engineer_id = l.engineer_id
            LEFT JOIN location AS lo ON lo.location_id = e.location_id OR lo.location_id = m.location_id
            WHERE lo.manager_id =${escape(req.query["manager_id"])}
            GROUP BY type
            ORDER BY type
        `);
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.post('/updateLeaveToConsidered', async (req, res)=>{
    try {

        const {leave_id, status} = req.body
        //true conditions
        if (!(leave_id && status)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        if (status <= -2 || status >= 2) {
            res.status(400).send('ข้อมูลไม่ถูกต้อง');
            return false;
        }

        let sql = '';
        if (status === 1) {
            const {leave_code} = req.body
            if (!(leave_code)){
                res.status(400).send('ข้อมูลไม่ครบ');
                return false;
            }
            
            sql = ` UPDATE ${"`leave`"}
            SET 
                status = ${escape(status)},
                leave_code = ${escape(leave_code)}
            WHERE
                leave_id = ${escape(leave_id)}
                `
        }else if(status === -1 || status === 0){
            sql = ` UPDATE ${"`leave`"}
            SET 
                status = ${escape(status)}
            WHERE
                leave_id = ${escape(leave_id)}
                `
        }else {
            res.sendStatus(500)
        }
        const result = await db.query(sql);

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



router.post('/updateLeave', async (req, res)=>{
    try {

        const {leave_id, status, leave_code, leave_type_id, title, description, date_start, date_end} = req.body
        
        
        //true conditions
        if (!(leave_id && status && leave_code && leave_type_id && title && description && date_start && date_end)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        if (status <= -2 || status >= 2) {
            res.status(400).send('ข้อมูลไม่ถูกต้อง');
            return false;
        }
        
        const result = await db.query(`
            UPDATE
                ${"`leave`"}
            SET
                leave_code = ${escape(leave_code)},
                status = ${escape(status)},
                leave_type_id = ${escape(leave_type_id)},
                title = ${escape(title)},
                description = ${escape(description)},
                date_start = ${escape(date_start)},
                date_end = ${escape(date_end)}
            WHERE
                leave_id = ${escape(leave_id)}
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

router.post('/deleteLeave', async (req, res)=>{
    try {

        const {leave_id} = req.body

        //true conditions
        if (!(leave_id )) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        const result = await db.query(`
           DELETE FROM ${"`leave`"} WHERE leave_id = ${escape(leave_id)}
        `);

        res.status(200).send(result)
        // res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})




module.exports = router