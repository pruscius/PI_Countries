const initialState = {
    countries: [],
    filteredCountries: [],
    countryDetail: {},
    activities: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload
            };
        case "FILTER_BY_CONTINENT":
            const countriesBis = state.countries;
            let filterContinent = [];
            if (action.payload === 'All') {
                filterContinent = countriesBis;
            } else {
                filterContinent = countriesBis.filter(c => c.region === action.payload)
            }
            return {
                ...state,
                filteredCountries: filterContinent
            };
        case "ORDER_COUNTRIES":
            let orderedCountries = state.filteredCountries;
            if(action.payload.alphPop === 'alph' && action.payload.ascDesc === 'asc') {
                orderedCountries.sort(function(a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                })
            } 
            if (action.payload.alphPop === 'alph' && action.payload.ascDesc === 'desc') {
                orderedCountries.sort(function(a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })
            }
            if(action.payload.alphPop === 'pop' && action.payload.ascDesc === 'asc') {
                orderedCountries.sort(function(a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (a.population < b.population) {
                        return -1;
                    }
                    return 0;
                })
            } 
            if (action.payload.alphPop === 'pop' && action.payload.ascDesc === 'desc') {
                orderedCountries.sort(function(a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (a.population < b.population) {
                        return 1;
                    }
                    return 0;
                })
            }
            console.log(state.filteredCountries);
            return {
                ...state,
                filteredCountries: orderedCountries
            };
        // case "FILTER_BY_ACTIVITY":
        //     let activitiesBis = state.activities;
        //     return {
        //         ...state
        //     };
            case "GET_COUNTRY_NAME":
                return {
                    ...state,
                    filteredCountries: action.payload
                };
            case "POST_ACTIVITY":
                return {...state};
            case "GET_DETAILS":
                return {
                    ...state,
                    countryDetail: action.payload
                }

        default:
            return state;
    }
}

export default rootReducer;