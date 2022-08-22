const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

// router.get('/getNotifyRepairAndMaterialByNotifyRepairId', async (req, res)=>{
//     try {
//         const result = await db.query(`
//             SELECT 
//                 IF(nr.maid_id IS NOT NULL, m.maid_code, nr.outsider_name) AS reporter,
//                 l.location_name,
//                 r.room_name,
//                 IF(nr.status = 0,"รอหัวหน้าดำเนินการ", 
//                         IF(nr.status = 1, "อนุมัติ",
//                                 IF(nr.status = 2,"กำลังดำเนินการซ่อม", 
//                                         IF(nr.status= 3,"ดำเนินการเสร็จสิ้น", 
//                                                 IF(nr.status = -1,"ปฏิเสธ",
//                                                     IF(nr.status = -2, "ไม่สามารถดำเนินการได้", "ไม่ต้องการดำเนินการแล้ว")
//                                                 )
//                                         )	
//                                 )
//                         )
//                 ) AS note,
//                 nr.*
//             FROM notify_repair AS nr
//             LEFT JOIN location AS l ON nr.location_id = l.location_id
//             LEFT JOIN maid AS m ON m.maid_id = nr.maid_id
//             LEFT JOIN room AS r ON r.room_id = nr.room_id
//             WHERE l.manager_id = ${escape(req.query['manager_id'])} AND nr.status = 0
//         `);
//         res.status(200).send(result)
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500)
//     }
// })

module.exports = router