const axios = require('axios');
const { Country } = require('../db.js')
// const { Country } = require('../models/Country.js');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const getData = async () => {
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
    } catch(e) {
        console.log(e);
    }
}
// invoco la función para obtener los datos de la API.
getData();


// ID (Código de 3 letras) *
// Nombre *
// Imagen de la bandera *
// Continente *
// Capital *
// Subregión
// Área
// Población

// const json = await getData();
// console.log(json);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
