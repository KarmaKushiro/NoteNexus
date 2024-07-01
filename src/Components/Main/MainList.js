import React from 'react';

const MainList = ({ users }) => {
  return (
    <div>
      <hr />
      Website Credits:
      <ul>
        {users.map(
          (user, index) => (
          <li key={index}>{user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainList;
