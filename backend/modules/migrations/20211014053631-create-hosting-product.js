'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('hosting_product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11)
            },
            IPAddress: {
                type: Sequelize.STRING
            },
            IPAddressF5: {
                type: Sequelize.STRING
            },
            Hostname: {
                type: Sequelize.STRING
            },
            Priority: {
                type: Sequelize.STRING(5)
            },
            ENV: {
                type: Sequelize.STRING(5)
            },
            TYPE: {
                type: Sequelize.STRING(5)
            },
            Middleware: {
                type: Sequelize.STRING(5)
            },
            Information: {
                type: Sequelize.STRING
            },
            MachineType: {
                type: Sequelize.STRING
            },
            OS: {
                type: Sequelize.STRING(5)
            },
            Note: {
                type: Sequelize.STRING
            },
            NA: {
                type: Sequelize.STRING
            },
            VlanType: {
                type: Sequelize.STRING
            },
            VlanTypeInfor: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {charset: 'utf8', collate: 'utf8_unicode_ci'});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('hosting_product');
    }
};
