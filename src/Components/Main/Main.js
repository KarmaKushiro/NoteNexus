import React, { useEffect, useState} from 'react';

//Services
import { getAllUsers } from "../../Services/Users";
import { getAllSongs } from "../../Services/songModel.js";
import { getAllGenres } from "../../Services/genreModel.js";

//Componets
import "./Main.css";
import MainList from "./MainList";
import Header from "../Header/Header";
import Survey from "../Survey/Survey";
import SongsList from "../SongsList";
import GenresList from '../GenresList';
import Navigation from '../Navigation';


const Main = () => {
  const [users, setUsers] = useState([]);
  // expand useEffect to include songs amnd genres and do it asyncly
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);

  //gets data assynchronously for usersData songsData and genresData
  // done through Back4App
  useEffect(() => {
    const fetchData = async () => {
      const [usersData, songsData, genresData] = await Promise.all([getAllUsers(),getAllSongs(),getAllGenres()]);

      setUsers(usersData); 
      setSongs(songsData);
      setGenres(genresData);
    };

    fetchData();
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
      <Navigation /> 

      <h1 className="centered-title">NoteNexus</h1>
      <p>
        <center>
          The perfect place to explore your favorite music genres and discover
          new ones!
        </center>
      </p>

      {/* contains the survey */}
      <Survey onFormSubmit={handleSubmit} />

      <br /><br /><hr /><br />

      <h2> Example Usage of GenresList and SongsList </h2>
      <h3>Genres</h3>
      <GenresList genres={genres} />
      
      <h3>Songs</h3>
      <SongsList songs={songs} />

      <footer>
      {/* This is the website credits */}
        <MainList users={users} />
      </footer>
    </div>
  );
};

export default Main;
