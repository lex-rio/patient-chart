'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    specialization: DataTypes.STRING
  }, {});
  Doctor.associate = function(models) {
    models.Doctor.hasMany(models.Visit);
    models.Doctor.belongsToMany(models.Patient, {through: models.Visit});
  };
  return Doctor;
};