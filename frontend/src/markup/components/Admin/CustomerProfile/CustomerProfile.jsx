import React, { useRef, useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

// import services
import vehicleService from "../../../../services/vehicle.services";
import customerService from "../../../../services/customer.services";

// import the useAuth hook
import { useAuth } from "../../../../Context/AuthContext";

// import react icons
import { FaEdit } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

// import react router dom
import { useParams, useNavigate, Link } from "react-router-dom";

function CustomerProfile() {
  const navigate = useNavigate();
  const [customer1, setCustomer1] = useState("");
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");

  console.log(vehicle_year);
  console.log(vehicle_make);
  console.log(vehicle_model);
  console.log(vehicle_type);
  console.log(vehicle_mileage);
  console.log(vehicle_tag);
  console.log(vehicle_serial);
  console.log(vehicle_color);

  const { customer_hash } = useParams();
  // console.log(customer_hash);

  // traget
  const vehicleYearDom = useRef();
  const vehicleMakeDom = useRef();
  const vehicleModelDom = useRef();
  const vehicleTypeDom = useRef();
  const vehicleMileageDom = useRef();
  const vehicleTagDom = useRef();
  const vehicleSerialDom = useRef();
  const vehicleColorDom = useRef();

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // vehicle year value tracker
  function vehicleYearTracker() {
    setVehicleYear(vehicleYearDom.current.value);
  }

  // vehicle make value tracker
  function vehicleMakeTracker() {
    setVehicleMake(vehicleMakeDom.current.value);
  }

  // Vehicle Model value tracker
  function vehicleModelTracker() {
    setVehicleModel(vehicleModelDom.current.value);
  }

  // Vehicle Type value tracker
  function vehicleTypeTracker() {
    setVehicleType(vehicleTypeDom.current.value);
  }

  // Vehicle Mileage value tracker
  function vehicleMileageTracker() {
    setVehicleMileage(vehicleMileageDom.current.value);
  }

  // Vehicle Tag value tracker
  function vehicleTagTracker() {
    setVehicleTag(vehicleTagDom.current.value);
  }

  // Vehicle Serial value tracker
  function vehicleSerialTracker() {
    setVehicleSerial(vehicleSerialDom.current.value);
  }

  // Vehicle Color value tracker
  function vehicleColorTracker() {
    setVehicleColor(vehicleColorDom.current.value);
  }

  // fetch employee data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      // console.log(formData);
      try {
        const data = await customerService?.singleCustomer(
          customer_hash,
          loggedInEmployeeToken
        );

        // console.log(data.data.singleCustomer[0]);

        if (data?.statusText !== "OK") {
          // set apiError to true
          setApiError(true);

          if (data?.status === 403) {
            setApiErrorMessage("Please login again");
          } else if (data?.status === 401) {
            setApiErrorMessage("You are not Authorized to view this page");
          } else {
            setApiErrorMessage("Please try again laterrrr");
          }
        }

        setCustomer1(data.data.singleCustomer[0]);

        // console.log(checkboxDOM.current.checked);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // submit handler
  async function handleSubmit(e) {
    // prevent the default behavior of the form submission
    e.preventDefault();

    // prepare the data for form submission
    const FormData = {
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      customer_hash,
    };

    try {
      const data = await vehicleService.addVehicle(
        FormData,
        loggedInEmployeeToken
      );

      //   alert("grooddddddddddddddddddddddd");
      navigate(`/admin/customer-profile/${customer_hash}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="contact-section">
        <div className="mx-5">
          {/* Customer Info */}
          <div
            className=" ml-5 pb-4  d-flex order-danger "
            style={{ borderLeft: "2px solid red" }}
          >
            <div
              className="ml-n5 bg-danger text-center d-flex align-items-center justify-content-center rounded-circle text-white font-weight-bolder"
              style={{ width: "90px", height: "90px" }}
            >
              Info
            </div>
            <div className=" ml-4 p-3 flex-grow-1">
              <div className=" d-flex justify-content-between">
                <h4 className="fw-bold font-weight-bold">
                  <span className=" fw-bold mr-2">
                    {" "}
                    {customer1.customer_first_name}
                  </span>
                  {customer1.customer_last_name}
                  <span></span>
                </h4>
              </div>

              <div>
                <span className="font-weight-bold mr-2">Email :</span>
                <span className="text-secondary">
                  {customer1.customer_email}
                </span>
              </div>

              <div>
                <span className="font-weight-bold mr-2 ">Phone Number:</span>
                <span className="text-secondary">
                  {customer1.customer_phone_number}
                </span>
              </div>

              <div>
                <span className="font-weight-bold mr-2">Active Customer: </span>
                <span className="text-secondary">
                  {customer1?.active_customer_status ? "Yes" : "No"}
                </span>
              </div>

              <div>
                <span className="font-weight-bold mr-2">
                  Edit customer info{" "}
                </span>
                <span>
                  <Link
                    to={`/admin/customer-update/${customer1.customer_hash}`}
                  >
                    <FaEdit color="#081336" />
                  </Link>
                </span>
              </div>
            </div>
          </div>

          {/* customer Vehicle */}
          <div className="d-flex">
            <div
              className=" pb-5 ml-5 d-flex "
              style={{ borderLeft: "2px solid red" }}
            >
              <div
                className="ml-n5 bg-danger text-center d-flex align-items-center justify-content-center rounded-circle text-white font-weight-bolder"
                style={{ width: "90px", height: "90px" }}
              >
                Cars
              </div>
            </div>
            <div className=" ml-3 w-100 px-4 pb-5">
              <div>
                <div>
                  <h4 className="font-weight-bold mt-2 mb-3">
                    VEHICLES OF{" "}
                    {customer1.customer_first_name +
                      " " +
                      customer1.customer_last_name}
                  </h4>
                </div>
                <div className=" bg-white px-2 py-1 ">BOOTSTRAP TAble</div>
              </div>
              <div className="mt-2" style={{ widows: "85%" }}>
                <div className="d-flex justify-content-start">
                  <div
                    className=" rounded-circle d-flex justify-content-center align-items-center "
                    style={{ height: "25px", width: "25px" }}
                  >
                    <FaCirclePlus size={40} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 d-block collapse show">
                <div>
                  <h4 className="font-weight-bold mt-2 mb-3">
                    Add a new vehicle
                  </h4>
                </div>

                <div className="contact-form">
                  {/* Form Start*/}

                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      {/* Vehicle Year*/}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_year"
                          placeholder="Vehicle Year"
                          ref={vehicleYearDom}
                          value={vehicle_year}
                          onChange={vehicleYearTracker}
                          required
                        />
                        {"firstNameRequired" && (
                          <div className="validation-error" role="alert">
                            {"firstNameRequired"}
                          </div>
                        )}
                      </div>

                      {/* Vehicle Make*/}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_make"
                          placeholder="Vehicle Make"
                          required
                          ref={vehicleMakeDom}
                          value={vehicle_make}
                          onChange={vehicleMakeTracker}
                        />
                      </div>

                      {/* Vehicle Model */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_model"
                          placeholder="Vehicle Model"
                          ref={vehicleModelDom}
                          required
                          value={vehicle_model}
                          onChange={vehicleModelTracker}
                        />
                      </div>

                      {/* Vehicle Type */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_type"
                          placeholder="Vehicle Type"
                          ref={vehicleTypeDom}
                          required
                          value={vehicle_type}
                          onChange={vehicleTypeTracker}
                        />
                      </div>

                      {/* Vehicle Mileage */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_mileage"
                          placeholder="Vehicle Mileage"
                          ref={vehicleMileageDom}
                          required
                          value={vehicle_mileage}
                          onChange={vehicleMileageTracker}
                        />
                      </div>

                      {/* Vehicle Tag */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_tag"
                          placeholder="Vehicle Tag"
                          ref={vehicleTagDom}
                          required
                          value={vehicle_tag}
                          onChange={vehicleTagTracker}
                        />
                      </div>

                      {/* Vehicle Serial */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_serial"
                          placeholder="Vehicle Serial"
                          ref={vehicleSerialDom}
                          required
                          value={vehicle_serial}
                          onChange={vehicleSerialTracker}
                        />
                      </div>

                      {/* Vehicle Color */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_color"
                          placeholder="Vehicle Color"
                          ref={vehicleColorDom}
                          required
                          value={vehicle_color}
                          onChange={vehicleColorTracker}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="form-group col-md-12">
                        <button
                          // onClick={spinner}
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>
                            {!"spin" ? (
                              <BeatLoader color="white" size={8} />
                            ) : (
                              "Add Vehicle"
                            )}
                          </span>
                        </button>
                        {"serverMsg" && (
                          <div
                            className="validation-error"
                            style={{
                              color: "green",
                              fontSize: "100%",
                              fontWeight: "600",
                              padding: "25px",
                            }}
                            role="alert"
                          >
                            {/* {serverMsg} */}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>

                  {/* Form End */}
                </div>
              </div>
            </div>
          </div>

          {/* Order */}
          <div className=" d-flex">
            <div
              className="pt-4 d-flex ml-5  "
              style={{ borderLeft: "2px solid red" }}
            >
              <div
                className=" ml-n5 bg-danger text-center d-flex align-items-center justify-content-center rounded-circle text-white font-weight-bolder"
                style={{ width: "90px", height: "90px" }}
              >
                Orders
              </div>
            </div>

            <div className=" ml-5 w-100">
              <div>
                <div>
                  <h4 className="font-weight-bold mt-2 mb-3">
                    Orders Of Biruk
                  </h4>
                </div>

                <div className="d-flex justify-content-between mb-n2">
                  Bottstrap table
                </div>

                <Link to="/admin/order/add-new-order">
                  <FaCirclePlus
                    size={40}
                    className="scale-on-hover cursor-pointer text-dark"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CustomerProfile;
