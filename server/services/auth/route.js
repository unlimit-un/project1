const router = require('express').Router();

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