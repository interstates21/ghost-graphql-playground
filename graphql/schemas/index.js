const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Booking {
      _id: ID!
      event: Event!,
      user: User!,
      createdAt: String!,
      updatedAt: String!
    }

    type Event {
      _id: ID!
      title: String!
      date: String!
      location: String!
      creator: User!
    }

    input EventInput {
      title: String!
      date: String!
      location: String!
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
      bookings: [Booking!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput) : Event
      createUser(userInput: UserInput) : User
      bookEvent(eventID: ID!) : Booking!
      cancelBooking(bookingID: ID!) : Event!
    }
    
    schema {
      query: RootQuery
      mutation: RootMutation
    }
    `);
