'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class hosttingProduct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    hosttingProduct.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        IPAddress: DataTypes.STRING,
        IPAddressF5: DataTypes.STRING,
        Hostname: DataTypes.STRING,
        Priority: DataTypes.STRING(5),
        ENV:  DataTypes.STRING(5),
        TYPE: DataTypes.STRING(5),
        Middleware: DataTypes.STRING(5),
        Information: DataTypes.STRING,
        MachineType: DataTypes.STRING,
        OS: DataTypes.STRING(5),
        Note: DataTypes.STRING,
        NA: DataTypes.STRING,
        VlanType: DataTypes.STRING,
        VlanTypeInfor: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'hosting_product',
        modelName: 'hosttingProduct',
    });
    return hosttingProduct;
};
