import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

//This file makes the header bar at the top of the screen and it adjusts depending on the size of the screen
const Header = () => {
  return (
    <div>
      {/* The large_only allows for items to vanish from nav bar when screen size shrinks
          Would link these to other pages, but currently do not understand how to */}
      <ul className="top_nav_bar">
        <li className="left"><Link to="/">Home</Link></li>
        <li className="right"><Link to="/about">About</Link></li>
        <li className='right'><Link to="/survey">Survey</Link></li>
        {/*<li class="right large_only"><a href="">Option 1</a></li>
        <li class="right large_only"><a href="">Option 2</a></li>
        <li class="right large_only"><a href="">Option 3</a></li>*/}
        <li className="right"><Link to="/login">Log In</Link></li>
        <li className="right"><Link to="/sign up">Sign Up</Link></li>
      </ul>
    </div>
  );
};

export default Header;
