import { useState } from "react";
import "../../input.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterMain = () => {
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    try { 
      e.preventDefault();
      setLoading(true);

      if (!name || !email || !password) {
        console.error("All fields are required");
        return;
      }

      const data = { 
        name,
        email,
        password,
      };

      const response = await axios.post("http://localhost:5000/registerUser", data);
      console.log("this is the response ", response.data);
      if(response.data.redirect){
        navigate(response.data.redirect)
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Register Page
        </h3>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterMain;
