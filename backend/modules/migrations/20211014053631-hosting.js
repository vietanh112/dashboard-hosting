'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('nw_hosting', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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
            port: {
                type: Sequelize.INTEGER
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
            status: {
                type: Sequelize.INTEGER
            },
            vlan: {
                type: Sequelize.INTEGER
            },
            server: {
                type: Sequelize.INTEGER
            },
            CREATE_AT: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UPDATE_AT: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {charset: 'utf8', collate: 'utf8_unicode_ci'});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('nw_hosting');
    }
};
