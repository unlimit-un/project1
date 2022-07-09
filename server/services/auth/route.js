const router = require('express').Router();

const bcrypt = require('bcryptjs');
const { escape } = require('mysql2');

const db = require('../../config/database');

router.post('/register',  async (req, res)=>{
    try {
        const {username, password, name, surname, tel, email, type} = req.body;
        // console.log(username, password, name, surname, tel, email, type);

        if (!(username && password && name && surname && tel && email && type)){
            res.status(400).send('data required');
            return false;
        }

        let userData;

        switch (type) {
            case 'MANAGER':
                userData = await db.query(`SELECT * FROM manager WHERE manager_username = ${escape(username)}`);
                break;
        
            case 'MAID':
                
                userData = await db.query(`SELECT * FROM maid WHERE maid_username = ${escape(username)}`);
                break;
        
            case 'ENGINEER':
                    userData = await db.query(`SELECT * FROM engineer WHERE engineer_username = ${escape(username)}`);
                break;
        
            default:
                res.status(400).send('type not match')
                break;
        }

        
        if (userData.length > 0){
            res.status(400).send('this username has been used');
            return false;
        } 

        const bcryptPassword = await bcrypt.hash(password, 10);

        if (type === 'MANAGER') {
            await db.query(`
            INSERT INTO manager(manager_name, manager_surname, manager_username, manager_password, manager_tel, manager_email) 
            VALUES(
                ${escape(name)}, 
                ${escape(surname)}, 
                ${escape(username)}, 
                ${escape(bcryptPassword)}, 
                ${escape(tel)}, 
                ${escape(email)}
                )
            `);
            res.status(200).send('insert manager success');

        }else if (type === 'MAID') {

            const {location_id} = req.body

            if(!location_id){
                res.status(400).send('data required');
                return false;
            }

            await db.query(`
            INSERT INTO maid(maid_name, maid_surname, maid_username, maid_password, maid_tel, location_id) 
            VALUES(
                ${escape(name)}, 
                ${escape(surname)}, 
                ${escape(username)}, 
                ${escape(bcryptPassword)}, 
                ${escape(tel)}, 
                ${escape(location_id)}
                )
            `);
            res.status(200).send('insert maid success');

        }else if (type === 'ENGINEER') {

            const { location_id, dept_id } = req.body

            if(!(location_id && dept_id)){
                res.status(400).send('data required');
                return false;
            }

            await db.query(`
            INSERT INTO engineer(engineer_name, engineer_surname, engineer_username, engineer_password, engineer_tel, dept_id, location_id) 
            VALUES(
                ${escape(name)}, 
                ${escape(surname)}, 
                ${escape(username)}, 
                ${escape(bcryptPassword)}, 
                ${escape(tel)}, 
                ${escape(dept_id)}, 
                ${escape(location_id)}
                )
            `);
            res.status(200).send('insert engineer success');

        }else{
            res.status(400).send('type not match')
        }
        
    } catch (error) {
        console.log(error);
    }
})

router.get('/checkToken', (req, res)=>{
    
    if (req.user_data) {
        const {user_type, user_id} = JSON.parse(JSON.stringify(req.user_data))
        console.log(req.user_data);
        res.status(200).send({user_type, user_id})
    }else{
        res.status(401)
    }
})
     
router.post('/logout', (req, res)=>{ 
    if (req.user_data) {
        req.user_data = null
    }
    res.sendStatus(200)
})



module.exports = router;