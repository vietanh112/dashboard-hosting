const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
const configs = require('../../configs/configs');
const db =  require('../models');
const { QueryTypes } = require('sequelize');

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
            data = await db.sequelize.query(`select a.* from port a ${strQuery} order by createdAt DESC offset 0 rows fetch next 10 rows only`, { type: QueryTypes.SELECT });
            res.code = 200;
            res.status = 1;
            res.data = data;
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
            data = await db.sequelize.query(`select a.* from server a ${strQuery} order by createdAt DESC offset 0 rows fetch next 10 rows only`, { type: QueryTypes.SELECT });

            res.code = 200;
            res.status = 1;
            res.data = data;
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
            data = await db.sequelize.query(`select a.* from vlan a ${strQuery} order by createdAt DESC offset 0 rows fetch next 10 rows only`, { type: QueryTypes.SELECT });

            res.code = 200;
            res.status = 1;
            res.data = data;

            return res;

        } catch (error) {
            console.log(error);
            return res
        }
    }
}

module.exports = searchServices