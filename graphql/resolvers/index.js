const bcrypt = require("bcryptjs");
const Event = require("../../models/event");
const User = require("../../models/user");

const getUser = async userID => {
  try {
    const user = await User.findById(userID);
    return {
      ...user._doc,
      createdEvents: getEvents.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const getEvents = async eventIDs => {
  try {
    const events = await Event.find({ _id: { $in: eventIDs } });
    return events.map(event => ({
      ...event._doc,
      creator: getUser.bind(this, event.creator)
    }));
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();

      return events.map(e => ({
        ...e._doc,
        creator: getUser.bind(this, e._doc.creator)
      }));
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput }) => {
    try {
      const event = new Event({
        title: eventInput.title,
        location: eventInput.location,
        date: eventInput.date,
        creator: "5edfb32f8175531a35307698"
      });
      const savedEvent = await event.save();
      const foundCreator = await User.findById("5edfb32f8175531a35307698");
      if (!foundCreator) {
        throw new Error("User not found");
      }
      foundCreator.createdEvents.push(event);
      const updatedUser = await foundCreator.save();
      return {
        ...savedEvent._doc,
        creator: getUser.bind(this, savedEvent._doc.creator)
      };
    } catch (err) {
      throw err;
    }
  },
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
        password: null,
        id: savedUser.id
      };
    } catch (err) {
      throw err;
    }
  }
};
