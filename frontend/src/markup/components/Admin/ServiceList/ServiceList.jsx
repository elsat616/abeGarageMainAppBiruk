import React, { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

// import recat components
import { Table, Button } from "react-bootstrap";

// import react icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// import the auth hook
import { useAuth } from "../../../../Context/AuthContext";

// import the employee service to use the get employees function
import employeeService from "../../../../services/employee.services";

// import the date-fns library
import { format } from "date-fns";

////////////////////////////////////////
function ServiceList() {
  const navigate = useNavigate();

  // console.log(employees[0].employee_id)

  // to serve as aflag to show the error message
  const [apiError, setApiError] = useState(false);

  // store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  //   get the logged employee token
  const { employee } = useAuth();

  let token = null;

  if (employee) {
    token = employee?.employee_token;
  }

  return (
    <>
      <section className="contact-section pb-0">
        <div className=" auto-container ">
          <div className="contact-title ">
            <div>
              <h2>Service We Provide</h2>{" "}
              <h5 className="text-secondary">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution.
              </h5>
            </div>

            {[1, 2, 1, 1, 1].map((mpo) => (
              <>
                <div class="bg-white my-2 d-flex">
                  <div class="pt-3 pb-1 px-4 flex-grow-1">
                    <h5 class="mb-1 font-weight-bold">
                      Titleeeeeeeeeeeeeeeeeeeeeeeee
                    </h5>
                    <h6 class=" mb-1 text-secondary">
                      descriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                    </h6>
                  </div>
                  <div class="d-flex align-items-center px-4">
                    <Link to="/admin/services/service-update ">Edit</Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className=" bg-white px-5 pt-5 mt-4 contact-title mb-1">
          <h2>Add a new service</h2>
          <div className="contact-form">
            <form>
              <div className="row clearfix">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="service_name"
                    placeholder="Service name"
                    required
                  ></input>
                </div>

                <div className="form-group col-md-12">
                  <textarea
                    type="text"
                    name="service_description"
                    placeholder="Service description"
                    required=""
                  ></textarea>
                </div>

                <div className="form-group col-md-12">
                  <button class="theme-btn btn-style-one" type="submit">
                    <span>ADD SERVICE</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceList;
