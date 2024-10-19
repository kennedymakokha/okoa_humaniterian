// import jsonwebtoken from 'jsonwebtoken';

// export const authorized = (req, res, next) => {
//     const loginRequired = req.user;
//     if (loginRequired === null) {
//         return res.status(401).json({ message: 'Unauthorized user !' });
//     }
//     next();
// }
// export const authMiddleware = (req, res, next) => {
//     const authorization = req.headers['authorization'];
//     const token = authorization && authorization.split(' ')[1];

//     if (token == null) {
//         return res.status(401).json({ success: false, message: 'Not Authorised !' });
//     }
//     jsonwebtoken.verify(token, 'Bradley', async (err, data) => {
//         if (err) {
//             console.log("AUTHORIZATION ERROR:", err)
//             return res.status(403).json({ success: false, message: 'Not Authorised !' });
//         }
//         req.user = data;
//         next();
//     });

// }

import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler';

export const isAuth = (req, res, next) => {
    const authorization = req.headers['authorization'];
    
    if (authorization) {
        const token = authorization && authorization.split(' ')[1]; // Bearer XXXXXX
     
        jwt.verify(
            token,
            process.env.JWT_KEY || 'somethingsecret',
            (err, decode) => {
                if (err) {
                    return res.status(401).send({ message: 'NOT AUTHORIZED !!!' });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        return res.status(401).send({ message: 'NOT AUTHORIZED !!!' });
    }
};






