import React from "react";
import "./Cart.css";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";
import { round } from "../../utils";
import { SHOW_CART, SHOW_ORDER } from "../../constants";
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";

function Cart({ user, cartData, loadCartData, label, handleClick }) {
  // Build the Empty Cart Message
  const loadEmptyCartMessage = () => (
    <section className="cart">
      <p>There are no items in the cart.</p>
      <Link to="/">
        <button
          type="button"
          className="btn default-color btn-lg my-0 p"
          style={{ borderRadius: "5px", fontSize: "10px", color: "black" }}
        >
          Happy Shopping !!!
        </button>
      </Link>
    </section>
  );

  // Build the cart item for every cart-item in the list
  const loadCartItems = () => {
    const cartItemsJSX = cartData.map((cartItem) => {
      return (
        <CartItem
          key={cartItem._id}
          cartItem={cartItem}
          user={user}
          loadCartData={loadCartData}
          label={label}
        />
      );
    });

    return cartItemsJSX;
  };

  // Build the Cart with Cart Items
  const loadCart = () => (
    <section className="cart">
      <div className="items-header">
        <p>ITEM </p>
        <p>PRICE</p>
        <p>QTY</p>
        {label === SHOW_CART ? <p>REMOVE</p> : <></>}
      </div>
      <hr />
      {loadCartItems()}
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <button
            type="button"
            className="btn default-color btn-lg my-0 p"
            style={{ borderRadius: "5px", fontSize: "10px", color: "black" }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </section>
  );

  // Build the Summary section
  const loadSummary = () => {
    let subTotalPrice = cartData.reduce(
      (subTotalPrice, cartItem) =>
        (subTotalPrice = round(
          subTotalPrice + cartItem.item.price * cartItem.qty,
          2
        )),
      0.0
    );
    const feesAndTax = round(subTotalPrice * 0.1, 2);
    const totalPrice = round(subTotalPrice + feesAndTax, 2);
    return (
      <section className="summary" style={{ margin: "10px" }}>
        <MDBRow>
          <MDBCol md="0">
            <MDBCard>
              <MDBCardBody>
                <h3 className="h3-responsive" style={{ textAlign: "center" }}>
                  Summary
                </h3>
                <p>
                  Sub-Total Price:{" "}
                  <span className="right-align">${subTotalPrice}</span>
                </p>
                <p>
                  Fees and Tax:{" "}
                  <span className="right-align">${feesAndTax}</span>
                </p>
                <p>
                  Total Price:{" "}
                  <span className="right-align">${totalPrice}</span>
                </p>
                {/* If ShOW_CART, then show "Confirm Purchase" button  */}
                {label === SHOW_CART ? (
                  <p>
                    <Link to="/confirmation">
                      <button
                        type="button"
                        className="btn default-color btn-lg my-0 p"
                        style={{
                          borderRadius: "5px",
                          fontSize: "10px",
                          color: "black",
                        }}
                        role="link"
                      >
                        <i className="fa fa-lock"></i> &nbsp; Confirm Purchase
                      </button>
                    </Link>
                  </p>
                ) : (
                  <p style={{ textAlign: "center" }}>
                    {/* Else for SHOW_ORDER, display the "Make Payment" button to direct to Payment Server */}
                    <button
                      type="button"
                      className="btn default-color btn-lg my-0 p"
                      style={{
                        borderRadius: "5px",
                        fontSize: "10px",
                        color: "black",
                      }}
                      role="link"
                      onClick={() =>
                        handleClick(subTotalPrice, feesAndTax, totalPrice)
                      }
                    >
                      <i className="fa fa-lock"></i> &nbsp; Make Payment
                    </button>
                  </p>
                )}
                {label === SHOW_ORDER ? (
                  <p>
                    <small style={{ color: "gray" }}>
                      Please use following test cards - <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span style={{ color: "green" }}>
                        4242 4242 4242 4242 for Payment Success
                      </span>
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span style={{ color: "red" }}>
                        4000 0000 0000 9995 for Payment Declines
                      </span>
                      <br />
                    </small>
                  </p>
                ) : (
                  <></>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    );
  };

  const loadCartAndSummary = () => (
    <section className="cart-summary-container">
      {loadCart()}
      {loadSummary()}
    </section>
  );

  // If order is placed, do not display the cart, return an empty fragment
  // Else if there are items in the cart, display the cart
  // Else show empty cart message
  return cartData && cartData.length > 0
    ? loadCartAndSummary()
    : loadEmptyCartMessage();
}

export default Cart;
