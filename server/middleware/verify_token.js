const jwt = require("jsonwebtoken");

const verifyToken = ( req, res, next )=>{
    const token = req.body.token || req.query.token || req.headers['authorization'];
    if (!token) {
        return res.status(401).send("A token is require for authentication");
    }

    try {
        const [ ,prepareToken] = token.split(' ');
        console.log(prepareToken);
        if (!(jwt.decode(prepareToken).exp < Date.now()/1000)) {
            const decoded = jwt.verify(prepareToken, process.env.TOKEN_KEY);
            req.user_data = decoded
        }else{
            req.user_data = null;
            return res.status(401).send("A token is expried");
            
        }
    } catch (error) {
        console.log(error);
    }

    return next();
}

module.exports = verifyToken;