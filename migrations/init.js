#!/usr/bin/env node
const
  config = require('./../config'),
  sqlite3 = require('sqlite3').verbose(),

  // moks
  patients = [
    ['Полина', '', 1461877200],
    ['Максим', '', 1561877200]
  ],
  doctors = [
    ['Нардова Наталья Батьковна', '1233345'],
    ['Кандаурова Елена Николаевна', '0954993276'],
    ['Таран Лариса Владимировна', '0505950379']
  ],
  meds = [
    ['Изофра', 'R01A X08', 6, 0, 'Спрей назальний, розчин. антибіотик з групи аміноглікозидів для місцевого застосування. Концентрація фраміцетину, яка досягається при місцевому застосуванні, забезпечує його бактерицидну активність по відношенню до грампозитивних та грамнегативних мікроорганізмів, які спричиняють розвиток інфекційних процесів у верхніх відділах дихальних шляхів'],
    ['Синупрет', 'R05X', 1, 0, 'Під впливом препарату регулюється секреція і зменшується набряк тканин. Відновлюється дренаж і вентиляція навколоносових пазух, усувається закладеність носа, нормалізується захисна функція епітелію дихальних шляхів. Підвищується ефективність антибіотикотерапії.'],
    ['Хеверт Синуситис', '', 1, 1, 'діючі речовини:\n' +
    '\n' +
    '1 таблетка містить: Apis mellifica D4 – 10 мг, Baptisia tinctoria D4 – 5 мг, Cinnabaris (Hydrargyrum sulfide rubrum) D3 – 5 мг, Echinacea D2 – 30 мг, Hepar sulfuris D3 – 10 мг, Kalium bichromicum D8 – 30 мг, Lachesis mutus D8 – 10 мг, Luffa operculata D4 – 60 мг, Mercurius bijodatus D9 – 70 мг, Silicea D2 – 5 мг, Euspongia officinalis D6 – 10 мг;\n' +
    '\n' +
    'допоміжні речовини: лактоза, моногідрат, магнію стеарат, крохмаль кукурудзяний.']
  ],
  visits = [
    [1561877200, 1, 2, 'синусит'],
    [1561877200, 1, 1, 'ринит'],
    [1561877200, 2, 1, 'депрессия'],
    [1561877200, 2, 2, 'колики']
  ],
  visit_meds = [
    [1, 1, '3 раза в день после еды'],
    [2, 2, '1 раз в день утром'],
    [1, 2, 'натощак 2 раза в день'],
    [2, 1, ''],
    [1, 3, 'пофиг, гомеопатия же'],
    [2, 3, 'пофиг, гомеопатия же'],
    [3, 3, 'пофиг, гомеопатия же'],
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
            patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
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
            doctor_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            phone text
        );`,
  [],
  err => {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`table doctor created successfully`);
    fillTable('doctor', doctors, 'name, phone');
  }
);

db.run(`CREATE TABLE IF NOT EXISTS meds (
            meds_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            atx text NOT NULL,
            dosage_form INTEGER NULL,
            description text NOT NULL,
            is_homeopathy INTEGER DEFAULT 0
        );`,
  [],
  err => {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`table meds created successfully`);
    fillTable('meds', meds, 'name, atx, dosage_form, is_homeopathy, description');
  }
);

db.run(`CREATE TABLE IF NOT EXISTS visit (
            visit_id INTEGER PRIMARY KEY AUTOINCREMENT,
            date INTEGER NOT NULL,
            doctor_id INTEGER NOT NULL,
            patient_id INTEGER NOT NULL,
            diagnosis text NULL,
            FOREIGN KEY(doctor_id) REFERENCES doctor(doctor_id),
            FOREIGN KEY(patient_id) REFERENCES patient(patient_id)
        );`,
  [],
  err => {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`table visit created successfully`);
    fillTable('visit', visits, 'date, doctor_id, patient_id, diagnosis');
  }
);

db.run(`CREATE TABLE IF NOT EXISTS visit_meds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            visit_id INTEGER,
            meds_id INTEGER,
            instructions text NULL,
            FOREIGN KEY(visit_id) REFERENCES visit(visit_id),
            FOREIGN KEY(meds_id) REFERENCES meds(meds_id)
        );`,
  [],
  err => {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`table visit_meds created successfully`);
    fillTable('visit_meds', visit_meds, 'visit_id, meds_id, instructions');
  }
);


db.close();