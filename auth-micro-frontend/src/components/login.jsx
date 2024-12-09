import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/auth';
import PropTypes from 'prop-types';
import  UserContext  from '../../../shell-app/src/UserProvider';
import {decode } from 'jsonwebtoken';


const Login = ({ setToken }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [login] = useMutation(LOGIN);
   const setUser  = useContext(UserContext);

    console.log('setUser:', setUser); // Debugging log

   const handleLogin = async (e) => {
       e.preventDefault();
       try {
           const { data } = await login({ variables: { email, password } });
           const token = data.login;           
           setToken(token); 
           const decoded = decode(token);
           console.log('Login Decoded token:', decoded);
           //setUser({ token, ...decoded });
           alert('Login successful!');
           setEmail('');
           setPassword('');
       } catch (err) {
           console.error(err.message);
           alert('Login failed');
       }
   };

   return (
       <form onSubmit={handleLogin}>
           <h2>Login</h2>
           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
           <button type="submit">Login</button>
       </form>
   );
};
Login.propTypes = {
    setToken: PropTypes.func.isRequired,
  };
export default Login;
