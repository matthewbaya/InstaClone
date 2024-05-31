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
  static async findFollowing(_id) {
    const followCollection = this.collection();
    const data = await followCollection
      .aggregate([
        {
          $match: {
            followerId: new ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: "Users",
            localField: "followingId",
            foreignField: "_id",
            as: "following",
          },
        },
        {
          $unwind: {
            path: "$following",
          },
        },
        {
          $project: {
            "following.password": 0,
          },
        },
      ])
      .toArray();

    return data;
  }

  static async findFollower(_id) {
    const followCollection = this.collection();

    const data = await followCollection
      .aggregate([
        {
          $match: {
            followingId: new ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: "Users",
            localField: "followerId",
            foreignField: "_id",
            as: "follower",
          },
        },
        {
          $unwind: {
            path: "$follower",
          },
        },
        {
          $project: {
            "follower.password": 0,
          },
        },
      ])
      .toArray();
    console.log(data);
    return data;
  }
}
module.exports = Follow;
