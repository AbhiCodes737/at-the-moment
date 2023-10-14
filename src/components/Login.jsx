import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function Login({ show, onClose }) {
  // const [regShow, setRegShow] = useState(false);
  // const onRegClose = setRegShow(!regShow);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state variable

  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();
    setIsLoading(true); // Set isLoading to true when the login button is clicked
    try {
      await axios
        .post(
          "https://atthemoment-backend-axsx.onrender.com/auth/authenticate",
          {
            username: username,
            password: password,
          }
        )
        .then((res) => {
          localStorage.setItem("userlogdata", JSON.stringify(res));
          alert("Login Successful");
          setUsername("");
          setPassword("");
          navigate("/news");
        })
        .catch((err) => alert("User Login Failed"))
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }

  }

  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header style={{ backgroundColor: "#31c3a0" }} closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" method="" className="mt-3">
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon mt-2">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control mx-3 mb-3"
                  name="username"
                  placeholder="Enter your username"
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
                <span className="input-group-addon mt-2">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control mx-3 mb-3"
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
            <div className="text-center">
              <p>
                This process may take up to 5-10 minutes as the backend server
                is usually turned off while there are no active connections.
              </p>
            </div>
            <div className="form-group text-center mt-2 mb-0">
              <button
                type="submit"
                className="btn btn-md text-white"
                onClick={save}
                style={{ backgroundColor: "#31c3a0" }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}{" "}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
