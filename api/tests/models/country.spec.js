const { Country, Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

    describe('Country model', async ()=> {
      
      it('should contain attributes: id, name, flag, region, subregion, capital, area and population', 
      async () => {
        const country = await Country.findOne({where:{id: 'ARG'}});
        expect(country.dataValues).to.have.own.property('id');
        expect(country.dataValues).to.have.own.property('name');
        expect(country.dataValues).to.have.own.property('flag');
        expect(country.dataValues).to.have.own.property('region');
        expect(country.dataValues).to.have.own.property('subregion');
        expect(country.dataValues).to.have.own.property('population');
        expect(country.dataValues).to.have.own.property('capital');
        expect(country.dataValues).to.have.own.property('area');
      });
      it('attribute population must be an integer', async () => {
        const country = await Country.findOne({where:{id: 'ARG'}});
        expect(country.dataValues.population).to.be.a('number');
      })
      it('attribute name must be a string', async () => {
        const country = await Country.findOne({where:{id: 'ARG'}});
        expect(country.dataValues.name).to.be.a('string')
      })
    })
});





 // describe('Validators', () => {
  //   describe('name', () => {
  //     it('should throw an error if name is null', (done) => {
  //       Country.create({})
  //         .then(() => done(new Error('It requires a valid name')))
  //         .catch(() => done());
  //     });
  //     it('should work when its a valid name', () => {
  //       Country.create({ name: 'Argentina' });
  //     });
  //   });
  // });