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

    const alldata = await this.findAll({});
    const usernameExists = alldata.some((user) => user.username === username);
    if (usernameExists) {
      throw new GraphQLError("username has been used", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }
    const emailExists = alldata.some((user) => user.email === email);
    if (emailExists) {
      throw new GraphQLError("email has been used", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }
    if (name.length === 0) {
      throw new GraphQLError("name is required", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }
    if (password.length === 0) {
      throw new GraphQLError("password is required", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }
    if (email.length === 0) {
      throw new GraphQLError("email is required", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }
    if (username.length === 0) {
      throw new GraphQLError("username is required", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
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

  static async loginUser(id) {
    return await database.collection("Users").findOne(id);
  }
  static async findOne(user) {
    return await database.collection("Users").findOne(user);
  }
}
module.exports = User;
