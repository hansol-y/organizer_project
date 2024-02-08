import logo from './assets/coordinate_s.png';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo pop" alt="logo" />
          <p className="Title">
            Mind Vector
          </p>
          <p className="description">
            Draw your mood vector to let you know yourself better and find the best direction
          </p>
        </header>

        <nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </nav>

        <hr />
        <Routes>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </Routes>
        

      </div>
    </Router>
    
  );
}

export default App;
