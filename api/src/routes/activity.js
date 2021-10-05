const { Country, Activity } = require('../db.js');
const { Router } = require('express');
const { Op } = require('sequelize');

const router = Router();

router.post('/', async (req, res) => {
    const { name, difficulty, duration, season } = req.body;
    try {
        const activity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });
        res.send('Activity added successfully');
    }catch(e) {
        res.status(500).send('Server error.')
    }
})


module.exports = router;