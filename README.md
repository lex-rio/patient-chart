# patient-chart
patient chart history of meds with analysis and tips.

Mobile friendly

[Express](https://expressjs.com) application using ORM Sequelize.

## Requirements

[node 8](https://nodejs.org)
To install node for Linux see [https://github.com/taaem/nodejs-linux-installer](https://github.com/taaem/nodejs-linux-installer)

[npm](https://www.npmjs.com/)

[Git](https://git-scm.com/)

## Common setup

Clone the repo and install the dependencies.

```
git clone https://github.com/lex-rio/patient-chart.git
cd patient-chart
npm install
```
Migrate
```
node_modules/.bin/sequelize db:migrate
```

## Starting App

```
npm start
```
**Debug mode**

```
SET DEBUG=patient-chart:* & npm run devstart
```

This will start the application and create an sqlite database in your app dir.
Just open [http://localhost:3000](http://localhost:3000).

## Running Tests

We have some [Mocha](https://mochajs.org) based test. You can run them by `npm test`