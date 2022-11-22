const authServices = require('./../services/authServices');
const configs = require('../../configs/configs')

module.exports = {
    register: async (req, res) => {
        const body = req.body;
        const rs = await authServices.register(body);
        if (!rs) {
            res.status(400).json({
                status: 0,
                code: 400,
                message: 'registerFailed'
            })
            return res.end()
        }
        if(rs.code == 200 && rs.status == 0) {
            return res.json({
                status: 0,
                code: 200,
                message: 'Username already exist',
                data: {}
            }).end()
        }
        return res.json({
            status: 1,
            code: 200,
            message: 'ok',
            data: {}
        }).end()
    },
    login: async (req, res) => {
        
        const rs = await authServices.login(req.body);
        if (rs['code'] == 400) {
            res.status(400).json({
                status: 0,
                code: 400,
                message: `can't connect`
            })
            return res.end()
        }
        else{
            if(rs['code'] == 200 && rs['status'] == 0){
                return res.status(200).json({
                    status: 0,
                    code: 200,
                    message: `wrong username or password`
                }).end()
            }
            return res.json({
                status: 1,
                code: 200,
                message: 'ok',
                data: {
                    user: {
                        id: rs.data.id,
                        username: rs.data.username,
                        email: rs.data.email,
                        roleId: rs.data.roleId,
                        status: rs.data.status,
                        createdTime: (new Date).getTime(),
                        expiresIn: parseInt(configs.jwt.ttl),
                    }
                }
            }).end()
        }
        
    },
    changePassword: async (req, res) => {
        const rs = await authServices.changePassword(req.body);
        if (rs.code == 400) {
            res.status(400).json({
                status: 0,
                code: 400,
                message: 'failed connect'
            })
            return res.end()
        }
        else {
            if(rs.status == 0) {
                res.status(200).json({
                    status: 0,
                    code: 200,
                    message: 'old password wrong'
                })
                return res.end()
            }
            return res.json({
                status: 1,
                code: 200,
                message: 'ok',
                data: {}
            }).end()
        }
    },
    infor: async (req, res) => {
        const userId = req.params.userId;
        const rs = await authServices.infor(userId);
        if (rs.code == 400) {
            res.status(400).json({
                status: 0,
                code: 400,
                message: 'failed connect'
            })
            return res.end()
        }
        else {
            if(rs.status == 0) {
                res.status(200).json({
                    status: 0,
                    code: 200,
                    message: 'user not found'
                })
                return res.end()
            }
            return res.json({
                status: 1,
                code: 200,
                message: 'ok',
                data: rs.data
            }).end()
        }
    }
}