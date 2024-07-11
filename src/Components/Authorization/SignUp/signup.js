import React, { useState } from 'react';
import Parse from 'parse';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //handles form when user hits the sighup button
  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = new Parse.User();
    user.set('username', email);
    user.set('email', email);
    user.set('password', password);
    try {
      const result = await user.signUp();
      console.log('User signed up successfully:', result);
      // Redirect or show a success message
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };


  //returns signup form
  return (
    <form onSubmit={handleSignUp}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
