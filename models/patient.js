'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {});
  Patient.associate = function(models) {
    models.Patient.hasMany(models.Visit);
    models.Patient.belongsToMany(models.Doctor, {through: models.Visit});
  };
  return Patient;
};