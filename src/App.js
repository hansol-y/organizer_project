import './App.css';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import Main from './Main.js'

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/SignIn" element={<SignIn />} />
        </Routes>

        <nav className="Main-signUp-signIn">
          <Link to="/SignUp">Sign Up</Link>
          <Link to="/SignIn">Sign In</Link>
        </nav>

        <hr />
        
        

      </div>
    </Router>
    
  );
}

export default App;
