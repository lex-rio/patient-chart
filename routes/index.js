var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // console.log('------------------------------BEFORE------------------------------');
  req.db.all(`SELECT treatment.*, datetime(treatment.date, 'unixepoch') date, patient.name patient, doctor.name doctor 
              FROM treatment 
              JOIN patient USING(patient_id)
              JOIN doctor USING(doctor_id);`, [], (err, rows) => {
    if (err) {
      throw err;
    }

    res.render('index', {title: 'Treatments log', treatments: rows});
    // console.log(rows);
  });
  // console.log('------------------------------AFTER------------------------------');

});

module.exports = router;
