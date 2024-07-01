import {
  html,
  useEffect,
  useState,
} from "https://unpkg.com/htm/preact/standalone.module.js";

//Services
import { getAllUsers } from "../../Services/Users.js";
import { getAllSongs } from "../../Services/songModel.js";
import { getAllGenres } from "../../Services/genreModel.js";

//Componets
import MainList from "./MainList.js";
import Header from "../Header/Header.js";
import Survey from "../Survey/Survey.js";
import SongsList from "../SongsList.js";
import GenresList from "../GenresList.js";


const Main = () => {
  //expand useEffect to include songs amnd genres and do it asyncly
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);

  //gets data assynchronously for usersData songsData and genresData
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
    const formData = new FormData(event.target);
    const selectedGenre = formData.get("fav_music_genre");
    const customGenre = formData.get("custom_genre");
    const name = formData.get("name");

    const favGenre = selectedGenre === "Other" ? customGenre : selectedGenre;
    alert(`${name}'s Favorite Music Genre Is ${favGenre}`);
  };

  return html`
    <div>
      <style>
        <!--styling for the title to not look boring-->
               @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap");
               .centered-title {
                 text-align: center;
                 font-family: "Nunito", sans-serif;
                 font-size: 50px;
                 margin-top: 10px;
               }
               body {
                background-image: url('');
                background: #e3e3e3;
               }
      </style>

      <!--this is the unworking nav bar at the top of the screen-->
      <${Header} />

      <h1 class="centered-title">NoteNexus</h1>
      <p>
        <center>
          The perfect place to explore your favorite music genres and discover
          new ones!
        </center>
      </p>

      <!--contains the survey-->
      <${Survey} onFormSubmit=${handleSubmit} />

      <!--This is the website credits-->
      <${MainList} users=${users} />

      <h2> below is an example usage of the componets GenresList and SongsList </h2>
      <h3>Songs</h3>
      <${SongsList} songs=${songs} />

      <h3>Genres</h3>
      <${GenresList} genres=${genres} />
    </div>
  `;
};

export default Main;
