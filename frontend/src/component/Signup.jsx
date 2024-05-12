import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allInputs, setAllInputs] = useState({
    name: "",
    email: "",
    phone: "",
    code: "",
    password: "",
    cPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !allInputs ||
      !allInputs.email ||
      !allInputs.phone ||
      !allInputs.password ||
      !allInputs.cPassword
    ) {
      toast.warn("all fields are required");
    } else if (allInputs.password !== allInputs.cPassword) {
      toast.warn("passwords do not match");
    } else if (allInputs.password.length <= 5) {
      toast.warn("password should be atleast 6 characters long");
    } else if (allInputs.phone.length !== 10) {
      toast.warn("phone number should be of 10 digits");
    }
    
    else {
      const userData = {
        name: allInputs.name,
        email: allInputs.email,
        phone: allInputs.code + "-" + allInputs.phone,
        password: allInputs.password,
      };
      const url = `http://localhost:6060/api/v1/auth/register`;
      setLoading(true);
      axios
        .post(url, userData)
        .then((res) => {
          setLoading(false);
          setAllInputs({
            name: "",
            email: "",
            phone: "",
            code: "",
            password: "",
            cPassword: "",
          });
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/login");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
            setLoading(false);
          if (error.response) {
            if (error.response.status === 409) {
              toast.error(error.response.data.message);
              navigate("/login");
            } else {
              toast.error(error.response.data.message);
            }
          } else if (error.request) {
            toast.error("Something went wrong");
          } else {
            toast.error("Internal server error");
          }
        });
    }
  };
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black "
                style={{ borderRadius: "25px" }}
              >
                <div className="card-body ">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              value={allInputs.name}
                              onChange={(e) =>
                                setAllInputs({
                                  ...allInputs,
                                  name: e.target.value,
                                })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3cs"
                              className="form-control"
                              value={allInputs.email}
                              onChange={(e) =>
                                setAllInputs({
                                  ...allInputs,
                                  email: e.target.value,
                                })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3cs"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 ">
                            <div className="d-flex">
                              <select
                                style={{
                                  borderRadius: "10px",
                                  marginRight: "5px",
                                }}
                                name=""
                                id=""
                                onChange={(e) =>
                                  setAllInputs({
                                    ...allInputs,
                                    code: e.target.value,
                                  })
                                }
                              >
                                <option value="+91">+91</option>
                                <option value="+92">+92</option>
                                <option value="+93">+93</option>
                                <option value="+94">+94</option>
                                <option value="+95">+95</option>
                              </select>
                              <input
                                type="tel"
                                id="form3Example3c"
                                className="form-control"
                                value={allInputs.phone}
                                onChange={(e) =>
                                  setAllInputs({
                                    ...allInputs,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Phone
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              value={allInputs.password}
                              minLength="5"
                              onChange={(e) =>
                                setAllInputs({
                                  ...allInputs,
                                  password: e.target.value,
                                })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              value={allInputs.cPassword}
                              minLength="5"
                              onChange={(e) =>
                                setAllInputs({
                                  ...allInputs,
                                  cPassword: e.target.value,
                                })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-3">
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            Already have an account?
                            <Link to="/login">plaese Login</Link>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={(e) => handleSubmit(e)}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
