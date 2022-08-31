'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('server_infor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11)
            },
            serverName: {
                type: Sequelize.STRING
            },
            serverInfor: {
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
        await queryInterface.dropTable('server_infor');
    }
};
