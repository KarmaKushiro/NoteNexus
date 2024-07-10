import React, { createContext, useContext, useState, useEffect } from 'react';
import Parse from 'parse';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        setUser(currentUser);
      }
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const user = await Parse.User.logIn(username, password);
      setUser(user);
    } catch (error) {
      console.error('Error logging in', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await Parse.User.logOut();
      setUser(null);
    } catch (error) {
      console.error('Error logging out', error);
      throw error;
    }
  };

  const signUp = async (username, password, email) => {
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);

    try {
      await user.signUp();
      setUser(user);
    } catch (error) {
      console.error('Error signing up', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
