import React from "react";
import NavMenu from "./NavMenu";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../css/main.min.css"

function Layout({ children }) {
  return (
    <>
      <NavMenu />
      <div
        className="container-fluid"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className="row">
          <div className="col-12">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Layout;
