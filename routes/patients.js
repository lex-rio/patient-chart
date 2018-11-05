let router = require('express').Router();

router.get('/', (req, res) => {
  req.db.Patient.findAll({
    attributes: ['id', 'name', 'birthday']
  }).then(result => {
    res.render('patient/index', {
      title: 'Patients list:',
      patients: result
    });
  });
});

router.get('/:id', (req, res) => {
  req.db.Patient.findAll({
    include: [{
      model: req.db.Visit,
      as: 'Visits',
      include: [{
        model: req.db.Doctor
      }]
    }],
    where: {id: req.params.id}
  }).then(result => {
    let patient = result[0];
    res.render('patient/view', {
      title: `${patient.name} details:`,
      patient: patient,
      visits: patient.Visits
    });
  });
});

router.post('/create', (req, res) => {
  req.db.Patient.create({
    name: req.body.name,
    photo: req.body.photo,
    birthday: new Date(req.body.birth)
  }).then(patient => {
    res.redirect(`/patients/${patient.null}`);
  });
});

router.post('/:id/update', (req, res) => {
  req.db.Patient.findByPk(req.params.id).then(patient => {
    patient.name = req.body.name;
    patient.photo = req.body.photo;
    patient.birthday = req.body.birthday;
    patient.save().then(_ => {
      res.redirect(`/patients/${req.params.id}`);
    })
  });
});

module.exports = router;
