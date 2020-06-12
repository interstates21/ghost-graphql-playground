import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Launches } from "./Launches";
import Navbar from "./components/Navbar";
import { Jumbotron, Container } from "react-bootstrap";
import LoginModal from "./containers/LoginModal";
import RegisterModal from "./containers/RegisterModal";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Navbar
        onLoginOpenModal={() => setLoginOpen(true)}
        onRegisterOpenModal={() => setRegisterOpen(true)}
      />
      <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      <RegisterModal open={registerOpen} setOpen={setRegisterOpen} />
      <Jumbotron>
        <h1>GraphQL Ghost Playground</h1>
        <p>Hello world</p>
      </Jumbotron>
      <Container>
        {/* <Launches></Launches> */}
      </Container>
    </ApolloProvider>
  );
};
const AppRouter = () => {
  return <App />;
};

export default AppRouter;
