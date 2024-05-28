const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = `#graphql

  type Post {
    _id: Int
    content: String
    tags: [Tags]
    imgUrl: String
    authorId: Int
    comments: [Comments]
    likes: [Likes]
    createdAt: Date
    updatedAt: Date
  }

  type Comments{
    content: String
    username: String
    createdAt: Date
    updatedAt: Date
  }

  type Likes{
    username: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getPosts: [Post]
  }
`;
