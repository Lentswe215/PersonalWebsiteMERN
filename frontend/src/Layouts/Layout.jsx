import React from "react";
import NavMenu from "./NavMenu";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <NavMenu />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
