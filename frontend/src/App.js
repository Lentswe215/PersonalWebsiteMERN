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
import "../src/css/main.min.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" exact element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="/admin/pagecontent" element={<PageContentsAdmin />} />
            <Route path="/admin/projects" element={<ProjectsAdmin />} />
            <Route
              path="/admin/contactmessages"
              element={<ContactMessagesAdmin />}
            />
            <Route path="/admin/skills" element={<SkillsAdmin />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/" exact element={<Layout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
