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
                IF(l.status >= 0, "positive","negative") AS type
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

module.exports = router