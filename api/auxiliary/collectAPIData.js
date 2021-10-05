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
    } catch(e) {
        console.log(e);
    }
}
// invoco la función para obtener los datos de la API.
getData();

// redux-thunk
// react-router-dom
// react-redux redux
// Axios
// redux-devtools-extension

//set client_encoding to 'utf8'