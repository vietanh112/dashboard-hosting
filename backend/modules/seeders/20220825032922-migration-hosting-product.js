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
    return queryInterface.bulkInsert('hosting_product', [
        {
            id: 1,
            IPAddress: '10.4.28.1',
            IPAddressF5: '',
            Hostname: 'Default Gateway',
            Priority: 'H',
            ENV: 'CDE',
            TYPE: 'HW',
            Middleware: 'N/A',
            Information: 'Default Gateway',
            MachineType: 'N/A',
            OS: 'N/A',
            Note: '',
            NA: 'N/A',
            VlanType: 'VLAN 28',
            VlanTypeInfor: 'VLAN phục vụ các máy chủ thuộc mảng DATA_CENTER (CDE)',
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
    return queryInterface.bulkDelete('hosting_product', null, {});
  }
};
