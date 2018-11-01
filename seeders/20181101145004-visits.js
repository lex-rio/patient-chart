'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Visits', [{
      date: new Date('2018-04-28 01:00:00'),
      diagnosis: 'Отит',
      DoctorId: 1,
      PatientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      date: new Date('2018-04-28 01:00:00'),
      diagnosis: 'шмотит',
      DoctorId: 2,
      PatientId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      date: new Date('2018-04-28 01:00:00'),
      diagnosis: 'дротит',
      DoctorId: 2,
      PatientId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      date: new Date('2018-04-28 01:00:00'),
      diagnosis: 'uhjnbn',
      DoctorId: 1,
      PatientId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  ,
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Visits', null, {})
};
