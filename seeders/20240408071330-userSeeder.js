'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      nombre: 'Daniel Eduardo',
      apellidos: 'Gomez Cuevas',
      edad: 18,
      email:'daniel@gmail.com',
      usuario: 'Dani',
      password: '$2a$10$1MEn65wfBVr0a1SyQdDweOEOGmsOCdjSKpwRAxhRc/cOm.X2wPHOu',
      puntos:0,
      id_rol:1,
      suscripcion_actual:0
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
    await queryInterface.bulkDelete('users', null, {});
     
  }
};
