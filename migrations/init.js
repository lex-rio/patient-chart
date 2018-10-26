#!/usr/bin/env node
const
  config = require('./../config'),
  sqlite3 = require('sqlite3').verbose(),
  patients = [
    ['Полина', '', 1461877200],
    ['Максим', '', 1561877200]
  ],
  doctors = [
    ['Нардова Наталья Батьковна'],
    ['Кандаурова Елена Николаевна']
  ],
  meds = [
    ['Изофра', 'R01A X08', 'Спрей назальний, розчин. антибіотик з групи аміноглікозидів для місцевого застосування. Концентрація фраміцетину, яка досягається при місцевому застосуванні, забезпечує його бактерицидну активність по відношенню до грампозитивних та грамнегативних мікроорганізмів, які спричиняють розвиток інфекційних процесів у верхніх відділах дихальних шляхів'],
    ['Синупрет', 'R05X', 'Під впливом препарату регулюється секреція і зменшується набряк тканин. Відновлюється дренаж і вентиляція навколоносових пазух, усувається закладеність носа, нормалізується захисна функція епітелію дихальних шляхів. Підвищується ефективність антибіотикотерапії.']
  ],
  treatments = [
    [1561877200, 1, 2],
    [1561877200, 1, 1],
    [1561877200, 2, 1],
    [1561877200, 2, 2]
  ];

let db = new sqlite3.Database(config.db.name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

const fillTable = (table, data, fields) => {
  if (!data) {
    return;
  }
  const placeholders = data.map((row) => `(${'?,'.repeat(row.length).slice(0, -1)})`).join();
  const sql = `INSERT INTO ${table}(${fields}) VALUES ${placeholders}`;
  console.log(sql);
  db.run(sql, [].concat(...data), err => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`${this.changes} rows inserted into ${table} table`);
  });
};

//----------------------------PATIENT TABLE-------------------------------------

db.run(`CREATE TABLE IF NOT EXISTS patient (
            patient_id integer PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            photo text DEFAULT NULL,
            birthday INTEGER NOT NULL
        );`,
  [],
  err => {
    if (err) {
      return console.log(err.message);
    }
    console.log(`table patient created successfully`);
    fillTable('patient', patients, 'name, photo, birthday');
  }
);

db.run(`CREATE TABLE IF NOT EXISTS doctor (
            doctor_id integer PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL
        );`,
  [],
  err => {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`table doctor created successfully`);
    fillTable('doctor', doctors, 'name');
  }
);

db.run(`CREATE TABLE IF NOT EXISTS meds (
            meds_id integer PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            atx text NOT NULL,
            description text NOT NULL
        );`,
  [],
  err => {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`table meds created successfully`);
    fillTable('meds', meds, 'name, atx, description');
  }
);

db.run(`CREATE TABLE IF NOT EXISTS treatment (
            treatment_id integer PRIMARY KEY AUTOINCREMENT,
            date INTEGER NOT NULL,
            doctor_id INTEGER NOT NULL,
            patient_id INTEGER NOT NULL,
            FOREIGN KEY(doctor_id) REFERENCES doctor(doctor_id),
            FOREIGN KEY(patient_id) REFERENCES patient(patient_id)
        );`,
  [],
  err => {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`table treatment created successfully`);
    fillTable('treatment', treatments, 'date, doctor_id, patient_id');
  }
);


db.close();