const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const configs = require('../../configs/configs');
const { QueryTypes } = require('sequelize');
const db =  require('../models');
const UserModel = require('../entities/pf_user');

const authServices = {
    register: async (body) => {
        let log = {
            code: 204,
            status: 0,
            msg: 'error'
        };
        let data;
        let dataUpdate;
        const user = await coreModels.pf_users.findAll({
            where: {
                USERNAME: body.username
            }
        })
        if(user.length > 0) {
            log.code = 201;
            log.msg = 'Username created';
            return log
        }
        let encryptedPassword = await bcrypt.hash(body.password, 10);

        try {
            data = await coreModels.pf_users.create({
                EMPLOYEE_ID: body.employeeId,
                USERNAME: body.username,
                PASSWORD: encryptedPassword,
                EMAIL: body.email,
                ROLE_ID: 3,
                POSITION_ID: 3,
                ALLOW: 1,
                STATUS: 1,
            })
        } catch (error) {
            console.log(error);
            return log;
        }
        let username = body.username;
        try {
            const token = jwt.sign(
                { user_id: data.dataValues.ID, username },
                configs.jwt.secret,
                {
                  expiresIn: Number(configs.jwt.ttl),
                }
            );
            dataUpdate = await coreModels.pf_users.update({
                TOKEN: token,
                UPDATE_AT: new Date()
            },{
                where: {ID: data.dataValues.ID}
            })
        } catch (error) {
            console.log(error);
            return log;
        }
        if(data && dataUpdate) {
            log.code = 200;
            log.msg = 'success';
        }
        log.status = 1;
        return log
    },
    login: async (body) => {
        var tokenUpdate;
        let token;
        let log = {
            code: 204,
            status: 0,
            data: null,
            msg: 'Login error'
        }
        let user = await db.sequelize.query(`select * from pf_users a where a.USERNAME = '${body.username}'`, { type: QueryTypes.SELECT });
        
        if(!user) {
            log.code = 201;
            log.msg = 'User not exits';
            return log;
        }
        if(user.length > 0){
            if (user && (await bcrypt.compare(body.password, user[0].PASSWORD))) {
                try {
                    let username = body.username;
                    let numberRandom = Math.floor(Math.random() * 20);
                    let tokenRefresh = await bcrypt.hash(`${configs.jwt.secret_refresh}${body.username}${numberRandom}`, 10);
                    
                    token = jwt.sign(
                        { user_id: user[0].ID, username },
                        configs.jwt.secret,
                        {
                          expiresIn: Number(configs.jwt.ttl),
                        }
                    );
                    tokenUpdate = await db.sequelize.query(`update pf_users set TOKEN='${String(token)}', TOKEN_REFRESH= '${String(tokenRefresh)}', UPDATE_AT= SYSDATETIME() where ID = '${user[0].ID}'`, { type: QueryTypes.SELECT });

                    user = await db.sequelize.query(`select * from pf_users a where a.USERNAME = '${body.username}'`, { type: QueryTypes.SELECT });

                    user[0].TOKEN = token;
                    user[0].password = null;
                    log.data = new UserModel(user[0]);
                    log.status = 1;
                    log.code = 200;
                    log.msg = 'Login success';
                    console.log(log);
                }
                catch(error) {
                    console.log(error);
                    return log;
                }
            }
            else {
                log.code = 202;
                log.msg = 'Username or password failed';
            }
        }
        return log;
    },
    changePassword: async (body) => {
        console.log(body);
        let checkReturn = {
            code: 400,
            status: 0
        }
        let user = await db.sequelize.query(`select * from pf_users a where a.ID = '${body.id}'`, { type: QueryTypes.SELECT });

        if (user && (await bcrypt.compare(body.oldPassword, user[0].PASSWORD))) {
            try {
                let encryptedPassword = await bcrypt.hash(body.newPassword, 10);
                passwordUpdate = db.sequelize.query(`update pf_users set PASSWORD = '${encryptedPassword}', UPDATE_AT=SYSDATETIME() WHERE ID = ${body.id}`, { type: QueryTypes.SELECT });
            }
            catch(error) {
                console.log(error);
                return checkReturn
            }
            checkReturn.code = 200;
            checkReturn.status = 1;
            return checkReturn;
        }
        else {
            checkReturn.code = 200;
            return checkReturn
        }
    },
    infor: async (userId) => {
        let newUser = null;
        let checkReturn = {
            code: 400,
            status: 0,
            data: {}
        }
        if(userId) {

            let user = await db.sequelize.query(`select * from pf_users a where a.ID = '${userId}'`, { type: QueryTypes.SELECT });
            if(user == [] || user == '' || user == null || user == undefined) {
                checkReturn.code = 200;
                return checkReturn;
            }
            checkReturn.code = 200;
            checkReturn.status = 1;
            if(user[0]) {
                user[0]['PASSWORD'] = null;
                user[0]['ROLE_ID'] = null;
                user[0]['POSITION_ID'] = null;
                newUser = new UserModel(user[0]);
            }
            
            return newUser;
        }
        return newUser
    },

    refreshToken: async (body) => {
        let log = {
            code: 204,
            status: 0,
            msg: 'error',
            data: null
        };

        try {
            let user = await db.sequelize.query(`select * from pf_users a where a.ID = '${body.id}'`, { type: QueryTypes.SELECT });

            if(user && user[0].USERNAME == body.username) {
                if(user[0].TOKEN_REFRESH == body.refreshToken) {
                    let username = body.username;
                    let token = jwt.sign(
                        { user_id: user[0].ID, username },
                        configs.jwt.secret,
                        {
                          expiresIn: Number(configs.jwt.ttl),
                        }
                    );

                    tokenUpdate = await db.sequelize.query(`update pf_users set TOKEN='${String(token)}', UPDATE_AT= SYSDATETIME() where ID = '${user[0].ID}'`, { type: QueryTypes.SELECT });

                    user = await db.sequelize.query(`select * from pf_users a where a.ID = '${body.id}'`, { type: QueryTypes.SELECT });

                    user[0].password = null;
                    log.code = '200';
                    log.status = 1;
                    log.msg = 'Token refresh success';
                    log.data = new UserModel(user[0]);
                }
                else {
                    log.code = '200';
                    log.msg = 'Token refresh not found';
                    return log
                }
            }
            else {
                log.code = '200';
                log.msg = 'User not found';
                
            }
            return log
            
        } catch (err) {
            console.log(err);
            return log;
        }
    }
}



module.exports = authServices