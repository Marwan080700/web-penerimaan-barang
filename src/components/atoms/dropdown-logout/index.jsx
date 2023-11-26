import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DropdownLogout = ({ toggleModal, setUser }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggleModal]);

  const Logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logout successfully", {
      position: "bottom-right",
      autoClose: 3000,
    });
    navigate("/");
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl"
    >
      <button
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        onClick={Logout}
      >
        Logout
      </button>
    </div>
  );
};

export default DropdownLogout;
