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
    return queryInterface.bulkInsert('port', [
        {
            port: '443',
            description: 'a',
            status: 1,
            server: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            port: '80',
            description: 'b',
            status: 1,
            server: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            port: '8080',
            description: 'c',
            status: 1,
            server: '2',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('port', null, {});
  }
};
