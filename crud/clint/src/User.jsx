import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

function User() {
  const [users, setUsers] = useState([]);
  
  useEffect(()=>{
   const fetch = async () => {
    const res = await axios.get('http://localhost:3001')
    console.log(res,"res")
    setUsers(res.data)
   }
   fetch()
  },[])
  const handelDelete = (id) => {
    axios.delete('http://localhost:3001/deleteUser/'+id)
    .then(res => {console.log(res)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`/update/${user._id}`} className="btn btn-success">
                      Edit
                    </Link>
                    <Link  className="btn btn-danger" onClick={(e) => handelDelete(user._id)}>
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
