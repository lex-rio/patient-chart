let createError = require('http-errors');
let express = require('express');
let router = express.Router();

let dosageForms = {
  1: 'таблетки',
  2: 'свечи',
  3: 'суспензия',
  4: 'порошок',
  5: 'жидкость',
  6: 'спрей'
};

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => {
  req.db.all(
    `SELECT patient.patient_id,
            patient.name patient,
            datetime(visit.date, 'unixepoch') date,
            diagnosis,
            doctor.doctor_id,
            doctor.name doctor,
            visit_meds.instructions,
            meds.*,
            meds.name meds_name
    FROM visit
    JOIN patient USING(patient_id)
    JOIN doctor USING(doctor_id)
    LEFT JOIN visit_meds USING (visit_id)
    LEFT JOIN meds USING (meds_id)
    WHERE visit.visit_id = ?;`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length !== 0) {
        res.render('visit', {
          title: `visit at ${rows[0].date}:`,
          visit: rows[0],
          meds: rows
        });
      } else {
        next(createError(404));
      }
    }
  );
});

module.exports = router;
