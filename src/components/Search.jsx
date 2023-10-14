import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function Search({ show, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery === "") {
      alert("Search term is empty");
    } else {
      setSearchQuery(searchQuery.toLowerCase());
      navigate(`/search?q=${searchQuery}`, { state: searchQuery });
    }
  };

  const buttonRef = useRef();

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  }

  function handleInputChange(event) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9\s]/g, "");
    setSearchQuery(sanitizedValue);
  }

  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header style={{ backgroundColor: "#31c3a0" }} closeButton>
          <Modal.Title>Search a Keyword</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="search" onSubmit={handleSubmit}>
            <div>
              <input
                className="form-control"
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <p className="my-1" style={{ fontSize: "12px" }}>
                [Note: The search results are sorted in order of their
                publication dates and in English]
              </p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            form="search"
            style={{ backgroundColor: "#31c3a0", borderColor: "white" }}
            ref={buttonRef}
            type="submit"
            onClick={onClose}
          >
            <span className="input-group-addon">
              <i className="fa fa-search"></i>
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
