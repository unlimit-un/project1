const auth_session = (session) =>{
    
    return (req, res, next) =>{
    
        if (session === undefined) {
            res.status(401)
        }else{
            req.auth_session = session
            // console.log(req.mw_session);
        }
        next()
    }

}

module.exports = auth_session
