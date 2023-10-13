// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const AddUser = () => {
  const [userData, setUserData] = useState({});
  const [userDataError, setUserDataError] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setUserDataError({
      ...userData,
      [name]: value ? null : "This Field is required",
    });
  };

  return (
    <div >
      <form >
        <div >
          <div >
            {userDataError.firstName && (
              <span >{userDataError.firstName}</span>
            )}
          </div>
          <div >
            <label htmlFor="firstName" >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
            {userDataError.firstName && (
              <span >{userDataError.firstName}</span>
            )}
          </div>
          <div >
            <label htmlFor="lastName" >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
            {userDataError.lastName && (
              <span >{userDataError.lastName}</span>
            )}
          </div>
          <div >
            <label htmlFor="email" >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
            />
            {userDataError.email && (
              <span >{userDataError.email}</span>
            )}
          </div>
          <div >
            <label htmlFor="role" >
              Role
            </label>
            <select
              id="role"
              name="role"
              placeholder="Select your role"
              value={userData.role}
              onChange={handleChange}
            >
              <option value="Operator">Operator</option>
            </select>
            {userDataError.role && (
              <span >{userDataError.role}</span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
