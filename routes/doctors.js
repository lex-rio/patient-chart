let router = require('express').Router();

router.get('/', (req, res) => {
  req.db.Doctor.findAll({
    attributes: ['id', 'name', 'phone', 'specialization']
  }).then(result => {
    res.render('doctor/index', {
      title: 'Doctors list:',
      doctors: result
    });
  });
});

router.get('/:id', (req, res) => {
  req.db.Doctor.findAll({
    include: [{
      model: req.db.Visit,
      as: 'Visits',
      include: [{
        model: req.db.Patient
      }]
    }],
    where: {id: req.params.id}
  }).then(result => {
    res.render('doctor/view', {
      title: `Doctor details:`,
      doctor: result[0],
      visits: result[0].Visits
    });
  });
});

router.post('/create', (req, res) => {
  req.db.Doctor.create({
    name: req.body.fio,
    phone: req.body.phone,
    specialization: req.body.specialization,
  }).then(doctor => {
    res.redirect(`/doctors/${doctor.null}`);
  });
});

router.post('/:id/update', (req, res) => {
  req.db.Doctor.findByPk(req.params.id).then(doctor => {
    doctor.name = req.body.fio;
    doctor.phone = req.body.phone;
    doctor.specialization = req.body.specialization;
    doctor.save().then(_ => {
      res.redirect(`/doctors/${req.params.id}`);
    })
  });
});

module.exports = router;
