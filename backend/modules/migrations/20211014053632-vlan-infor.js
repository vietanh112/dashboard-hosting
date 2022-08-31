'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('vlan_infor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11)
            },
            vlanName: {
                type: Sequelize.STRING
            },
            vlanInfor: {
                type: Sequelize.STRING
            },
            server: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('vlan_infor');
    }
};
