const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
const db =  require('../models');
const redis = require('redis');
const client = redis.createClient(6379);
const listVlanRedisKey = 'list:vlan';
const listServerRedisKey = 'list:server';


const productServices = {
    getList: async (criteria, page, limit) => {
        let data = null;
        let total = 0;
        let log = {
            code: 204,
            status: 0,
            data: null,
            total: null,
        }
        try {
            if (criteria) {
                if(Object.keys(criteria).length > 2) {
                    let newCriteria = {};
                    for (const [key, value] of Object.entries(criteria)) {
                        if(key != 'keyword') {
                            newCriteria[key] = value
                        }
                    }
                    data = await coreModels.hosting.findAll({
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
                                newCriteria
                            ]   
                        }
                    });
                    total = data.length ?? 0;
                }
                else {
                    if(criteria.keyword) {
                        data = await coreModels.hosting.findAll({
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
                        total = data.length ?? 0;
                    }
                    else {
                        data = await coreModels.hosting.findAll(
                            {where: criteria}
                        );
                        total = data.length ?? 0;
                    }
                }
            }
            else {
                data = await coreModels.hosting.findAll();
                total = await coreModels.hosting.count()
            }
            log.code = 200;
            log.status = 1;
            log.data = data;
            log.total = total;
            
        } catch (error) {
            return log;
        }

        return log;
    },
    createHosting: async (body) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            const data = await coreModels.hosting.create({
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
                status: body.status,
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
            code: 204,
            msg: 'error'
        };
        if(hostingId) {
            try {
                const data = await coreModels.hosting.destroy({
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
            code: 204,
            msg: 'error'
        };
        try {
            const data = await coreModels.hosting.update(
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
                    status: body.status,
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
                data = await coreModels.vlan.findAll({
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
            else if (criteria.server || criteria.id || criteria.status) {
                data = await coreModels.vlan.findAll({
                    where: criteria
                });
            }
        }
        else if (Object.keys(criteria).length == 2) {
            if(criteria.keyword && criteria.server) {
                data = await coreModels.vlan.findAll({
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
                                server: `${Number(criteria.server)}`
                            }
                        ]   
                    }
                })
            }
            else if (criteria.keyword && criteria.status) {
                data = await coreModels.vlan.findAll({
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
                                status: `${Number(criteria.status)}`
                            }
                        ]   
                    }
                })
            }
            else if (criteria.server && criteria.status) {
                data = await coreModels.vlan.findAll({
                    where: {
                        [Op.and]: [
                            {
                                server: `${Number(criteria.server)}`
                            },
                            {
                                status: `${Number(criteria.status)}`
                            }
                        ]   
                    }
                })
            }
        }
        else if (Object.keys(criteria).length == 3) {
            data = await coreModels.vlan.findAll({
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
                            server: `${Number(criteria.server)}`
                        },
                        {
                            status: `${Number(criteria.status)}`
                        }
                    ]   
                }
            })
        }
        else {
            const myPromise = new Promise((resolve, reject) => {
                client.get(listVlanRedisKey, async (err, vlan) => {
                    if(vlan != {} && vlan != null && vlan != undefined) {
                        resolve(JSON.parse(vlan));
                    }
                    else if(vlan == null || vlan == undefined || vlan == {} || vlan == []){
                        data = await coreModels.vlan.findAll({});
                        client.setex(listVlanRedisKey, 3600, JSON.stringify(data));
                        resolve(data);
                    }
                    else {
                        reject(false)
                    }
                })
            });
            return await myPromise
        }
        return data;
    },
    updateVlan: async (body, vlanId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.vlan.update(
                {
                    vlanName: body.vlanName,
                    status: body.status,
                    vlanInfor: body.vlanInfor,
                    server: body.server,
                    updatedAt: new Date()
                },
                {
                    where: {id: vlanId}
                }
            )
            if(data) {
                data = await coreModels.vlan.findAll({});
                client.setex(listVlanRedisKey, 3600, JSON.stringify(data));
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
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.vlan.create({
                vlanName: body.vlanName,
                status: body.status,
                vlanInfor: body.vlanInfor,
                status: body.status,
                server: body.server
            })
            if(data) {
                data = await coreModels.vlan.findAll({});
                client.setex(listVlanRedisKey, 3600, JSON.stringify(data));
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
            code: 204,
            msg: 'error'
        };
        if(vlanId) {
            try {
                let data = await coreModels.vlan.destroy({
                    where: {
                        id: vlanId
                    }
                })
                if(data) {
                    data = await coreModels.vlan.findAll({});
                    client.setex(listVlanRedisKey, 3600, JSON.stringify(data));
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
                return data = await coreModels.server.findAll({
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
                return data = await coreModels.server.findAll({
                    where: criteria 
                })
            }
        }
        else if (Object.keys(criteria).length == 2) {
            data = await coreModels.server.findAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: {
                                serverName: {
                                    [Op.like]: `%${criteria.keyword}%`
                                },
                                serverInfor: {
                                    [Op.like]: `%${criteria.keyword}%`
                                }
                            }
                        },
                        {
                            status: `${Number(criteria.status)}`
                        }
                    ]   
                }
            })
            return await data
        }
        else if (Object.keys(criteria).length == 0) {
            const myPromise = new Promise((resolve, reject) => {
                client.get(listServerRedisKey, async (err, server) => {
                    if(server != {} && server != null && server != undefined) {
                        resolve(JSON.parse(server));
                    }
                    else if (server == null || server == undefined || server == {} || server == []) {
                        data = await coreModels.server.findAll({});
                        client.setex(listServerRedisKey, 3600, JSON.stringify(data));
                        resolve(data);
                    }
                    else {
                        reject(false)
                    }
                })
            });
            return await myPromise
        }
        else {
            data = null;
        }
        return await data;
    },
    deleteServer: async(serverId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        if(serverId) {
            try {
                let data = await coreModels.server.destroy({
                    where: {
                        id: serverId
                    }
                })
                if(data) {
                    data = await coreModels.server.findAll({});
                    client.setex(listServerRedisKey, 3600, JSON.stringify(data));
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
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.server.update(
                {
                    serverName: body.serverName,
                    status: body.status,
                    serverInfor: body.serverInfor,
                    updatedAt: new Date()
                },
                {
                    where: {id: serverId}
                }
            )
            if(data) {
                data = await coreModels.server.findAll({});
                client.setex(listServerRedisKey, 3600, JSON.stringify(data));
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
            code: 204,
            msg: 'error'
        };
        try {
            let data = await coreModels.server.create({
                serverName: body.serverName,
                status: body.status,
                serverInfor: body.serverInfor,
                status: body.status
            })
            if(data) {
                data = await coreModels.server.findAll({});
                client.setex(listServerRedisKey, 3600, JSON.stringify(data));
                log.code = 200;
                log.msg = 'success';
            }
            return log
        } catch (error) {
            console.log(error);
            return log
        }
    },
    //port
    getListPort: async (criteria) => {
        let data;
        if (Object.keys(criteria).length == 1) {
            if(criteria.keyword) {
                data = await db.sequelize.query(`select * from port a where a.port like '%${criteria.keyword}%' OR a.ipAddress like '%${criteria.keyword}%' OR a.description like '%${criteria.keyword}%'`, {
                    model: coreModels.port
                });
            }
            else {
                data = await coreModels.port.findAll({
                    where: criteria 
                })
            }
        }
        else if (Object.keys(criteria).length == 2) {
            if(criteria.keyword && criteria.status) {
                data = await db.sequelize.query(`select * from port a where (a.port like '%${criteria.keyword}%' OR a.ipAddress like '%${criteria.keyword}%' OR a.description like '%${criteria.keyword}%') and 
                    a.status = ${Number(criteria.status)};`, {
                    model: coreModels.port
                });
            }
            else if (criteria.keyword && criteria.server) {
                data = await db.sequelize.query(`select * from port a where (a.port like '%${criteria.keyword}%' OR a.ipAddress like '%${criteria.keyword}%' OR a.description like '%${criteria.keyword}%') and 
                    a.server = ${Number(criteria.server)};`, {
                    model: coreModels.port
                });
            }
            else if (criteria.server && criteria.status) {
                data = await db.sequelize.query(`select * from port a where a.status = ${Number(criteria.status)} and 
                    a.server = ${Number(criteria.server)};`, {
                    model: coreModels.port
                });
            }
        }
        else if (Object.keys(criteria).length == 0) {
            data = await db.sequelize.query('select * from port', {
                model: coreModels.port
            });
        }
        else if (Object.keys(criteria).length == 3) {
            data = await db.sequelize.query(`select * from port a where a.status = ${Number(criteria.status)} and 
                a.server = ${Number(criteria.server)} and
                (a.port like '%${criteria.keyword}%' OR a.ipAddress like '%${criteria.keyword}%' OR a.description like '%${criteria.keyword}%');`, {
                model: coreModels.port
            });
        }
        else {
            data = null;
        }
        return await data;
    },
    deletePort: async(portId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        if(portId) {
            try {
                const data = await coreModels.port.destroy({
                    where: {
                        id: portId
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
    updatePort: async (body, portId) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            const data = await coreModels.port.update(
                {
                    port: body.port,
                    status: body.status,
                    ipAddress: body.ipAddress,
                    description: body.description,
                    server: body.server,
                    updatedAt: new Date()
                },
                {
                    where: {id: portId}
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
    createPort: async (body) => {
        let log = {
            code: 204,
            msg: 'error'
        };
        try {
            const data = await coreModels.port.create({
                port: body.port,
                status: body.status,
                ipAddress: body.ipAddress,
                description: body.description,
                status: body.status,
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

}

module.exports = productServices
