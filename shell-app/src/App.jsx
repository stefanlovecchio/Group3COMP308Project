import React, { useEffect, useState, lazy, Suspense, useContext } from 'react';
import { UserContext } from './UserProvider';

const AuthComponent = lazy(() => import('authMicroFrontend/App'));

const App = () => {
  const {user, setUser} = useContext(UserContext);

  return (
    <div>
      <h1>Shell App</h1>
      
        <div>
          <h2>Available Pages</h2>
          <ul>
          <Suspense fallback={<div>Loading components</div>}>
            <AuthComponent userContext={{ user, setUser }}/>
          </Suspense>
            <li>
              <a href="http://localhost:5001" target="_blank" rel="noopener noreferrer">
                Auth Micro-Frontend
              </a>
              
            </li>

            <li>
              <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer">
                Vital Signs Micro-Frontend
              </a>
            </li>
          </ul>
        </div>

    </div>
  );
};

export default App;
