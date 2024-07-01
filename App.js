import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Components/Main/Main.js';
import reportWebVitals from "./reportWebVitals";

function App() {
  return <Main />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();