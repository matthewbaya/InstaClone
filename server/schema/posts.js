const typeDefs = `#graphql

  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: String
    comments: [Comment]
    likes: [Like]
    createdAt: Date
    updatedAt: Date
  }

  type Comment{
    content: String
    username: String
    createdAt: Date
    updatedAt: Date
  }

  type Like{
    username: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getPosts: [Post]
  }
`;
