'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
      Add seed commands here.
     */
      await queryInterface.bulkInsert('roles', [{
        rol: 'administrador',
      },{
        rol: 'usuario',
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     
     */
    await queryInterface.bulkDelete('roles', null, {});
  }
};
