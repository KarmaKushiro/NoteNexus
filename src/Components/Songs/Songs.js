import React from 'react';
import { Link } from 'react-router-dom';

const Songs = ({ songs = [] }) => {
  return (
    <div>
      <h1>Songs Page</h1>
      <hr />
      <p>Song List:</p>
      <ul>
        {songs.length > 0 ? (
          songs.map((song) => (
            <li key={song.id}>
              <Link to={`/song/${song.id}`}>{song.get('Title')} by {song.get('Artist')}</Link>
            </li>
          ))
        ) : (
          <p>No songs available.</p>
        )}
      </ul>
    </div>
  );
};

export default Songs;