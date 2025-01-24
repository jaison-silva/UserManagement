import { useRef } from "react";
import "../../input.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTime } from "../../redux/reducers";

const LoginMain = () => {
  const usernameRef = useRef(undefined);
  const userpasswordRef = useRef(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const loginReq = async (e) => {
    e.preventDefault();

    const data = {
      email: usernameRef.current.value,
      password: userpasswordRef.current.value,
    };

    try {
        const response = await axios.post("http://localhost:5000", data, {
            withCredentials: true
          });          
      console.log("uselogin" ,response.data);
      if(response.data.reduxStore){
        dispatch(addTime(response.data.reduxStore))
      }
      if (response.data.redirect) {
        navigate(response.data.redirect);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login Page
        </h3>
        <form className="space-y-4" onSubmit={loginReq}>
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
              ref={usernameRef}
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
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            New user? Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
