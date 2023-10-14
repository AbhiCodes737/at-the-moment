import React, { useState } from "react";
import About from "./About";
import { Link } from "react-router-dom";
import Privacy from "./Privacy";
import FAQ from "./FAQ";
import Contact from "./Contact";

export default function Footer() {
  const [show, setShow] = useState(false);
  const [privacyShow, setPrivacyShow] = useState(false);
  const [FAQShow, setFAQShow] = useState(false);
  const [contactShow, setContactShow] = useState(false);
  return (
    <>
      <About show={show} onClose={() => setShow(false)} />
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
        <p className="col-md-4 mb-0 text-white">© 2023 At The Moment, Inc</p>

        <a className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img src="./assets/images/At The Moment.png" width="300" />
        </a>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link
              onClick={() => {
                setShow(true);
              }}
              className="nav-link text-white px-2"
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={() => {
                setPrivacyShow(true);
              }}
              className="nav-link text-white px-2"
            >
              Privacy
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={() => {
                setFAQShow(true);
              }}
              className="nav-link text-white px-2"
            >
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={() => {
                setContactShow(true);
              }}
              className="nav-link text-white px-2"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </footer>
      <Privacy
        privacyShow={privacyShow}
        onPrivacyClose={() => setPrivacyShow(false)}
      />
      <FAQ FAQShow={FAQShow} onFAQClose={() => setFAQShow(false)} />
      <Contact
        contactShow={contactShow}
        onContactClose={() => setContactShow(false)}
      />
    </>
  );
}
