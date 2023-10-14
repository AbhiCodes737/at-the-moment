import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useLocation } from "react-router-dom";

export default function Role() {
  const location = useLocation();
  const user = location.state;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getInfo = async () => {
    await axios
      .get(`https://atthemoment-backend-axsx.onrender.com/api/users/${user}`)
      .then((r) => {
        setId(r.data.id);
        setUsername(r.data.username);
        setName(r.data.name);
        setCountry(r.data.country);
        setEmail(r.data.email);
        setRole(r.data.role);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const putInfo = async () => {
    setIsLoading(true);
    await axios
      .put(`https://atthemoment-backend-axsx.onrender.com/api/users/${id}`, {
        username: username,
        name: name,
        role: role,
        country: country,
        email: email,
      })
      .then((r) => {
        setUsername(r.data.username);
        setName(r.data.name);
        setRole(r.data.role);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <i
            className="fa fa-spinner fa-spin"
            style={{ fontSize: "3em", color: "white" }}
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
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{username}</td>
                    <td>{name}</td>
                    <td>
                      <select
                        className="form-select mb-2"
                        aria-label="select-country"
                        required="required"
                        onChange={(event) => {
                          setRole(event.target.value);
                        }}
                        style={{ backgroundColor: "#31c3a0" }}
                      >
                        <option disabled hidden selected>
                          {role}
                        </option>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
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
                  onClick={() => {
                    putInfo();
                    alert("Role Updated");
                  }}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn mx-2 text-black"
                  style={{ backgroundColor: "#31c3a0" }}
                  onClick={() => {
                    setIsLoading(true);
                    axios.delete(
                      `https://atthemoment-backend-axsx.onrender.com/api/users/${user}`
                    );
                    alert("Account Deleted");
                    navigate("/dashboard");
                  }}
                >
                  Delete User
                </button>
              </div>
            </form>
          </div>
          <div style={{ minHeight: 100 }}></div>
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
