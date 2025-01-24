import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../input.css";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imgExist, setImgExist] = useState(null);
  const time = useSelector((state) => state.time);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          withCredentials: true,
        });
        if (response.data.redirect) {
          navigate(response.data.redirect);
        }
        setUser(response.data.user);
        setImgExist(response.data.user.storageLocation);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    try {
      const uploadResponse = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("file upload response", uploadResponse.data);

      const response = await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });
      setUser(response.data.user);
      setImgExist(response.data.user.storageLocation);
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
         {time ? (
                time
            ) : (
                <h4>Time data not available</h4>
            )}
      <h3 className="text-3xl font-semibold text-gray-800 mb-6">
        User Profile
      </h3>
      <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-2xl">
        {user ? (
          <div className="space-y-6">
            <div className="flex justify-center items-center">
              {imgExist ? (
                <img
                  src={`http://localhost:5000/${imgExist}`}
                  alt="User Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
              ) : (
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  className="text-center"
                >
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:bg-gray-50 hover:file:bg-gray-100"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Upload
                  </button>
                </form>
              )}
            </div>

            <div>
              <p className="text-lg font-medium text-gray-700">
                Name: <span className="font-normal">{user.name}</span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                Email: <span className="font-normal">{user.email}</span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                DB password:{" "}
                <span className="font-normal">{user.password}</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading profile data...</p>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
