import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../input.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const HomeMain = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const time = useSelector((state)=>state.time)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/home", { withCredentials: true });
                console.log("home reached, fetched data = ", response.data.user);
                if(!response.data.user){
                    navigate("/")
                }
                setUserData(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/logout", { withCredentials: true });
            console.log("Logged out successfully");
            navigate("/"); 
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="home-container flex flex-col items-center justify-center min-h-screen">
            <h4>{time ? (
                time
            ) : (
                <h4>Time data not available</h4>
            )}
            </h4>
            <h3 className="text-3xl font-bold text-center">Welcome to the Home Page</h3>
            <p className="text-lg text-gray-600 text-center">-------------</p>
            <div className="user-data bg-gray-100 p-6 rounded-md shadow-md mt-4 max-w-lg w-full text-center">
                {userData ? (
                    <>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
            <div className="mt-6">
                <Link to="/profile" className="text-blue-500 hover:text-blue-700">
                    Go to Profile
                </Link>
            </div>
            <button
                onClick={handleLogout}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default HomeMain;
