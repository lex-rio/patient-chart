let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => {
  req.db.all(
    `SELECT meds.*, 
            visit.visit_id, 
            visit.date,
            doctor.name doctor,
            doctor_id
    FROM meds
    JOIN visit_meds USING(meds_id)
    JOIN visit USING(visit_id)
    JOIN doctor USING(doctor_id)
    WHERE meds.meds_id = ?;`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length !== 0) {
        res.render('meds/view', {
          title: `${rows[0].name} details:`,
          med: rows[0],
          visits: rows
        });
      } else {
        next(createError(404));
      }
    }
  );
});

module.exports = router;
