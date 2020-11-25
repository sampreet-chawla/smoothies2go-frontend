import React, { useEffect, useState } from "react";
import "./Cart.scss";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";

function Cart({ user, cartData, loadCartData }) {
  //   const [cartItems, setCartItems] = useState(cartData);

  //   const reloadCardData = async () => {
  //     await loadCartData();
  //     console.log("Setting card data ", cartData);
  //     setCartItems(cartData);
  //   };

  //   useEffect(() => {
  //     reloadCardData();
  //   }, []);
  //   console.log("Card Items now: ", cartItems);

  //   // Update Quantity for a cart-item
  //   const handleQuantity = (event, cartId) => {
  //     event.preventDefault();
  //     // const updatedSong = { ...song, is_fav: !song.is_fav };
  //     // updateFavSong(updatedSong);
  //     console.log(
  //       `Handle Quantity... for qty ${event.target.value} and cartId ${cartId}`
  //     );
  //   };

  //   // Remove a cart-item
  //   const handleRemove = (event, cartId, itemName) => {
  //     event.preventDefault();
  //     if (
  //       window.confirm(`Are you sure you want to remove the Item: ${itemName}`)
  //     ) {
  //       //   removeItem(songId);
  //       console.log(
  //         "Remove item Request accepted.. handle it for cartId",
  //         cartId
  //       );
  //     }
  //   };

  // Build the item List
  const loadCartItems = () => {
    return cartData.map((cartItem) => {
      return (
        <CartItem
          key={cartItem._id}
          cartItem={cartItem}
          user={user}
          loadCartData={loadCartData}
        />
      );
      //   const item = cartItem.item;
      //   return (
      //     <div className="item-details" key={cartItem._id}>
      //       <p>
      //         <img
      //           src={item.thumbnail_image_url}
      //           // className="card-img-top"
      //           alt={item.item_name}
      //           width="75px"
      //         />
      //         &ensp;
      //         <span className="font-weight-bold black-text">
      //           {item.item_name}
      //         </span>
      //       </p>
      //       <p>${item.price * cartItem.qty}</p>
      //       <p>
      //         <input
      //           type="number"
      //           //   style={{ width: "5vw", textAlign: "center" }}
      //           className="quantity"
      //           //   name="quantity"
      //           value={cartItem.qty}
      //           min="1"
      //           //   size="3"
      //           //   maxLength="3"
      //           onChange={(e) => handleQuantity(e, cartItem._id)}
      //         />
      //       </p>
      //       <p>
      //         <button
      //           className="btn btn-white"
      //           style={{ width: "2vw", textAlign: "center" }}
      //           onClick={(e) => handleRemove(e, cartItem._id, item.item_name)}
      //         >
      //           X
      //         </button>
      //       </p>
      //     </div>
      //   );
    });
  };

  // Display the Cart
  if (cartData && cartData.length > 0) {
    return (
      <section>
        <div className="items-header" style={{ backgroundColor: "#E1E5E8" }}>
          <p>Item </p>
          <p>Price</p>
          <p>Qty</p>
          <p>Remove</p>
        </div>
        <hr />
        {loadCartItems()}
        <div style={{ textAlign: "center" }}>
          <Link to="/">
            <button type="button" class="btn btn-primary">
              Continue Shopping
            </button>
          </Link>
        </div>
      </section>
    );
  } else {
    // Return message when there are no items in the cart.
    return (
      <>
        <p>There are no items to the cart.</p>
        <Link to="/">
          <button type="button" class="btn btn-primary">
            Happy Shopping !!!
          </button>
        </Link>
      </>
    );
  }
}

export default Cart;
