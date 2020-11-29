import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";
import "./Navbar.css";

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);
  const closeBurger = () => setIsOpen(false);

  return (
    <nav className="nav-container">
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          {/* <strong className="white-text">Smoothies2Go</strong> */}
          {/* <p>Smoothies2Go</p> */}
          <MDBNavLink to="/">Smoothies2Go</MDBNavLink>
          {/* <img
          className="header-logo"
          src="https://i.imgur.com/5RzBohZt.png"
          alt="Smoothies2Go logo"
        /> */}
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!" onClick={closeBurger}>
                Popular
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" onClick={closeBurger}>
                Fruity
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" onClick={closeBurger}>
                Veggie
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" onClick={closeBurger}>
                Breakfast
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" onClick={closeBurger}>
                Sides
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          {/* <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav> */}
        </MDBCollapse>
      </MDBNavbar>
    </nav>
  );
}

export default Navbar;
