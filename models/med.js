'use strict';
module.exports = (sequelize, DataTypes) => {
  const Med = sequelize.define('Med', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    atx: DataTypes.STRING,
    dosage_form: DataTypes.STRING,
    description: DataTypes.STRING,
    is_homeopathy: DataTypes.TINYINT
  }, {});
  Med.associate = models => {
    models.Med.belongsToMany(models.Visit, {through: models.VisitMed});
    models.Med.hasMany(models.VisitMed);
  };
  return Med;
};