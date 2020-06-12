const Booking = require("../../models/booking");
const Event = require("../../models/event");
const { getUser, getEvent } = require("./merge");

const BookingResolver = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => ({
        ...booking._doc,
        user: getUser.bind(this, booking.user),
        event: getEvent.bind(this, booking.event),
        createdAt: new Date(booking.createdAt).toISOString(),
        updatedAt: new Date(booking.updatedAt).toISOString()
      }));
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async ({ eventID }, req) => {
    if (!req.isAuth) {
      throw new Error("Not Authorized!");
    }
    try {
      const event = await Event.findById(eventID);
      if (!event) {
        throw new Error("Event doesn't exist");
      }
      const booking = new Booking({
        user: "5edfb32f8175531a35307698",
        event
      });
      const saved = await booking.save();
      return {
        ...saved._doc,
        createdAt: new Date(saved.createdAt).toISOString(),
        updatedAt: new Date(saved.updatedAt).toISOString()
      };
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async ({ bookingID }, req) => {
    if (!req.isAuth) {
      throw new Error("Not Authorized!");
    }
    try {
      const booking = await Booking.findById(bookingID);
      if (!booking) {
        throw new Error("Booking doesn't exit");
      }
      const event = await getEvent(booking.event);
      console.log("event = ", event);
      await Booking.deleteOne({ _id: bookingID });
      return { ...event };
    } catch (err) {
      throw err;
    }
  }
};

module.exports = BookingResolver;
