'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('nw_port', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            PORT: {
                type: Sequelize.STRING
            },
            DESCRIPTION: {
                type: Sequelize.STRING
            },
            STATUS: {
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
        await queryInterface.dropTable('nw_port');
    }
};
