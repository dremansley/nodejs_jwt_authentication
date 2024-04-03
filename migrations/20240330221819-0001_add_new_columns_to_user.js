'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Users', 'userUUID', {
      type: Sequelize.UUIDV4,
    });

    await queryInterface.addColumn('Users', 'firstname', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Users', 'lastname', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Users', 'biography', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
