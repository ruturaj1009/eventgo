import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const UserMenu = () => {
  const navigate = useNavigate();
  const { auth, setAuth, setLoggedin } = React.useContext(AuthContext);
  React.useEffect(() => {
    const data = localStorage.getItem("authdata");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
      setLoggedin(true);
    }
    else{
      toast.error("Log in to continue")
      navigate("/login")
    }
  }, []);

  return (
    <>
      <header>
        <Sidebar />
        <Header />
      </header>
      <main style={{ marginTop: "58px" }}>
        <div className="container pt-4">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default UserMenu;
