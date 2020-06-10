const Event = require("../../models/event");
const User = require("../../models/user");
const { getUser, transformEvent } = require("./merge");

const EventsResolver = {
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
      return transformEvent(savedEvent);
    } catch (err) {
      throw err;
    }
  }
};

module.exports = EventsResolver;
