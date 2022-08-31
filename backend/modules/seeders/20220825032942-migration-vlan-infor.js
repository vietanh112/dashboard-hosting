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
    return queryInterface.bulkInsert('vlan_infor', [
        {
            id: 1,
            vlanName: 'VLAN 28',
            vlanInfor: 'VLAN phục vụ các máy chủ thuộc mảng DATA_CENTER (CDE)',
            server: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            id: 2,
            vlanName: 'VLAN 27',
            vlanInfor: 'VLAN phục vụ các máy chủ thuộc mảng Common Services non-CDE  10.4.27.0',
            server: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
          {
            id: 3,
            vlanName: 'VLAN 29',
            vlanInfor: 'VLAN phục vụ các máy chủ thuộc mảng  APP-CDE  10.4.29.0/24',
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
    return queryInterface.bulkDelete('vlan_infor', null, {});
  }
};
