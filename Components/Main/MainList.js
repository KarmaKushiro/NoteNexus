import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

//this component is how MainList will be displayes on the weboage
const MainList = ({ users }) => {
  return html`
    <div>
      <hr />
      Website Credits:
      <ul>
        ${users.map(
          (user) =>
            html` <li key="${user}">
              ${user.firstName} ${user.lastName} | Contact:
              <a href=${`mailto:${user.email}`}>${user.email}</a>
            </li>`
        )}
      </ul>
    </div>
  `;
};

export default MainList;
