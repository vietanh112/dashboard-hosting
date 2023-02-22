const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');
const { Op } = require("sequelize");
const configs = require('../../configs/configs')

const searchServices = {
    getList: async (type) => {
        if(type == 'vlan' || type == 'port') {
            let data = await searchServices.getServer(null);
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
            let dataServer = await searchServices.getServer(null);
            let dataPort = await searchServices.getPort(null);
            let dataVlan = await searchServices.getVlan(null);
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

    getPort: async (keyword) => {
        let data;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: []
        }
        try {
            if(keyword != null) {
                data = await coreModels.port.findAll({
                    where: {
                        port: {
                            [Op.like]: `%${keyword}%`
                        },
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
            }
            else {
                data = await coreModels.port.findAll({
                    limit: 10,
                    offset: 0,
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
            }

            res.code = 200;
            res.status = 1;
            res.data = data;
            return res;

        } catch (error) {
            console.log(error);
            return res
        }
    },

    getServer: async (keyword) => {
        let data;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: []
        }
        try {
            if(keyword != null) {
                data = await coreModels.server.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${keyword}%`
                        },
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
            }
            else {
                data = await coreModels.server.findAll({
                    limit: 10,
                    offset: 0,
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
            }

            res.code = 200;
            res.status = 1;
            res.data = data;
            return res;

        } catch (error) {
            console.log(error);
            return res
        }
    },

    getVlan: async (keyword) => {
        let data;
        let res = {
            status: 0,
            code: 204,
            msg: 'success',
            data: []
        }
        try {
            if(keyword != null) {
                data = await coreModels.vlan.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${keyword}%`
                        },
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
            }
            else {
                data = await coreModels.vlan.findAll({
                    limit: 10,
                    offset: 0,
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
            }

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