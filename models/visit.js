'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define('Visit', {
    date: DataTypes.INTEGER,
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
  };
  return Visit;
};