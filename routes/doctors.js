let router = require('express').Router();

router.get('/', async (req, res, next) => {
  let doctors = await req.db.Doctor.findAll({
    attributes: ['id', 'name', 'phone', 'specialization']
  });
  res.render('doctor/index', {
    title: 'Doctors list:',
    doctors: doctors
  });
});

router.get('/:id', async (req, res, next) => {
  let [doctor] = await req.db.Doctor.findAll({
    include: [{
      model: req.db.Visit,
      as: 'Visits',
      include: [{
        model: req.db.Patient
      }]
    }],
    where: {id: req.params.id}
  }).catch(next);

  res.render('doctor/view', {
    title: `Doctor details:`,
    doctor: doctor,
    visits: doctor.Visits
  });
});

router.post('/create', (req, res, next) => {
  req.db.Doctor.create(req.body)
    .then(doctor => res.redirect(`/doctors/${doctor.id}`))
    .catch(next);
});

router.post('/:id/update', async (req, res, next) => {
  let doctor = await req.db.Doctor.findByPk(req.params.id)
    .catch(next);

  await doctor.update(req.body);
  res.redirect(`/doctors/${doctor.id}`);
});

module.exports = router;
