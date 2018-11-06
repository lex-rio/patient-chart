let router = require('express').Router();

router.get('/', async (req, res, next) => {
  let patients = await req.db.Patient.findAll({
    attributes: ['id', 'name', 'birthday']
  });
  res.render('patient/index', {
    title: 'Patients list:',
    patients: patients
  });
});

router.get('/:id', async (req, res, next) => {
  let [patient] = await req.db.Patient.findAll({
    include: [{
      model: req.db.Visit,
      as: 'Visits',
      include: [{
        model: req.db.Doctor
      }]
    }],
    where: {id: req.params.id}
  }).catch(next);

  res.render('patient/view', {
    title: `${patient.name} details:`,
    patient: patient,
    visits: patient.Visits
  });
});

router.post('/create', (req, res, next) => {
  req.db.Patient.create(req.body)
    .then(patient => res.redirect(`/patients/${patient.null}`))
    .catch(next);
});

router.post('/:id/update', async (req, res, next) => {
  let patient = await req.db.Doctor.findByPk(req.params.id)
    .catch(next);

  req.db.Patient.update(req.body)
    .then(patient => res.redirect(`/patients/${patient.id}`))
    .catch(next);
});

module.exports = router;
