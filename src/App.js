
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Components/Main/Main.js";
import Survey from "./Components/Survey/Survey.js";
// import GenresList from "./Components/GenresList.js";
// import SongsList from "./Components/SongsList.js";
// import './App.css';
import * as Env from "./environments.js";

import Parse from "parse";
//parse is imported in index.html

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/survey" element={<Survey />} />
          {/*
          <Route path="/genres" element={<GenresList />} />
          <Route path="/songs" element={<SongsList />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;