import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

//this component is how Songlist will be displayes on the weboage
const SongsList = ({ songs }) => {
  return html`
    <div>
      <hr />
      Song List:
      <ul>
        ${songs.map(
          (song) =>
            html` <li key="${song.id}">
              ${song.get('Title')} by ${song.get('Artist')}
            </li>`
        )}
      </ul>
    </div>
  `;
};

export default SongsList;
