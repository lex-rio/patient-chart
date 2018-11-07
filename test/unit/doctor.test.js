'use strict';

var expect = require('expect.js');

describe('models/doctor', function () {

  let doctorId;

  before(function() {
    this.Doctor = require('../../models').Doctor;
    return require('../../models').sequelize.sync();
  });

  describe('create', function () {
    it('creates a doctor', async function () {
      let doctor = await this.Doctor.create({name: 'doctor1'});
      doctorId = doctor.id;
      expect(doctor.name).to.be('doctor1');
    });
  });

  describe('update', function () {
    it('update a doctor', async function () {
      let doctor = await this.Doctor.findByPk(doctorId);
      await doctor.update({name: 'qwerty'});
      doctor = await this.Doctor.findByPk(doctorId);
      expect(doctor.name).to.be('qwerty');
    });
  });

  describe('delete', function () {
    it('deletes a doctor', async function () {
      let doctor = await this.Doctor.findByPk(doctorId);
      await doctor.destroy();
      doctor = await this.Doctor.findByPk(doctorId);
      expect(doctor).to.be(null);
    });
  })
});
