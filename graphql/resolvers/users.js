const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const UsersResolver = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User doesnt exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Passwords don't match");
    }

    const expiresIn = "1h";
    const token = jwt.sign({ email, userID: user.id }, "itachi-uchiha", {
      expiresIn
    });

    return {
      userID: user.id,
      token,
      expiresIn
    };
  },
  createUser: async ({ userInput }, req) => {
    try {
      const duplicate = await User.findOne({ email: userInput.email });
      if (duplicate) {
        throw new Error("User Exists!");
      }
      const hashedPass = await bcrypt.hash(userInput.password, 12);

      const user = new User({
        email: userInput.email,
        password: hashedPass
      });
      const savedUser = await user.save();

      return {
        ...savedUser._doc,
        password: null
      };
    } catch (err) {
      throw err;
    }
  }
};

module.exports = UsersResolver;
