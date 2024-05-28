import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql

  type Follow {
    _id: ID
    followingId: Int
    followerId: Int
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    follow: [Follow]
  }
`;
