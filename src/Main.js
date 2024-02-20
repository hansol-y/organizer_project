import logo from './assets/coordinate_s.png';

import React from 'react';

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
    </div>
    );
}

export default Main;
