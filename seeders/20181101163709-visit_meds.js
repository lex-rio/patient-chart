'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('VisitMeds', [{
      instructions: '3 раза в день после еды',
      VisitId: 1,
      MedId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      instructions: '1 раз в день утром',
      VisitId: 1,
      MedId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      instructions: 'натощак 2 раза в день',
      VisitId: 1,
      MedId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      instructions: '3 раза в день после еды',
      VisitId: 2,
      MedId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  ,
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('VisitMeds', null, {})
};
