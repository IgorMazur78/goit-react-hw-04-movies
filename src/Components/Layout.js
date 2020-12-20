import React from "react";
import Header from "../Views/Header"

const Layout = ({ children }) => {
  return <div>
      <Header/>
      {children}</div>;
};
export default Layout;
