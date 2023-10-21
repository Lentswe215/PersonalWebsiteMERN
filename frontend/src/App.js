import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./Layouts/AdminLayout";
import AdminHome from "./Admin/home";
import PageContentsAdmin from "./Admin/PageContents";
import ProjectsAdmin from "./Admin/Projects";
import ContactMessagesAdmin from "./Admin/ContactMessages";
import SkillsAdmin from "./Admin/Skills";
import NotFound from "./NotFound";
import Layout from "./Layouts/Layout";
import "bootstrap";
import Login from "./Site/login";
// import "../src/css/main.min.css";
import Home from "./Site/home";
import { CheckIsAuthorized } from "./helpers/Lookup";
import ThrobbleHelper from "./helpers/ThrobbleHelper";
import "react-confirm-alert/src/react-confirm-alert.css"

function App() {
  const isAuthorized = CheckIsAuthorized();
  return (
    <>
      {/* <Router> */}
      <Routes>
        <Route path="/" Component={Layout}>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/admin" Component={AdminLayout}>
          <Route index exact element={<AdminHome />} />
          <Route path="/admin/pagecontents" element={<PageContentsAdmin />} />
          <Route path="/admin/projects" element={<ProjectsAdmin />} />
          <Route
            path="/admin/contactmessages"
            element={<ContactMessagesAdmin />}
          />
          <Route path="/admin/skills" element={<SkillsAdmin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </Router> */}
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={true}
      theme="colored"
       />
      <ThrobbleHelper />
    </>
  );
}

export default App;
