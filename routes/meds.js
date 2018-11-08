let router = require('express').Router();

router.get('/', async (req, res, next) => {
  let meds = await req.db.Med.findAll({
    attributes: ['id', 'name', 'atx', 'dosage_form', 'is_homeopathy', 'description']
  }).catch(next);
  res.render('meds/index', {
    title: 'Medicines list:',
    meds: meds
  });
});

router.get('/:id', async (req, res, next) => {
  let [med] = await req.db.Med.findAll({
    include: [{
      model: req.db.Visit,
      as: 'Visits',
      include: [
        {model: req.db.Doctor},
        {model: req.db.Patient}
      ]
    }],
    where: {id: req.params.id}
  }).catch(next);

  res.render('meds/view', {
    title: `${med.name} details:`,
    med: med,
    visits: med.Visits
  });
});

router.post('/attach', async (req, res, next) => {
  let [visit, med] = await Promise.all([
    req.db.Visit.findOne({ where: { id: req.body.visit_id } }),
    req.db.Med.findOne({ where: { name: req.body.meds } }),
  ]).catch(next);

  med = med || await req.db.Med.create({ name: req.body.meds });

  await req.db.VisitMed.create({
    MedId: med.id,
    VisitId: visit.id,
    instructions: req.body.instructions
  }).catch(next);
  res.redirect(`/visits/${req.body.visit_id}`);
});

router.post('/create', (req, res, next) => {
  req.db.Med.create(req.body)
    .then(med => res.redirect(`/meds/${med.id}`))
    .catch(next);
});

router.post('/:id/update', async (req, res, next) => {
  let med = await req.db.Med.findByPk(req.params.id)
    .catch(next);
  await med.update(req.body)
    .catch(next);
  res.redirect(`/meds/${med.id}`);
});

module.exports = router;
