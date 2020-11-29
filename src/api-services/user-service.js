import { BACKEND_URL } from "../constants";
import axios from "axios";

export const userSignIn = async (userSignInInfo) => {
  try {
    const res = await axios({
      method: "post",
      url: `${BACKEND_URL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(userSignInInfo),
    });
    const userData = res.data;
    console.log("userSignIn ", userData);
    return userData;
  } catch (err) {
    console.log("User Sign-In Error: ", err);
  }
};

export const userSignUp = async (userSignUpInfo) => {
  try {
    const res = await axios({
      method: "post",
      url: `${BACKEND_URL}/auth/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(userSignUpInfo),
    });
    const userData = res.data;
    console.log("userSignUp ", userData);
    return userData;
  } catch (err) {
    console.log("User Sign-Up Error: ", err);
  }
};
