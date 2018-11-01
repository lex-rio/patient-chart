let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  req.db.Patient.findAll({
    attributes: ['id', 'name', 'birthday']
  }).then(result => {
    console.log(result);
    res.render('patient/index', {
      title: 'Patients list:',
      patients: result
    });
  });
});

router.get('/:id', (req, res) => {
  req.db.Patient.findAll({
    include: [{
      model: req.db.Visit
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
    // birthday: req.body.birth
  }).then(_ => {
    res.redirect('/patients');
  });
});

module.exports = router;
