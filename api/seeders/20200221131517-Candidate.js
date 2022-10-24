'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Candidates', [{
      candidateName: 'John',
      createdAt: new Date(),
      updatedAt: new Date(),
      candidateEmail: 'johnDoe@test.com',
      id: '06c57dbd-b35f-4d53-9088-60d120bcdb81'
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    queryInterface.bulkDelete('Candidates', [{
    }])
  }
};
