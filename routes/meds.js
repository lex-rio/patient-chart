let router = require('express').Router();

router.get('/', (req, res) => {
  req.db.Med.findAll({
    attributes: ['id', 'name', 'atx', 'dosage_form', 'is_homeopathy', 'description']
  }).then(result => {
    res.render('meds/index', {
      title: 'Medicines list:',
      meds: result
    });
  }).catch(err => res.status(400).send(err));
});

router.get('/:id', (req, res) => {
  req.db.Med.findByPk(req.params.id).then(result => {
    res.render('meds/view', {
      title: `${result.name} details:`,
      med: result
    });
  }).catch(err => res.status(400).send(err));
});

router.post('/create', (req, res) => {
  req.db.Med.findOne({
    where: { name: req.body.meds }
  }).then(med => {
    req.db.VisitMed.create({
      MedId: med.id,
      VisitId: req.body.visit_id,
      instructions: req.body.instructions
    }).then(_ => {
      res.redirect(`/visits/${req.body.visit_id}`);
    });
  }).catch(err => res.status(400).send(err));
});

module.exports = router;
