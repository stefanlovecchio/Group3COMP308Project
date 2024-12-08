import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/auth';

const Signup = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [accountType, setAccountType] = useState(''); 
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');  
   const [signup] = useMutation(SIGNUP);

   const handleSignup = async (e) => {
       e.preventDefault();
       if (username && email && password && accountType && firstName && lastName) {                  
       try {
           await signup({ variables: { username, email, password, accountType, firstName, lastName} });
           alert('Signup successful!');
           setUsername('');
           setEmail('');
           setPassword('');
           setAccountType('');
           setFirstName('');
           setLastName('');
       } catch (err) {
           console.error(err.message);
           alert('Signup failed');
       }
    } else {
        alert('Please fill out all fields');
    }
   };

   return (
       <form onSubmit={handleSignup}>
           <h2>Signup</h2>
           <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
           <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
           <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
           <label>Account Type</label>
           <select name="accountType" id="selectAccountType" onChange={(e) => setAccountType(e.target.value)} >
                <option value=""></option>
                <option value="patient">Patient</option>
                <option value="nurse">Nurse</option>
            </select>
           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
           <button type="submit">Signup</button>
       </form>
   );
};

export default Signup;
