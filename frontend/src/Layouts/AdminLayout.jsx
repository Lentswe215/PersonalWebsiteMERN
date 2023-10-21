import React, { Component, useEffect, useState } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavMenu from "./AdminNavMenu";
import { UseSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "../css/admin.min.css"

class AdminLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <AdminNavMenu />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Outlet />
            </div>
          </div>
        </div>
        <AdminFooter />
      </>
    );
  }
}

export default AdminLayout;
