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
    return queryInterface.bulkInsert('users_roles', [
        {
            name: 'Super Administrator',
            status: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            name: 'Administrator',
            status: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            name: 'User',
            status: 1,
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
    return queryInterface.bulkDelete('users_roles', null, {});
  }
};
