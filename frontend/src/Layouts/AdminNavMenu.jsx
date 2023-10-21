import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import { logout, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

function AdminNavMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);

  const logoutUser = (e) => {
    e.stopPropagation();
    dispatch(logout());
    dispatch(reset());
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid container-md">
          <a href="/admin" className="navbar-brand">
            PERSONAL WEBSITE
          </a>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/admin/pagecontents" className="nav-link">
                  Page Content
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/projects" className="nav-link">
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/skills" className="nav-link">
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/contactmessages" className="nav-link">
                  Contact Messages
                </Link>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" onClick={logoutUser}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavMenu;
