'use strict';

var expect = require('expect.js');

describe('models/patient', function () {

  let patientId;

  before(function() {
    this.Patient = require('../../models').Patient;
    return require('../../models').sequelize.sync();
  });

  describe('create', function () {
    it('creates a patient', async function () {
      let patient = await this.Patient.create({name: 'patient1'});
      patientId = patient.id;
      expect(patient.name).to.be('patient1');
    });
  });

  describe('update', function () {
    it('update a patient', async function () {
      let patient = await this.Patient.findByPk(patientId);
      await patient.update({name: 'qwerty'});
      patient = await this.Patient.findByPk(patientId);
      expect(patient.name).to.be('qwerty');
    });
  });

  describe('delete', function () {
    it('deletes a patient', async function () {
      let patient = await this.Patient.findByPk(patientId);
      await patient.destroy();
      patient = await this.Patient.findByPk(patientId);
      expect(patient).to.be(null);
    });
  })
});
