import Footer from "./Footer";
import { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <NavBar setIsShow={setIsShow} />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
