import React, { useState } from "react";
import { MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from "mdbreact";
import { Link } from "react-router-dom";
import { userSignIn } from "../../api-services/user-service";
import "./Login.css";

const Login = (props) => {
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const [alertMsg, setAlertMsg] = useState("");

  const handleUsername = (e) => {
    setValue({ ...value, username: e.target.value });
  };
  const handlePassword = (e) => {
    setValue({ ...value, password: e.target.value });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    const res = await userSignIn(value);
    if (res.error) {
      setAlertMsg(res.error);
      console.log("set the alert message to  - ", res.error);
    } else {
      localStorage.setItem("user", JSON.stringify(res.data));
      setAlertMsg();
      props.setUser(res.data);
      await props.loadCartData();
      props.history.push("/");
    }
  };

  return (
    <div className="form-container">
      <MDBRow> 
        <MDBCol md="0">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Login</p>
                {alertMsg && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {alertMsg}
                  </p>
                )}
                <div className="blue-text">
                  <MDBInput
                    label="Your username"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleUsername}
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    onChange={handlePassword}
                    type="password"
                    validate
                  />
                </div>
                <div
                  className="text-center"
                  style={{ margin: "0", paddingBottom: "30px" }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogIn}
                  >
                    Login
                  </button>
                </div>
                <p style={{ textAlign: "center" }}>
                  Not a member?{" "}
                  <Link to="/signup" style={{ textDecoration: "underline" }}>
                    Join now
                  </Link>
                </p>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Login;
