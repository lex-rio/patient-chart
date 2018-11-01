let router = require('express').Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
  req.db.Visit.findAll({
    include: [
      { model: req.db.Doctor },
      { model: req.db.Patient },
      { model: req.db.Med }
    ],
    where: {id: req.params.id}
  }).then(result => {
    let visit = result[0];
    res.render('visit/view', {
      title: `visit at ${visit.date}:`,
      visit: visit,
      meds: visit.Meds
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
      date: new Date(req.body.datetime)
    }).then(_ => {
      res.redirect('/');
    });
  });
});

module.exports = router;
