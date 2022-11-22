'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class server extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    server.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        serverName: DataTypes.STRING,
        serverInfor: DataTypes.STRING,
        status: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'server',
        modelName: 'server',
    });
    return server;
};