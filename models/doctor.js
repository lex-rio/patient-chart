'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    specialization: DataTypes.STRING
  }, {});
  Doctor.associate = function(models) {
    models.Doctor.hasMany(models.Visit);
  };
  return Doctor;
};