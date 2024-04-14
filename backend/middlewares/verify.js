import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
    const access_token = req.cookies.access_token;
    if(!access_token){
        res.status(401).json({message:'access denied'});
        return next();
    }
    jwt.verify(access_token, process.env.SECRET_TOKEN_KEY, (err, user) => {
        if(err){
            res.status(401).json({message:'access denied'});
            return next();
        }
        // req.user = user;
        return next();
    })
}