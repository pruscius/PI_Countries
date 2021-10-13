const { Country, Activity } = require('../db.js');
const { Router } = require('express');
const { Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.json(activities);
    }catch(e){
        res.status(500).send('Server error.')
    }
})

router.post('/', async (req, res) => {
    const { name, difficulty, duration, countryId } = req.body;
    let { seasons } = req.body;
    seasons = seasons.join(', ')
    if ( name && difficulty && duration && countryId && seasons) {
        try {
            const activity = await Activity.findOrCreate({
                where: {
                    name: name,
                    difficulty: difficulty,
                    duration: duration,
                    seasons: seasons
                }
            });
            
            // Por cada countryId que recibo, busco el país que lo tiene, y creo el registro en la tabla
            // relacional
            for (var i = 0; i < countryId.length; i++) {
                const country = await Country.findOne({
                    where: {
                        id: countryId[i]
                    }
                });
                await activity[0].addCountry(country);
                // activity es un array. El primer elemento es un objeto llamado activity, que tiene los 
                // valores es a ese objeto que le agregamos el país para la tabla relacional.
            }
            res.json('Activity added successfully.');
        }catch(e) {
            console.log(e)
            res.status(500).json('Server error.')
        }
    } else {
        res.status(500).json('Your activity couldnt be created');
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Activity.destroy({
            where: {
                id: id
            }
        })
        res.send(`Activity ${id} eliminated`);
    } catch(e){
        res.status(500).send('Server error.')
    }
})

router.delete('/', async (req, res) => {
    try {
        const deletes = await Activity.destroy({
            where: {}
        });
        res.send('All the activities have been deleted');
    } catch(e){
        res.status(500).send('Server error.')
    }
})

module.exports = router;