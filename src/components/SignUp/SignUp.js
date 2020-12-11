import React, { useState } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn } from "mdbreact";
import { userSignUp } from "../../api-services/user-service";
import { Redirect } from "react-router-dom";
import "./SignUp.css";

function SignUp(props) {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [verify, setVerify] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateRequired = () => {
    let msg = null;
    switch (true) {
      case formData.username.trim() === "":
        msg = "User name is required.";
        break;
      case formData.first_name.trim() === "":
        msg = "First name is required.";
        break;
      case formData.last_name.trim() === "":
        msg = "Last name is required.";
        break;
      case formData.email.trim() === "":
        msg = "Email is required.";
        break;
      case formData.password.trim() === "":
        msg = "Password is required.";
        break;
    }
    return msg;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    let msg = null;
    if ((msg = validateRequired())) {
      setAlertMsg(msg);
      return;
    }
    const res = await userSignUp(formData);
    console.log("handleSignUp res: ", res.data, res.error);
    if (res.error) {
      setAlertMsg(res.error);
      console.log("set the alert message to  - ", res.error);
    } else {
      setAlertMsg();
      localStorage.setItem("user", JSON.stringify(res.data));
      setVerify(true);
      props.setUser(res.data);
      await props.loadCartData();
    }
  };
  return (
    <div className="signup-form-container">
      <MDBRow>
        <MDBCol md="0">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={handleSignUp}>
                <p className="h4 text-center py-4 signup-title">Sign up</p>
                {alertMsg && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {alertMsg}
                  </p>
                )}
                <div className="default-text">
                  <input
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="User name"
                    // required
                    autocomplete="off"
                  />
                  <br />
                  <input
                    value={formData.first_name}
                    name="first_name"
                    onChange={handleChange}
                    type="text"
                    id="first_name"
                    className="form-control"
                    placeholder="First name"
                    // required
                    autocomplete="off"
                  />
                  <br />
                  <input
                    value={formData.last_name}
                    name="last_name"
                    onChange={handleChange}
                    type="text"
                    id="last_name"
                    className="form-control"
                    placeholder="Last name"
                    // required
                    autocomplete="off"
                  />
                  <br />
                  <input
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    // required
                    autocomplete="off"
                  />
                  <br />
                  <input
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    type="text"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    // required
                    autocomplete="off"
                  />
                  <br />
                </div>
                <div style={{ textAlign: "center" }}>
                  <MDBBtn
                    type="submit"
                    style={{ borderRadius: "5px", fontSize: "10px" }}
                  >
                    Sign Up
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {verify && <Redirect to="/" />}
    </div>
  );
}

export default SignUp;
