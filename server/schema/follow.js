const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

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

module.exports = { typeDefs };
