import React from 'react';
import './Header.css';

//This file makes the header bar at the top of the screen and it adjusts depending on the size of the screen
const Header = () => {
  return (
    <div>
      {/* The large_only allows for items to vanish from nav bar when screen size shrinks
          Would link these to other pages, but currently do not understand how to */}
      <ul class="top_nav_bar">
        <li class="left"><a href="">Home</a></li>
        <li class="right"><a href="">About</a></li>
        {/*<li class="right large_only"><a href="">Option 1</a></li>
        <li class="right large_only"><a href="">Option 2</a></li>
        <li class="right large_only"><a href="">Option 3</a></li>*/}
        <li class="right"><a href="">Log In</a></li>
        <li class="right"><a href="">Sign Up</a></li>
      </ul>
    </div>
  );
};

export default Header;
