import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Launches } from "./Launches";
import { Jumbotron, Container } from "react-bootstrap";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Jumbotron>
        <h1>GraphQL Ghost Playground</h1>
        <p>Hello world</p>
      </Jumbotron>
      <Container>
        <Launches></Launches>
      </Container>
    </ApolloProvider>
  );
};

export default App;
