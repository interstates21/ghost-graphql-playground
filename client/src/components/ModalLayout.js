import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { gql } from "apollo-boost";

const ModalLayout = ({ setOpen, open, children, onSubmit, loading }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    onSubmit();
  };
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>The Great Unifier</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ paddingTop: 30, paddingBottom: 30 }}>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {loading ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: 5 }}
            />
            Loading...
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalLayout;
