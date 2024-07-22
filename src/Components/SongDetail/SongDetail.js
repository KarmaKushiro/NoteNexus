import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSongById } from '../../Services/songModel';
import { getGenreById } from '../../Services/genreModel';

const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      const songData = await getSongById(id);
      setSong(songData);
      
      const genrePointer = songData.get('Genre');
      if (genrePointer) {
        const genreData = await getGenreById(genrePointer.id);
        setGenre(genreData);
      }
    };

    fetchSong();
  }, [id]);

  if (!song) {
    return <div>Loading...</div>;
  }

  let releaseDate;
  if (song.get('ReleaseDate')) {
    releaseDate = new Date(song.get('ReleaseDate')).toLocaleDateString();
  } else {
    releaseDate = 'Unknown';
  }

  let genreName;
  if (genre) {
    genreName = genre.get('Name');
  } else {
    genreName = 'Unknown';
  }

  return (
    <div>
      <h1>{song.get('Title')}</h1>
      <p>Artist: {song.get('Artist')}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Album: {song.get('Album')}</p>
      <p>Genre: {genreName}</p>
    </div>
  );
};

export default SongDetail;
