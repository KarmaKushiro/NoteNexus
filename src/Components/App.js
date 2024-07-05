import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Main/Main.js';
import Header from './Header/Header.js';
import'./Survey/Survey.js';
import reportWebVitals from "./reportWebVitals";

const App = () => {
  return (
    <Router>
      <div className="App" >
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
};

reportWebVitals();

export default App;