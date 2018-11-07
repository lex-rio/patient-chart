'use strict';

var expect = require('expect.js');

describe('models/visitMed', function () {

  let visitMedId, patient, doctor, visit, med;

  before(async function() {
    this.Patient = require('../../models').Patient;
    this.Doctor = require('../../models').Doctor;
    this.Med = require('../../models').Med;
    this.Visit = require('../../models').Visit;
    this.VisitMed = require('../../models').VisitMed;
    let db = require('../../models').sequelize.sync();
    [patient, doctor] = await Promise.all([
      this.Patient.create({name: 'johndoe'}),
      this.Doctor.create({name: 'doctor1'})
    ]);
    [visit, med] = await Promise.all([
      this.Visit.create({DoctorId: doctor.id, PatientId: patient.id, diagnosis: 'autism'}),
      this.Med.create({name: 'Алерон'})
    ]);
    return db;
  });

  beforeEach(async function() {});

  describe('create', function () {
    it('creates a visitMed', async function () {
      let visitMed = await this.VisitMed.create({
        VisitId: visit.id,
        MedId: med.id,
        instructions: '3 раза в день после еды'
      });
      visitMedId = visitMed.id;
      expect(visitMed.instructions).to.be('3 раза в день после еды');
    });
  });

  describe('update', function () {
    it('update a visitMed', async function () {
      let visitMed = await this.VisitMed.findByPk(visitMedId);
      await visitMed.update({instructions: '4 раза в день после еды'});
      visitMed = await this.VisitMed.findByPk(visitMedId);
      expect(visitMed.instructions).to.be('4 раза в день после еды');
    });
  });

  describe('delete', function () {
    it('deletes a visitMed', async function () {
      let visitMed = await this.VisitMed.findByPk(visitMedId);
      await visitMed.destroy();
      visitMed = await this.VisitMed.findByPk(visitMedId);
      expect(visitMed).to.be(null);
    });
  })
});
