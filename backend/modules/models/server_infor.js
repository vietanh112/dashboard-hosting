'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class serverInfor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    serverInfor.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        serverName: DataTypes.STRING,
        serverInfor: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'server_infor',
        modelName: 'serverInfor',
    });
    return serverInfor;
};