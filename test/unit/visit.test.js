'use strict';

var expect = require('expect.js');

describe('models/visit', function () {

  before(function() {
    return require('../../models').sequelize.sync();
  });

  beforeEach(function() {
    this.Patient = require('../../models').Patient;
    this.Visit = require('../../models').Visit;
    this.Doctor = require('../../models').Doctor;
    this.Med = require('../../models').Med;
  });

  describe('create', function () {
    it('creates a visit', function () {
      return Promise.all([
        this.Patient.create({name: 'johndoe'}),
        this.Doctor.create({name: 'doctor1'})
      ])
        .then(([patient, doctor]) =>
          this.Visit.create({
            DoctorId: doctor.id,
            PatientId: patient.id,
            diagnosis: 'autism'
          }).then(function (visit) {
            expect(visit.diagnosis).to.equal('autism');
          })
        );
    });
  });
});
