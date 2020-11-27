import React, { useEffect, useState } from "react";
import "./Cart.scss";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";
import { round } from "../../utils";
import { SHOW_CART } from "../../constants";

function Cart({ user, cartData, loadCartData, label, handleClick }) {
  // Build the Empty Cart Message
  const loadEmptyCartMessage = () => (
    <section className="cart">
      <p>There are no items in the cart.</p>
      <Link to="/">
        <button type="button" className="btn btn-primary">
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
      <div className="items-header" style={{ backgroundColor: "#E1E5E8" }}>
        <p>Item </p>
        <p>Price</p>
        <p>Qty</p>
        {label === SHOW_CART ? <p>Remove</p> : <></>}
      </div>
      <hr />
      {loadCartItems()}
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <button type="button" className="btn btn-primary">
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
      <section className="summary" style={{ margin: "0 20px" }}>
        <h2 className="h2-responsive">Summary</h2>
        <p>Sub-total.price: ${subTotalPrice}</p>
        <p>Fees and Tax:: ${feesAndTax}</p>
        <p>Total Price: ${totalPrice}</p>
        {/* If ShOW_CART, then show "Confirm Purchase" button  */}
        {label === SHOW_CART ? (
          <p>
            <Link to="/confirmation">
              <button type="button" className="btn btn-primary" role="link">
                <i className="fa fa-lock"></i> &nbsp; Confirm Purchase
              </button>
            </Link>
          </p>
        ) : (
          <p>
            {/* Else for SHOW_ORDER, display the "Make Payment" button to direct to Payment Server */}
            <button
              type="button"
              className="btn btn-primary"
              role="link"
              onClick={() => handleClick(subTotalPrice, feesAndTax, totalPrice)}
            >
              <i className="fa fa-lock"></i> &nbsp; Make Payment
            </button>
          </p>
        )}
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
