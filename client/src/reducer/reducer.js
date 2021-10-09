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
        case "ORDER_COUNTRIES_ALPH_AZ":
            let orderedCountries = state.filteredCountries;
                orderedCountries.sort(function(a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    filteredCountries: orderedCountries
                };
            case "ORDER_COUNTRIES_ALPH_ZA":
                let orderedCountries1 = state.filteredCountries;
                orderedCountries1.sort(function(a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    filteredCountries: orderedCountries1
                }; 
            case "ORDER_COUNTRIES_POP_ASC":
                let orderedCountries2 = state.filteredCountries;
                orderedCountries2.sort(function(a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (a.population < b.population) {
                        return -1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    filteredCountries: orderedCountries2
                };
            case "ORDER_COUNTRIES_POP_DESC":
                let orderedCountries3 = state.filteredCountries;
                orderedCountries3.sort(function(a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (a.population < b.population) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                filteredCountries: orderedCountries3
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