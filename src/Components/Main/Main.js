import React, { useEffect, useState} from 'react';

//Services
import { getAllUsers } from "../../Services/Users.js";
import { getAllSongs } from "../../Services/songModel.js";
import { getAllGenres } from "../../Services/genreModel.js";

//Componets
import "./Main.css";
import MainList from "./MainList";
import Survey from "../Survey/sampleSurvey.js";
import SongsList from "../SongsList";
import GenresList from '../GenresList';

//MaterialUI  masonry components 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';

//styling for the masonry
const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

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

    //gets images for Masonry from database
    const itemData = songs.map(song => ({
      img: song.get('ImageURL'),
      title: song.get('Title')
    }));

  return (
    <div>

      <h1 className="centered-title">NoteNexus</h1>
      <p className="centered-text">
          The perfect place to explore your favorite music genres and discover
          new ones!
      </p>

      <hr/>

      {/* Masonry layout for artist images */}
      <Box sx={{ width: '80%', minHeight: 829, margin: 'auto' }}>
        <Masonry columns={6} spacing={1}>
          {itemData.map((item, index) => (
            <div key={index}>
              <img
                srcSet={`${item.img}?w=120&auto=format&dpr=2 2x`}
                src={`${item.img}?w=120&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          ))}
        </Masonry>
      </Box>

      {/* the white space below the images would be filled byother artists as new songs are added */}
  
      {/* old main
      
      contains the survey 
      <h3> Music Survey Sample:</h3>
      <Survey onFormSubmit={handleSubmit} />

      <br /><br /><hr /><br />

      <h2> Example Usage of GenresList and SongsList </h2>
      <h3>Genres</h3>
      <GenresList genres={genres} />
      
      <h3>Songs</h3>
      <SongsList songs={songs} />
      */}

      <footer>
      {/* This is the website credits */}
        <MainList users={users} />
      </footer>
    </div>
  );
};

export default Main;
