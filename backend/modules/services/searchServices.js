const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
const configs = require('../../configs/configs');
const db =  require('../models');
const { QueryTypes } = require('sequelize');
const VlanModel = require('../entities/nw_vlan');
const ServerModel = require('../entities/nw_server');
const PortModel = require('../entities/nw_port');

const searchServices = {
    getList: async (type) => {
        if(type == 'vlan' || type == 'port') {
            let data = await searchServices.getServer({});
            if(data) {
                return {
                    status: 1,
                    code: 200,
                    msg: 'success',
                    data: data.data
                }
            }
        }
        else if(type == 'hosting') {
            let dataServer = await searchServices.getServer({});
            let dataPort = await searchServices.getPort({});
            let dataVlan = await searchServices.getVlan({});
            if(dataServer || dataPort || dataVlan) {
                return {
                    status: 1,
                    code: 200,
                    msg: 'success',
                    data: {
                        server: dataServer.data,
                        port: dataPort.data,
                        vlan: dataVlan.data,
                    }
                }
            }
        }
        else {
            return {
                status: 0,
                code: 204,
                msg: 'Data not found',
                data: []
            }
        }
    },

    getPort: async (criteria) => {
        let data;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: []
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
                    if(arrayValues[i] == '') {
                        strQuery = strQuery + `a.${arrayKeys[i].toUpperCase()} like '%${arrayValues[i]}%'`;
                    }
                    else {
                        strQuery = strQuery + `a.${arrayKeys[i].toUpperCase()} = '${arrayValues[i]}'`;
                    }
                };
                if(i < (arrayKeys.length - 1)) {
                    strQuery = strQuery + ' and ';
                }
            }
        }

        try {
            data = await db.sequelize.query(`select a.* from nw_port a ${strQuery} order by CREATE_AT DESC offset 0 rows fetch next 10 rows only`, { type: QueryTypes.SELECT });
            
            let newData = [];
            if(data.length > 0) {
                for (let i of data) {
                    newData.push(new PortModel(i));
                }
            }
            res.code = 200;
            res.status = 1;
            res.data = newData;
            return res;

        } catch (error) {
            console.log(error);
            return res
        }
    },

    getServer: async (criteria) => {
        let data;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: []
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
                    if(arrayValues[i] == '') {
                        strQuery = strQuery + `a.${arrayKeys[i].toUpperCase()} like '%${arrayValues[i]}%'`;
                    }
                    else {
                        strQuery = strQuery + `a.${arrayKeys[i].toUpperCase()} = '${arrayValues[i]}'`;
                    }
                };
                if(i < (arrayKeys.length - 1)) {
                    strQuery = strQuery + ' and ';
                }
            }
        }

        try {
            data = await db.sequelize.query(`select a.* from nw_server a ${strQuery} order by CREATE_AT DESC offset 0 rows fetch next 10 rows only`, { type: QueryTypes.SELECT });

            let newData = [];
            if(data.length > 0) {
                for (let i of data) {
                    newData.push(new ServerModel(i));
                }
            }
            res.code = 200;
            res.status = 1;
            res.data = newData;
            return res;

        } catch (error) {
            console.log(error);
            return res
        }
    },

    getVlan: async (criteria) => {
        let data;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: []
        }

        let arrayKeys = Object.keys(criteria);
        let arrayValues = Object.values(criteria);
        let strQuery = '';
        if (arrayKeys.length == arrayValues.length && arrayKeys.length > 0) {
            strQuery = 'where ';
            console.log(arrayKeys);
            for(let i = 0; i < arrayKeys.length; i++) {
                if(arrayKeys[i] == 'keyword'){
                    strQuery = strQuery + `a.NAME like '%${arrayValues[i]}%'`;
                }
                else {
                    if(arrayValues[i] == '') {
                        strQuery = strQuery + `a.${arrayKeys[i].toUpperCase()} like '%${arrayValues[i]}%'`;
                    }
                    else {
                        strQuery = strQuery + `a.${arrayKeys[i].toUpperCase()} = '${arrayValues[i]}'`;
                    }
                };
                if(i < (arrayKeys.length - 1)) {
                    strQuery = strQuery + ' and ';
                }
            }
        }

        try {
            data = await db.sequelize.query(`select a.* from nw_vlan a ${strQuery} order by CREATE_AT DESC offset 0 rows fetch next 10 rows only`, { type: QueryTypes.SELECT });

            let newData = [];
            if(data.length > 0) {
                for (let i of data) {
                    newData.push(new VlanModel(i));
                }
            }
            res.code = 200;
            res.status = 1;
            res.data = newData;

            return res;

        } catch (error) {
            console.log(error);
            return res
        }
    }
}

module.exports = searchServices