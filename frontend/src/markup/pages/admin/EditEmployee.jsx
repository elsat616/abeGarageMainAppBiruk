import React from "react";

// import the auth hook context
import { useAuth } from "../../../Context/AuthContext";

// import the login component
import LoginForm from "../../components/LoginForm/LoginForm";

// import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

import EditEmploye from "../../components/Admin/EditEmployee/EditEmployee";

function EditEmployee() {
  const { isLogged, isAdmin_manager } = useAuth();

  // console.log(useAuth())

  if (isLogged) {
    if (isAdmin_manager) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EditEmploye />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ padding: "100px" }}>
            You don't have the Permission to access the page you request!
          </h1>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default EditEmployee;
