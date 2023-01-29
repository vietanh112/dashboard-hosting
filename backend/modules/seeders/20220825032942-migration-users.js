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
        employeeId: '88888',
        username: 'admin',
        password: '$2b$10$d2.U.Y.dV0JF1X3FlGcCNeWTb/0YHf4ZPzFPIMPgb4vqUv8xABe3S', //admin123
        email: '',
        roleId: 1,
        allow: 1,
        status: 1,
        token: '1',
        tokenRefresh: '$2y$10$9LaY9E5eqEmTBv2xSJ7h0.d4nq1ZbWcHBheZiv8ompaAydT0uIay2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeId: '99999',
        username: 'superadmin',
        password: '$2b$10$.Yylat1mec6H5cEoEVE1o.zD4rsPRrFaD4S4DxueMGR78lT2X2N4y', //superadmin123
        email: '',
        roleId: 2,
        allow: 1,
        status: 1,
        token: '1',
        tokenRefresh: '$2y$10$JEb0yvYvrzmxWRhxy7yC7.jSE7lSoTa0lz/dHH3ZhraUpgpJzPxQy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeId: '77777',
        username: 'user',
        password: '$2b$10$L7UyHqjJjmV9t0BffXMP5.9wgF3O3veQw3V7M1CboDfIvuTI2HtTG', //user123!!
        email: '',
        roleId: 3,
        allow: 1,
        status: 1,
        token: '1',
        tokenRefresh: '$2y$10$9l9NWPGj/.mycIle5rATsOcOOtHc4XtBSluH6txItEen2FMxCW6xu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },  
      {
        employeeId: 'S12005',
        username: 'anhnhv',
        password: '$2b$10$d3EiAQLVYZATD097JxRHmeihGaVA2wjKZByj3HE2sfCFjNchHYxdW', //vanh123
        email: 'anh.nhv@shb.com.vn',
        roleId: 1,
        allow: 1,
        status: 1,
        token: '',
        tokenRefresh: '$2y$10$bst4av1Hnf0tU21XvxQGou15ajumbbE9qpMcPMHR/SvPm//9dRwKy',
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
    return queryInterface.bulkDelete('users', null, {});
  }
};
