const { Router } = require('express');
const { Country, Activity, Activity_Country } = require('../db.js'); //importo los modelos conectados
const { Op } = require('sequelize')
const axios = require('axios');

const router = Router();

// router.get('/', getData, async (req, res) => {
router.get('/', async (req, res) => {
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