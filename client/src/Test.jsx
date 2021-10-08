import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, orderCountries } from './actions/actions';
import Country from './components/Country/Country';

export default function Test () {

    const dispatch = useDispatch();
    const countries = useSelector(s => s.filteredCountries);

    const [selects, setSelects] = useState({
        alphPop: '',
        ascDesc: ''
    });

    useEffect(()=> {
        dispatch(getCountries())
    }, [dispatch]);

    function handleChange(e){
        if (e.target.name === 'alphPop'){
            setSelects({
                ...selects,
                alphPop: e.target.value
            })
        }
        if (e.target.name === 'ascDesc') {
            setSelects({
                ...selects,
                ascDesc: e.target.value
            })
        }
    }

    function handleClick(){
        orderCountries(selects);
        setSelects({
            alphPop: '',
            ascDesc:''
        })
    };

    return (
        <>
            <p>Test</p>
            <select name="alphPop" onChange={e => handleChange(e)}>
                <option value="alph">Alphabetical</option>
                <option value="pop">Population</option>
            </select>
            <select name="ascDesc" onChange={e => handleChange(e)}>
                <option value="asc">Ascending</option>
                <option value="asc">Descending</option>
            </select>
            <button onClick={handleClick}>Order</button>
            {
                countries?.map(c => (
                    <Country 
                        id={c.id}
                        name={c.name}
                        flag={c.flag}
                        region={c.region}
                        population={c.population}
                    />
                ))
            }
        </>
    )
}