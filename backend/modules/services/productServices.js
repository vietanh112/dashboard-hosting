const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
const db =  require('../models');
const { QueryTypes } = require('sequelize');
const HostingModel = require('../entities/nw_hosting');
const VlanModel = require('../entities/nw_vlan');
const ServerModel = require('../entities/nw_server');
const PortModel = require('../entities/nw_port');

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
                    strQuery = strQuery + `(a.IPADDRESS like '%${arrayValues[i]}%' OR a.HOSTNAME like '%${arrayValues[i]}%')`;
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
            data = await db.sequelize.query(`select a.*, b.NAME as NAME_SERVER, c.NAME as NAME_VLAN, d.port as NAME_PORT 
                                        from nw_hosting a 
                                        left join (select NAME, ID from nw_server) b on a.SERVER = b.ID 
                                        left join (select NAME, ID from nw_vlan) c on a.VLAN = c.ID 
                                        left join (select PORT, ID from nw_port) d on a.PORT = d.ID 
                                        ${strQuery} order by CREATE_AT DESC
                                        offset ${Number(limit) * Number(page)} rows
                                        fetch next ${limit} rows only`, { type: QueryTypes.SELECT });

            let newData = [];
            if (data.length > 0) {
                for(let i of data) {
                    newData.push(new HostingModel(i));
                }
            }
            total = data.length;
            log.code = 200;
            log.status = 1;
            log.msg = "query success";
            log.data.data = newData;
            log.data.total = total;

        } catch (error) {
            log.code = 201;
            log.msg = "error";
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
            let data = await db.sequelize.query(`INSERT INTO nw_hosting VALUES ('${body.ipaddress}', '${body.ipaddressf5}', '${body.hostname}', ${Number(body.port)}, '${body.priority}', '${body.env}', '${body.type}', '${body.middleware}', N'${body.information}', '${body.machineType}', '${body.os}', '${body.note}', '${body.na}', ${body.status}, ${body.vlan}, ${body.server}, GETDATE() , GETDATE() )`, { type: QueryTypes.SELECT });
            if(data) {
                log.code = 200;
                log.msg = 'success';
                log.status = 1;
            }
            return log
        } catch (error) {
            console.log(error);
            log.code = 200;
            log.msg = 'error';
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
                let data = await db.sequelize.query(`delete nw_hosting where ID = ${hostingId}`, { type: QueryTypes.SELECT });
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
            let data = await db.sequelize.query(`UPDATE nw_hosting SET IPADDRESS='${body.ipaddress}', IPADDRESSF5='${body.ipaddressf5}', HOSTNAME='${body.hostname}', PORT=${Number(body.port)}, PRIORITY='${body.priority}', ENV='${body.env}', TYPE='${body.type}', MIDDLEWARE='${body.middleware}', INFORMATION=N'${body.information}', MACHINE_TYPE='${body.machineType}', OS='${body.os}', NOTE='${body.note}', NA='${body.na}', STATUS=${body.status}, VLAN=${body.vlan}, SERVER=${body.server}, CREATE_AT=GETDATE()  WHERE ID = ${hostingId}`, { type: QueryTypes.SELECT });
            
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
                    strQuery = strQuery + `a.NAME like '%${arrayValues[i]}%'`;
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
            data = await db.sequelize.query(`select a.*, b.NAME as NAME_SERVER 
                                        from nw_vlan a 
                                        left join (select NAME, ID from nw_server) b on a.SERVER = b.ID 
                                        ${strQuery} order by CREATE_AT DESC
                                        offset ${Number(limit) * Number(page)} rows
                                        fetch next ${limit} rows only`, { type: QueryTypes.SELECT });
        } catch (error) {
            res.code = '200';
            res.msg = 'error';
            return res
        }
        total =  data.length;
        let newData = [];
        if(data.length > 0){
            for(let i of data) {
                newData.push(new VlanModel(i))
            }
        }
        res.status = 1;
        res.code = 200;
        res.msg = 'success';
        res.data.data = newData;
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
            let data = await db.sequelize.query(`UPDATE nw_vlan SET NAME='${body.name}', STATUS='${body.status}', DESCRIPTION=N'${body.description}', SERVER = '${body.server}', UPDATE_AT = GETDATE()  WHERE ID = ${vlanId}`, { type: QueryTypes.SELECT });
            
            res.code = 200;
            res.msg = 'success';
            res.status = 1;
            return res
        } catch (error) {
            res.code = 200;
            res.msg = 'error';
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
            let data = await db.sequelize.query(`INSERT INTO nw_vlan VALUES ('${body.name}', N'${body.description}', '${body.status}', '${body.server}', GETDATE() , GETDATE() )`, { type: QueryTypes.SELECT });
           
            res.code = 200;
            res.msg = 'success';
            res.status = 1;
            return res
        } catch (error) {
            res.code = 200;
            res.msg = 'error'; 
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
                let data = await db.sequelize.query(`DELETE nw_vlan Where ID = '${vlanId}'`, { type: QueryTypes.SELECT });
                res.code = 200;
                res.msg = 'success';
                res.status = 1;
                return res
            } catch (error) {
                res.code = 200;
                res.msg = 'error'
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
                    strQuery = strQuery + `a.NAME like '%${arrayValues[i]}%'`;
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
            data = await db.sequelize.query(`select * from nw_server a 
                                        ${strQuery} order by CREATE_AT DESC
                                        offset ${Number(limit) * Number(page)} rows
                                        fetch next ${limit} rows only`, { type: QueryTypes.SELECT });
        } catch (error) {
            console.log(error);
            res.code = 200;
            res.data.data = [];
            res.data.total = 0;
            res.msg = 'error';
            return res;
        }

        total =  data.length;
        let newData = [];
        if(data.length > 0) {
            for(let i of data) {
                newData.push(new ServerModel(i));
            }
        }
        res.data.data = newData;
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
                let data = await db.sequelize.query(`DELETE nw_server Where ID = '${serverId}'`, { type: QueryTypes.SELECT });
                res.code = 200;
                res.msg = 'success';
                res.status = '1';
                return res
            } catch (error) {
                res.code = 200;
                res.msg = 'error';
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
            let data = await db.sequelize.query(`UPDATE nw_server SET NAME='${body.name}', STATUS='${body.status}', DESCRIPTION=N'${body.description}', UPDATE_AT = GETDATE()  WHERE ID = ${serverId}`, { type: QueryTypes.SELECT });
            
            res.code = 200;
            res.msg = 'success';
            res.status = 1
        } catch (error) {
            res.code = 200;
            res.msg = 'error';
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
            let data = await db.sequelize.query(`INSERT INTO nw_server VALUES ('${body.name}', N'${body.description}', '${body.status}', GETDATE() , GETDATE() )`, { type: QueryTypes.SELECT });
           
            res.code = 200;
            res.msg = 'success';
            res.status = 1
        } catch (error) {
            res.code = 200;
            res.msg = 'error';
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
                    strQuery = strQuery + `a.PORT like '%${arrayValues[i]}%'`;
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
            data = await db.sequelize.query(`select a.*, b.NAME as NAME_SERVER 
                                            from nw_port a 
                                            left join (select NAME, ID from nw_server) b on a.SERVER = b.ID 
                                            ${strQuery} order by CREATE_AT DESC
                                            offset ${Number(limit) * Number(page)} rows
                                            fetch next ${limit} rows only`, { type: QueryTypes.SELECT });
            total = await data.length;
            let newData = [];
            if(data.length > 0){
                for(let i of data) {
                    newData.push(new PortModel(i))
                }
            }
            res.status = 1;
            res.code = 200;
            res.msg = 'success';
            res.data.data = newData;
            res.data.total = total;

            return res;
        } catch (error) {
            console.log(error);
            res.code = 200;
            res.msg = 'error';
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
                let data = await db.sequelize.query(`DELETE nw_port Where ID = '${portId}'`, { type: QueryTypes.SELECT });
                
                res.code = 200;
                res.msg = 'success';
                res.status = 1;
                return res
            } catch (error) {
                res.code = 200;
                res.msg = 'error'
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
            let data = await db.sequelize.query(`UPDATE nw_port SET PORT='${body.port}', STATUS='${body.status}', DESCRIPTION=N'${body.description}', SERVER = '${body.server}', UPDATE_AT = GETDATE()  WHERE ID = ${portId}`, { type: QueryTypes.SELECT });
            
            res.code = 200;
            res.msg = 'success';
            res.status = 1;
        } catch (error) {
            console.log(error);
            res.code = 200;
            res.msg = 'error';
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
            let data = await db.sequelize.query(`INSERT INTO nw_port VALUES ('${body.port}', N'${body.description}', '${body.status}', '${body.server}', GETDATE() , GETDATE() )`, { type: QueryTypes.SELECT });
           
            res.code = 200;
            res.msg = 'success';
            res.status = 1;
        } catch (error) {
            console.log(error);
            res.code = 200;
            res.msg = 'error';
        }
        return res
    },

}

module.exports = productServices
