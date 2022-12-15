'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class hosting extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    hosting.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        iPAddress: DataTypes.STRING,
        iPAddressF5: DataTypes.STRING,
        hostname: DataTypes.STRING,
        port: DataTypes.INTEGER,
        priority: DataTypes.STRING(5),
        env:  DataTypes.STRING(5),
        type: DataTypes.STRING(5),
        middleware: DataTypes.STRING(5),
        information: DataTypes.STRING,
        machineType: DataTypes.STRING,
        os: DataTypes.STRING(5),
        note: DataTypes.STRING,
        na: DataTypes.STRING,
        status: DataTypes.INTEGER,
        vlan: DataTypes.INTEGER,
        server: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'hosting',
        modelName: 'hosting',
    });
    return hosting;
};
