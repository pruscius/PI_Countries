const { Router } = require('express');
const { Country, Activity, Activity_Country } = require('../db.js'); //importo los modelos conectados
const { Op } = require('sequelize')
const axios = require('axios');

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    if (name) {
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
        } catch(e) {
            res.status(500).send('Server error.');
        }
    } else {
        try {
            const countries = await Country.findAll({
                include: Activity
            });
            // console.log(countries);
            res.send(countries.length > 0 ? countries : 'No countries found.');
        } catch(e){
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