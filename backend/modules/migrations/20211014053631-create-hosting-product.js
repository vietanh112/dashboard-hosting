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
            iPAddress: {
                type: Sequelize.STRING
            },
            iPAddressF5: {
                type: Sequelize.STRING
            },
            hostname: {
                type: Sequelize.STRING
            },
            priority: {
                type: Sequelize.STRING(5)
            },
            env: {
                type: Sequelize.STRING(5)
            },
            type: {
                type: Sequelize.STRING(5)
            },
            middleware: {
                type: Sequelize.STRING(5)
            },
            information: {
                type: Sequelize.STRING
            },
            machineType: {
                type: Sequelize.STRING
            },
            os: {
                type: Sequelize.STRING(5)
            },
            note: {
                type: Sequelize.STRING
            },
            na: {
                type: Sequelize.STRING
            },
            vlanType: {
                type: Sequelize.INTEGER(3)
            },
            server: {
                type: Sequelize.INTEGER(3)
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
