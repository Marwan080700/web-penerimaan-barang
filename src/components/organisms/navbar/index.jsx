import { useEffect, useRef, useState } from "react";
import userLogo from "../../../assets/img/logo-user.png";
import DropdownLogout from "../../atoms/dropdown-logout";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navigation = () => {
  const [user, setUser] = useState(getUser());
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function getUser() {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
    } else {
      user = null;
    }
    return user;
  }

  const toggleModal = () => setIsOpen((prevState) => !prevState);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <>
      <div className="bg-slate-700 w-full h-[55px]">
        <div className="flex justify-end px-[50px] py-1">
          <div className="relative">
            <button
              className="flex gap-2 items-center content-center"
              onClick={toggleModal}
            >
              <img
                src={userLogo}
                alt="picture-user"
                width={"45px"}
                className="rounded rounded-full"
              />
              <div className="text-start">
                <p className="text-white">{user?.data?.data?.user?.name}</p>
                <p className="text-white text-xs">
                  {user?.data?.data?.user?.role}
                </p>
              </div>
            </button>
            {isOpen && (
              <DropdownLogout toggleModal={toggleModal} setUser={setUser} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
