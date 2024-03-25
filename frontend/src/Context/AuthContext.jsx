// import the react and the hooks here
import React, { useState, useEffect, useContext, createContext } from "react";

// import the utils function to handle the reading from the local storage
import getAuth from "../utils/auth";

// create a context object
const AuthContext = React.createContext();

// create a custom hook to use the context
function useAuth() {
  return useContext(AuthContext);
}

// create a provider conponent
function AuthProvider({ children }) {
  const [employee, setEmployee] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged, employee };

  useEffect(() => {
    // retrive the logged in user from local storage
    const loggedInEmployee = getAuth();

    loggedInEmployee.then((response) => {
      console.log(response)

      // set islogged to true
      if (response.employee_token) {
        setIsLogged(true);
      }

      // 3 is the employe role for admin
      if (response.employee_role === 3) {
        setIsAdmin(true);
      }

      //set the whole response on employee
      setEmployee(response);
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
