var jwt = require('jsonwebtoken');

function auth(req,res,next){
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token, 'masai', function(err, decoded) {
            if(decoded){
                // console.log(decoded)
                req.body.userId=decoded.userId;
                next();
            }
        });
    }
}
module.exports={auth};