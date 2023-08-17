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
                message: 'registerFailed',
                data: null
            })
            return res.end()
        }
        return res.json({
            status: rs.status,
            code: rs.code,
            message: rs.msg,
            data: rs.data
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
            if(rs['code'] != 200 && rs['status'] == 0){
                return res.status(rs.code).json({
                    status: 0,
                    code: rs.code,
                    message: rs.msg,
                    data: rs.data
                }).end()
            }
            return res.json({
                status: 1,
                code: 200,
                message: 'ok',
                data: {
                    user: {
                        id: rs.data.id,
                        employeeId: rs.data.employeeId,
                        username: rs.data.username,
                        email: rs.data.email,
                        roleId: rs.data.roleId,
                        status: rs.data.status,
                        accessToken: rs.data.token,
                        refreshToken: rs.data.tokenRefresh,
                        createdTime: Math.round((new Date).getTime()/1000),
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
    },

    refreshToken: async (req, res) => {
        const body = req.body;

        const rs = await authServices.refreshToken(body);
        if(rs.code != 200) {
            res.status(Number(rs.code)).json({
                status: 0,
                code: rs.code,
                message: rs.msg,
                data: null
            })
            return
        }
        else {
            if(rs.status != 1) {
                res.status(200).json({
                    status: 0,
                    code: 200,
                    message: rs.msg,
                    data: null
                })
                return
            }
            else {
                res.status(200).json({
                    status: rs.status,
                    code: rs.code,
                    message: rs.msg,
                    data: {
                        user: {
                            id: rs.data.id,
                            employeeId: rs.data.employeeId,
                            username: rs.data.username,
                            email: rs.data.email,
                            roleId: rs.data.roleId,
                            status: rs.data.status,
                            accessToken: rs.data.token,
                            refreshToken: rs.data.tokenRefresh,
                            createdTime: Math.round((new Date).getTime()/1000),
                            expiresIn: parseInt(configs.jwt.ttl),
                        }
                    }
                })
                return
            }
        }
    },

    listUser: async (req, res) => {
        const criteria = {};
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        for (const [key, value] of Object.entries(req.query)) {
            if(key != 'page' && key != 'limit') {
                if(key == 'id') {
                    criteria[key] = Number(value);
                }
                else {
                    criteria[key] = value;
                }
            }
        }

        const data = await authServices.listUser(criteria, page, limit);
        const response = {
            status: data.status,
            code: data.code,
            message: data.msg,
            data: data.data ?? []
        }

        return res.json(response)
    }
}