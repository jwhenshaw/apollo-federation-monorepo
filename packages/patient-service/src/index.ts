import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

interface Patient {
  _id: string;
}

const typeDefs = gql`
  type Query {
    patient(id: String): Patient
  }

  # Entity which would be extended by a consultation service
  type Patient @key(fields: "_id") {
    _id: ID!
  }
`;

const resolvers = {
  Query: {
    patient() {
      return { _id: 'p-0' };
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

// get port from monorepo config
server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
