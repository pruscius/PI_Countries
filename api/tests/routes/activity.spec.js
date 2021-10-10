/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { conn } = require('../../src/db.js');

const agent = session(app);

describe('Activity routes', () => {
    before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

    describe('GET /activities', () => {
        it('should respond with 200', () => {
            return agent.get('/activity')
                .then(res => {
                    console.log(res.body)
                    expect(res.status).to.equal(200)
                })
        })
    })

    describe('POST /activities', async () => {
        it('should respond with a success message if the activity was inserted into the table', () => {
            return agent.post('/activity')
                .send({name: 'Scuba Diving', difficulty: 5, duration: 3, seasons: ["Summer"], countryId: ['SYC']})
                .then(res=>{
                    expect(res.body).to.equal('Activity added successfully.')
                })
        })
    })
})