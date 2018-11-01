let express = require('express');
let router = express.Router();

let dosageForms = {
  1: 'таблетки',
  2: 'свечи',
  3: 'суспензия',
  4: 'порошок',
  5: 'жидкость',
  6: 'спрей'
};

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
  req.db.Visit.findByPk(req.params.id).then(result => {
    res.render('visit/view', {
      title: `visit at ${result.date}:`,
      visit: result,
      meds: result.meds
    });
  });
});

router.post('/create', (req, res) => {
  Promise.all([
    req.db.Doctor.findOne({ where: { name: req.body.doctor } }),
    req.db.Patient.findOne({ where: { name: req.body.patient } })
  ]).then(([doctor, patient]) => {
    if (!doctor.id) {
      // create doctor
    }
    if (!patient.id) {
      // create patient
    }
    req.db.Visit.create({
      diagnosis: req.body.diagnosis,
      DoctorId: doctor.id,
      PatientId: patient.id,
    }).then(_ => {
      res.redirect('/');
    });
  });
});

module.exports = router;
