import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

// Initialize an ApolloGateway instance and pass it an array of implementing
// service names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    // Get urls from monorepo config
    { name: 'patients', url: 'http://localhost:4001' },
    { name: 'consultations', url: 'http://localhost:4002' },
  ],
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
