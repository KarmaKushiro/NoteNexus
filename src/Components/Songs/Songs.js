import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenreById } from '../../Services/genreModel'; 
import TextField from '@mui/material/TextField';          
import Autocomplete from '@mui/material/Autocomplete';  

//used https://mui.com/material-ui/react-autocomplete/ for autocomplete

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
    } 
  }, [selectedGenre, genres, songs]);

  //event handler for filtering. updated the genre filtering based on the selected genre
  const handleGenreSelect = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  return (
    <div>

      <h1>Songs Page</h1>

      {/*The autocomplete componet is what allows the user to filter by genre*/}
      <Autocomplete
        disablePortal
        id="genre-filter"
        options={uniqueGenres}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Genre" />}
        onChange={handleGenreSelect} //this is what triggeres the event handler which triggers the hook to filter by song
      />


      <hr />
      <p>Song List:</p>
      <ul>
        {filteredSongs.length > 0 ? (
          
          //gets the filtered songs (if filtered) from map
          filteredSongs.map((song) => {
            const genrePointer = song.get('Genre');
            const genreName = genres[genrePointer.id];

            //displays the songs, and the filtered ones if filtered
            return (
              <li key={song.id}>
                <Link to={`/song/${song.id}`}>{song.get('Title')}</Link> by {song.get('Artist')} - {genreName}
              </li>
            );
          })
        ) : (
          <p>No songs available.</p>
        )}
      </ul>
    </div>
  );
};

export default Songs;
