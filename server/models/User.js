const { database } = require("../config/mongodb");

class User {
  static async getUsers() {
    return database.collection("Users").find();
  }

  static async addUser(newUser) {
    return await database.collection("Users").insertOne(newUser);
  }

  static async loginUser(id) {
    return await database.collection("Users").findOne(id);
  }
}
module.exports = User;
