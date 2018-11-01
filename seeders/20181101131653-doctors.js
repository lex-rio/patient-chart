'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Doctors', [{
      name: 'Нардова Наталья Батьковна',
      phone: '1233345',
      specialization: 'Педиатр',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Кандаурова Елена Николаевна',
      phone: '0954993276',
      specialization: 'Педиатр',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Таран Лариса Владимировна',
      phone: '0505950379',
      specialization: 'Отоларинголог',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  ,
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Doctors', null, {})
};
