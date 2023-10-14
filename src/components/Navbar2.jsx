import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Search from "./Search";
import { useState } from "react";

export default function Navbar2() {
  const navigate = useNavigate();
  const [news, setNews] = useState(true);
  const [search, setSearch] = useState(false);
  const [dash, setDash] = useState(true);
  const [userProf, setUserProf] = useState(true);
  const location = useLocation();
  let user = JSON.parse(localStorage.getItem("userlogdata"));
  let username = user.data.name;
  let role = user.data.role;

  const DisplayNav1 = () => {
    return (
      <>
        <li className="nav-item">
          <Link
            id="nav2"
            className="nav-link text-lg"
            style={{
              color:
                (location.pathname === "/dashboard" ||
                  location.pathname === "/useredit") &&
                dash === true
                  ? "#31c3a0"
                  : "white",
            }}
            aria-current="page"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <div>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
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
                    style={{
                      color:
                        location.pathname === "/news" && news === true
                          ? "#31c3a0"
                          : "white",
                    }}
                    id="nav1"
                    className="nav-link text-lg"
                    aria-current="page"
                    to="/news"
                  >
                    News
                  </Link>
                </li>
                <li
                  className="nav-item nav-link text-lg pointer-custom"
                  onClick={() => {
                    setSearch(true);
                    setNews(false);
                    setDash(false);
                    setUserProf(false);
                  }}
                  style={{
                    color:
                      location.pathname === "/search" || search === true
                        ? "#31c3a0"
                        : "white",
                  }}
                  aria-current="page"
                >
                  Search
                </li>
                {role === "ADMIN" ? DisplayNav1() : null}
                <li className="nav-item dropdown">
                  <a
                    className="text-dark text-lg nav-link"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      height="28"
                      src={
                        location.pathname === "/user" && userProf === true
                          ? "./assets/images/person-icon-2.png"
                          : "./assets/images/person-icon.png"
                      }
                    ></img>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                    style={{ minWidth: "100%", backgroundColor: "#31c3a0" }}
                  >
                    <li>
                      <Link className="dropdown-item" to="/user">
                        {username} &nbsp;
                        <img
                          height="30"
                          src="./assets/images/edit.png"
                        ></img>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => {
                          localStorage.setItem(
                            "userlogdata",
                            JSON.stringify(null)
                          );
                          localStorage.setItem("search", null);
                        }}
                        to="/"
                      >
                        Logout &nbsp;
                        <img
                          height="24"
                          src="./assets/images/logout.png"
                        ></img>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Search
        show={search}
        onClose={() => {
          setSearch(false);
          setNews(true);
          setDash(true);
          setUserProf(true);
        }}
      />
    </>
  );
}
