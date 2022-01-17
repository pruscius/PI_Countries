import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, orderCountriesAlphAZ } from '../../actions/actions.js';
import NavBar from "../NavBar/NavBar.jsx";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from './CreateActivity.module.css';

function validate (data, countryId) {
    let errors = {};
    if (!data.name) {
        errors.name = 'Your activity must have a name.';
    }
    if (!data.difficulty) {
        errors.difficulty = 'You must set a difficulty level for your activity.';
    }
    if (!data.duration) { // regexp para float?
        errors.duration = 'Your activity must have a duration set in hours (only dots and numbers)';
    } 
    if(!data.seasons.length) { 
        errors.seasons = 'You must set at least one season for your activity';
    } 
    if (!countryId.length) {
        errors.countryId = 'You must choose at least one country for your activity';
    }
    return errors;
}

export default function CreateActivity(){

    const countries = useSelector(s => s.countries);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [countryId, setCountryId] = useState([]);
    const [order, setOrder] = useState('');

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]); 

    const [activityPost, setActivityPost] = useState({
        name: '',
        difficulty: '',
        duration: '',
        seasons: []
    });

    // Esta función me ordena los países que están en el select, una vez que le hago click.
    function handleClick(){
        dispatch(orderCountriesAlphAZ());
        setOrder('Ordered');
    }

    function handleChange(e) {
        if (e.target.name === 'countryId') {
            if (e.target.value.length < 4) {
                const selectedCountry = {
                    id: e.target.value,
                    name: e.target.options[e.target.selectedIndex].getAttribute('countryname'),
                    flag: e.target.options[e.target.selectedIndex].getAttribute('flag')
                }
                setCountryId([...countryId, selectedCountry]);
            }
        } else if (e.target.name === 'seasons') {
            if (e.target.checked) {
                setActivityPost({
                    ...activityPost,
                    seasons: activityPost.seasons.concat(e.target.value)
                }) 
            } else if (!e.target.checked) {
                activityPost.seasons && setActivityPost({
                    ...activityPost,
                    seasons: activityPost.seasons.filter(s => s !== e.target.value)
                }) 
            }
        } else {
            setActivityPost({
                ...activityPost, 
                [e.target.name]: e.target.value
            });
        }
        setErrors(validate({
            ...activityPost,
            [e.target.name]: e.target.value
        }, countryId));
    }


    // Hice el axios acá porque en las actions no me funcionaba, no sé por qué.
    async function handleSubmit (e) {
        e.preventDefault();
        const completedActivity = {...activityPost, countryId: countryId};
        if (!Object.keys(errors).length) {
            const post = await axios.post('/activity', completedActivity)
            alert('Your activity was created!');
            setActivityPost({
                name: '',
                difficulty: '',
                duration: '',
                seasons: ''
            });
            setCountryId([]);
        } else {
            setShowErrors(true);
            alert('Your activity has missing fields.')
        }
    }

    function handleDeleteClick(c) {
        setCountryId(countryId.filter(cR => cR !== c))
    }

    return (
        <div className={styles.body}>
            <NavBar />
            <div className={styles.header}>
                <Link to="/home">
                    <IoArrowBack size="2.3em" color="#fff" className={styles.back}/>
                </Link>
                <div className={styles.phraseContainer}>
                    <h1 className={styles.phrase}>Help us grow.</h1>
                </div>

            </div>
            <div className={styles.miniPhraseContainer}>
                <h3 className={styles.miniPhrase}>Share your experience with us.</h3>
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                    <div className={styles.fields}>
                    <label className={styles.labels}>Country: </label>
                        <select className={styles.selects} name="countryId" onChange={e => handleChange(e)} onClick={handleClick}>
                            <option>- Select Country -</option>
                            {countries.map(c => (
                                <option 
                                    key={c.id} 
                                    countryname={c.name} 
                                    flag={c.flag}
                                    value={c.id}
                                >{c.name}
                                </option>))}
                        </select>
                        <div className={styles.countryIds}>
                            {
                                countryId.map(c => 
                                    <div 
                                        key={c.id} 
                                        className={styles.idCountry}
                                        style={{backgroundImage: `url(${c.flag})`}}
                                        onClick={() => handleDeleteClick(c)}
                                    >
                                        <div className={styles.del}>X</div>
                                    </div>
                                    )
                            }
                        </div>
                        {
                            showErrors && errors.countryId && (
                            <p className={styles.err}>{errors.countryId}</p>
                            )
                        }
                    </div>
                    <div className={styles.fields}>
                        <label className={styles.labels}>Activity Name: </label>
                        <input 
                            className={styles.activityNameInput}
                            type="text"
                            value={activityPost.name}
                            name="name"
                            onChange={e => handleChange(e)}
                            autocomplete="off"
                        />
                        {
                            showErrors && errors.name && (
                            <p className={styles.err}>{errors.name}</p>
                            )
                        }
                    </div>
                    <div className={styles.fields}>
                        <label className={styles.labels}>Duration (in hours): </label>
                        <input
                            className={styles.durationInput}
                            type="text"    
                            value={activityPost.duration}
                            name="duration"
                            onChange={e => handleChange(e)}
                            autocomplete="off"
                        />
                        {
                            showErrors && errors.duration && (
                            <p className={styles.err}>{errors.duration}</p>
                            )
                        }
                    </div>
                    <div className={styles.fields}>
                        <label className={styles.labels}>Difficulty: </label>
                        <select className={styles.selects} name="difficulty" value={activityPost.difficulty} onChange={e => handleChange(e)}>
                            <option>- Set Difficulty -</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        {
                            showErrors && errors.difficulty && (
                            <p className={styles.err}>{errors.difficulty}</p>
                            )
                        }
                    </div>
                    <div className={styles.fields}>
                        <label className={styles.labels}>Seasons: </label>
                        <div className={styles.seasons}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="seasons"
                                    value="Summer"    
                                    onChange={(e) => handleChange(e)}
                                />
                                Summer
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="seasons"
                                    value="Fall"    
                                    onChange={(e) => handleChange(e)}
                                />
                                Fall
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="seasons"
                                    value="Winter"    
                                    onChange={(e) => handleChange(e)}
                                />
                                Winter
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="seasons"
                                    value="Spring"    
                                    onChange={(e) => handleChange(e)}
                                />
                                Spring
                            </label>
                        </div>
                        {
                            showErrors && errors.seasons && (
                            <p className={styles.err}>{errors.seasons}</p>
                            )
                        }
                    </div>
                    <div className={styles.btnContainer}>
                        <input className={styles.btn} type="submit" value="Create Activity" />
                    </div>
                </form>
            </div>
        </div>
    )
}
