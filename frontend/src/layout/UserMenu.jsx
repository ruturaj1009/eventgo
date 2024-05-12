import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const UserMenu = () => {
  const { auth } = React.useContext(AuthContext);
  const history = useNavigate();

  React.useEffect(() => {
    if (!auth.user) {
      toast.warning("Login to Continue")
      history("/login");
    }
  }, [auth.user, history]);

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
