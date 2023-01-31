const jwt = require("jsonwebtoken");
const configs = require('../../configs/configs');


const authMiddlewares = {
    verifyToken: async (req, res, next) => {
        try {
            let token = req.header("Authorization");
            token = typeof token !== 'undefined' && token.indexOf('Bearer') >= 0 ? token.split(' ')[1]
                : (typeof req.query.token !== 'undefined' ? req.query.token : false);

            if (!token) return next(res.status(208).json({
                status: 0,
                code: 208,
                message: "Not Authorization"
            }))

            try {
                const decoded = jwt.verify(token, configs.jwt.secret);
                req.user = decoded;
                req.token = token;
                next();
            } catch (e) {
                next(res.status(208).json({
                    status: 0,
                    code: 208,
                    message: 'Invalid token'
                }))
            }
    
        } catch (error) {
            next(res.status(208).json({
                status: 0,
                code: 208,
                message: 'Error Authorization'
            }));
        }
    },
}


module.exports = authMiddlewares;