'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class port extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    port.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        port: DataTypes.STRING,
        ipAddress: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.INTEGER,
        server: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'port',
        modelName: 'port',
    });
    return port;
};
