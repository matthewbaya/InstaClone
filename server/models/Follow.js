const database = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class Follow {
  static collection() {
    return database.collection("Follow");
  }
  static async findAllFollow() {
    const follow = this.collection();
    const result = await follow.find({}).toArray();
    return result;
  }
  static async findById(_id) {
    const follow = this.collection();
    const result = await follow.findOne({ _id });
    return result;
  }
  static async createFollow(data) {
    const follow = this.collection();

    const result = await follow.insertOne({
      followingId: data.followId,
      followerId: data.followerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const findOne = this.findById(result.insertedId);
    return findOne;
  }
}
module.exports = Follow;
