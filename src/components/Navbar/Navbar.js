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
} from "mdbreact";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);
  const closeBurger = () => setIsOpen(false);

  return (
    <nav className="nav-container">
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <MDBNavLink to="/#category1">Smoothies2Go</MDBNavLink>
          {/* <img
          className="header-logo"
          src="https://i.imgur.com/5RzBohZt.png"
          alt="Smoothies2Go logo"
        /> */}
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            {/* <MDBNavItem active> */}
            <MDBNavItem>
              <MDBNavLink to="/#category1" onClick={closeBurger}>
                Popular
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/#category2" onClick={closeBurger}>
                Fruity
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/#category3" onClick={closeBurger}>
                Veggie
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/#category4" onClick={closeBurger}>
                Breakfast
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/#category5" onClick={closeBurger}>
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
