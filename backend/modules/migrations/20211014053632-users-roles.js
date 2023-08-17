'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('pf_users_roles', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            NAME: {
                type: Sequelize.STRING
            },
            STATUS: {
                type: Sequelize.SMALLINT
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
        await queryInterface.dropTable('pf_users_roles');
    }
};
