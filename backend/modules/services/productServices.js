const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");

const productServices = {
    getList: async (criteria, page, limit) => {
        let data = null;
        let total = 0;
        if (criteria) {
            if(Object.keys(criteria).length > 2) {
                data = await coreModels.hosttingProduct.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: {
                                    iPAddress: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    },
                                    hostName: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    }
                                }
                            },
                            {
                                vlanType: {
                                    [Op.like]: `%${Number(criteria.vlanType)}%`
                                }
                            }
                        ]   
                    }
                });
                total = await coreModels.hosttingProduct.count({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: {
                                    iPAddress: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    },
                                    hostName: {
                                        [Op.like]: `%${criteria.keyword}%`
                                    }
                                }
                            },
                            {
                                vlanType: {
                                    [Op.like]: `%${Number(criteria.vlanType)}%`
                                }
                            }
                        ]   
                    }
                })
            }
            else {
                if(criteria.keyword) {
                    data = await coreModels.hosttingProduct.findAll({
                        where: {
                            [Op.or]: {
                                iPAddress: {
                                    [Op.like]: `%${criteria.keyword}%`
                                },
                                hostName: {
                                    [Op.like]: `%${criteria.keyword}%`
                                }
                            }
                        }
                    })
                    total = await coreModels.hosttingProduct.findAll({
                        where: {
                            [Op.or]: {
                                iPAddress: {
                                    [Op.like]: `%${criteria.keyword}%`
                                },
                                hostName: {
                                    [Op.like]: `%${criteria.keyword}%`
                                }
                            }
                        }
                    })
                }
                else {
                    data = await coreModels.hosttingProduct.findAll(
                        {where: criteria}
                    );
                    total = await coreModels.hosttingProduct.count({where: criteria})
                }
            }
        }
        else {
            data = await coreModels.hosttingProduct.findAll();
            total = await coreModels.hosttingProduct.count()
        }
        let response = {
            data: data,
            total: total,
        }
        return await response;
    },
    createHosting: async (body) => {
        let log = {
            code: 400,
            msg: 'error'
        };
        try {
            const data = await coreModels.hosttingProduct.create({
                iPAddress: body.ipaddress,
                iPAddressF5: body.ipaddressf5,
                hostname: body.hostname,
                priority: body.priority,
                env: body.env,
                type: body.type,
                middleware: body.middleware,
                information: body.information,
                machineType: body.machineType,
                os: body.os,
                note: body.note,
                na: body.na,
                vlanType: body.vlanType,
                server: body.server
            })
            if(data) {
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    deleteHosting: async(hostingId) => {
        let log = {
            code: 400,
            msg: 'error'
        };
        if(hostingId) {
            try {
                const data = await coreModels.hosttingProduct.destroy({
                    where: {
                        id: hostingId
                    }
                })
                if(data) {
                    log.code = 200;
                    log.msg = 'success';
                }
                return log
            } catch (error) {
                console.log(error);
                return log;
            }
        }
        return log
    },
    updateHosting: async (body, hostingId) => {
        let log = {
            code: 400,
            msg: 'error'
        };
        try {
            const data = await coreModels.hosttingProduct.update(
                {
                    iPAddress: body.ipaddress,
                    iPAddressF5: body.ipaddressf5,
                    hostname: body.hostname,
                    priority: body.priority,
                    env: body.env,
                    type: body.type,
                    middleware: body.middleware,
                    information: body.information,
                    machineType: body.machineType,
                    os: body.os,
                    note: body.note,
                    na: body.na,
                    vlanType: body.vlanType,
                    server: body.server,
                    updatedAt: new Date()
                },
                {
                    where: {id: hostingId}
                }
            )
            if(data) {
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    getListVlan: async (criteria, page, limit) => {
        let data;
        if(Object.keys(criteria).length == 1){
            if(criteria.keyword) {
                data = await coreModels.vlanInfor.findAll({
                    where: {
                        [Op.or]: {
                            vlanName: {
                                [Op.like]: `%${criteria.keyword}%`
                            },
                            vlanInfor: {
                                [Op.like]: `%${criteria.keyword}%`
                            }
                        }
                    }
                });
            }
            else if (criteria.server || criteria.id) {
                data = await coreModels.vlanInfor.findAll({
                    where: criteria
                });
            }
        }
        else if (Object.keys(criteria).length == 2) {
            data = await coreModels.vlanInfor.findAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: {
                                vlanName: {
                                    [Op.like]: `%${criteria.keyword}%`
                                },
                                vlanInfor: {
                                    [Op.like]: `%${criteria.keyword}%`
                                }
                            }
                        },
                        {
                            server: {
                                [Op.like]: `%${Number(criteria.server)}%`
                            }
                        }
                    ]   
                }
            })
        }
        else {
            data = await coreModels.vlanInfor.findAll({});
        }
        return data;
    },
    updateVlan: async (body, vlanId) => {
        let log = {
            code: 400,
            msg: 'error'
        };
        try {
            const data = await coreModels.vlanInfor.update(
                {
                    vlanName: body.vlanName,
                    vlanInfor: body.vlanInfor,
                    server: body.server,
                    updatedAt: new Date()
                },
                {
                    where: {id: vlanId}
                }
            )
            if(data) {
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    createVlan: async (body) => {
        let log = {
            code: 400,
            msg: 'error'
        };
        try {
            const data = await coreModels.vlanInfor.create({
                vlanName: body.vlanName,
                vlanInfor: body.vlanInfor,
                server: body.server
            })
            if(data) {
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    deleteVlan: async(vlanId) => {
        let log = {
            code: 400,
            msg: 'error'
        };
        if(vlanId) {
            try {
                const data = await coreModels.vlanInfor.destroy({
                    where: {
                        id: vlanId
                    }
                })
                if(data) {
                    log.code = 200;
                    log.msg = 'success';
                }
                return log
            } catch (error) {
                return log;
            }
        }
        return log
    },

    getListServer: async (criteria) => {
        let data;
        if (Object.keys(criteria).length == 1) {
            if(criteria.keyword) {
                data = await coreModels.serverInfor.findAll({
                    where: {
                        [Op.or]: {
                            serverName: {
                                [Op.like]: `%${criteria.keyword}%`
                            },
                            serverInfor: {
                                [Op.like]: `%${criteria.keyword}%`
                            }
                        }
                    }
                });
            }
            else {
                data = await coreModels.serverInfor.findAll({
                    where: criteria 
                })
            }
        }
        else if (Object.keys(criteria).length == 0) {
            data = await coreModels.serverInfor.findAll();
        }
        else {
            data = null;
        }
        
        return await data;
    },
    deleteServer: async(serverId) => {
        let log = {
            code: 400,
            msg: 'error'
        };
        if(serverId) {
            try {
                const data = await coreModels.serverInfor.destroy({
                    where: {
                        id: serverId
                    }
                })
                if(data) {
                    log.code = 200;
                    log.msg = 'success';
                }
                return log
            } catch (error) {
                return log;
            }
        }
        return log
    },
    updateServer: async (body, serverId) => {
        let log = {
            code: 400,
            msg: 'error'
        };
        try {
            const data = await coreModels.serverInfor.update(
                {
                    serverName: body.serverName,
                    serverInfor: body.serverInfor,
                    updatedAt: new Date()
                },
                {
                    where: {id: serverId}
                }
            )
            if(data) {
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    createServer: async (body) => {
        let log = {
            code: 400,
            msg: 'error'
        };
        try {
            const data = await coreModels.serverInfor.create({
                serverName: body.serverName,
                serverInfor: body.serverInfor,
            })
            if(data) {
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
}

module.exports = productServices
