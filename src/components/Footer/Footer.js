import React from "react";
import { MDBIcon } from "mdbreact";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <p>
        © Sampreet K Chawla -{new Date().getUTCFullYear()}-, &nbsp;
        <a href="https://www.linkedin.com/in/sampreetchawla" target="_blank">
          Connect at <MDBIcon fab icon="linkedin" />
        </a>
      </p>  
    </footer>
  );
}

export default Footer;
