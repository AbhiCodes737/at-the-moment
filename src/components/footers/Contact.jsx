import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Contact({ contactShow, onContactClose }) {
  return (
    <>
      <Modal
        show={contactShow}
        onHide={onContactClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ backgroundColor: "#31c3a0" }} closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center w-responsive mx-auto mb-5">
            Do you have any questions? Please do not hesitate to contact me
            directly. I will try to respond within a matter of hours.
          </p>
          <div className="d-flex justify-content-center">
            <form
              id="mail"
              method="POST"
              action="mailto: abhijitdn737@gmail.com"
              enctype="text/plain"
            >
              <div className="control">
                Name:&nbsp;&nbsp;
                <input style={{ width: "80%" }} aria-required="" id="name" name="name" type="text" />
              </div>
              <br />
              <div className="control">
                Phone no:&nbsp;&nbsp;
                <input
                  aria-required=""
                  name="phone"
                  id="mobile_number"
                  type="tel"
                />
              </div>
              <br />
              <div className="control">Your message:</div>
              <textarea
                rows="7"
                style={{ width: "100%" }}
                name="message"
              ></textarea>
              <br />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            form="mail"
            style={{ backgroundColor: "#31c3a0", borderColor: "white" }}
            type="submit"
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
