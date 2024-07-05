import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/survey">Survey</Link>
        </li>
        {/* 
        <li>
          <Link to="/genres">Genres</Link>
        </li>
        <li>
          <Link to="/songs">Songs</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;
