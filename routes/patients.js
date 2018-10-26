var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => {
  req.db.all(
    `SELECT patient.*, treatment.treatment_id, treatment.date, doctor.name doctor
    FROM patient
    JOIN treatment USING(patient_id)
    JOIN doctor USING(doctor_id)
    WHERE patient.patient_id = ?;`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        throw err;
      }

      res.render('patient', {title: `${rows[0].name} details:`, patient: rows[0], treatments: rows});
      console.log(rows);
    }
  );
});

module.exports = router;
