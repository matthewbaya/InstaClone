const bcrypt = require("bcryptjs");
const { GraphQLError } = require("graphql");

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
    findCurrentLogin: User
    searchUser(criteria: String!): [User]
  }

  type Mutation {
    Register(newUsers: NewUser): User
    Login(input: Login): payload
  }
`;

const resolvers = {
  Query: {
    findAllUser: async (_, __, contextValue) => {
      const data = await contextValue.authentication();
      console.log(data);
      const result = await Users.findAll();
      return result;
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
        throw new GraphQLError("email/password is incorrect", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const validPassword = bcrypt.compareSync(password, validEmail.password); // Bandingkan password yang diterima dengan password yang disimpan
      if (!validPassword) {
        throw new GraphQLError("email/password is incorrect", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
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
