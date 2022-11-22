'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class vlan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    vlan.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        vlanName: DataTypes.STRING,
        vlanInfor: DataTypes.STRING,
        status: DataTypes.INTEGER,
        server: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'vlan',
        modelName: 'vlan',
    });
    return vlan;
};
