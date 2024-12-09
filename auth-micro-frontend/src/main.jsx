import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthApp from './AuthApp';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import UserProvider  from '../../shell-app/src/UserProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <UserProvider>  {/* Wrap the App component with UserProvider */}
                <AuthApp />
                </UserProvider>
        </ApolloProvider>
    </React.StrictMode>
);
