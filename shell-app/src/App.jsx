import React, { useEffect, useState } from 'react';

const App = () => {
  const [microFrontendLoaded, setMicroFrontendLoaded] = useState(false);
  const [vitalSignsMicroFrontendLoaded, setVitalSignsMicroFrontendLoaded] = useState(false);

  useEffect(() => {
    console.log('Attempting to load Auth Micro-Frontend...');
    import('authMicroFrontend/App')
      .then(() => {
        console.log('Auth Micro-Frontend Loaded');
        setMicroFrontendLoaded(true); 
      })
      .catch((err) => {
        console.error('Failed to load Auth Micro-Frontend:', err);
      });

      console.log('Attempting to load Vital Signs Micro-Frontend...');
    import('vitalSignsMicroFrontend/main')
      .then(() => {
        console.log('Vital Signs Micro-Frontend Loaded');
        setMicroFrontendLoaded(true); 
      })
      .catch((err) => {
        console.error('Failed to load Auth Micro-Frontend:', err);
      });
  }, []);

  return (
    <div>
      <h1>Shell App</h1>
      {microFrontendLoaded ? (
        <div>
          <h2>Available Pages</h2>
          <ul>
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
      ) : (
        <div>Loading Micro-Frontends...</div>
      )}
    </div>
  );
};

export default App;
