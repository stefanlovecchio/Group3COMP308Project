import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthApp from './AuthApp';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <AuthApp />
        </ApolloProvider>
    </React.StrictMode>
);
