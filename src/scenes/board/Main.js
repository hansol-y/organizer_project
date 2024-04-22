import logo from '../../assets/coordinate_s.png';

import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div className="Main">
            <header className="Main-header">
                <img src={logo} className="Main-logo pop" alt="logo" />
                <p className="Title">
                Mind Vector
                </p>
                <p className="description">
                Draw your mood vector to let you know yourself better and find the best direction
                </p>
            </header>

            <nav className="Main-signUp-signIn">
                <Link to="/SignUp">Sign Up</Link>
                <Link to="/SignIn">Sign In</Link>
            </nav>
    </div>
    );
}

export default Main;
