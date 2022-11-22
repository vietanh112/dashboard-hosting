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
            id: 1,
            port: '443',
            ipAddress: '10.4.28.1',
            description: 'a',
            status: 1,
            server: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            id: 2,
            port: '80',
            ipAddress: '10.4.28.2',
            description: 'b',
            status: 1,
            server: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            id: 3,
            port: '8080',
            ipAddress: '10.4.29.0',
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
