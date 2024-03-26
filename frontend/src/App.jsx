import React from "react";

// Import the Routes and Route components from react-router
import { Routes, Route } from "react-router";

// Import the page components
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Unauthorized from "./markup/pages/Unauthorized";
import Orders from "./markup/pages/admin/Orders";
import Customers from "./markup/pages/admin/Customers";
import Employees from "./markup/pages/admin/Employees";

// Import the header and footer components
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";

// import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// import the custom files
import "./assets/styles/custom.css";

// import the PrivateAuthToute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* home page route */}
        <Route path="/" element={<Home />} />

        {/* login page route */}
        <Route path="/login" element={<Login />} />

        {/* unauthorized page route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Orders page route */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />

        {/* Customers page route */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />

        {/* Employees page route */}
        <Route path="/admin/employees" element={<Employees />} />

        {/* add employee page route */}
        <Route path="/admin/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
