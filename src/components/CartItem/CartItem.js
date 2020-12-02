import React, { useState } from "react";
import "./CartItem.css";
import {
  updateQuantity,
  deleteCartItem,
} from "../../api-services/cart-service";

import { round } from "../../utils";
import { SHOW_CART } from "../../constants";
// import "./Cart.scss";

function CartItem({ cartItem, user, loadCartData, label }) {
  const [qty, setQty] = useState(parseInt(cartItem.qty));

  // Update Quantity for a cart-item
  const handleQuantity = async (event, cartId) => {
    event.preventDefault();
    const qtyValue = event.target.value;
    console.log("qtyValue : ", typeof qtyValue);
    setQty(event.target.value);
    if (parseInt(qtyValue) <= 0) {
      window.alert("Quantity cannot be less than or equal to 0");
      setQty(1);
      window.focus(event.target);
    } else if (qtyValue !== "") {
      console.log(
        `Handling Quantity... for qty ${qtyValue} and cartId ${cartId}`
      );
      await updateQuantity(user.token, cartId, qtyValue);
      await loadCartData();
    }
  };

  // Remove a cart-item
  const handleRemove = async (event, cartId, itemName) => {
    event.preventDefault();
    if (
      window.confirm(`Are you sure you want to remove the Item: ${itemName}`)
    ) {
      console.log(
        "Remove item Request accepted.. handle it for cartId",
        cartId
      );
      await deleteCartItem(user.token, cartId);
      await loadCartData();
    }
  };

  const item = cartItem.item;
  return (
    <div className="item-details" key={cartItem._id}>
      <div className="cart-item-header">
        <div className="cart-item-image">
          <img
            src={item.thumbnail_image_url}
            alt={item.item_name}
            width="75px"
          />
        </div>
        <div className="cart-item-name">
          <span className="font-weight-bold black-text">{item.item_name}</span>
        </div>
      </div>
      <p className="black-text">${round(item.price * qty, 2)}</p>
      {label === SHOW_CART ? (
        <>
          {/* If SHOW_CART, then show Qty in editable mode, and also show the Remove button */}
          <p>
            <input
              type="number"
              style={{ textAlign: "center" }}
              className="quantity"
              name="qty"
              value={qty}
              min="1"
              onChange={(e) => handleQuantity(e, cartItem._id)}
            />
          </p>
          <p>
            <button
              className="btn btn-white"
              style={{
                width: "2vw",
                textAlign: "center",
                padding: ".84rem 1.2rem .84rem .84rem",
              }}
              onClick={(e) => handleRemove(e, cartItem._id, item.item_name)}
            >
              X
            </button>
          </p>
        </>
      ) : (
        <p>
          {/* Else for  SHOW_ORDER, display the Qty in non-editable mode, and do not show the Remove button */}
          {qty}
        </p>
      )}
    </div>
  );
}

export default CartItem;
