const initialState = {
    countries: [],
    filteredCountries: [],
    countryDetail: {},
    activities: [],
    filteredActivities: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload
            };
        case "GET_ACTIVITIES":
            return {
                ...state,
                activities: action.payload,
                filteredActivities: action.payload
            }
        case "FILTER_BY_CONTINENT":
            const countriesBis = state.countries;
            let filterByContinent = [];
            if (action.payload === 'All') {
                filterByContinent = countriesBis;
            } else {
                filterByContinent = countriesBis.filter(c => c.region === action.payload)
            }
            return {
                ...state,
                filteredCountries: filterByContinent
            };
        case "FILTER_BY_ACTIVITY":
            const countryActivities = state.countries;
            let filterByActivity = [];
            if (action.payload === 'All') {
                filterByActivity = countryActivities;
            } else {
                filterByActivity = countryActivities.filter(c => {
                    // Reviso si el país tiene la actividad, y si la tiene lo filtro, sino no.
                   let act = c.activities.find(a => a.name === action.payload);
                   if (act) return c;
                })
            }
            return {
                ...state,
                filteredCountries: filterByActivity
            };
        // country : {a: a, activities: [{id: 1, name: Surfing}]}

        // Los orders lo que hacen es ordenar el estado actual de filteredCountries, que puede ser todos los
        // países o los países filtrados por continente o actividad.
        // Recibe un función comparadora por parámetro que determina la lógica a seguir. 
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
            // Al ordenar por números, se puede condensar la función a lo que está escrito. Con strings NO.
        case "ORDER_COUNTRIES_POP_ASC":
            let orderedCountries2 = state.filteredCountries;
            orderedCountries2.sort((a, b) => b.population - a.population)
            return {
                ...state,
                filteredCountries: orderedCountries2
            };
        case "ORDER_COUNTRIES_POP_DESC":
            let orderedCountries3 = state.filteredCountries;
            orderedCountries3.sort((a, b) => a.population - b.population)
        return {
            ...state,
            filteredCountries: orderedCountries3
        };
        case "GET_COUNTRY_NAME":
            return {
                ...state,
                filteredCountries: action.payload
            };
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