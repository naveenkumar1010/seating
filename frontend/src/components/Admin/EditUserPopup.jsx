import React, { useState } from 'react';
import './EditUserPopup.css';

const EditUserPopup = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedUser);
  };

  return (
    <div className="edit-user-popup">
      <h2>Edit User</h2>
      <form>
        <label>
          First Name:
          <input type="text" name="firstName" value={editedUser.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={editedUser.lastName} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={editedUser.email} onChange={handleChange} />
        </label>
        <label>
          Role:
          <select name="role" value={editedUser.role} onChange={handleChange}>
            <option value="DevOps">DevOps</option>
            <option value="TechOps">TechOps</option>
            {/* Add more role options as needed */}
          </select>
        </label>
        <div className="buttons">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPopup;
