import React, { useState, useEffect } from "react";
import ModalLayout from "../components/ModalLayout";
import SuccessAlert from "../components/SuccessAlert";
import { Form } from "react-bootstrap";
// const { loading, error, data } = useQuery(EXCHANGE_RATES);
// const [getDog, { loading, data }] = useLazyQuery(GET_DOG_PHOTO);
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      email
    }
  }
`;

const RegisterModal = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerAsync, { loading, error, data }] = useMutation(REGISTER);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleSubmit = () => {
    registerAsync({ variables: { email, password } });
  };

  useEffect(() => {
    if (data) {
      setSuccessAlert(true);
    }
  }, [data]);

  if (error) return <p>Error :</p>;

  // if (successAlert) {
  //   return <SuccessAlert open={successAlert} setOpen={setSuccessAlert} />;
  // }
  return (
    <ModalLayout
      open={open}
      setOpen={setOpen}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
      </Form>
    </ModalLayout>
  );
};

export default RegisterModal;
