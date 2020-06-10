const EventsResolver = require("./events");
const UsersResolver = require("./users");
const Bookingsesolver = require("./bookings");

module.exports = {
  ...EventsResolver,
  ...UsersResolver,
  ...Bookingsesolver
};
