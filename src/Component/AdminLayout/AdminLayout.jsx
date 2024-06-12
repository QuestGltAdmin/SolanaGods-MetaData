import React from "react";
import AdminHeader from "./AdminHeader";

function Layout(props) {
  return (
    <div className="dashboard-layout">
      <div className="inner-dash-bpx">
        <AdminHeader />
        {props.children}
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default Layout;
