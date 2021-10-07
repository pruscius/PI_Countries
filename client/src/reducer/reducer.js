const initialState = {
    countries: [],
    filteredCountries: [],
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
        // case "FILTER_BY_ACTIVITY":
        //     let activitiesBis = state.activities;
        //     return {
        //         ...state
        //     };
        case "ORDER_ALPH":
            let orderAlph;
            action.payload === "asc" ?
                orderAlph = (a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    } else {
                    }
                    return 0;
                } :
                orderAlph = (a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    } else {
                    }
                    return 0;
                }
                let orderedCountries = state.filteredCountries.sort(orderAlph);
                return {
                    ...state,
                    filteredCountries: orderedCountries
                };
        default:
            return state;
    }
}

export default rootReducer;