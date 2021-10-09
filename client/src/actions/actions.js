import axios from 'axios';

const GET_COUNTRIES = "GET_COUNTRIES";
const GET_ACTIVITIES = "GET_ACTIVITIES";
const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
const GET_COUNTRY_NAME = "GET_COUNTRY_NAME";
const GET_DETAILS = "GET_DETAILS";
const ORDER_COUNTRIES_ALPH_AZ = "ORDER_COUNTRIES_ALPH_AZ";
const ORDER_COUNTRIES_ALPH_ZA = "ORDER_COUNTRIES_ALPH_ZA";
const ORDER_COUNTRIES_POP_ASC = "ORDER_COUNTRIES_POP_ASC";
const ORDER_COUNTRIES_POP_DESC = "ORDER_COUNTRIES_POP_DESC";


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

export function getActivities () {
    return async function(dispatch) {
        try {
            let activities = await axios.get('http://localhost:3001/activity');
            dispatch({
                type: GET_ACTIVITIES,
                payload: activities.data
            })
        } catch(e){
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

export function filterByActivity (payload) {
    return {
            type: FILTER_BY_ACTIVITY,
            payload
    }
}
export function orderCountriesAlphAZ () {
    return {
        type: ORDER_COUNTRIES_ALPH_AZ
    }
}

export function orderCountriesAlphZA () {
    return {
        type: ORDER_COUNTRIES_ALPH_ZA
    }
}

export function orderCountriesPopAsc () {
    return {
        type: ORDER_COUNTRIES_POP_ASC
    }
}

export function orderCountriesPopDesc () {
    return {
        type: ORDER_COUNTRIES_POP_DESC
    }
}


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
