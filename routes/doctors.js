let createError = require('http-errors');
let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
  req.db.all(`SELECT * FROM doctor;`, [],
    (err, rows) => {
      if (err) {
        throw err;
      }

      res.render('doctor/index', {
        title: `Doctors list:`,
        doctors: rows
      });
    }
  );
});

router.get('/:id', (req, res, next) => {
  req.db.all(
    `SELECT doctor.*, 
            datetime(visit.date, 'unixepoch') date,
            visit.visit_id,
            patient.name patient,
            patient_id
    FROM doctor
    LEFT JOIN visit USING(doctor_id)
    LEFT JOIN patient USING(patient_id)
    WHERE doctor.doctor_id = ?;`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length !== 0) {
        res.render('doctor/view', {
          title: `${rows[0].name} details:`,
          doctor: rows[0],
          visits: rows
        });
      } else {
        next(createError(404));
      }
    }
  );
});

module.exports = router;
