import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Main from "./Components/Main/Main.js";
import About from "./Components/About.js";
import Login from './Components/Authorization/Login/login.js';
import SignUp from "./Components/Authorization/SignUp/signup.js";
import Survey from "./Components/Survey/sampleSurvey.js";
import { ProtectedRoute } from "./Services/protectedRoute.js";
import * as Env from "./environments.js";
import Parse from "parse";
import Header from "./Components/Header/Header.js";
import { AuthProvider, useAuth } from "./Components/Authorization/authContext.js";
import Songs from "./Components/Songs/Songs.js";
import SongDetail from "./Components/SongDetail/SongDetail.js"; 
import { getAllSongs } from "./Services/songModel.js";


Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

const AuthRedirectRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : element;
};

const App = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
      const fetchSongs = async () => {
          const songsData = await getAllSongs();
          setSongs(songsData);
      };
      fetchSongs();
  }, []);

  
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          {/* routing, including secured when not logged in and redirecy once away from signup and login once a person is logged in */}
          {/* connects to Header.js */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/songs" element={<Songs songs={songs} />} />
            <Route path="/song/:id" element={<SongDetail />} /> 
            <Route path="/survey" element={<ProtectedRoute component={Survey} />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<AuthRedirectRoute element={<SignUp />} />} />
            <Route path="/login" element={<AuthRedirectRoute element={<Login />} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
