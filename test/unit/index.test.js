'use strict';

let expect = require('expect.js');

describe('models/index', _ => {
  it('returns the doctor model', function () {
    let models = require('../../models');
    expect(models.Doctor).to.be.ok();
  });

  it('returns the patient model', function () {
    let models = require('../../models');
    expect(models.Patient).to.be.ok();
  });

  it('returns the visit model', function () {
    let models = require('../../models');
    expect(models.Visit).to.be.ok();
  });

  it('returns the meds model', function () {
    let models = require('../../models');
    expect(models.Meds).to.be.ok();
  });
});