import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenreById } from '../../Services/genreModel'; 
import TextField from '@mui/material/TextField';          
import Autocomplete from '@mui/material/Autocomplete';  
import Button from '@mui/material/Button'; // Import Button component from MUI
import './Songs.css';

//used https://mui.com/material-ui/react-autocomplete/ for autocomplete and button

const Songs = ({ songs = [] }) => {

  //states store the data of genre, filtered songs, selected genres, and genres respectively  
  const [genres, setGenres] = useState({});
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [uniqueGenres, setUniqueGenres] = useState([]);

  //the useeffect hook fetches the genres of each song
  useEffect(() => {
    
    const fetchGenres = async () => {
      const genresMap = {};
      const genresSet = new Set();

      //iterates through each song and checks if the genre pointer has already been added to genresmap, if not it gets the genre and maps it
      for (const song of songs) {
        const genrePointer = song.get('Genre'); //gets the songs genre pointer. each songs genre is stored as a pointer to another class known as genre. that is why it is needed to get the pointer

        //if new pointer(genre), the genre name is stored in map
        if (genrePointer && !genresMap[genrePointer.id]) {
          const genreData = await getGenreById(genrePointer.id); 
          genresMap[genrePointer.id] = genreData.get('Name');    
          genresSet.add(genreData.get('Name'));                     
        }
      }

      //updates state where data is held with the now updates genres map and set
      setGenres(genresMap);
      setUniqueGenres(Array.from(genresSet));
    };

    //gets the genres for the songs
    fetchGenres();
    
  }, [songs]);

  //useeffect hook is used to filter songs based on the selected genre
  useEffect(() => {

    //if a genre is selected, filters the songs
    if (selectedGenre) {
      setFilteredSongs(songs.filter(song => {
        const genrePointer = song.get('Genre');     
        const genreName = genres[genrePointer.id];  

        return genreName === selectedGenre;         //if the genre of the song matches the selected genre, display the song
      }));
    } else {
      setFilteredSongs(songs);
    }
  }, [selectedGenre, genres, songs]);

  //event handler for filtering. updated the genre filtering based on the selected genre
  const handleGenreSelect = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  //function clears selected genre and reset filtering
  const handleClearFilter = () => {
    setSelectedGenre(null);
    setFilteredSongs(songs);
  };

  return (
    <div className="songs-container">
      <h1>Songs Page</h1>
      <div className="autocomplete-container">
        {/*The autocomplete componet is what allows the user to filter by genre*/}
        <Autocomplete
          disablePortal
          id="genre-filter"
          options={uniqueGenres}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Genre" />}
          onChange={handleGenreSelect}
          value={selectedGenre || null} 
        />

        {/*The button to clear filterss*/}
        <Button variant="outlined" onClick={handleClearFilter} style={{ marginLeft: '10px' }}>
          Clear
        </Button>

      </div>
      <hr />
      {filteredSongs.length > 0 ? (
        //table to display song info to make the info look nice
        <table className="songs-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {/*gets the filtered songs (if filtered) from map*/}
            {filteredSongs.map((song) => {
              const genrePointer = song.get('Genre');
              const genreName = genres[genrePointer.id];
              return (
                <tr key={song.id}>
                  <td><Link to={`/song/${song.id}`}>{song.get('Title')}</Link></td>
                  <td>{song.get('Artist')}</td>
                  <td>{genreName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No songs available.</p>
      )}
    </div>
  );
};

export default Songs;
