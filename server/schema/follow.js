const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: Date
        updatedAt: Date
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
