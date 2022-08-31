'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class vlanInfor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    vlanInfor.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        vlanName: DataTypes.STRING,
        vlanInfor: DataTypes.STRING,
        server: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'vlan_infor',
        modelName: 'vlanInfor',
    });
    return vlanInfor;
};
