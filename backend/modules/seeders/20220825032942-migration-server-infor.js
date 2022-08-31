'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('server_infor', [
        {
            id: 1,
            serverName: 'UAT',
            serverInfor: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            id: 2,
            serverName: 'PRODUCT',
            serverInfor: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('server_infor', null, {});
  }
};
