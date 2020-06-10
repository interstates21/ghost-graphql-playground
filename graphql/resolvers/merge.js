const Event = require("../../models/event");
const User = require("../../models/user");

const transformUser = user => {
  return {
    ...user._doc,
    createdEvents: getEvents.bind(this, user._doc.createdEvents)
  };
};

const transformEvent = event => {
  return {
    ...event._doc,
    creator: getUser.bind(this, event.creator)
  };
};

const getUser = async userID => {
  try {
    const user = await User.findById(userID);
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};

const getEvents = async eventIDs => {
  try {
    const events = await Event.find({ _id: { $in: eventIDs } });
    return events.map(event => transformEvent(event));
  } catch (err) {
    throw err;
  }
};

const getEvent = async eventID => {
  try {
    const event = await Event.findById(eventID);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

exports.getEvent = getEvent;
exports.getEvents = getEvents;
exports.getUser = getUser;
exports.transformEvent = transformEvent;
exports.transformUser = transformUser;
