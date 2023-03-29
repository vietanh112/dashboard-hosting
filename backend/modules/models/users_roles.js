'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class pf_users_roles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    pf_users_roles.init({
        ID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        NAME: DataTypes.STRING,
        STATUS: DataTypes.INTEGER,
        CREATE_AT: DataTypes.DATE,
        UPDATE_AT: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'pf_users_roles',
        modelName: 'pf_users_roles',
    });
    return pf_users_roles;
};
