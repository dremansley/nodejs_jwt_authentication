'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addIndex('Users', ['email']);
  },

  async down (queryInterface, Sequelize) {
  }
};
