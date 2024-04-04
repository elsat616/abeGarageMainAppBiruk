import React, { useState, useEffect, useRef } from "react";

import { useParams, useNavigate, Link, Navigate } from "react-router-dom";

// import the services
import customerService from "../../../../services/customer.services";
import vehicleService from "../../../../services/vehicle.services";
import SERVICE from "../../../../services/service.services";
import Order from "../../../../services/order.services";

import { FaEdit, FaGlideG } from "react-icons/fa";

// import the useAuth hook
import { useAuth } from "../../../../Context/AuthContext";

function OrderDetail() {
  const navigate = useNavigate();
  const [customer1, setCustomer1] = useState("");
  const [vehicle1, setVehicle1] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [additional_request, setAdditionalRequest] = useState(">");
  const [order_total_price, setTotalServicePrice] = useState("");
  const [notes_for_internal_use, setnotes_for_internal_use] = useState(">");
  const [notes_for_customer, setnotes_for_customer] = useState(">");
  const [order_description, setorder_description] = useState(">");
  const [estimated_completion_date, setestimated_completion_date] =
    useState(">");
  const [completion_date, setcompletion_date] = useState(null);
  const [order_completed, setorder_completed] = useState(0);

  const [serverMsg, setServerMsg] = useState("");

  // get the customer id
  const customer_id = customer1.customer_id;

  // target
  const setAdditionalRequestDom = useRef();
  const totalServicePriceDom = useRef();
  const notes_for_internal_useDom = useRef();
  const notes_for_customerDom = useRef();
  const order_descriptionDom = useRef();
  const estimated_completion_dateDom = useRef();
  const serviceDoms = useRef([]);

  // Additional request tracker
  function additionalRequestTracker() {
    setAdditionalRequest(setAdditionalRequestDom.current.value);
  }

  // total Price tracker
  function totalServicePriceTracker() {
    setTotalServicePrice(totalServicePriceDom.current.value);
  }

  // total Price tracker
  function notes_for_internal_useTracker() {
    setnotes_for_internal_use(notes_for_internal_useDom.current.value);
  }

  // total Price tracker
  function notes_for_customerTracker() {
    setnotes_for_customer(notes_for_customerDom.current.value);
  }

  // total Price tracker
  function order_descriptionTracker() {
    setorder_description(order_descriptionDom.current.value);
  }

  // total Price tracker
  function estimated_completion_dateTracker() {
    setestimated_completion_date(estimated_completion_dateDom.current.value);
  }

  // console.log(estimated_completion_date);

  // console.log(selectedServices, "fff");
  // console.log(customer_id);

  // const order_services = [{ service_id: selectedServices }];
  // console.log(order_services);

  const { customer_hash, vehicle_id } = useParams();

  // // Function to handle service checkbox selection
  // function handleServiceSelect(serviceId, isChecked) {
  //   if (isChecked) {
  //     setSelectedServices([...selectedServices, serviceId]);
  //     // console.log(...selectedServices, "trueee");
  //   } else {
  //     setSelectedServices(
  //       selectedServices.filter((id) => (
  //         console.log(id),

  //         console.log(serviceId),

  //         id !== serviceId
  //       ))
  //     );
  //     // console.log(selectedServices, "flaseee");
  //   }
  // }

  // Function to handle checkbox selection

  const handleServiceSelect = (serviceId, isChecked) => {
    if (isChecked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(
        selectedServices.filter(
          (id) =>
            // (console.log(id)), 1,2

            // (console.log(serviceId)), 2

            id !== serviceId
        )
      );
    }
  };
  // console.log(selectedServices)

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();

  const employee_id = employee.employee_id;

  // console.log(employee.employee_id);

  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  //afunction to fetch customer data
  const fetchData1 = async () => {
    // console.log(formData);
    try {
      const data = await customerService?.singleCustomer(
        customer_hash,
        loggedInEmployeeToken
      );

      setCustomer1(data.data.singleCustomer[0]);

      // console.log(checkboxDOM.current.checked);
    } catch (error) {
      console.log(error);
    }
  };

  //afunction to fetch single vehicle data
  const fetchData2 = async () => {
    // console.log(formData);
    try {
      const data = await vehicleService.getSingleVehicle(
        customer_hash,
        vehicle_id,
        loggedInEmployeeToken
      );

      // console.log(data.data.SingleVehicle[0]);
      setVehicle1(data.data.SingleVehicle[0]);

      // console.log(checkboxDOM.current.checked);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all service data
  async function fetchData3() {
    try {
      const data = await SERVICE.getAllServices(loggedInEmployeeToken);

      // console.log(data.data.services);
      setServices(data.data.services);

      // setVehicleError("");
    } catch (error) {
      console.log(error);
    }
  }

  // call the fetchData in useEffect
  useEffect(() => {
    fetchData1();
    fetchData2();
    fetchData3();
  }, []);

  async function handleSubmit(e) {
    // prevent the default behavior of the form submission
    e.preventDefault();

    // prepare the data for form submission
    const formData = {
      employee_id,
      customer_id,
      vehicle_id,
      order_total_price,
      additional_request,
      notes_for_internal_use,
      notes_for_customer,
      order_description,
      estimated_completion_date,
      completion_date,
      order_completed,
      order_services: selectedServices.map((serviceId) => ({
        service_id: serviceId,
      })),
    };

    // console.log(formData);

    try {
      const data = await Order.addOrder(formData, loggedInEmployeeToken);

      setServerMsg("");

      console.log(data.response, "kjhgf");

      // console.log("ooooooooooooooooooooooobject");

      if (data.statusText == "OK") {
        navigate("/admin/orders");
      }

      // console.log(data.statusText);
    } catch (error) {
      // console.log(error.response.data.error);
      setServerMsg(error.response.data.error);

      setTimeout(() => {
        setServerMsg("");
      }, 2000);
    }
  }

  return (
    <section className="contact-section pb-5 ">
      {/*  */}

      {/*order details*/}
      <div className=" ml-4 pb-0  d-flex order-danger ">
        <div className=" ml-4 p-  ">
          <div className="contact-title ">
            <div>
              <h2>Order Of : KKK</h2>{" "}
            </div>
          </div>
        </div>
      </div>



      <div className=" ml-5 pb-0  d-flex order-danger ">
        <div class="bg-white p-4 mr-2 w-100">
          <div class=" d-flex justify-content-between">
            <h4 class="fw-bold font-weight-bold">
              <span class=" fw-bold mr-2">kkk</span>kkk<span></span>
            </h4>
          </div>
          <div>
            <span class="font-weight-bold mr-2">Email :</span>
            <span class="text-secondary">kkk@gmail.com</span>
          </div>
          <div>
            <span class="font-weight-bold mr-2 ">Phone Number:</span>
            <span class="text-secondary">09999999</span>
          </div>
          <div>
            <span class="font-weight-bold mr-2">Active Customer: </span>
            <span class="text-secondary">Yes or no</span>
          </div>
          <div>
            <span class="font-weight-bold mr-2">Edit customer info </span>
            <span>
              <a href="/admin/customer/update">edit</a>
            </span>
          </div>
        </div>{" "}
        <div class="bg-white p-4 mr-2 w-100">
          <div>
            <div class="d-flex justify-content-between">
              <h4 class="fw-bold font-weight-bold">
                <span class="fw-bold mr-2">ford</span>kkk<span></span>
              </h4>
            </div>
            <div>
              <span class="font-weight-bold mr-2">Color :</span>
              <span class="text-secondary">blak</span>
            </div>
            <div>
              <span class="font-weight-bold mr-2">Tag :</span>
              <span class="text-secondary">ghg6dfg</span>
            </div>
            <div>
              <span class="font-weight-bold mr-2">year :</span>
              <span class="text-secondary">2000</span>
            </div>
            <div>
              <span class="font-weight-bold mr-2">Vehicle mileage :</span>
              <span class="text-secondary">1000</span>
            </div>
            <div>
              <span class="font-weight-bold mr-2">Serial :</span>
              <span class="text-secondary">dfgd546dsf</span>
            </div>
            <div>
              <span class="font-weight-bold mr-2">Edit vehicle info </span>
              <span>
                <a href="/admin/customer/update">edit</a>
              </span>
            </div>
          </div>
        </div>{" "}
      </div>

      {/* Requested Services  */}
      <div className="contact-section my-0 py-4 pb-4">
        <div className="mr-5  ">
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className=" ml-4 p-3 flex-grow-1 bg-white Regular shadow">
              <div className="contact-title ">
                <div>
                  <h2>Requested Services</h2>{" "}
                </div>

                {services.map((service, i) => (
                  <>
                    <div
                      key={i}
                      className="bg-white Regular shadow my-2 d-flex ">
                      <div className="py-4 pb-1 px-4 flex-grow-1 ">
                        <h5 className="mb-1 font-weight-bold ">
                          {service.service_name}
                        </h5>
                        <h6 className=" mb-1 text-secondary">
                          {service.service_description}
                        </h6>
                      </div>
                      <div className="order_status">
                        <h6
                          className={
                            "order.order_status"
                              ? "text-center rounded-pill bg-success font-weight-bold text-white px-3 py-"
                              : "text-center rounded-pill bg-warning font-weight-bold px-3 py-"
                          }>
                          {"order.order_status" ? "Completed" : "In Progress"}
                        </h6>
                      </div>
                      <div className="d-flex align-items-center px-4"></div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="contact-section my-0 py-4 pb-4">
        <div className="mr-5  ">
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className=" ml-4 p-3 flex-grow-1 bg-white Regular shadow">
              <div className="contact-title ">
                <div>
                  <h2>Additional Information</h2>{" "}
                </div>

                <div>
                  <div className="bg-white Regular shadow my-2 d-flex ">
                    <div className="py-4 pb-1 px-4 flex-grow-1 ">
                      <h5 className="mb-1 font-weight-bold ">
                        {"order Date"}:{" "}
                        <span className="additional">sdfvxdf</span>
                      </h5>
                    </div>

                    <div className="d-flex align-items-center px-4"></div>
                  </div>

                  <div className="bg-white Regular shadow my-2 d-flex ">
                    <div className="py-4 pb-1 px-4 flex-grow-1 ">
                      <h5 className="mb-1 font-weight-bold ">
                        {"order Date"}:{" "}
                        <span className="additional">sdfvxdf</span>
                      </h5>
                    </div>

                    <div className="d-flex align-items-center px-4"></div>
                  </div>

                  <div className="bg-white Regular shadow my-2 d-flex ">
                    <div className="py-4 pb-1 px-4 flex-grow-1 ">
                      <h5 className="mb-1 font-weight-bold ">
                        {"order Date"}:{" "}
                        <span className="additional">sdfvxdf</span>
                      </h5>
                    </div>

                    <div className="d-flex align-items-center px-4"></div>
                  </div>

                  <div className="bg-white Regular shadow my-2 d-flex ">
                    <div className="py-4 pb-1 px-4 flex-grow-1 ">
                      <h5 className="mb-1 font-weight-bold ">
                        {"order Date"}:{" "}
                        <span className="additional">sdfvxdf</span>
                      </h5>
                    </div>

                    <div className="d-flex align-items-center px-4"></div>
                  </div>

                  <div className=" text-center">
                    {" "}
                    <h6
                        className={
                          "order.order_status"
                            ? "text-center rounded-pill bg-success font-weight-bold text-white py-2 py-"
                            : "text-center rounded-pill bg-warning font-weight-bold px-3 py-"
                        }>
                        {"order.order_status" ? "Completed" : "In Progress"}
                      </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetail;
