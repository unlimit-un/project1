const router = require('express').Router();
const { escape } = require('mysql2');
const db = require('../../../../config/database');

router.get('/getMaidDutyMaterialByManagerId', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT 
                mdm.*,
                mtr.material_code,
                mtr.material_name,
                mda.maid_duty_assign_code
            FROM maid_duty_material AS mdm
            LEFT JOIN maid_duty_assign AS mda ON mda.maid_duty_assign_id = mdm.maid_duty_assign_id
            LEFT JOIN material AS mtr ON mtr.material_id = mdm.material_id
            WHERE mda.manager_id_assign = ${escape(req.query['manager_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.get('/getMaidDutyMaterialById', async (req, res)=>{
    try {
        const result = await db.query(`
            SELECT 
                mdm.*,
                mtr.material_code,
                mtr.material_name,
                mda.maid_duty_assign_code
            FROM maid_duty_material AS mdm
            LEFT JOIN maid_duty_assign AS mda ON mda.maid_duty_assign_id = mdm.maid_duty_assign_id
            LEFT JOIN material AS mtr ON mtr.material_id = mdm.material_id
            WHERE mdm.maid_duty_material_id = ${escape(req.query['maid_duty_material_id'])}
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

router.post('/insertMaidDutyMaterial', async (req, res)=>{
    try{

        const {material_id, maid_duty_assign_id, material_count} = req.body

        if (!(material_id && maid_duty_assign_id && material_count)) {
            res.status(400).send('ข้อมูลไม่ครบ');
            return false;
        }

        const [{material_quantity: checkCount}] = await db.query(`
            SELECT material_quantity FROM material WHERE material_id = ${material_id}
        `)
        
        if (+checkCount < +material_count) {
            res.status(400).send('ของในคลังไม่เพียงพอ');
            return false
        }
        
        const result = await db.query(`
            INSERT INTO maid_duty_material(maid_duty_assign_id, material_id, material_count) 
            VALUES (
                ${escape(maid_duty_assign_id)}, 
                ${escape(material_id)}, 
                ${escape(material_count)}
            );
        
        `);
     
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
   
})

// router.post('/updateMaidDuty', async (req, res)=>{
//     try{

//         const {maid_id, date_week_id, time_start, time_end, maid_duty_id} = req.body

//         if (!(maid_id && date_week_id && time_start && time_end && maid_duty_id)) {
//             res.status(400).send('ข้อมูลไม่ครบ');
//             return false;
//         }

//         //todo check count in stock first!!
        
//         const result = await db.query(`
//             UPDATE maid_duty_material 
//             SET 
//                 maid_duty_assign_id = maid_duty_assign_id, 
//                 material_id = material_id, 
//                 material_count = material_count
//             WHERE 
//                 maid_duty_material_id = maid_duty_material_id;
//         `);

//         res.status(200).send(result)
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500)
//     }
   
// })

// router.post('/deleteMaidDuty', async (req, res)=>{
//     try{

//         const {maid_duty_id} = req.body

//         if (!(maid_duty_id)) {
//             res.status(400).send('ข้อมูลไม่ครบ');
//             return false;
//         }
        
//         const result = await db.query(`
//             DELETE FROM maid_duty WHERE maid_duty_id = ${escape(maid_duty_id)}
//         `);
     
//         res.status(200).send(result)
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500)
//     }
   
// })

module.exports = router