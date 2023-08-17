'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class nw_hosting extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    nw_hosting.init({
        ID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        IPADDRESS: DataTypes.STRING,
        IPADDRESSF5: DataTypes.STRING,
        HOSTNAME: DataTypes.STRING,
        PORT: DataTypes.INTEGER,
        PRIORITY: DataTypes.STRING(50),
        ENV:  DataTypes.STRING(50),
        TYPE: DataTypes.STRING(50),
        MIDDLEWARE: DataTypes.STRING(50),
        INFORMATION: DataTypes.STRING,
        MACHINE_TYPE: DataTypes.STRING,
        OS: DataTypes.STRING(50),
        NOTE: DataTypes.STRING,
        NA: DataTypes.STRING,
        STATUS: DataTypes.INTEGER,
        VLAN: DataTypes.INTEGER,
        SERVER: DataTypes.INTEGER,
        CREATE_AT: DataTypes.DATE,
        UPDATE_AT: DataTypes.DATE
    }, {
        sequelize,
        timestamps: false,
        tableName: 'nw_hosting',
        modelName: 'nw_hosting',
    });
    return nw_hosting;
};
