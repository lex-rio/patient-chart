let router = require('express').Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
  Promise.all([
    req.db.Visit.findAll({
      include: [
        { model: req.db.Doctor },
        { model: req.db.Patient },
        {
          model: req.db.VisitMed,
          include: [{
            model: req.db.Med,
          }]
        }
      ],
      where: {id: req.params.id}
    }),
    req.db.Med.findAll(),
  ]).then(([visits, meds]) => {
    res.render('visit/view', {
      title: `visit at ${visits[0].date}:`,
      visit: visits[0],
      doctor: visits[0].Doctor,
      patient: visits[0].Patient,
      visitMeds: visits[0].VisitMeds,
      allMeds: meds
    });
  }).catch(err => res.status(400).send(err));
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
    }).then(visit => {
      res.redirect(`/visits/${visit.null}`);
    });
  }).catch(err => res.status(400).send(err));
});

router.post('/:id/update', (req, res) => {
  req.db.Visit.findByPk(req.params.id).then(visit => {
    visit.diagnosis = req.body.diagnosis;
    visit.photo = req.body.photo;
    visit.birthday = req.body.birthday;
    visit.save().then(_ => {
      res.redirect(`/patients/${req.params.id}`);
    })
  }).catch(err => res.status(400).send(err));
});

module.exports = router;
