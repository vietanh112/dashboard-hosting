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
    return queryInterface.bulkInsert('vlan', [
        {
            name: 'VLAN 28',
            description: 'VLAN phục vụ các máy chủ thuộc mảng DATA_CENTER (CDE)',
            status: 1,
            server: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            name: 'VLAN 27',
            description: 'VLAN phục vụ các máy chủ thuộc mảng Common Services non-CDE  10.4.27.0',
            status: 1,
            server: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            name: 'VLAN 29',
            description: 'VLAN phục vụ các máy chủ thuộc mảng  APP-CDE  10.4.29.0/24',
            status: 1,
            server: 1,
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
    return queryInterface.bulkDelete('vlan', null, {});
  }
};
