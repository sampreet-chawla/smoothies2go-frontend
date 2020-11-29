import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import {
  BACKEND_URL,
  STRIPE_PUBLISHABLE_KEY,
  PAID_STATUS,
} from "../../constants";

import {
  updateOrderPaid,
  updateOrderCancelled,
} from "../../api-services/order-services";

import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render. Specify the Publisher API Key.
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Confirmation({ user, cartData, loadCartData, label }) {
  const [order, setOrder] = useState({});
  const [message, setMessage] = useState("");

  const loadOrderContent = () => {
    return (
      <div className="cover" style={{ margin: "0 20px" }}>
        <div className="confirm">
          {order.order_status === PAID_STATUS ? (
            <h4 className="h4-responsive">
              Thank You! Your order has been confirmed, and will be ready for
              pickup in 15-20minutes, here are the details -
            </h4>
          ) : (
            <h4 class="h4-responsive">
              The order has been cancelled, here are the details -
            </h4>
          )}
          <br />
          <br />
          <div style={{ textAlign: "left" }}>
            {/* <h5 className="h5-responsive">
              Confirmation will be sent to your email: {}
            </h5> */}
            <h5 className="h5-responsive">Order number: #{order._id}</h5>
            <h5 className="h5-responsive">
              Order date: {new Date(order.order_date_time).toString()}
            </h5>
            <h5 className="h5-responsive">Order total: ${order.total_price}</h5>
            <h5 className="h5-responsive">
              Order Status: {order.order_status}
            </h5>
            <h5 className="h5-responsive">
              Please visit us again! If you have missed something -
            </h5>
            <Link to="/">
              <button type="button" className="btn btn-primary" role="link">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const Message = ({ message }) => (
    <section>
      <h2 className="h2-responsive">{message}</h2>
      <hr />
    </section>
  );

  const loadOrderResponse = async () => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      // Update Order status in Backend database
      const orderId = query.get("orderId");
      const order = await updateOrderPaid(user.token, orderId);
      setOrder(order);
      await loadCartData();
      console.log("Success order: ", order);
      // Set success message
      setMessage("Thank You! Your Order is placed!");
    }
    if (query.get("canceled")) {
      // Update Order status in Backend database
      const order = await updateOrderCancelled(user.token, order.orderId);
      setOrder(order);

      // Set Failed message
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  };

  useEffect(() => {
    loadOrderResponse();
  }, []);

  const handleClick = async (subTotalPrice, feesAndTax, totalPrice) => {
    console.log("handleClick called.. ");
    try {
      const stripe = await stripePromise;
      const response = await fetch(
        `${BACKEND_URL}/api/stripe-payment/create-session`,
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // amt: chargeDetails.totalPrice * 100,
            amt: totalPrice * 100,
            userEmail: user.email,
            userId: user._id,
            cart_items: cartData.reduce((cartIds, cartItem) => {
              cartIds.push(cartItem._id);
              return cartIds;
            }, []),
            sub_total_price: subTotalPrice,
            fees_tax: feesAndTax,
            total_price: totalPrice,
          }),
        }
      );
      console.log("create-session called.. ");
      const session = await response.json();

      // Redirect customer to Strike Checkout Form.
      console.log("Redirecting to checkout.. ");
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      console.log("Got result: ", result);
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        setMessage(result.error.message);
      }
    } catch (err) {
      console.log("Error posting request to payment server: ", err);
      setMessage(
        "Error posting request to payment server, the server maybe down. " +
          err.message
      );
    }
  };

  return message ? (
    <div
      className="order-confirmation"
      style={{ textAlign: "center", width: "80vw" }}
    >
      <Message message={message} />
      {order && order.order_status ? loadOrderContent() : <></>}
    </div>
  ) : (
    <Cart
      user={user}
      cartData={cartData}
      loadCartData={loadCartData}
      label={label}
      handleClick={handleClick}
    />
  );
}

export default Confirmation;
