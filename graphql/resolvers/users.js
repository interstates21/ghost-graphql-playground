const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const UsersResolver = {
  createUser: async ({ userInput }) => {
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
