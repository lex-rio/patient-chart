let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  req.db.all(`SELECT  visit.*, 
                      datetime(visit.date, 'unixepoch') date, 
                      patient.name patient, 
                      doctor.name doctor 
              FROM visit 
              JOIN patient USING(patient_id)
              JOIN doctor USING(doctor_id);`, [], (err, rows) => {
    if (err) {
      throw err;
    }

    res.render('index', {title: 'Visits log', visits: rows});
  });

});

module.exports = router;
