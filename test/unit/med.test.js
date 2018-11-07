'use strict';

var expect = require('expect.js');

describe('models/med', function () {

  let medId;

  before(function() {
    this.Med = require('../../models').Med;
    return require('../../models').sequelize.sync();
  });

  describe('create', function () {
    it('creates a medicine', async function () {
      let medicine = await this.Med.create({name: 'Алерон'});
      medId = medicine.id;
      expect(medicine.name).to.be('Алерон');
    });
  });

  describe('update', function () {
    it('update a medicine', async function () {
      let medicine = await this.Med.findByPk(medId);
      await medicine.update({name: 'Алерон Форте'});
      medicine = await this.Med.findByPk(medId);
      expect(medicine.name).to.be('Алерон Форте');
    });
  });

  describe('delete', function () {
    it('deletes a medicine', async function () {
      let medicine = await this.Med.findByPk(medId);
      await medicine.destroy();
      medicine = await this.Med.findByPk(medId);
      expect(medicine).to.be(null);
    });
  })
});
