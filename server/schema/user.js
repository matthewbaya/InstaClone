const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const User = require("../models/User");

const typeDefs = `#graphql

  type User {
    name: String
    username: String
    email: String
    password: String
  }

  input NewUser{
    name: String
    username: String
    email: String
    password: String
  }
  type Mutation{
    addUser(newUser : NewUser): User
  }
  type Query {
    getUsers: [User]
  }
`;

const resolvers = {
  Query: {
    getUsers: () => User.getUsers(),
  },
  Mutation: {
    addUser: async (parent, args) => {
      const { name, username, email, password } = args.newUser;
      const newUser = { name, username, email, password };
      const result = await User.addUser(newUser);
      return newUser;
    },
  },
};

module.exports = { typeDefs, resolvers };
