import React, { useEffect, useState} from 'react';

//Services
import { getAllUsers } from "../../Services/Users";

//Componets
import "./Main.css";
import MainList from "./MainList";
import Header from "../Header/Header";
import Survey from "../Survey/Survey";

const Main = () => {
  const [users, setUsers] = useState([]);

  //gets the credits info
  useEffect(() => {
    getAllUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  //creates an alert with the users response to the form
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const favGenre = formData.get('fav_music_genre');
    const name = formData.get('name');
    
    if (favGenre === 'Other' && !formData.get('custom_genre')) {
      alert('Please specify your genre');
      return;
    }
    const finalGenre = favGenre === 'Other' ? formData.get('custom_genre') : favGenre;
    alert(`${name}'s Favorite Music Genre Is "${finalGenre}"`);
  };

  return (
    <div>
      <Header />

      <h1 className="centered-title">NoteNexus</h1>
      <p>
        <center>
          The perfect place to explore your favorite music genres and discover
          new ones!
        </center>
      </p>

      {/* contains the survey */}
      <Survey onFormSubmit={handleSubmit} />

      {/* This is the website credits */}
      <MainList users={users} />
    </div>
  );
};

export default Main;
