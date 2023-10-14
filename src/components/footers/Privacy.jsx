import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Privacy({ privacyShow, onPrivacyClose }) {
  return (
    <>
      <Modal
        show={privacyShow}
        onHide={onPrivacyClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ backgroundColor: "#31c3a0" }} closeButton>
          <Modal.Title>Privacy Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We, at <b>At The Moment</b>, collect your private information only for
          retrieving information and our administrators do not have access to
          your information.
          <br />
          <br />
          The administrators may delete your acount or change your role but
          cannot edit/view your private information like your email account or
          password.
          <br />
          <br />
          Also, any of your information is not shared with the third-party
          application we depend on and therefore is secured within our database.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#31c3a0", borderColor: "white" }}
            onClick={onPrivacyClose}
          >
            Ok, I understand
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
