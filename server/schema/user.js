import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql

  type User {
    _id: Int
    name: String
    username: String
    email: String
    password: String
  }

  type Query {
    getUsers: [User]
  }
`;
