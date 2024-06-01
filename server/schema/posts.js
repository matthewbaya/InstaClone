const { ObjectId } = require("mongodb");
const Posts = require("../models/Post");
const Users = require("../models/User");
const redis = require("../config/redis");
const typeDefs = `#graphql

type Posts {
    _id: ID
    content: String
    tags: [String]
    authorId: String
    imgUrl: String
    comments:[comment]
    likes:[like]
    author: Author
  }
  type Author {
    _id: ID
    name: String
    username: String
    email: String
    }

  input newPost {
    content: String
    tags: [String]
    imgUrl: String
  }

  type comment{
    content:String

    username:String
  }
  type like{

    username:String
  }
 
 input newComment{
    content:String
    
 }
  
  
  type Query {
    findAllPost: [Posts]
    findPostById(_id:ID!): Posts
   
  }

  type Mutation {
    createPost(newPost:newPost):Posts
    addComment(postId: ID!, newComment: newComment): Posts
    likePost(postId: ID!,): Posts
  }
`;

const resolvers = {
  Query: {
    findAllPost: async (_, __, contextValue) => {
      try {
        await contextValue.authentication();
        const cache = await redis.get("post:all");
        if (cache) {
          return JSON.parse(cache);
        }
        const result = await Posts.findAllPost();
        await redis.set("post:all", JSON.stringify(result));
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    findPostById: async (_, { _id }, contextValue) => {
      await contextValue.authentication();
      const id = new ObjectId(_id);

      const result = await Posts.findPostById(id);

      return result;
    },
  },
  Mutation: {
    createPost: async (_, { newPost }, contextValue) => {
      const data = await contextValue.authentication();

      const result = await Posts.createPost({ ...newPost, authorId: data.id });
      await redis.del("post:all");
      return result;
    },
    addComment: async (_, { postId, newComment }, contextValue) => {
      const data = await contextValue.authentication();
      const id = new ObjectId(postId);
      const userId = new ObjectId(data.id);
      const user = await Users.findById(userId);

      const realComment = {
        content: newComment.content,
        username: user.username,
      };
      const post = await Posts.addComment(id, realComment);
      await redis.del("post:all");
      return post;
    },
    likePost: async (_, { postId }, contextValue) => {
      const data = await contextValue.authentication();
      const id = new ObjectId(postId);
      const userId = new ObjectId(data.id);
      const user = await Users.findById(userId);

      const data1 = {
        username: user.username,
      };

      const post = await Posts.addLike(id, data1);
      await redis.del("post:all");
      return post;
    },
  },
};

module.exports = { typeDefs, resolvers };
