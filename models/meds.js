'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meds = sequelize.define('Meds', {
    name: DataTypes.STRING,
    atx: DataTypes.STRING,
    dosage_form: DataTypes.STRING,
    description: DataTypes.STRING,
    is_homeopathy: DataTypes.TINYINT
  }, {});
  Meds.associate = models => {
    // Meds.belongsToMany(models.Visit, { through: UserProject });
  };
  return Meds;
};