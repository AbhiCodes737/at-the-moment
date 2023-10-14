import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

export default function UserTable() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state variable

  let user = JSON.parse(localStorage.getItem("userlogdata"));
  let usrnm = user.data.username;
  let id = user.data.id;

  const getInfo = async () => {
    try {
      const response = await axios.get(
        `https://atthemoment-backend-axsx.onrender.com/api/users/${usrnm}`
      );
      setUsername(response.data.username);
      setName(response.data.name);
      setEmail(response.data.email);
      setCountry(response.data.country);
      setRole(response.data.role);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const putInfo = async () => {
    setLoading(true);
    await axios
      .put(`https://atthemoment-backend-axsx.onrender.com/api/users/${id}`, {
        id: id,
        username: username,
        name: name,
        email: email,
        country: country,
        role: role,
      })
      .then((res) => {
        setUsername(res.data.username);
        setName(res.data.name);
        setEmail(res.data.email);
        setCountry(res.data.country);
        setLoading(false);
        localStorage.setItem("userlogdata", JSON.stringify(res));
        alert("Data Saved");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const funcUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const funcNameChange = (event) => {
    setName(event.target.value);
  };

  const funcEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const funcCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <>
      {loading ? (
        <div className="text-center">
          <i
            className="fa fa-spinner fa-spin"
            style={{ fontSize: '3em', color: 'white' }}
          ></i>
          <div className="text-center text-white mt-5">
            <p>
              This process may take up to 5-10 minutes as the backend server is
              usually turned off while there are no active connections.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div style={{ minHeight: 100 }}></div>
          <div className="container">
            <h1 className="text-center text-white my-4">User Details</h1>
            <form>
              <Table
                striped
                bordered
                size="sm"
                style={{ backgroundColor: "#31c3a0" }}
              >
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        style={{ backgroundColor: "#31c3a0" }}
                        value={username}
                        onChange={funcUserNameChange}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        style={{ backgroundColor: "#31c3a0" }}
                        value={name}
                        onChange={funcNameChange}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        style={{ backgroundColor: "#31c3a0" }}
                        value={email}
                        onChange={funcEmailChange}
                      />
                    </td>
                    <td className="pointer-custom">
                      <select
                        className="form-select mb-2"
                        aria-label="select-country"
                        required="required"
                        onChange={funcCountryChange}
                        style={{ backgroundColor: "#31c3a0" }}
                      >
                        <option disabled hidden selected>
                          {country}
                        </option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="Great Britain">Great Britain</option>
                        <option value="Australia">Australia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="text-center" style={{ marginTop: 100 }}>
                <button
                  type="button"
                  className="btn mx-2 text-black"
                  style={{ backgroundColor: "#31c3a0" }}
                  onClick={putInfo}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn mx-2 text-black"
                  style={{ backgroundColor: "#31c3a0" }}
                  onClick={() => {
                    setLoading(true);
                    axios.delete(
                      `https://atthemoment-backend-axsx.onrender.com/api/users/${usrnm}`
                    );
                    localStorage.setItem("userlogdata", JSON.stringify(null));
                    alert("Account Deleted");
                    navigate("/");
                  }}
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
          <div className="text-center text-white mt-5">
            <p>
              Any process may take up to 5-10 minutes as the backend server is
              usually turned off while there are no active connections.
            </p>
          </div>
        </>
      )}
    </>
  );
}
