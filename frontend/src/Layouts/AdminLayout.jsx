import React, { useEffect, useState } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavMenu from "./AdminNavMenu";
import { UseSelector } from "react-redux";

function AdminLayout({ children }) {

  return (
    <>
      <AdminNavMenu />
      <div className="container">
        <div className="row">
          <div className="col-12">{children}</div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
}

export default AdminLayout;
