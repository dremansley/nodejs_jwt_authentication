'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'username');
  },

  async down (queryInterface, Sequelize) {}
};
