import './App.css';
import SignUp from './scenes/users/SignUp.js';
import SignIn from './scenes/users/SignIn.js';
import Main from './scenes/board/Main.js';
import Dashboard from './scenes/board/Dashboard.js';
import Create from './scenes/mood/createMood.js';

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
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path ="/Create" element={<Create/>} />
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
