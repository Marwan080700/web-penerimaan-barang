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
      className="absolute right-0 mt-2 bg-white border rounded shadow-xl w-[7.5rem] hover:bg-gray-300 "
    >
      <button
        className="block px-1 py-2 text-gray-800 w-[10rem] hover:text-white"
        onClick={Logout}
      >
        <div className="flex items-center gap-2 uppercase ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          <p className="text-xs font-semibold ">Logout</p>
        </div>
      </button>
    </div>
  );
};

export default DropdownLogout;
