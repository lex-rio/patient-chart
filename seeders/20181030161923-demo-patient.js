'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('Patients', [{
      name: 'Полина',
      photo: 'https://mega.nz/#!NsdHAYTC!DbpHs7iYuZb2nbYWPlCHan1pXpiCnut_S8GS-g-46TA',
      birthday: new Date('2016-04-28 01:00:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Максим',
      photo: 'https://mega.nz/#!hpdXHYoa!hiyA1rlEEm7TK9xdtQcUdy7WiH89M-k5DXQ-JvjgD_s',
      birthday: new Date('2018-01-03 21:30:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Саша',
      photo: 'https://mega.nz/#!F9dwUAKR!yJsxWbdm7F4OhIiwmfQmk6g-eMpbbJU2yVkAbwkBFM4',
      birthday: new Date('1987-07-09 09:00:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Люда',
      photo: 'https://mega.nz/#!QsUF1a7D!TUeD8pLd-AdY83dLLlxM-tA2y5SrNUVBFWrf8fZ1IB0',
      birthday: new Date('1988-09-07 09:00:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('Patients', null, {});
  }
};
