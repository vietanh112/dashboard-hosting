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
    return queryInterface.bulkInsert('hosting', [
        {
            id: 1,
            iPAddress: '10.4.28.1',
            iPAddressF5: '',
            hostname: 'Default Gateway',
            priority: 'H',
            env: 'CDE',
            type: 'HW',
            middleware: 'N/A',
            information: 'Default Gateway',
            machineType: 'N/A',
            os: 'N/A',
            note: '',
            na: 'N/A',
            status: 1,
            vlanType: 1,
            server: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('hosting', null, {});
  }
};
