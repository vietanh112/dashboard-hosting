'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('pf_users', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            EMPLOYEE_ID: {
                type: Sequelize.STRING,
            },
            USERNAME: {
                type: Sequelize.STRING
            },
            PASSWORD: {
                type: Sequelize.STRING
            },
            EMAIL: {
                type: Sequelize.STRING
            },
            ROLE_ID: {
                type: Sequelize.INTEGER
            },
            POSITION_ID: {
                type: Sequelize.INTEGER
            },
            ALLOW: {
                type: Sequelize.INTEGER
            },
            STATUS: {
                type: Sequelize.INTEGER
            },
            TOKEN: {
                type: Sequelize.STRING
            },
            TOKEN_REFRESH: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('pf_users');
    }
};
