const bcrypt = require("bcryptjs");

const Users = require("../models/User");
const { signToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type payload{
    access_token:String
    email:String
  }
  input NewUser {
    name: String
    username: String
    email: String
    password: String
  }

  input Login {
    email: String
    password: String
  }
  
  
  type Query {
    findAllUser: [User]
    findUserById(_id: ID!): User
    searchUser(criteria: String!): [User]
  }

  type Mutation {
    Register(newUsers: NewUser): User
    Login(input: Login): payload
  }
`;

const resolvers = {
  Query: {
    findAllUser: async (_, args) => {
      const result = await Users.findAll();
      return result;
    },
    searchUser: async (_, { criteria }) => {
      // Implementasi untuk mencari pengguna berdasarkan kriteria pencarian
      const users = await Users.searchUser(criteria);
      return users;
    },
  },
  Mutation: {
    Register: async (_, { newUsers }) => {
      const result = await Users.register(newUsers);
      return result;
    },
    Login: async (_, { input }) => {
      const { email, password } = input;

      const validEmail = await Users.loginUser(email);

      if (!validEmail) {
        throw new Error("email/password is incorrect");
      }
      const validPassword = bcrypt.compareSync(password, validEmail.password);
      if (!validPassword) {
        throw new Error("email/password is incorrect");
      }

      const access_token = signToken({
        id: validEmail._id,
        email: email,
      });
      console.log(access_token);
      return {
        access_token,
        email,
      };
    },
  },
};
module.exports = { typeDefs, resolvers };
