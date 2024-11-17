import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Book Exchange Platform</h1>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/books">Browse Books</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile">My Profile</Link>
        </nav>
    </header>
);

export default Header;
