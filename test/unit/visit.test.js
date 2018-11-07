'use strict';

var expect = require('expect.js');

describe('models/visit', function () {

  let visitId, patient, doctor;

  before(async function() {
    this.Patient = require('../../models').Patient;
    this.Visit = require('../../models').Visit;
    this.Doctor = require('../../models').Doctor;
    let db = require('../../models').sequelize.sync();
    [patient, doctor] = await Promise.all([
      this.Patient.create({name: 'johndoe'}),
      this.Doctor.create({name: 'doctor1'})
    ]);
    return db;
  });

  beforeEach(async function() {});

  describe('create', function () {
    it('creates a visit', async function () {
      let visit = await this.Visit.create({
        DoctorId: doctor.id,
        PatientId: patient.id,
        diagnosis: 'autism'
      });
      visitId = visit.id;
      expect(visit.diagnosis).to.be('autism');
    });
  });

  describe('update', function () {
    it('update a visit', async function () {
      let visit = await this.Visit.findByPk(visitId);
      await visit.update({diagnosis: 'meteorism'});
      visit = await this.Visit.findByPk(visitId);
      expect(visit.diagnosis).to.be('meteorism');
    });
  });

  describe('delete', function () {
    it('deletes a visit', async function () {
      let visit = await this.Visit.findByPk(visitId);
      await visit.destroy();
      visit = await this.Visit.findByPk(visitId);
      expect(visit).to.be(null);
    });
  })
});
