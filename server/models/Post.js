const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Posts {
  static collection() {
    return database.collection("Posts");
  }

  static async findAllPost() {
    const post = this.collection();
    const data = await post.find().toArray();
    return data;
  }
  static async createPost(data) {
    const post = this.collection();
    const result = await post.insertOne({
      ...data,
      authorId: new ObjectId(data.authorId),
      comments: [],
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const findOne = this.findPostById(result.insertedId);
    return findOne;
  }
  static async addComment(_id, data) {
    const post = this.collection();

    const filter = { _id: _id };

    const newComment = {
      content: data.content,
      username: data.username,
    };

    const addComment = {
      $push: {
        comments: newComment,
      },
    };
    await post.updateOne(filter, addComment);
    const result1 = await post.findOne(_id);
    return result1;
  }
  static async addLike(_id, data) {
    const post = this.collection();

    const filter = { _id: _id };
    const newLike = {
      username: data.username,
    };
    const addLikes = {
      $push: {
        likes: newLike,
      },
    };

    await post.updateOne(filter, addLikes);
    const result1 = await post.findOne(_id);
    return result1;
  }
}
module.exports = Posts;
