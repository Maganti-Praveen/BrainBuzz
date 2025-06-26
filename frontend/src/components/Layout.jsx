import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(!!sessionStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setAuth(!!sessionStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    if (!auth) navigate("/", { replace: true });
  }, [auth, navigate]);

  return (
    <div>
      <Navbar />
      {auth && <Outlet />}
    </div>
  );
};

export default Layout;
