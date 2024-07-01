import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

//this component is how GenresList will be displayes on the weboage
const GenresList = ({ genres }) => {
  return html`
    <div>
      <hr />
      Genre List:
      <ul>
        ${genres.map(
          (genre) =>
            html` <li key="${genre.id}">
              ${genre.get('Name')}
            </li>`
        )}
      </ul>
    </div>
  `;
};

export default GenresList;
