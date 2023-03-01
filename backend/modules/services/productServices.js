const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
const db =  require('../models');
const { QueryTypes } = require('sequelize');

const productServices = {
    getList: async (criteria, page, limit) => {
        let data = null;
        let total = 0;
        let log = {
            code: 204,
            status: 0,
            data: {
                data: null,
                total: null,
            },
            msg: "failed"
        }
        let arrayKeys = Object.keys(criteria);
        let arrayValues = Object.values(criteria);
        let strQuery = '';
        if (arrayKeys.length == arrayValues.length && arrayKeys.length > 0) {
            strQuery = 'where ';
            for(let i = 0; i < arrayKeys.length; i++) {
                if(arrayKeys[i] == 'keyword'){
                    strQuery = strQuery + `(a.iPAddress like '%${arrayValues[i]}%' OR a.hostName like '%${arrayValues[i]}%')`;
                }
                else {
                    strQuery = strQuery + `a.${arrayKeys[i]} = '${arrayValues[i]}'`;
                };
                if(i < (arrayKeys.length - 1)) {
                    strQuery = strQuery + ' and ';
                }
            }
        }
        try {
            data = await db.sequelize.query(`select a.*, b.name as nameServer, c.name as nameVlan, d.port as namePort 
                                        from hosting a 
                                        left join (select name, id from server) b on a.server = b.id 
                                        left join (select name, id from vlan) c on a.vlan = c.id 
                                        left join (select port, id from port) d on a.port = d.id 
                                        ${strQuery} order by createdAt DESC
                                        offset ${Number(limit) * Number(page)} rows
                                        fetch next ${limit} rows only`, { type: QueryTypes.SELECT });
            total = data.length;
            // if (criteria) {
            //     if(Object.keys(criteria).length > 2) {
            //         let newCriteria = {};
            //         for (const [key, value] of Object.entries(criteria)) {
            //             if(key != 'keyword') {
            //                 newCriteria[key] = value
            //             }
            //         }
            //         if('keyword' in criteria) {
            //             data = await coreModels.hosting.findAll({
            //                 where: {
            //                     [Op.and]: [
            //                         {
            //                             [Op.or]: {
            //                                 iPAddress: {
            //                                     [Op.like]: `%${criteria.keyword}%`
            //                                 },
            //                                 hostName: {
            //                                     [Op.like]: `%${criteria.keyword}%`
            //                                 }
            //                             }
            //                         },
            //                         newCriteria
            //                     ]   
            //                 },
            //                 limit: limit,
            //                 offset: Number(limit) * Number(page)
            //             });
            //             total = await coreModels.hosting.count({
            //                 where: {
            //                     [Op.and]: [
            //                         {
            //                             [Op.or]: {
            //                                 iPAddress: {
            //                                     [Op.like]: `%${criteria.keyword}%`
            //                                 },
            //                                 hostName: {
            //                                     [Op.like]: `%${criteria.keyword}%`
            //                                 }
            //                             }
            //                         },
            //                         newCriteria
            //                     ]   
            //                 },
            //             })
            //         }
            //         else {
            //             data = await coreModels.hosting.findAll({
            //                 where: {
            //                     [Op.and]: [
            //                         newCriteria
            //                     ]
            //                 },
            //                 limit: limit,
            //                 offset: Number(limit) * Number(page)
            //             });
            //             total = await coreModels.hosting.count({
            //                 where: {
            //                     [Op.and]: [
            //                         newCriteria
            //                     ]
            //                 },
            //             })
            //         }
            //     }
            //     else {
            //         if(criteria.keyword) {
            //             data = await coreModels.hosting.findAll({
            //                 where: {
            //                     [Op.or]: {
            //                         iPAddress: {
            //                             [Op.like]: `%${criteria.keyword}%`
            //                         },
            //                         hostName: {
            //                             [Op.like]: `%${criteria.keyword}%`
            //                         }
            //                     }
            //                 },
            //                 limit: limit,
            //                 offset: Number(limit) * Number(page)
            //             })
            //             total = await coreModels.hosting.count({
            //                 where: {
            //                     [Op.or]: {
            //                         iPAddress: {
            //                             [Op.like]: `%${criteria.keyword}%`
            //                         },
            //                         hostName: {
            //                             [Op.like]: `%${criteria.keyword}%`
            //                         }
            //                     }
            //                 },
            //             })
            //         }
            //         else {
            //             data = await coreModels.hosting.findAll(
            //                 {
            //                     where: criteria,
            //                     limit: limit,
            //                     offset: Number(limit) * Number(page)
            //                 }
            //             );
            //             total = await coreModels.hosting.count({
            //                 where: criteria,
            //             })
            //         }
            //     }
            // }
            // else {
            //     data = await coreModels.hosting.findAll({
            //         limit: limit,
            //         offset: Number(limit) * Number(page)
            //     });
            //     total = await coreModels.hosting.count();
            // }
            log.code = 200;
            log.status = 1;
            log.msg = "query success";
            log.data.data = data;
            log.data.total = total;

        } catch (error) {
            log.code = 201;
            log.msg = "query failed";
        }
        return log;
    },
    createHosting: async (body) => {
        let log = {
            code: 204,
            msg: 'error',
            status: 0
        };
        try {
            const data = await coreModels.hosting.create({
                iPAddress: body.ipaddress,
                iPAddressF5: body.ipaddressf5,
                hostname: body.hostname,
                port: Number(body.port),
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
                vlan: body.vlan,
                server: body.server
            })
            if(data) {
                log.code = 200;
                log.msg = 'success';
                log.status = 1;
            }
            return log
        } catch (error) {
            console.log(error);
            log.code = 200;
            log.msg = 'query failed';
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
                    port: Number(body.port),
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
                    vlan: body.vlan,
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

    //Vlan
    getListVlan: async (criteria, page, limit) => {
        let data = [];
        let total = 0;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: {
                data: [],
                total: 0
            }
        }
        let arrayKeys = Object.keys(criteria);
        let arrayValues = Object.values(criteria);
        let strQuery = '';
        if (arrayKeys.length == arrayValues.length && arrayKeys.length > 0) {
            strQuery = 'where ';
            for(let i = 0; i < arrayKeys.length; i++) {
                if(arrayKeys[i] == 'keyword'){
                    strQuery = strQuery + `a.name like '%${arrayValues[i]}%'`;
                }
                else {
                    strQuery = strQuery + `a.${arrayKeys[i]} = '${arrayValues[i]}'`;
                };
                if(i < (arrayKeys.length - 1)) {
                    strQuery = strQuery + ' and ';
                }
            }
        }
        try {
            data = await db.sequelize.query(`select a.*, b.name as nameServer 
                                        from vlan a 
                                        left join (select name, id from server) b on a.server = b.id 
                                        ${strQuery} order by createdAt DESC
                                        offset ${Number(limit) * Number(page)} rows
                                        fetch next ${limit} rows only`, { type: QueryTypes.SELECT });
        } catch (error) {
            res.code = '200';
            res.msg = 'Query failed';
            return res
        }
        total =  data.length;

        res.status = 1;
        res.code = 200;
        res.msg = 'success';
        res.data.data = data;
        res.data.total = total;
        return res;
    },
    updateVlan: async (body, vlanId) => {
        let res = {
            code: 204,
            msg: 'error',
            status: 0,
        };
        try {
            let data = await coreModels.vlan.update(
                {
                    name: body.name,
                    status: body.status,
                    description: body.description,
                    server: body.server,
                    updatedAt: new Date()
                },
                {
                    where: {id: vlanId}
                }
            )
            res.code = 200;
            res.msg = 'success';
            res.status = 1;
            return res
        } catch (error) {
            res.code = 200;
            res.msg = 'query failed';
            return res
        }
    },
    createVlan: async (body) => {
        let res = {
            code: 204,
            msg: 'error',
            status: 0,
        };
        try {
            let data = await coreModels.vlan.create({
                name: body.name,
                status: body.status,
                description: body.description,
                status: body.status,
                server: body.server
            })
           
            res.code = 200;
            res.msg = 'success';
            res.status = 1;
            return res
        } catch (error) {
            res.code = 200;
            res.msg = 'query failed'; 
        }
        return res
    },
    deleteVlan: async(vlanId) => {
        let res = {
            code: 204,
            msg: 'error',
            status: 0,
        };
        if(vlanId) {
            try {
                let data = await coreModels.vlan.destroy({
                    where: {
                        id: vlanId
                    }
                })
                res.code = 200;
                res.msg = 'success';
                res.status = 1;
                return res
            } catch (error) {
                res.code = 200;
                res.msg = 'query failed'
                return res;
            }
        }
        return log
    },

    //Server
    getListServer: async (criteria, page, limit) => {
        let data = [];
        let total = 0;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: {
                data: [],
                total: 0
            }
        }
        let arrayKeys = Object.keys(criteria);
        let arrayValues = Object.values(criteria);
        let strQuery = '';
        if (arrayKeys.length == arrayValues.length && arrayKeys.length > 0) {
            strQuery = 'where ';
            for(let i = 0; i < arrayKeys.length; i++) {
                if(arrayKeys[i] == 'keyword'){
                    strQuery = strQuery + `a.name like '%${arrayValues[i]}%'`;
                }
                else {
                    strQuery = strQuery + `a.${arrayKeys[i]} = '${arrayValues[i]}'`;
                };
                if(i < (arrayKeys.length - 1)) {
                    strQuery = strQuery + ' and ';
                }
            }
        }

        try {
            data = await db.sequelize.query(`select * from server a 
                                        ${strQuery} order by createdAt DESC
                                        offset ${Number(limit) * Number(page)} rows
                                        fetch next ${limit} rows only`, { type: QueryTypes.SELECT });
        } catch (error) {
            console.log(error);
            res.code = 200;
            res.data.data = [];
            res.data.total = 0;
            res.msg = 'query failed';
            return res;
        }

        total =  data.length;

        res.data.data = data;
        res.data.total = total;
        res.status = 1;
        res.code = 200;
        res.msg = 'success';

        return res;
    },
    deleteServer: async(serverId) => {
        let res = {
            code: 204,
            msg: 'error',
            status: 0
        };
        if(serverId) {
            try {
                let data = await coreModels.server.destroy({
                    where: {
                        id: serverId
                    }
                })
                res.code = 200;
                res.msg = 'success';
                res.status = '1';
                return res
            } catch (error) {
                res.code = 200;
                res.msg = 'query failed';
                return res;
            }
        }
        return res
    },
    updateServer: async (body, serverId) => {
        let res = {
            code: 204,
            msg: 'error',
            status: 0
        };
        try {
            let data = await coreModels.server.update(
                {
                    name: body.name,
                    status: body.status,
                    description: body.description,
                    updatedAt: new Date()
                },
                {
                    where: {id: serverId}
                }
            )
            res.code = 200;
            res.msg = 'success';
            res.status = 1
        } catch (error) {
            res.code = 200;
            res.msg = 'query failed';
        }
        return res
    },
    createServer: async (body) => {
        let res = {
            code: 204,
            msg: 'error',
            status: 0
        };
        try {
            let data = await coreModels.server.create({
                name: body.name,
                status: body.status,
                description: body.description,
                status: body.status
            })
            res.code = 200;
            res.msg = 'success';
            res.status = 1
        } catch (error) {
            res.code = 200;
            res.msg = 'query failed';
        }
        return res
    },

    //port
    getListPort: async (criteria, page, limit) => {
        let data = [];
        let total = 0;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: {
                data: [],
                total: 0
            }
        }
        let arrayKeys = Object.keys(criteria);
        let arrayValues = Object.values(criteria);
        let strQuery = '';
        if (arrayKeys.length == arrayValues.length && arrayKeys.length > 0) {
            strQuery = 'where ';
            for(let i = 0; i < arrayKeys.length; i++) {
                if(arrayKeys[i] == 'keyword'){
                    strQuery = strQuery + `a.port like '%${arrayValues[i]}%'`;
                }
                else {
                    strQuery = strQuery + `a.${arrayKeys[i]} = '${arrayValues[i]}'`;
                };
                if(i < (arrayKeys.length - 1)) {
                    strQuery = strQuery + ' and ';
                }
            }
        }
        try {
            data = await db.sequelize.query(`select a.*, b.name as nameServer 
                                            from port a 
                                            left join (select name, id from server) b on a.server = b.id 
                                            ${strQuery} order by createdAt DESC
                                            offset ${Number(limit) * Number(page)} rows
                                            fetch next ${limit} rows only`, { type: QueryTypes.SELECT });
            total = await data.length;

            res.status = 1;
            res.code = 200;
            res.msg = 'success';
            res.data.data = data;
            res.data.total = total;

            return res;
        } catch (error) {
            console.log(error);
            res.code = 200;
            res.msg = 'query failed';
            return res
        }
    },
    deletePort: async(portId) => {
        let res = {
            code: 204,
            msg: 'error',
            status: 0
        };
        if(portId) {
            try {
                let data = await coreModels.port.destroy({
                    where: {
                        id: portId
                    }
                })
                
                res.code = 200;
                res.msg = 'success';
                res.status = 1;
                return res
            } catch (error) {
                res.code = 200;
                res.msg = 'query failed'
                return res;
            }
        }
        return res
    },
    updatePort: async (body, portId) => {
        let res = {
            code: 204,
            msg: 'error',
            status: 0
        };
        try {
            let data = await coreModels.port.update(
                {
                    port: body.port,
                    status: body.status,
                    description: body.description,
                    server: body.server,
                    updatedAt: new Date()
                },
                {
                    where: {id: portId}
                }
            )
            
            res.code = 200;
            res.msg = 'success';
            res.status = 1;
        } catch (error) {
            console.log(error);
            res.code = 200;
            res.msg = 'query failed';
        }
        return res
    },
    createPort: async (body) => {
        let res = {
            code: 204,
            msg: 'error',
            status: 0
        };
        try {
            let data = await coreModels.port.create({
                port: body.port,
                status: body.status,
                description: body.description,
                status: body.status,
                server: body.server
            })
            res.code = 200;
            res.msg = 'success';
            res.status = 1;
        } catch (error) {
            console.log(error);
            res.code = 200;
            res.msg = 'query failed';
        }
        return res
    },

}

module.exports = productServices
