// server/gateway.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway } = require('@apollo/gateway');

// Initialize an Express application
const app = express();

// Configure the Apollo Gateway
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'auth', url: 'http://localhost:5001/graphql' }, 
    //{ name: 'vital-signs', url: 'http://localhost:5002/graphql' } 
  ],
});

// Initialize Apollo Server with the Apollo Gateway
const server = new ApolloServer({
  gateway,
  subscriptions: false, 
  introspection: true, 
});

// Apply Apollo GraphQL middleware to the Express app
server.start().then(() => {
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Gateway ready at http://localhost:4000${server.graphqlPath}`)
  );
});
