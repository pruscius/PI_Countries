import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { getCountries } from '../actions/actions.js';
import Country from './Country.jsx';

function Home ({ countries, getCountries }) {
    const [input, setInput] = useState('');
    
    useEffect(() => {
        getCountries()        
    }, [getCountries]);

    function handleChange(e){
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(input);
        // fetchCountry(input);
        setInput('');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    name="countryName" 
                    type="text" 
                    placeholder="Search countries..."
                    value={input}
                    onChange={handleChange}
                />
                <input type="submit" value="Search" />
            </form>
            <div>
                {
                    countries?.map(c=> (
                        <Country id={c.id} name={c.name} flag={c.flag} region={c.region} />
                    ))

                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        countries: state.countries
    }
}

export default connect(mapStateToProps, { getCountries })(Home);