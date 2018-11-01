'use strict';
module.exports = (sequelize, DataTypes) => {
  let Patient = sequelize.define('Patient', {
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {});
  Patient.associate = function(models) {
    models.Patient.hasMany(models.Visit);
  };
  return Patient;
};