
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Components/Main/Main.js";
import About from "./Components/About.js";
import Login from './Components/Authorization/Login/login.js';
import SignUp from "./Components/Authorization/SignUp/signup.js";
import Survey from "./Components/Survey/sampleSurvey.js";
import { ProtectedRoute } from "./Services/protectedRoute.js";
// import GenresList from "./Components/GenresList.js";
// import SongsList from "./Components/SongsList.js";
// import './App.css';
import * as Env from "./environments.js";

import Parse from "parse";
import Header from "./Components/Header/Header.js";
import { AuthProvider } from "./Components/Authorization/authContext.js";
//parse is imported in index.html

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/survey" element={<ProtectedRoute component={Survey} />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/*
            <Route path="/genres" element={<GenresList />} />
            <Route path="/songs" element={<SongsList />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;