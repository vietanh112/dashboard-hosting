'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class nw_port extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    nw_port.init({
        ID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        PORT: DataTypes.STRING,
        DESCRIPTION: DataTypes.STRING,
        STATUS: DataTypes.INTEGER,
        SERVER: DataTypes.INTEGER,
        CREATE_AT: DataTypes.DATE,
        UPDATE_AT: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'nw_port',
        modelName: 'nw_port',
    });
    return nw_port;
};
