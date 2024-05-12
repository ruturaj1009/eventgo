import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth, setLoggedin } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("all fields are required");
    } else if (password.length <= 5) {
      toast.warn("password must be at least 6 characters long");
    } else {
      const userData = {
        email,
        password,
      };
      const url = `http://localhost:6060/api/v1/auth/login`;
      setLoading(true);
      axios
        .post(url, userData)
        .then((res) => {
          setLoading(false);
          setEmail("");
          setPassword("");
          if (res.data.success) {
            toast.success(res.data.message);
            setAuth({ user: res.data.user, token: res.data.token });
            setLoggedin(true);
            localStorage.setItem(
              "authdata",
              JSON.stringify({ user: res.data.user, token: res.data.token })
            );
            navigate("/");
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
      {loading && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            width: "100px",
            zIndex: "999",
            top: "25%",
          }}
        >
          <Rings
            height="80"
            width="80"
            color="#4fa94d"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      )}
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
                        Login
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            Don't have account?
                            <Link to="/signup">Please Sign up</Link>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={(e) => handleSubmit(e)}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
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

export default Login;
