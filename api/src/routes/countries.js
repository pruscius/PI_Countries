const { Router } = require('express');
const { Country, Activity, Activity_Country } = require('../db.js'); //importo los modelos conectados
const { Op } = require('sequelize')
const axios = require('axios');

const router = Router();

const getData = async (next) => {
    try {
        const allCountries = await Country.findAll(); //busco los paises en la DB
        if (!allCountries.length) {
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
        } else {
            return next();
        }
    } catch (e) {
        console.log(e);
    }
}

// invoco la función para obtener los datos de la API.
getData();

router.get('/', getData, async (req, res) => {
    // router.get('/', async (req, res) => {
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