import './App.css';
import SignUp from './scenes/users/SignUp.js';
import SignIn from './scenes/users/SignIn.js';
import Main from './scenes/board/Main.js';
import Dashboard from './scenes/board/Dashboard.js';
import Create from './scenes/mood/createMood.js';
import MyPage from './scenes/users/MyPage.js';
import MoodView from './scenes/mood/MoodView.js';
import Suggestion from './scenes/mood/Suggestion.js';
import Default from './scenes/board/Default.js';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/SignIn" element={<SignIn />} />
          {/* Need to render Default */}
          <Route exact path="/Dashboard" element={
            <Default>
              <Dashboard />
            </Default>
          } />
          <Route exact path ="/Create" element={<Create/>} />
          <Route exact path ="/MyPage" element={<MyPage/>} />
          <Route exact path ="/MoodView" element={<MoodView/>} />
          <Route exact path ="/Suggestion" element={<Suggestion/>} />
        </Routes>

        <hr />
        
        

      </div>
    </Router>
    
  );
}

export default App;
