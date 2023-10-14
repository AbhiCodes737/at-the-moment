import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

export default function Navbar1(props) {
  const [show, setShow] = useState(false);
  const [regShow, setRegShow] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userlogdata"));
    if (user != null) {
      setIsSignedIn(true);
    }
  }, []);

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            style={{ backgroundColor: "#2bed9c" }}
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <li className="navbar-item">
              <a>
                <img
                  src="./assets/images/At The Moment.png"
                  alt=""
                  width="230"
                />
              </a>
            </li>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-lg"
                  style={{
                    color: props.isActive === "1" ? "#31c3a0" : "white",
                  }}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="text-lg nav-link dropdown-toggle"
                  style={{ color: props.isDrop === "1" ? "#31c3a0" : "white" }}
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {props.name}
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{ minWidth: "100%", backgroundColor: "#31c3a0" }}
                >
                  <li>
                    <Link className="nav-link dropdown-item" to="/business">
                      Business
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="nav-link dropdown-item"
                      to="/entertainment"
                    >
                      Entertainment
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link dropdown-item" to="/sports">
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link dropdown-item" to="/technology">
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link dropdown-item" to="/science">
                      Science
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link dropdown-item" to="/health">
                      Health
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {isSignedIn ? (
                <a
                  className="btn"
                  style={{ backgroundColor: "#31c3a0" }}
                  type="submit"
                  onClick={() => {
                    navigate("/news");
                  }}
                >
                  Get Back
                </a>
            ) : (
              <>
                <a
                  className="btn"
                  style={{ backgroundColor: "#31c3a0" }}
                  type="submit"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Login
                </a>
                <a
                  className="btn mx-2"
                  style={{ backgroundColor: "#31c3a0" }}
                  type="submit"
                  onClick={() => {
                    setRegShow(true);
                  }}
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
      <Login show={show} onClose={() => setShow(false)} />
      <Register show={regShow} onClose={() => setRegShow(false)} />
    </>
  );
}
