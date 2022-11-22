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
    return queryInterface.bulkInsert('users', [
        {
            id: 1,
            username: 'anhnhv',
            password: '$2b$10$d3EiAQLVYZATD097JxRHmeihGaVA2wjKZByj3HE2sfCFjNchHYxdW',
            email: 'anh.nhv@shb.com.vn',
            roleId: 1,
            allow: 1,
            status: 1,
            token: '1',
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
    return queryInterface.bulkDelete('users', null, {});
  }
};
