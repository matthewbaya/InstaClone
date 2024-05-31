const { ObjectId } = require("mongodb");
const Follow = require("../models/Follow");

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
        following: FollowDetail 
        follower: FollowDetail
    }

    type FollowDetail{
        _id: ID
        name: String
        username: String
        email: String
    }

    type Query{
        findFollowingDetail(_id: ID!): [Follow]
        findFollowerDetail(_id: ID!): [Follow]
    }

    type Mutation {
        followUser(followingId: ID!): Follow
    }
`;

module.exports = typeDefs;

const resolvers = {
  Query: {
    findFollowingDetail: async (_, args, contextValue) => {
      await contextValue.authentication();
      const { _id } = args;

      return await Follow.findFollowing(_id);
    },

    findFollowerDetail: async (_, args, contextValue) => {
      await contextValue.authentication();
      const { _id } = args;

      return await Follow.findFollower(_id);
    },
  },

  Mutation: {
    followUser: async (_, { followingId }, contextValue) => {
      const currentUser = await contextValue.authentication();
      const followerId = new ObjectId(currentUser._id);
      const followId = new ObjectId(followingId);

      const result = await Follow.createFollow({
        followerId,
        followId,
      });
      return result;
    },
  },
};

module.exports = { typeDefs, resolvers };
