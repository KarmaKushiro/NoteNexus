import React from 'react';

const Songs = ({ songs = [] }) => {
    return(
        <div>
            <h1>Songs Page</h1>
            <hr />
            <p>Song List:</p>
            <ul>
              {songs.length > 0 ? (
                songs.map((song) => (
                  <li key={song.id}>
                    {song.get('Title')} by {song.get('Artist')}
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
