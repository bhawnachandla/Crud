import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Data from "./Components/EmployeeData";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [idToEdit, setIdToEdit] = useState(null);
  const [isUpdate, setIsupdate] =useState(false)
  useEffect(() => {
    setData(Data);
  }, []);

  const handleEdit = (id) => {
    const item = data.find((item) => item.id === id);
    setIdToEdit(id);
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setAge(item.age);
    setIsupdate(true)
  };

  const handleClear = () => {
    setIdToEdit(null);
    setFirstName("");
    setLastName("");
    setAge("");
  };

  const handleSave = () => {
    // Check if fields are filled or not
    if (firstName === "" || lastName === "" || age === "") {
      alert("Please fill all the fields");
      return;
    }

    if (idToEdit !== null) {
      // Update existing record
      const updatedData = data.map((item) =>
        item.id === idToEdit
          ? { ...item, firstName, lastName, age }
          : item
      );
      setData(updatedData);
    } else {
      // Add new record
      const newId = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      const newItem = { id: newId, firstName, lastName, age };
      setData([...data, newItem]);
    }

    handleClear();
  };
  const handleUpdate=()=>{
     // Add new record
     const newId = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
     const newItem = { id: newId, firstName, lastName, age };
     setData([...data, newItem]);
     handleClear();
  }
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    }
    setTimeout(() => {
      alert("deleted")
    }, 1000);
  };

  return (
    <div className="container text-center">
      <div className="m-4">
        <h1 className="display-6">Employee Table</h1>
      </div>
      <div className="d-flex justify-content-center">
        <label className="form-label m-3">First Name</label>
        <input
          type="text"
          className="m-3"
          value={firstName}
          placeholder="Enter name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="form-label m-3">Last Name</label>
        <input
          type="text"
          value={lastName}
          className="m-3"
          placeholder="Enter last name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="form-label m-3">Age</label>
        <input
          type="text"
          value={age}
          className="m-3"
          placeholder="Enter age"
          onChange={(e) => setAge(e.target.value)}
        />&nbsp;
        {isUpdate === true ?
        <button className="btn btn-success mb-2" onClick={handleSave}>Update</button>
        : <button className="btn btn-primary mb-2" onClick={handleUpdate}>Add</button>
        }
        &nbsp;<button className="btn btn-secondary mb-2" onClick={handleClear}>Clear</button>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
