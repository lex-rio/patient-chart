'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define('Visit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: DataTypes.DATE,
    diagnosis: DataTypes.STRING,
    DoctorId: DataTypes.INTEGER,
    PatientId: DataTypes.INTEGER
  }, {});
  Visit.associate = function(models) {
    models.Visit.belongsTo(models.Patient, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Visit.belongsTo(models.Doctor, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Visit.belongsToMany(models.Med, {through: models.VisitMed});
    models.Visit.hasMany(models.VisitMed);
  };
  return Visit;
};