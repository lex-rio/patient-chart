'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Meds', [{
      name: 'Изофра',
      atx: 'R01A X08',
      dosage_form: 'спрей',
      is_homeopathy: 0,
      description: 'Спрей назальний, розчин. антибіотик з групи аміноглікозидів для місцевого застосування. Концентрація фраміцетину, яка досягається при місцевому застосуванні, забезпечує його бактерицидну активність по відношенню до грампозитивних та грамнегативних мікроорганізмів, які спричиняють розвиток інфекційних процесів у верхніх відділах дихальних шляхів',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Синупрет',
      atx: 'R05X',
      dosage_form: 'таблетки',
      is_homeopathy: 0,
      description: 'Під впливом препарату регулюється секреція і зменшується набряк тканин. Відновлюється дренаж і вентиляція навколоносових пазух, усувається закладеність носа, нормалізується захисна функція епітелію дихальних шляхів. Підвищується ефективність антибіотикотерапії.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Хеверт Синуситис',
      atx: 'R01A X08',
      dosage_form: 'таблетки',
      is_homeopathy: 1,
      description: 'діючі речовини:\\n\' +\n' +
        '    \'\\n\' +\n' +
        '    \'1 таблетка містить: Apis mellifica D4 – 10 мг, Baptisia tinctoria D4 – 5 мг, Cinnabaris (Hydrargyrum sulfide rubrum) D3 – 5 мг, Echinacea D2 – 30 мг, Hepar sulfuris D3 – 10 мг, Kalium bichromicum D8 – 30 мг, Lachesis mutus D8 – 10 мг, Luffa operculata D4 – 60 мг, Mercurius bijodatus D9 – 70 мг, Silicea D2 – 5 мг, Euspongia officinalis D6 – 10 мг;\\n\' +\n' +
        '    \'\\n\' +\n' +
        '    \'допоміжні речовини: лактоза, моногідрат, магнію стеарат, крохмаль кукурудзяний.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  ,
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Meds', null, {})
};
