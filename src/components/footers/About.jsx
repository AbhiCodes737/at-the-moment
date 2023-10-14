import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function About({ show, onClose }) {
  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header style={{ backgroundColor: "#31c3a0" }} closeButton>
          <Modal.Title>About Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Hey, welcome to <b>At The Moment</b> news website, the best source
            for the daily dose of latest news you want. This website is made by
            Abhijit Debnath as a third year Web Technologies project with the
            help of React, Bootstrap and Springboot technologies and the GNews
            API.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#31c3a0", borderColor: "white" }}
            onClick={() => {
              onClose();
            }}
          >
            That's Great
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}