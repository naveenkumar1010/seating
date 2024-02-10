// src/components/Admin/UserManagementPage.jsx

import React, { useState, useEffect } from "react";
import "./UserManagementPage.css";
import EditUserPopup from "./EditUserPopup"; // Import the EditUserPopup component

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [filterRole, setFilterRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    
  }, []);

  // Calculate the index of the last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to display on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current page of users
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditPopup(true);
  };

  const handleSaveUser = (editedUser) => {
    // Save edited user details to the backend (to be implemented later)
    // For now, update the user in the local state
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === editedUser.id ? editedUser : u))
    );
    setShowEditPopup(false);
  };

  const handleCancelEdit = () => {
    setShowEditPopup(false);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    // Delete the user from the local state
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userToDelete.id));
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const togglePasswordVisibility = (user) => {
    // Toggle password visibility for the selected user
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, passwordVisible: !u.passwordVisible };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const filterUsersByRole = (role) => {
    setFilterRole(role);
  };

  const clearFilter = () => {
    setFilterRole("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredUsers = users.filter((user) => {
    return (
      (!filterRole || user.role === filterRole) &&
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <div className="filter-container">
        <div className="filter-select">
          <select
            value={filterRole}
            onChange={(e) => filterUsersByRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="DevOps">DevOps</option>
            <option value="TechOps">TechOps</option>
            {/* Add more role options as needed */}
          </select>
          <button onClick={clearFilter}>Clear</button>
        </div>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
          />
          <button onClick={clearSearch}>Clear</button>
        </div>
      </div>
      <table class="content-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {currentUsers.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button onClick={() => handleEditUser(user)}>Edit</button>
        <button onClick={() => handleDeleteUser(user)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {/* Render page numbers */}
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map(
          (number, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
        >
          Next
        </button>
      </div>

      {/* Render edit user popup if showEditPopup is true */}
      {showEditPopup && (
        <EditUserPopup
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={handleCancelEdit}
        />
      )}
      {/* Render delete confirmation popup if showDeleteConfirmation is true */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this user?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;






// Fetch users from the backend (to be implemented later)
    // For now, use static data
    // const staticUsers = [
    //   {
    //     id: 1,
    //     firstName: "Sriram",
    //     lastName: "Venkatraman",
    //     email: "sriramv@esko.com",
    //     role: "DevOps",
    //   },
    //   {
    //     id: 2,
    //     firstName: "Surya",
    //     lastName: "Thondimuthu",
    //     email: "suryat@esko.com",
    //     role: "DevOps",
    //   },
    //   {
    //     id: 3,
    //     firstName: "Sneha",
    //     lastName: "Thiyagarajan",
    //     email: "snehat@esko.com",

    //     role: "DevOps",
    //   },
    //   {
    //     id: 4,
    //     firstName: "JegaVarsan",
    //     lastName: "AnnaThurai",
    //     email: "jegavarsan@esko.com",

    //     role: "TechOps",
    //   },
    //   {
    //     id: 5,
    //     firstName: "Chaarvika",
    //     lastName: "Arunachalam",
    //     email: "chaarvika@esko.com",

    //     role: "TechOps",
    //   },
    //   {
    //     id: 6,
    //     firstName: "Jaivignesh",
    //     lastName: "GK",
    //     email: "jv@esko.com",

    //     role: "DevOps",
    //   },
    //   {
    //     id: 7,
    //     firstName: "Harsh",
    //     lastName: "Patel",
    //     email: "harsh@esko.com",

    //     role: "TechOps",
    //   },
    //   {
    //     id: 8,
    //     firstName: "NaveenKumar",
    //     lastName: "RR",
    //     email: "naveen@esko.com",

    //     role: "TechOps",
    //   },
    //   {
    //     id: 9,
    //     firstName: "Uva",
    //     lastName: "Roobini",
    //     email: "uva@esko.com",

    //     role: "DevOps",
    //   },
    //   {
    //     id: 10,
    //     firstName: "Lakshana",
    //     lastName: "Sivakumar",
    //     email: "lakshana@esko.com",

    //     role: "TechOps",
    //   },
    //   {
    //     id: 11,
    //     firstName: "Kevin",
    //     lastName: "Marshal",
    //     email: "kevin@esko.com",

    //     role: "DevOps",
    //   },
    //   {
    //     id: 12,
    //     firstName: "Jane",
    //     lastName: "Smith",
    //     email: "jane@esko.com",

    //     role: "TechOps",
    //   },
    //   {
    //     id: 13,
    //     firstName: "Mark",
    //     lastName: "Henry",
    //     email: "markhenry@esko.com",

    //     role: "DevOps",
    //   },
    //   // Add more static user data as needed
    // ];
    // setUsers(staticUsers);