import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import '../styles/main.scss';

export default function NavBar() {
    const user = useContext(UserContext);
    
    return (
        <nav className="navbar">
            <h2 classname="nav-logo">Chess</h2>
            <Link to="/home" className="nav-item">Home</Link>
            {user ? (
                <div className="user-nav">
                    <Link to="/profile" className="nav-item">Profile</Link>
                    <Link to="/logout" className="nav-item">Logout</Link>
                </div>
            ) : (
                <Link to="/login" className="nav-item">Login</Link>
            )}
        </nav>
    )
}
