import React, { useEffect, useState } from 'react';

//Services
import { getAllUsers } from "../../Services/Users.js";
import { getAllSongs } from "../../Services/songModel.js";

//Components
import "./Main.css";
import MainList from "./MainList";

//MaterialUI masonry components 
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

const Main = () => {
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [usersData, songsData] = await Promise.all([getAllUsers(), getAllSongs()]);

      setUsers(usersData); 
      setSongs(songsData);
    };

    fetchData();
  }, []);

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

      <hr />

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

      <footer>
        {/* This is the website credits */}
        <MainList users={users} />
      </footer>
    </div>
  );
};

export default Main;
