import axios from 'axios';
// const axios = require('axios');

const SEARCH_COUNTRY = "SEARCH_COUNTRY";
const GET_COUNTRIES = "GET_COUNTRIES";

export function getCountries () {
    return async function(dispatch) {
        try{
            let countries = await axios.get('http://localhost:3001/countries');
            countries = countries.data;
            countries = countries.map(c=> {
                return {
                    id: c.id,
                    name: c.name,
                    region: c.region,
                    flag: c.flag
                }
            })
            dispatch({
                type: GET_COUNTRIES,
                payload: countries
            });
        }catch(e){
            console.log(e);
        }
    }
}

// export function getCountries(){
//     return function (dispatch){
//         return axios.get('http://localhost:3001/countries')
//             .then(c=>{
//                 return {
//                     id: c.id,
//                     name: c.name,
//                     flag: c.flag,
//                     region: c.region
//                 }
//             })
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