import { html } from "https://unpkg.com/htm/preact/standalone.module.js";

//This file makes the header bar at the top of the screen and it adjusts depending on the size of the screen
const Header = () => {
  return html`
    <div>
      <style>
        /* top_nav_bar */
        .top_nav_bar {
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-end;
          list-style: none;
          margin: 0;
          padding: 0;
          background: #233142;
        }
        .top_nav_bar a {
          text-decoration: none;
          display: block;
          padding: 1em;
          color: white;
        }
        .top_nav_bar a:hover {
          background: #455d7a;
        }

        @media all and (min-width: 801px) {
          .left {
            margin-right: auto;
          }
          .right {
            margin-left: 0;
          }
        }

        /* style for meduim screen */
        @media all and (max-width: 800px) {
          .top_nav_bar {
            flex-flow: row nowrap;
            justify-content: space-between;
            padding: 0;
          }
        }

        /* style for small screen */
        @media all and (max-width: 600px) {
          .top_nav_bar .large_only {
            display: none;
          }
        }
      </style>

      <!--The large_only allows for items to vanish from nav bar when screen size shrinks -->
      <!--Would link these to other pages, but currently do not understand how to-->
      <ul class="top_nav_bar">
        <li class="left"><a href="">Home</a></li>
        <li class="right"><a href="">About</a></li>
        <li class="right large_only"><a href="">Option 1</a></li>
        <li class="right large_only"><a href="">Option 2</a></li>
        <li class="right large_only"><a href="">Option 3</a></li>
        <li class="right"><a href="">Log In</a></li>
        <li class="right"><a href="">Sign Up</a></li>
      </ul>
    </div>
  `;
};

export default Header;
