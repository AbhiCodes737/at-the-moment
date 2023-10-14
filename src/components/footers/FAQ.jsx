import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function FAQ({ FAQShow, onFAQClose }) {
  return (
    <>
      <Modal
        show={FAQShow}
        onHide={onFAQClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ backgroundColor: "#31c3a0" }} closeButton>
          <Modal.Title>Frequently Asked Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>
            Which frontend technologies were used to create this application?
          </b>
          <br />
          This application was created with the help of HTML, React and
          Bootstrap CSS, we also used a lot of Javascript functions.
          <br />
          <br />
          <b>
            Which backend technologies were used to create this application?
          </b>
          <br />
          This application was created with the help of Java Spring Boot, we
          also MySQL (currently hosted on db4free.net) as the database for
          storing data and the backend hosted on render.com as the Web Server.
          <br />
          <br />
          <b>How are the new articles collected?</b>
          <br />
          All the articles are latest and gathered from the GNews API which when
          called returns the top and latest news from the category requested.
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#31c3a0", borderColor: "white" }}
            onClick={onFAQClose}
          >
            Ok, I Understand
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
