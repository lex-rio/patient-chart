var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  req.db.all(
    `SELECT patient.patient_id, patient.name patient, datetime(treatment.date, 'unixepoch') date, doctor.doctor_id, doctor.name doctor
    FROM treatment
    JOIN patient USING(patient_id)
    JOIN doctor USING(doctor_id)
    WHERE treatment.treatment_id = ?;`,
    [req.params.id],
    (err, rows) => {
      console.log(rows);
      if (err) {
        throw err;
      }

      res.render('treatment', {
        title: `${rows[0].doctor} visited ${rows[0].patient} at ${rows[0].date} details:`,
        patient: rows[0],
        treatment: rows
      });
      console.log(rows);
    }
  );
});

module.exports = router;
