import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let userCredentials = {
      username,
      password,
    };

    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setUsername("");
        setPassword("");
        toast.success("Login successfully", {
          position: "bottom-right",
          autoClose: 3000,
        });
        navigate("/dashboard");
      } else {
        toast.error("Login failed. Please check your credentials.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[15%] bg-white p-8 rounded-xl shadow-2xl">
        <form action="" onSubmit={handleLogin}>
          <div className="flex items-center justify-center mb-3">
            <img src={logo} alt="logo" width="180px" />
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
              Login
            </button>
          </div>
        </form>
        <div className="flex gap-2 text-xs italic mt-3">
          <p>Don't have an account?</p>
          <Link to="/signup" className="border-b border-black">
            Click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
