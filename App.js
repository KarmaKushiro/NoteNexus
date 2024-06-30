import {
  html,
  render,
} from "https://unpkg.com/htm/preact/standalone.module.js";
import Main from "./Components/Main/Main.js";
import { Env } from "./Components/environments.js";
//parse is imported  in index.html

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;


function App() {
  return html`<${Main} />`;
}

render(html` <${App} /> `, document.getElementById("app"));
