import React from "react";
import { Alert, Button } from "react-bootstrap";

function SuccessAlert({ open: show, setOpen: setShow }) {
  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me ya'll!
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default <SuccessAlert />;
