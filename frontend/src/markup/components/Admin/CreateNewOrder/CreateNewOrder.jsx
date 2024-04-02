import React from "react";

import { useParams, useNavigate, Link, Navigate } from "react-router-dom";

import { FaEdit } from "react-icons/fa";

function CreateNewOrder() {
  return (
    <section className="contact-section pb-5">
      <div className=" auto-container ">
        <div className="contact-title ">
          <div>
            <h2>Create New Order 3</h2>{" "}
          </div>

          {[1, 2].map((service) => (
            <>
              <div class="bg-white my-2 d-flex">
                <div class="pt-3 pb-1 px-4 flex-grow-1">
                  <h5 class="mb-1 font-weight-bold">
                    {"service.service_name"}
                  </h5>
                  <h6 class=" mb-1 text-secondary">
                    {"service.service_description"}
                  </h6>
                </div>
                <div class="d-flex align-items-center px-4">
                  <Link
                    to={`/admin/services/service-update/${"service.service_hash"}`}>
                    <FaEdit color="#081336" />
                  </Link>
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
                  // ref={serviceNameDom}
                  // onChange={serviceNameTracker}
                  // value={service_name}
                  required
                />
              </div>

              <div className="form-group col-md-12">
                <textarea
                  type="text"
                  name="service_description"
                  placeholder="Service description"
                  // ref={serviceDescriptionDom}
                  // onChange={serviceDescriptionTracker}
                  // value={service_description}
                  required=""></textarea>
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
  );
}

export default CreateNewOrder;
