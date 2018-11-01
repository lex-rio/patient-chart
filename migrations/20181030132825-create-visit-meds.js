'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('VisitMeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      instructions: {
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
      VisitId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'Visits',
          key: 'id'
        }
      },
      MedId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'Meds',
          key: 'id'
        }
      }
    })/*.then(_ =>
      queryInterface.addConstraint('visit_meds', ['visit_id'], {
        type: 'foreign key',
        name: 'fk_visit',
        references: {
          table: 'visits',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }).then(_ => {
        queryInterface.addConstraint('visit_meds', ['meds_id'], {
          type: 'foreign key',
          name: 'fk_meds',
          references: {
            table: 'meds',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      })
    )*/
  ,
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VisitMeds');
  }
};