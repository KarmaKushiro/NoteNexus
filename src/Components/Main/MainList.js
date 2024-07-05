import React from 'react';

const MainList = ({ users }) => {
  return (
    <div>
      <hr />
      <p>Website Credits:</p>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} | Contact:
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </li>
          ))
        ) : (
          <p>Error: Credentials cannot load.</p>
        )}
      </ul>
    </div>
  );
};

export default MainList;

