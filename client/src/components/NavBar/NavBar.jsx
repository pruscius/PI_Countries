import React from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from 'react-router-dom';


export default function NavBar () {
    return (
        <nav>
            <SearchBar />
            <Link to="/home">
                <button>Home</button>
            </Link>
            <Link to="/about">
                <p>About</p>
            </Link>
        </nav>
    )
}
