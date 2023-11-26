import { useEffect, useState } from "react";
import Navigation from "../../components/organisms/navbar/index";

function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

const Dashboard = ({}) => {
  const [user, setUser] = useState(getUser());
  const [name, getName] = useState(getUser());

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setUser();
  }, []);

  return (
    <>
      <h1 className="text-xl mt-1">
        Selamat Datang {name?.data?.data?.user?.name} !
      </h1>
    </>
  );
};
export default Dashboard;
