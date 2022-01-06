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
}

// invoco la función para obtener los datos de la API.
getData();

//set client_encoding to 'utf8' -- for postgres functioning

async function dataBase(req, res, next) {
    try {
        const allCountries = await Country.findAll(); //busco los paises en la DB

        //si no hay nada
        if (!allCountries.length) {
            //hago la peticion a la API, recorro todo lo q me trae y voy creando paises con las condiciones requeridas
            let countriesDB = await axios.get('https://restcountries.com/v2/all');
            countriesDB = countriesDB.data.map(c => {
                return Country.create(

                    {
                        id: c.alpha3Code,
                        name: c.name,
                        flag: c.flag,
                        region: c.region,
                        capital: c.capital,
                        subregion: c.subregion,
                        area: c.area,
                        population: c.population
                    })
            })
            //una vez que se cumplieron todas las prmesas de la DB
            //que continue
            Promise.all(countriesDB)
                .then(response => next())
        } else { //si ya estan los datos en la DB que continue
            return next();
        }
    } catch (err) {
        next(err)
    }
}