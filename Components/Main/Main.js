import {
  html,
  useEffect,
  useState,
} from "https://unpkg.com/htm/preact/standalone.module.js";

//Services
import { getAllUsers } from "../../Services/Users.js";

//Componets
import MainList from "./MainList.js";
import Header from "../Header/Header.js";
import Survey from "../Survey/Survey.js";

const Main = () => {
  const [users, setUsers] = useState([]);

  //gets the credits info
  useEffect(() => {
    getAllUsers().then((users) => {
      setUsers(users);
    });
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
    </div>
  `;
};

export default Main;
