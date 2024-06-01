const { database } = require("../config/mongodb");
const validator = require("validator");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static collection() {
    return database.collection("Users");
  }
  static async findAll() {
    return this.collection().find().toArray();
  }
  static async findById(_id) {
    const user = this.collection();
    const data = await user.findOne({ _id });
    return data;
  }

  static async register(data) {
    let { name, username, email, password } = data;
    const user = this.collection();
    const emailVal = validator.isEmail(email);
    if (!emailVal) {
      throw new Error("Invalid email format");
    }

    const alldata = await this.findAll();
    const usernameExists = alldata.some((user) => user.username === username);
    if (usernameExists) {
      throw new Error("username has been used");
    }
    const emailExists = alldata.some((user) => user.email === email);
    if (emailExists) {
      throw new Error("email has been used");
    }
    if (name.length === 0) {
      throw new Error("name is required");
    }
    if (password.length === 0) {
      throw new Error("password is required");
    }
    if (email.length === 0) {
      throw new Error("email is required");
    }
    if (username.length === 0) {
      throw new Error("username is required");
    }
    const hashedPassword = hashPassword(password);
    const result = await user.insertOne({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const registeredUser = this.findById(result.insertedId);
    return registeredUser;
    // return await this.collection().insertOne(newUser);
  }

  static async loginUser(email) {
    const user = this.collection();
    const result = await user.findOne({ email });
    return result;
  }
  static async findOne(user) {
    return await database.collection("Users").findOne(user);
  }
  static async searchUser(criteria) {
    const user = await this.collection();
    const regexCriteria = new RegExp(criteria, "i");
    const result = await user
      .find({
        $or: [
          { name: { $regex: regexCriteria } },
          { username: { $regex: regexCriteria } },
        ],
      })
      .toArray();
    return result;
  }
}
module.exports = User;
