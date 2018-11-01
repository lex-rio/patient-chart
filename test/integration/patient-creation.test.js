'use strict';

var app      = require('../../app');
var Bluebird = require('bluebird');
var expect   = require('expect.js');
var request  = require('supertest');

describe('patient creation page', _ => {

  before(_ => require('../../models').sequelize.sync());
  
  beforeEach(_ => {
    this.models = require('../../models');

    return Bluebird.all([
      this.models.Patient.destroy({ truncate: true }),
      this.models.Visit.destroy({ truncate: true })
    ]);
  });

  it('loads correctly', done => {
    request(app).get('/').expect(200, done);
  });

  it('lists a patient if there is one', done => {
    this.models.Patient.create({
      name: 'johndoe',
      photo: 'https://mega.nz/#!F9dwUAKR!yJsxWbdm7F4OhIiwmfQmk6g-eMpbbJU2yVkAbwkBFM4'
    }).then(_ => {
      request(app).get('/').expect(/johndoe/, done);
    })
  });

  it('lists the tickets for the patient if available', done => {
    this.models.Patient.create({ name: 'johndoe' }).then(user =>
      this.models.Visit.create({ title: 'johndoe visit', PatientId: patient.id })
    ).then(_ => {
      request(app).get('/').expect(/johndoe visit/, done);
    });
  });
});
