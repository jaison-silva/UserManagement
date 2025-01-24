import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../input.css";
import axios from "axios";

const AdminPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [activeTab, setActiveTab] = useState("viewUsers");
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [userSearchData, setuserSearchData] = useState(null)
  const usernameRef = useRef(null);
  const userpasswordRef = useRef(null);
  const userEmailRef = useRef(null);
  const NewusernameRef = useRef(null);
  const NewuserpasswordRef = useRef(null);
  const NewuserEmailRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin", {
          withCredentials: true,
        });
        // console.log("dataaaaa", response);
        if (response.data.redirect) {
          navigate(response.data.redirect);
        }
        setuserSearchData(response.data.user)
        setAdminData(response.data.admin);
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const deleteUser = async (email) => {
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/delete/${email}`,
        {
          withCredentials: true,
        }
      );
      console.log("User deleted successfully", deleteResponse);

      const response = await axios.get("http://localhost:5000/admin", {
        withCredentials: true,
      });

      setAdminData(response.data.admin);
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();

    const data = {
      name: usernameRef.current.value,
      password: userpasswordRef.current.value,
      email: userEmailRef.current.value,
    };

    try {
      const createUserResponse = await axios.post(
        "http://localhost:5000/registerUser",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("user created ", createUserResponse);

      usernameRef.current.value = "";
      userpasswordRef.current.value = "";
      userEmailRef.current.value = "";

      const response = await axios.get("http://localhost:5000/admin", {
        withCredentials: true,
      });
      //   console.log("Blahh");
      setAdminData(response.data.admin);
      setUserData(response.data.user);
    } catch (e) {
      console.error(e);
    }
  };

  const updateUser = async (e) => {
    try {
      e.preventDefault();

      const data = {
        name: NewusernameRef.current.value,
        email: NewuserEmailRef.current.value,
        password: NewuserpasswordRef.current.value,
      };

      const updateResponse = await axios.put(
        "http://localhost:5000/updateUser",
        data,
        {
          withCredentials: true,
        }
      );

      console.log(updateResponse.data);
      const response = await axios.get("http://localhost:5000/admin", {
        withCredentials: true,
      });
      //   console.log("Blahh");
      setAdminData(response.data.admin);
      setUserData(response.data.user);

      setActiveTab("viewUsers");
    } catch (err) {
      console.log(err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "viewUsers":
        return (
          <div className="bg-white p-6 rounded shadow">
            <div className="flex items-center mb-4">
              <h3 className="mr-5 text-xl font-semibold mb-4">All Users</h3>
              <h3 className="mr-3 text-xl font-semibold mb-4">Search : </h3>
              <input className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search Users"
                onChange={(e) => {
                    console.log("user data", userData)
                    const searchValue = e.target.value.toLowerCase().trim();
                    if (searchValue) { 
                      setUserData((prev) => {
                        return prev.filter((val) =>
                          val.name.toLowerCase().includes(searchValue)
                        );
                      });
                    } else {
                      setUserData(userSearchData);
                    }
                  }}
              ></input>
            </div>
            {!userData || userData.length === 0 ? (
              <p className="text-gray-500">No users available.</p>
            ) : (
              <ul className="space-y-2">
                {userData.map((user, index) => (
                  <li
                    key={index}
                    className="flex justify-between p-3 bg-gray-100 rounded"
                  >
                    <span>Name : {user.name}</span>
                    <span className="text-gray-600">Email : {user.email}</span>
                    <div>
                      <button
                        onClick={() => deleteUser(user.email)}
                        className="mr-3 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Delete User
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUserData(user);
                          setActiveTab("editUser");
                        }}
                        className="py-2 px-4 bg-yellow-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Edit User
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "addUser":
        return (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Add New User</h3>
            <form className="space-y-4" onSubmit={createUser}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="userName"
                  placeholder="Enter your Name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  ref={usernameRef}
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="userEmail"
                  placeholder="Enter your Email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  ref={userEmailRef}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  ref={userpasswordRef}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        );
      case "editUser":
        return (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <form className="space-y-4" onSubmit={updateUser}>
              <div>
                <label className="block text-gray-700 font-medium">
                  Email ID:
                </label>
                <input
                  type="email"
                  ref={NewuserEmailRef}
                  defaultValue={selectedUserData?.email || ""}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  New Name:
                </label>
                <input
                  type="text"
                  defaultValue={selectedUserData?.name || ""}
                  ref={NewusernameRef}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  New Password:
                </label>
                <input
                  type="password"
                  ref={NewuserpasswordRef}
                  placeholder="Enter new password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
              >
                Edit User
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex justify-center">
            Admin Dashboard
          </h3>
          <div className="mb-6">
            {adminData ? (
              <p className="text-gray-700 flex justify-center">
                <span className="font-bold ">Email:</span> {adminData.email}{" "}
                <span className="font-bold">Password:</span>{" "}
                {adminData.password}
              </p>
            ) : (
              <p className="text-gray-500">Loading admin data...</p>
            )}
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("viewUsers")}
              className={`py-2 px-4 rounded ${
                activeTab === "viewUsers"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              View All Users
            </button>
            <button
              onClick={() => setActiveTab("addUser")}
              className={`py-2 px-4 rounded ${
                activeTab === "addUser"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Add New User
            </button>
            <button
              onClick={() => setActiveTab("editUser")}
              className={`py-2 px-4 rounded ${
                activeTab === "editUser"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Edit User
            </button>
          </div>
          <div>{renderContent()}</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-b hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
