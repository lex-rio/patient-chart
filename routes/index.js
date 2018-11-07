let router = require('express').Router();

router.get('/', async (req, res, next) => {
  let [visits, doctors, patients] = await Promise.all([
    req.db.Visit.findAll({
      include: [
        { model: req.db.Doctor },
        { model: req.db.Patient }
      ]
    }),
    req.db.Doctor.findAll(),
    req.db.Patient.findAll()
  ]).catch(next);

  res.render('visit/index', {
    title: 'Visits log',
    visits: visits,
    doctors: doctors,
    patients: patients
  });
});

module.exports = router;
