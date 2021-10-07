import axios from 'axios';

// const SEARCH_COUNTRY = "SEARCH_COUNTRY";
const GET_COUNTRIES = "GET_COUNTRIES";
const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
// const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
const ORDER_ALPH = "ORDER_ALPH";

export function getCountries () {
    return async function(dispatch) {
        try{
            let countries = await axios.get('http://localhost:3001/countries');
            dispatch({
                type: GET_COUNTRIES,
                payload: countries.data
            });
        }catch(e){
            console.log(e);
        }
    }
}

export function filterByContinent (payload) {
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function orderAlph(payload) {
    return {
        type: ORDER_ALPH,
        payload
    }
}
// export function filterActivity (apyload) {
//     return {
//             type: FILTER_BY_ACTIVITY,
//             payload
//     }
// }

// export function searchCountry (country) {
//     return {
//         type: SEARCH_COUNTRY,
//         payload: country
//     }

// }

// export function fetchCountry (country) {
//     return function (dispatch) {
//         fetch(`localhost:3001/countries?name=${country}`)
//             .then(response => response.json())
//             .then(data => {
//                 let countries = data.map(c => {
//                 return {
//                     id: c.id,
//                     name: c.name
//                 }
//             })
//             dispatch(searchCountry(countries));
//         })
//         .catch(e => console.log(e))
//         }
// }