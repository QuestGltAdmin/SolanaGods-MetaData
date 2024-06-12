import React from "react";
// import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
  return (
    <div className="dashboard-layout">
      <div className="inner-dash-bpx">
        <Header />
        {props.children}
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default Layout;
