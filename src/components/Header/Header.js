import React from "react";
import { Link } from "react-router-dom";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBIcon,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import "./Header.css";

function Header({ user, cartCount, setUser, history, setCartData }) {
  const handleLogout = () => {
    setUser();
    setCartData();
    localStorage.setItem("user", JSON.stringify(""));
    history.push("/");
  };

  return (
    <div className="header-container">
      <div className="header-icons">
        <a
          href="http://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MDBIcon fab icon="facebook-f" />
        </a>
        <a
          href="http://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MDBIcon fab icon="instagram" />
        </a>
        <a
          href="http://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MDBIcon fab icon="twitter" />
        </a>
      </div>
      <div className="header-cart">
        {!user ? (
          <Link to="/login">
            <p className="header-login">
              <MDBIcon far icon="user" /> &nbsp; Login
            </p>
          </Link>
        ) : (
          // <MDBDropdown>
          //   <MDBDropdownToggle
          //     nav
          //     caret
          //     style={{ color: "black", padding: "0 15px" }}
          //   >
          //     <MDBIcon far icon="user" />
          //     <span style={{ marginLeft: "15px" }}>My Account</span>
          //   </MDBDropdownToggle>
          //   <MDBDropdownMenu>
          //     <Link to="/profile">
          //       <MDBDropdownItem href="#!">Profile</MDBDropdownItem>
          //     </Link>
          //     <Link to="/orders">
          //       <MDBDropdownItem href="#!">Orders</MDBDropdownItem>
          //     </Link>
          //     <Link to="/">
          //       <MDBDropdownItem
          //         href="#!"
          //         onClick={() => {
          //           setUser();
          //           setCartData();
          //           localStorage.setItem("user", JSON.stringify(""));
          //         }}
          //       >
          //         Log Out
          //       </MDBDropdownItem>
          //     </Link>
          //   </MDBDropdownMenu>
          // </MDBDropdown>

          // <Link to="/login">
          <p className="header-login" onClick={handleLogout}>
            <i className="far fa-user"></i> &nbsp; Logout
          </p>
          // </Link>
        )}
        <Link to="/cart">
          <i className="fas fa-shopping-cart ml-1"></i>
          &nbsp;
          <span className="counter">{cartCount}</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
