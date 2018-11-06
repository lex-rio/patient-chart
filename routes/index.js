let router = require('express').Router();

router.get('/', (req, res) => {

  Promise.all([
    req.db.Visit.findAll({
      include: [
        { model: req.db.Doctor },
        { model: req.db.Patient }
      ]
    }),
    req.db.Doctor.findAll(),
    req.db.Patient.findAll()
  ]).then(([visits, doctors, patients]) => {
    res.render('visit/index', {
      title: 'Visits log',
      visits: visits,
      doctors: doctors,
      patients: patients
    });
  }).catch(err => res.status(400).send(err));
});

module.exports = router;
