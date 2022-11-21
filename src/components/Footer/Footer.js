import React from "react";
import { MDBIcon } from "mdbreact";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <p>
        © Sampreet K Chawla -<span id="currentYear"></span>-, &nbsp;
        <a href="https://www.linkedin.com/in/sampreetchawla" target="_blank">
          Connect at <MDBIcon fab icon="linkedin" />
        </a>
      </p>
    <script>
      var date = new Date();
      var year = date.getFullYear();
      document.getElementById("currentYear").innerHTML = year;
    </script>
    </footer>
  );
}

export default Footer;
