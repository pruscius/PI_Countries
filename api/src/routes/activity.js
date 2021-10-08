const { Country, Activity } = require('../db.js');
const { Router } = require('express');
const { Op } = require('sequelize');

const router = Router();

router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countryId } = req.body;
    console.log(name, difficulty, duration, season);
    try {
        const activity = await Activity.findOrCreate({
            where: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season
            }
        });

        for (var i = 0; i < countryId.length; i++) {
            const country = await Country.findOne({
                where: {
                    id: countryId[i]
                }
            });
            await activity.addCountry(country);
        }
        // res.json(activity);
        res.send('Activity added successfully');
    }catch(e) {
        console.log(e)
        res.status(500).send('Server error.')
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (id) {
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
    } else {
        try {
            const deletes = await Activity.destroy();
            res.send('All the activities have been deleted');
        } catch(e){
            res.status(500).send('Server error.')
        }
    }
})


module.exports = router;