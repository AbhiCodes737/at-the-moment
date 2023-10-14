import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let users = [];

  const getInfo = async () => {
    await axios
      .get(`https://atthemoment-backend-axsx.onrender.com/api/users`)
      .then((r) => {
        setData(r.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const DisplayData = data.map((info) => {
    if (info.role === "USER") {
      users.push(info);
      return (
        <tr key={info.id}>
          <td>{info.username}</td>
          <td>{info.name}</td>
          <td>{info.role}</td>
          <td
            onClick={() => navigate("/useredit", { state: info.username })}
            className="pointer-custom"
          >
            <p>
              EDIT&nbsp;&nbsp;<i className="fa fa-pencil-square-o"></i>
            </p>
          </td>
          <td
            className="pointer-custom"
            onClick={() => {
              axios.delete(
                `https://atthemoment-backend-axsx.onrender.com/api/users/${info.username}`
              );
              alert("Account Deleted");
              setIsLoading(true);
              getInfo();
            }}
          >
            <p>
              DELETE&nbsp;&nbsp;<i className="fa fa-trash"></i>
            </p>
          </td>
        </tr>
      );
    }
  });

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <div className="text-center">
            <i
              className="fa fa-spinner fa-spin"
              style={{ fontSize: "3em", color: "white" }}
            ></i>
          </div>
          <div className="text-center text-white mt-5">
            <p>
              This process may take up to 5-10 minutes as the backend server is
              usually turned off while there are no active connections.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="container">
            <h2 className="text-white my-4 text-center">Users</h2>
            {users.length === 0 ? (
              <h4 className="text-white text-center">No users found</h4>
            ) : (
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
                    <th>Edit Option</th>
                    <th>Delete Option</th>
                  </tr>
                </thead>
                <tbody>{DisplayData}</tbody>
              </Table>
            )}
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
