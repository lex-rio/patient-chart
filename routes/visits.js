let router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', async (req, res, next) => {
  let [[visit], meds] = await Promise.all([
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
  ]).catch(next);

  res.render('visit/view', {
    title: `visit at ${visit.date}:`,
    visit: visit,
    doctor: visit.Doctor,
    patient: visit.Patient,
    visitMeds: visit.VisitMeds,
    allMeds: meds
  });
});

router.post('/create', async (req, res, next) => {
  let [doctor, patient] = await Promise.all([
    req.db.Doctor.findOne({where: {name: req.body.doctor}}),
    req.db.Patient.findOne({where: {name: req.body.patient}})
  ]).catch(next);

  doctor = doctor || await req.db.Doctor.create({name: req.body.doctor});
  patient = patient || await req.db.Patient.create({name: req.body.patient});

  let visit = await req.db.Visit.create({
    diagnosis: req.body.diagnosis,
    DoctorId: doctor.id,
    PatientId: patient.id,
    date: new Date(req.body.datetime)
  }).catch(next);

  res.redirect(`/visits/${visit.id}`);
});

router.post('/:id/update', async (req, res, next) => {
  let visit = await req.db.Visit.findByPk(req.params.id)
    .catch(next);
  await visit.update(req.body)
    .catch(next);
  res.redirect(`/patients/${visit.id}`);
});

module.exports = router;
