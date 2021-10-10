/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { conn } = require('../../src/db.js');

const agent = session(app);


describe('Countries routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  describe('GET /countries', () => {
    it('should respond with 200', () => {
     return agent.get('/countries')
      .then(res => {
      expect(res.status).to.equal(200);
    })
    });
    it('should get all ~250 countries', () => {
      return agent.get('/countries')
       .then(res => {
       expect(res.body.length).to.be.above(200);
     })
     });
  });

  describe('GET /countries/:id', () => {
    it('should respond with 200', () => {
      return agent.get('/countries/ARG')
       .then(res => {
         expect(res.status).to.equal(200);
       })
    })
    it('should respond with the country with that id', () => {
      return agent.get('/countries/ARG')
       .then(res => {
         expect(res.body.id).to.equal('ARG');
       })
    })
  })

  describe('GET /countries?name=name', () => {
    it('should respond with the countries that contain the name sent by query as a name substring', () => {
      return agent.get('/countries?name=Bra')
        .then(res => {
          console.log(res.body[0].id)
          expect(res.status).to.equal(200)
          expect(res.body.length).to.equal(2)
          expect(res.body[0].id).to.equal('BRA')
        })
    })

  })
});
