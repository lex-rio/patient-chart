'use strict';
module.exports = (sequelize, DataTypes) => {
  const VisitMeds = sequelize.define('VisitMed', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    instructions: DataTypes.STRING,
    VisitId: DataTypes.INTEGER,
    MedId: DataTypes.INTEGER
  }, {});
  VisitMeds.associate = function(models) {
    models.VisitMed.belongsTo(models.Visit, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.VisitMed.belongsTo(models.Med, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return VisitMeds;
};