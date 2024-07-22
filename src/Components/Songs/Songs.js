import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGenreById } from '../../Services/genreModel';

const Songs = ({ songs = [] }) => {
  const [genres, setGenres] = useState({});

  useEffect(() => {

    //gets the genres of each song
    const fetchGenres = async () => {
      const genresMap = {};

      //Iterate over each song to get each songs genre 
      for (const song of songs) {
        const genrePointer = song.get('Genre');

        //gets the genre if it hasn't been fetched yet
        if (genrePointer && !genresMap[genrePointer.id]) {
          const genreData = await getGenreById(genrePointer.id);
          genresMap[genrePointer.id] = genreData.get('Name');
        }
      }

      setGenres(genresMap);//sets genre to each song
    };

    //fetchs genres if songs are in the list
    if (songs.length > 0) {
      fetchGenres();
    }
  }, [songs]);
  return (
    <div>
      <h1>Songs Page</h1>
      <hr />
      <p>Song List:</p>
      <ul>
        {songs.length > 0 ? (
          songs.map((song) => {
            const genrePointer = song.get('Genre');
            const genreName = genrePointer ? genres[genrePointer.id] : 'Unknown';
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
