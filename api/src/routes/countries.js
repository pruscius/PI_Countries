const { Router } = require('express');
const { Country, Activity, Activity_Country } = require('../db.js'); //importo los modelos conectados
const { Op } = require('sequelize')
const axios = require('axios');

const router = Router();

// router.get('/', (req, res) => {
//     Country.findAll()
//         .then(response=>{
//             res.json(response)
//         }).catch(e=>res.json(e));
// })


// async function dataBase(req, res, next) {
//     try {
//         const allCountries = await Country.findAll(); //busco los paises en la DB

//         //si no hay nada
//         if (!allCountries.length) {
//             //hago la peticion a la API, recorro todo lo q me trae y voy creando paises con las condiciones requeridas
//             let countriesDB = await axios.get('https://restcountries.com/v2/all');
//             countriesDB = countriesDB.data.map(c => {
//                 return Country.create(

//                     {
//                         id: c.alpha3Code,
//                         name: c.name,
//                         flag: c.flag,
//                         region: c.region,
//                         capital: c.capital,
//                         subregion: c.subregion,
//                         area: c.area,
//                         population: c.population
//                     })
//             })
//             //una vez que se cumplieron todas las prmesas de la DB
//             //que continue
//             Promise.all(countriesDB)
//                 .then(response => next())
//         } else { //si ya estan los datos en la DB que continue
//             return next();
//         }
//     } catch (err) {
//         next(err)
//     }
// }

const getData = async (next) => {
    try {
        const data = await axios.get('https://restcountries.com/v2/all');
        // .data devuelve la data del get
        const json = data.data;
        for (var i = 0; i < json.length; i++) {
            const [country, created] = await Country.findOrCreate({
                where: {
                    name: json[i].name
                },
                defaults: {
                    id: json[i].alpha3Code,
                    name: json[i].name,
                    flag: json[i].flag,
                    region: json[i].region,
                    capital: json[i].capital,
                    subregion: json[i].subregion,
                    area: json[i].area,
                    population: json[i].population
                }
            })
        }
        return next();
    } catch (e) {
        console.log(e);
    }
};

getData();

router.get('/', dataBase, async (req, res) => {
    const { name, order, filter } = req.query;
    console.log(order, filter)
    if (order && filter) {
        console.log(order, filter);
        const countries = await Country.findAll({
            where: {
                region: filter
            },
            order: [
                ['name', order]
            ]
        });
        res.json(countries);
    } else if (name) {
        try {
            const country = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                // include: Activity
            });
            res.send(country.length > 0 ? country : 'No country found.');
        } catch (e) {
            res.status(500).send('Server error.');
        }
    } else if (order === 'asc') {
        const orderedCountries = await Country.findAll({
            order: [
                ['name', 'ASC'],
                ['population', 'ASC']
            ]
        });
        res.json(orderedCountries)
    } else if (order === 'desc') {
        const orderedCountries = await Country.findAll({
            order: [
                ['name', 'DESC']
            ]
        });
        res.json(orderedCountries);
    } else if (filter) {
        try {
            const filteredCountries = await Country.findAll({
                where: {
                    region: filter
                }
            })
            res.json(filteredCountries);
        } catch (e) {
            res.json(e)
        }

    } else {
        try {
            const countries = await Country.findAll({
                include: Activity
            });
            res.send(countries.length > 0 ? countries : 'No countries found.');
        } catch (e) {
            res.status(500).send('Server error.')
        }
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    id = id.toUpperCase();
    try {
        const country = await Country.findByPk(id, {
            include: [{
                model: Activity,
                through: {
                    attributes: []
                }
            }]
        })
        res.send(country ? country : 'No country found.');
    } catch (e) {
        res.status(500).json('Server error.')
    }
})

module.exports = router;