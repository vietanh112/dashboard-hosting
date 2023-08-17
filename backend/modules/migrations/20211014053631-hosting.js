'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('nw_hosting', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            IPADDRESS: {
                type: Sequelize.STRING
            },
            IPADDRESSF5: {
                type: Sequelize.STRING
            },
            HOSTNAME: {
                type: Sequelize.STRING
            },
            PORT: {
                type: Sequelize.INTEGER
            },
            PRIORITY: {
                type: Sequelize.STRING(5)
            },
            ENV: {
                type: Sequelize.STRING(5)
            },
            TYPE: {
                type: Sequelize.STRING(5)
            },
            MIDDLEWARE: {
                type: Sequelize.STRING(5)
            },
            INFORMATION: {
                type: Sequelize.STRING
            },
            MACHINE_TYPE: {
                type: Sequelize.STRING
            },
            OS: {
                type: Sequelize.STRING(5)
            },
            NOTE: {
                type: Sequelize.STRING
            },
            NA: {
                type: Sequelize.STRING
            },
            STATUS: {
                type: Sequelize.INTEGER
            },
            VLAN: {
                type: Sequelize.INTEGER
            },
            SERVER: {
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
