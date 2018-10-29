let createError = require('http-errors');
let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
  req.db.all(`SELECT * FROM patient;`, [],
    (err, rows) => {
      if (err) {
        throw err;
      }

      res.render('patient/index', {
        title: `Patients list:`,
        patients: rows
      });
    }
  );
});

router.get('/:id', (req, res, next) => {
  req.db.all(
    `SELECT patient.*, 
            visit.visit_id, 
            datetime(visit.date, 'unixepoch') date, 
            doctor.name doctor,
            doctor_id
    FROM patient
    LEFT JOIN visit USING(patient_id)
    LEFT JOIN doctor USING(doctor_id)
    WHERE patient.patient_id = ?;`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length !== 0) {
        res.render('patient/view', {
          title: `${rows[0].name} details:`,
          patient: rows[0],
          visits: rows
        });
      } else {
        next(createError(404));
      }
    }
  );
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  req.db.run(
    `INSERT INTO patient (name, photo, birthday) VALUES (?,?,?)`,
    [req.body.name, req.body.photo, req.body.birth],
    err => {
      if (err) {
        return console.log(err.message);
      }
    }
  );
  res.render('patient/index', {
    title: `Patients list:`,
    patients: 1
  });
});

module.exports = router;
