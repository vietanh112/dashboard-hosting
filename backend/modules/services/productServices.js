const { Sequelize, Model, DataTypes } = require("sequelize");
const coreModels = require('../models/index');

const productServices = {
    getList: async (criteria) => {
        const data = await coreModels.hosttingProduct.findAll();
        let response = {
            data: data,
            total: data.length,
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
                IPAddress: body.ipaddress,
                IPAddressF5: body.ipaddressf5,
                Hostname: body.hostname,
                Priority: body.priority,
                ENV: body.env,
                TYPE: body.type,
                Middleware: body.middleware,
                Information: body.information,
                MachineType: body.machineType,
                OS: body.os,
                Note: body.note,
                NA: body.na,
                VlanType: body.vlanType,
                VlanTypeInfor: body.vlanTypeInfor
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
    }
}

module.exports = productServices
