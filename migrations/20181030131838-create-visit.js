'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Visits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      diagnosis: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      DoctorId: {
        type: Sequelize.INTEGER/*,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'Doctor',
          key: 'id'
        }*/
      },
      PatientId: {
        type: Sequelize.INTEGER/*,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'Patients',
          key: 'id'
        }*/
      }
    }).then(_ => queryInterface.addConstraint('Visits', ['DoctorId'], {
      type: 'foreign key',
      name: 'fk_doctor',
      references: {
        table: 'doctors',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(_ => queryInterface.addConstraint('Visits', ['PatientId'], {
      type: 'foreign key',
      name: 'fk_patient',
      references: {
        table: 'patients',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }))),
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Visits');
  }
};