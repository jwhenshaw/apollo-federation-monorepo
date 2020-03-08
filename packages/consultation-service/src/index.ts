import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

// interface Patient {
//   _id: string;
// }

const typeDefs = gql`
  type Consultation {
    _id: ID!
  }

  # https://www.apollographql.com/docs/apollo-server/federation/entities/#referencing
  # This is a "stub" of the Patient entity
  extend type Patient @key(fields: "_id") {
    _id: ID! @external
    consultations: [Consultation]
  }
`;

const resolvers = {
  Patient: {
    consultations(/* patient: Patient */) {
      return [{ _id: 'con-1' }]; // findConsultationsForPatient(patient._id)
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

// get port from monorepo config
server.listen(4002).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
