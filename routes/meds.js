let router = require('express').Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
  req.db.Meds.findByPk(req.params.id).then(result => {
    res.render('visit/view', {
      title: `visit at ${result.date}:`,
      visit: result,
      meds: result.meds
    });
  });
});

module.exports = router;
