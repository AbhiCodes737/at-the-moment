import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default function Register({ show, onClose }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios
        .post("https://atthemoment-backend-axsx.onrender.com/auth/signup", {
          name: name,
          username: username,
          email: email,
          password: password,
          role: role,
          country: country,
        })
        .then((res) =>
          localStorage.setItem("userlogdata", JSON.stringify(res))
        );
      alert("Registration Successful");
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
      setCountry("");
      navigate("/news");
    } catch (err) {
      alert("User Registration Failed");
    }
    setIsLoading(false); // Set isLoading back to false after the registration process is completed
  }
  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header style={{ backgroundColor: "#31c3a0" }} closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" method="post" className="mt-3">
            <div className="form-group">
              <div className="input-group">
                <span
                  className="input-group-addon mt-2 mx-1"
                  style={{ width: "20px" }}
                >
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="name"
                  placeholder="Enter your name"
                  required="required"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span
                  className="input-group-addon mt-2 me-2"
                  style={{ width: "20px" }}
                >
                  <i className="fa fa-address-card-o"></i>
                </span>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="username"
                  placeholder="Enter username"
                  required="required"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span
                  className="input-group-addon me-2 mt-2"
                  style={{ width: "20px" }}
                >
                  <i className="fa fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control mb-3"
                  name="email"
                  placeholder="Enter your email address"
                  required="required"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span
                  className="input-group-addon mx-1 mt-2"
                  style={{ width: "20px" }}
                >
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control mb-3"
                  name="password"
                  placeholder="Enter password"
                  required="required"
                  autoComplete="on"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span
                  className="input-group-addon mx-1 mt-2"
                  style={{ width: "20px" }}
                >
                  <i className="fa fa-info"></i>
                </span>
                <input
                  disabled
                  type="text"
                  className="form-control mb-3"
                  name="role"
                  placeholder="USER"
                  required="required"
                  value="USER"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span
                  className="input-group-addon mx-1 mt-2"
                  style={{ width: "20px" }}
                >
                  <i className="fa fa-map-marker"></i>
                </span>
                <select
                  className="form-select mb-3"
                  aria-label="select-country"
                  required="required"
                  onChange={(event) => {
                    setCountry(event.target.value);
                  }}
                >
                  <option disabled hidden selected>
                    Choose your country
                  </option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="Great Britain">Great Britain</option>
                  <option value="Australia">Australia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <p>
                This process may take up to 5-10 minutes as the backend server
                is usually turned off while there are no active connections.
              </p>
            </div>
            <div className="form-group text-center">
              <button
                id="signup-button"
                onClick={save}
                className="btn btn-md text-white"
                style={{ backgroundColor: "#31c3a0" }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Register"}{" "}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
