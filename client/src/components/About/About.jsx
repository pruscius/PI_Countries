import React from "react";
import { Link } from 'react-router-dom';

export default function About(){
    return (
        <>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <p>About</p>
        </>
    )
}