import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/auth';

import jwt from 'jsonwebtoken'; // npm install jsonwebtoken --save

const Login = ({ setToken }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [login] = useMutation(LOGIN);

   const handleLogin = async (e) => {
       e.preventDefault();
       try {
           const { data } = await login({ variables: { email, password } });
           const token = data.login;
           const decodedToken = jwt.decode(token);
           console.log("decoded token in login", decodedToken);
           localStorage.setItem('user', JSON.stringify(decodedToken));
           setToken(token); 
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

export default Login;
