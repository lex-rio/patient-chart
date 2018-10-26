var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => {
  req.db.all(
    `SELECT *
    FROM doctor
    WHERE doctor.doctor_id = ?;`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        throw err;
      }

      res.render('doctor', {title: `${rows[0].name} details:`, doctor: rows[0]});
    }
  );
});

module.exports = router;
