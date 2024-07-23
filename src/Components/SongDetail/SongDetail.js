import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSongById } from '../../Services/songModel';
import { getGenreById } from '../../Services/genreModel';
import './SongDetail.css';

const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [genre, setGenre] = useState(null);

  //function fetches specfic song data by ID
  useEffect(() => {
    const fetchSong = async () => {
      const songData = await getSongById(id);
      setSong(songData);
      
      //gets the genre for the specfic song
      const genrePointer = songData?.get('Genre');
      const genreData = await getGenreById(genrePointer.id);
      setGenre(genreData);

    };

    fetchSong();
  }, [id]);

  if (!song) {
    return <div>My Code is not working agiaiN!</div>;
  }

  //need to change release date variable type. saftey checks are to prevent the website from breaking
  const releaseDate = song.get('ReleaseDate') ? new Date(song.get('ReleaseDate')).toLocaleDateString() : 'Unknown';
  const genreName = genre ? genre.get('Name') : 'Unknown';

  //formating for song detail
  return (
    <div className="song-detail">
      <h1>{song.get('Title')}</h1>
      <p>Artist: {song.get('Artist')}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Album: {song.get('Album')}</p>
      <p>Genre: {genreName}</p>
    </div>
  );
};

export default SongDetail;
