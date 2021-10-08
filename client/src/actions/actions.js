import axios from 'axios';

// const SEARCH_COUNTRY = "SEARCH_COUNTRY";
const GET_COUNTRIES = "GET_COUNTRIES";
const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
// const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
const GET_COUNTRY_NAME = "GET_COUNTRY_NAME";
const ORDER_COUNTRIES = "ORDER_COUNTRIES";
// const ORDER_ASC_DESC = "ORDER_ASC_DESC";
// const POST_ACTIVITY = "POST_ACTIVITY";
const GET_DETAILS = "GET_DETAILS";


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

export function orderCountries(payload) {
    return {
        type: ORDER_COUNTRIES,
        payload
    }
}

// export function orderAscDesc(payload) {
//     return {
//         type: ORDER_ASC_DESC,
//         payload
//     }
// }


export function getCountryName(payload) {
    return async function (dispatch) {
        try {
            let countries = await axios.get(`http://localhost:3001/countries?name=${payload}`);
            dispatch({
                type: GET_COUNTRY_NAME,
                payload: countries.data
            })
        }catch(e){
            console.log(e)
        }
    }
}

export function postActivity(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/activity', payload);
            console.log(response)
            return {
                response
            }
        }catch(e){
            console.log(e);
        }
    }
}

export function getDetail(id){
    return async function (dispatch) {
        try {
            const country = await axios.get(`http://localhost:3001/countries/${id}`);
            dispatch({
                type: GET_DETAILS,
                payload: country.data
            });
        }catch(e) {
            console.log(e);
        }
    }
}
// export function filterActivity (apyload) {
//     return {
//             type: FILTER_BY_ACTIVITY,
//             payload
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