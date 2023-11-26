import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/slice/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    let userCredentials = {
      username,
      name,
      password,
    };

    dispatch(registerUser(userCredentials)).then((result) => {
      if (result.payload) {
        // If registration is successful
        setUsername("");
        setName("");
        setPassword("");
        toast.success("Registration successful. Please log in.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        navigate("/"); // Navigate to the login page after successful registration
      } else {
        // If registration fails, display an error toast
        toast.error("Registration failed. Please check your credentials.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-[25%] bg-white p-8 rounded rounded-xl shadow-2xl">
        <form action="" onSubmit={handleSignup}>
          <div className="text-center font-bold mb-5">
            <h1>Register</h1>
          </div>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-start mb-1 text-sm font-sans font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 text-xs"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-start mb-1 text-sm font-sans font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 text-xs"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-start mb-1 text-sm font-sans font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded w-full mb-4 p-2 text-xs"
              placeholder="Enter password"
            />
          </div>
          <div className="text-end">
            <button
              className="bg-black hover:bg-gray-500 text-white font-semibold py-2 px-5 border rounded"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex gap-2 text-xs italic mt-3">
          <p>Already Have An Account</p>
          <Link to="/" className="border-b border-black">
            Click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
